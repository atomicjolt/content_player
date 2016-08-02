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

  function request(method, name, params, body){
    const state = store.getState();
    const promise = api.execRequest(method, `pubs/${name}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
    if(promise){
      promise.then((response, error) => {
        let parser  = new DOMParser();
        let xmlDoc  = parser.parseFromString(response.text,"text/xml");
        let manifest = parse(xmlDoc);

        // Path to epub content
        var contentPath = `pubs/${name}`;
        let relativePath = getRelativePath(manifest);

        // if there is a relative path within the epub to the content then append it.
        if(!_.isEmpty(relativePath)){contentPath += `/${relativePath}`;}

        let contentPromise = api.execRequest(method, `pubs/${name}/${manifest.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
        contentPromise.then((response, error)=>{
          let contentParser  = new DOMParser();
          let contentXml  = contentParser.parseFromString(response.text,"text/xml");
          let contentDoc = parse(contentXml);
          let toc = getToc(contentDoc);

          let tocPromise = api.execRequest(method, `${contentPath}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
          tocPromise.then((response, error)=>{
            let tocParser  = new DOMParser();
            let tocXml  = tocParser.parseFromString(response.text,"text/xml");
            let tocDoc = parse(tocXml);
            let tableOfContents = _.isArray(tocDoc.navMap) ? tocDoc.navMap : [tocDoc.navMap];
            store.dispatch({
              type:     action.type + DONE,
              tableOfContents,
              original: action,
              tocDoc,
              contentDoc,
              manifest,
              contentPath,
              error
            }); // Dispatch the new data
          });
        });
      });
    }
  }

  if(action.epubMethod){
    request(action.epubMethod, action.name, action.params, action.body);
  }


  // call the next middleWare
  next(action);

};

export { EPUB as default };
