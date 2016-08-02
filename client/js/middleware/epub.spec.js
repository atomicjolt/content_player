import * as Epub from './epub';


describe('epub middleware', () => {
  describe('handleResponse', () => {
    const params = {

      handleItem:(item, param1, param2) => {
      },
      response: {
        text: `<?xml version="1.0" encoding="UTF-8"?>
            <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
              <rootfiles>
                  <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
             </rootfiles>
          </container>`
      }
    };

    const parsedItem = {
      "rootfiles": {
        "full-path": "OEBPS/content.opf",
        "media-type": "application/oebps-package+xml"
      },
      "xmlns": "urn:oasis:names:tc:opendocument:xmlns:container",
      "version": "1.0"
    };

    it("calls handleItem", () => {
      spyOn(params, 'handleItem');
      const callbackParams =  [1,2,3];
      Epub.handleResponse(params.response, params.handleItem, callbackParams);

      expect(params.handleItem).toHaveBeenCalledWith(parsedItem, ...callbackParams);
    });
  });

  describe('getRelativePath', () => {});
  describe('requestContainer', () => {});
  describe('requestRootFile', () => {});
  describe('requestTableOfContents', () => {});
});
