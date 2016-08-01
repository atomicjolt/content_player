import api         from "../libs/api";
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

/**
 * Returns path of the table of contents relative to the epub 'rootfile'
 */
function getToc(contentDoc){
  var tocID = contentDoc.spine.toc;
  var toc = contentDoc.manifest.filter((item) => {if(item.id == tocID) return true;});
  return toc[0];
}

const EPUB = store => next => action => {

  function handleResponse(response, handleItem){
    let parser  = new DOMParser();
    let xmlDoc  = parser.parseFromString(response.text,"text/xml");
    let item = parse(xmlDoc);
    return handleItem(item);
  }

  function requestToc(method, name, params, body){
    const state = store.getState();
    const metaPromise = api.execRequest(method, `pubs/${name}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
    if(metaPromise){
      metaPromise.then((response) => {
        var contentPath;
        var contentPromise = handleResponse(response, (item) => {
          // Path to epub content
          contentPath = `pubs/${name}`;
          let relativePath = getRelativePath(item);

          // if there is a relative path within the epub to the content then append it.
          if(!_.isEmpty(relativePath)){contentPath += `/${relativePath}`;}
          return api.execRequest(method, `pubs/${name}/${item.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
        });

        contentPromise.then((response) => {

          var tocPromise = handleResponse(response, (item) => {
            let toc = getToc(contentDoc);
            return api.execRequest(method, `${contentPath}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
          });

          tocPromise.then((response) => {
            handleResponse((item) => {
              let tableOfContents = _.isArray(tocDoc.navMap) ? tocDoc.navMap : [tocDoc.navMap];
              store.dispatch({
                type:     action.type + DONE,
                tableOfContents,
                original: action,
                tocDoc,
                contentPath,
              });
            });
          });
        });
      });
    }
  }

  if(action.epubMethod){
    requestToc(action.epubMethod, action.name, action.params, action.body);
  }


  // call the next middleWare
  next(action);

};

export { EPUB as default };
