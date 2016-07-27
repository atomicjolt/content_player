import api         from "../libs/api";
import { DONE }    from "../constants/wrapper";
import { parse }   from "../libs/parser";

const EPUB = store => next => action => {

  function request(method, name, params, body){
    console.log(method, name, params, body);
    const state = store.getState();
    const promise = api.execRequest(method, `pubs/${name}/META-INF/container.xml`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
    if(promise){
      promise.then((response, error) => {
        let parser  = new DOMParser();
        let xmlDoc  = parser.parseFromString(response.text,"text/xml");
        let manifest = parse(xmlDoc);
        let contentPromise = api.execRequest(method, `pubs/${name}/${manifest.rootfiles["full-path"]}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
        contentPromise.then((response, error)=>{
          let contentParser  = new DOMParser();
          let contentXml  = contentParser.parseFromString(response.text,"text/xml");
          let contentDoc = parse(contentXml);
          // fix if we really do this.
          let tocPromise = api.execRequest(method, `pubs/${name}/OEBPS/${contentDoc.manifest[0].href}`, state.settings.apiUrl, state.jwt, state.settings.csrfToken, params, body);
          tocPromise.then((response, error)=>{
            let tocParser  = new DOMParser();
            let tocXml  = tocParser.parseFromString(response.text,"text/xml");
            let tocDoc = parse(tocXml);
            store.dispatch({
              type:     action.type + DONE,
              tableOfContents:  tocDoc.navMap,
              original: action,
              tocDoc,
              contentDoc,
              manifest,
              error
            }); // Dispatch the new data
          });
        });
        // store.dispatch({
        //   type:     action.type + DONE,
        //   payload:  response.body,
        //   original: action,
        //   response,
        //   error
        // }); // Dispatch the new data
      });
    }
  }

  if(action.epubMethod){
    request(action.epubMethod, action.name, action.params, action.body);
  }
  if(action.epubPageMethod){
    getPage(action.epubPageMethod, action.id, action.page, action.params, action.body);
  }

  // call the next middleWare
  next(action);

};

export { EPUB as default };
