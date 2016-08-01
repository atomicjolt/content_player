import api         from "../libs/api";
import { DONE }    from "../constants/wrapper";
import { parse }   from "../libs/parser";
import _           from 'lodash';


function getToc(contentDoc){
  var tocID = contentDoc.spine.toc;
  var toc = contentDoc.manifest.filter((item) => {if(item.id == tocID) return true;});
  return toc[0];
}

function getRelativePath(manifest){
  let segments = manifest.rootfiles['full-path'].split('/');
  segments.splice(-1,1); // Remove last element
  return `${segments.join('/')}`;
}

const EPUB = store => next => action => {

  function request(method, name, params, body){
    var epubPath = `pubs/${name}`;
    const state = store.getState();
    const promise = api.execRequest(method, `pubs/${name}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
    if(promise){
      promise.then((response, error) => {
        let parser  = new DOMParser();
        let xmlDoc  = parser.parseFromString(response.text,"text/xml");
        let manifest = parse(xmlDoc);
        let relativePath = getRelativePath(manifest);
        if(!_.isEmpty(relativePath)){epubPath += `/${relativePath}`;} //TODO doc

        let contentPromise = api.execRequest(method, `pubs/${name}/${manifest.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
        contentPromise.then((response, error)=>{
          let contentParser  = new DOMParser();
          let contentXml  = contentParser.parseFromString(response.text,"text/xml");
          let contentDoc = parse(contentXml);
          // fix if we really do this.
          let toc = getToc(contentDoc);
          let tocPromise = api.execRequest(method, `pubs/${name}/${relativePath}/${toc.href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
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
              epubPath,
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
