import api         from "../libs/api";
import Network    from '../constants/network';
import { DONE }    from "../constants/wrapper";
import { parse }   from "../libs/parser";
import _           from 'lodash';

/**
 * Request wrapper to enable us to mock requests with Rewire
 */
function request(method, url, apiUrl, jwt, csrfToken){
  return api.execRequest(method, url, apiUrl, jwt, csrfToken);
}

/**
 * Parse response from server and pass to callback function along with optional params.
 */
export function handleResponse(response, handleItem, params = []){
  let parser  = new DOMParser();
  let xmlDoc  = parser.parseFromString(response.text,"text/xml");
  let item = parse(xmlDoc);
  if(handleItem){return handleItem(item, ...params);}
}

/**
 * Returns path from the epub root to epub content
 */
export function getRelativePath(manifest){
  let segments = manifest.rootfiles['full-path'].split('/');
  segments.splice(-1,1); // Remove last element
  return `${segments.join('/')}`;
}

/**
 * Make request for epub container document, then calls callback with parsed container
 * document.
 */
export function requestContainer(state, epubUrl, next){
  const metaPromise = request(Network.GET, `${epubUrl}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  if(metaPromise){
    metaPromise.then((response) => {
      handleResponse(response, next, [epubUrl]);
    });
  }
}

/**
 * Makes request for root file, parses it, and passes it to the callback along with
 * the url where epub content is located.
 */
export function requestRootFile(state, container, epubUrl, epubPath, next){
  var rootfile = request(Network.GET, `${epubUrl}/${container.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  if(!_.isEmpty(epubPath)){epubUrl += `/${epubPath}`;}
  rootfile.then((response) => {
    handleResponse(response, next, [epubUrl]);
  });
}

/**
 * Makes request for epub table fo contents, parses it, and passes to the callback
 * along with the url where epub content will be located.
 */
export function requestTableOfContents(state, rootfile, epubUrl, next){
  var lastModifiedString = (rootfile.metadata.meta.find((item) => item.property === 'dcterms:modified') || {}).text;
  var lastModifiedDate = new Date(lastModifiedString);
  if(lastModifiedDate != 'Invalid Date'){
    var lastModified = lastModifiedDate.toLocaleString('en-GB', {timeZoneName: 'long'});
  }
  var titles = rootfile.metadata['dc:title'];
  var subjectLesson = (titles.find((item) => item.id === 'subj-lesson') || {}).text;
  var gradeUnit = (titles.find((item) => item.id === 'grd-unit') || {}).text;
  var language = rootfile.metadata['dc:language'];
  var tocID = rootfile.spine.toc;
  var toc = rootfile.manifest.filter((item) => {if(item.id == tocID) return true;})[0];
  var tocPromise = request(Network.GET, `${epubUrl}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  tocPromise.then((response) => {
    handleResponse(response, next, [epubUrl, { subjectLesson, gradeUnit, language, lastModified}]);
  });
}


const EPUB = store => next => action => {
  if(action.epubMethod){
    const state = store.getState();
    requestContainer(state, action.epubUrl, (item, epubUrl) => {
      requestRootFile(state, item, epubUrl, getRelativePath(item), (item, epubUrl) => {
        requestTableOfContents(
          state,
          item,
          epubUrl,
          (item, epubUrl, tocMeta) => {
            let tableOfContents = _.isArray(item.navMap) ? item.navMap : [item.navMap];
            store.dispatch({
              type:     action.type + DONE,
              tableOfContents,
              original: action,
              tocDoc: item,
              contentPath: epubUrl,
              tocMeta
            });
          });
      });
    });
  }


  // call the next middleWare
  next(action);

};

export { EPUB as default };
