import _              from 'lodash';
import {hashHistory}  from "react-router";

import api         from "../libs/api";
import Network     from '../constants/network';
import { DONE }    from "../constants/wrapper";
import { parse }   from "../libs/parser";
import {Constants as ApplicationConstants} from '../actions/application';
import {Constants as ContentConstants} from '../actions/content';
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
  if(_.isArray(rootfile.metadata.meta)){
    var lastModifiedString = (rootfile.metadata.meta.find((item) => item.property === 'dcterms:modified') || {}).text;
    var lastModifiedDate = new Date(lastModifiedString);
    if(lastModifiedDate != 'Invalid Date'){
      // Only take the date portion of the ISO string
      var lastModified = lastModifiedDate.toISOString().split('T')[0];
    }
  }

  var titles = rootfile.metadata['dc:title'];
  if(_.isArray(titles)){
    var subjectLesson = (titles.find((item) => item.id === 'subj-lesson') || {}).text;
    var gradeUnit = (titles.find((item) => item.id === 'grd-unit') || {}).text;
  }

  var language = rootfile.metadata['dc:language'];

  // if a bibliography is specified in the rootfile.guide, we need
  //   to pass it along to next() somehow...
  const guide = _.has(rootfile, 'guide') ?
    _.isArray(rootfile.guide) ? rootfile.guide : [rootfile.guide] :
    null;
  let bibliography = guide ?
    guide.filter(reference => reference.type === 'bibliography') :
    null;

  if (bibliography && bibliography.length > 0) {
    bibliography = bibliography[0].href;
  }

  var tocID = rootfile.spine.toc;
  var toc = rootfile.manifest.filter((item) => {if(item.id == tocID) return true;})[0];
  var tocPromise = request(Network.GET, `${epubUrl}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  tocPromise.then((response) => {
    handleResponse(response, next, [epubUrl, {subjectLesson, gradeUnit, language, lastModified, bibliography}]);
  });
}


/**
 * Modifies the side-nav to strip out any bibliography, if
 * specified in the content.opf file.
 * Bibliography is then added as a separate parameter to send
 * to the reducer.
 */
export const separateOutBibliography = (item, epubUrl, tocMeta, next) => {
  let tableOfContents = _.isArray(item.navMap) ? item.navMap : [item.navMap];
  let bibliography;
  if (tocMeta.bibliography) {
    bibliography = _.find(tableOfContents, navPage => navPage.content === tocMeta.bibliography);
    tableOfContents = _.filter(tableOfContents,
      navPage => navPage.content !== tocMeta.bibliography);
  }
  next(tableOfContents, item, epubUrl, _.omit(tocMeta, 'bibliography'), bibliography);
};


const EPUB = store => next => action => {
  switch (action.type) {
    case ApplicationConstants.SELECT_PAGE:
      hashHistory.push(`${action.pageId}`);
      break;
    case ContentConstants.LOAD_CONTENT:
      if(action.epubMethod){
        const state = store.getState();
        requestContainer(state, action.epubUrl, (item, epubUrl) => {
          requestRootFile(state, item, epubUrl, getRelativePath(item), (item, epubUrl) => {
            requestTableOfContents(state, item, epubUrl, (item, epubUrl, tocMeta) => {
              // Here we need to filter out any bibliographies listed in
              //   the root file
              separateOutBibliography(item, epubUrl, tocMeta,
                (tableOfContents, item, epubUrl, tocMeta, bibliography) => {
                  store.dispatch({
                    type: action.type + DONE,
                    tableOfContents,
                    original: action,
                    tocDoc: item,
                    contentPath: epubUrl,
                    tocMeta,
                    bibliography
                  });
                });
              });
          });
        });
      }
      break;
  }


  // call the next middleWare
  next(action);

};

export { EPUB as default };
