import api         from "../libs/api";
import Network    from '../constants/network';
import { DONE }    from "../constants/wrapper";
import { parse }   from "../libs/parser";
import _           from 'lodash';

/**
 * Returns path from the epub root to epub content
 */
function getRelativePath(manifest){
  let segments = manifest.rootfiles['full-path'].split('/');
  segments.splice(-1,1); // Remove last element
  return `${segments.join('/')}`;
}

function handleResponse(response, handleItem, params = []){
  let parser  = new DOMParser();
  let xmlDoc  = parser.parseFromString(response.text,"text/xml");
  let item = parse(xmlDoc);
  if(handleItem){return handleItem(item, ...params);}
}

function requestContainer(state, epubUrl, next){
  const metaPromise = api.execRequest(Network.GET, `${epubUrl}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  if(metaPromise){
    metaPromise.then((response) => {
      handleResponse(response, next, [epubUrl]);
    });
  }
}

function requestRootFile(state, container, epubUrl, epubPath, next){
  var rootfile = api.execRequest(Network.GET, `${epubUrl}/${container.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  if(!_.isEmpty(epubPath)){epubUrl += `/${epubPath}`;}
  rootfile.then((response) => {
    handleResponse(response, next, [epubUrl]);
  });
}

function requestTableOfContents(state, manifest, epubUrl, next){
  var tocID = manifest.spine.toc;
  var toc = manifest.manifest.filter((item) => {if(item.id == tocID) return true;})[0];
  var tocPromise = api.execRequest(Network.GET, `${epubUrl}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken);
  tocPromise.then((response) => {
    handleResponse(response, next, [epubUrl]);
  });
}


const EPUB = store => next => action => {

  if(action.epubMethod){
    const state = store.getState();
    requestContainer(state, `pubs/${action.name}`, (item, epubUrl) => {
      requestRootFile(state, item, epubUrl, getRelativePath(item), (item, epubUrl) => {
        requestTableOfContents(state, item, epubUrl, (item, epubUrl) => {
          let tableOfContents = _.isArray(item.navMap) ? item.navMap : [item.navMap];
          store.dispatch({
            type:     action.type + DONE,
            tableOfContents,
            original: action,
            tocDoc: item,
            contentPath: epubUrl,
          });
        });
      });
    });
  }


  // call the next middleWare
  next(action);

};

export { EPUB as default };
