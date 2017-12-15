import {
  handleResponse,
  getRelativePath,
  requestContainer,
  requestRootFile,
  requestTableOfContents,
  separateOutBibliography,
  __RewireAPI__ as EpubRewire } from './epub';

var requestCalled = false;
const mocks = {
  fakeRequest: () => {
    requestCalled = true;
    return new Promise((resolve, reject) => {
      resolve({text:""});
    });
  }
};

describe('epub middleware', () => {
  beforeEach(() => {
    EpubRewire.__Rewire__('request', mocks.fakeRequest);
    requestCalled = false;
  });

  afterEach(() => { EpubRewire.__ResetDependency__('request'); });

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
      handleResponse(params.response, params.handleItem, callbackParams);

      expect(params.handleItem).toHaveBeenCalledWith(parsedItem, ...callbackParams);
    });
  });

  describe('getRelativePath', () => {
    it("removes rootfile", () => {
      var result = getRelativePath({
        rootfiles: {
          ['full-path']: "folder/content.opf"
        }
      });
      expect(result).toEqual('folder');
    });

    it("returns path from epub root to rootfile", () => {
      var result = getRelativePath({
        rootfiles: {
          ['full-path']: "deeply/nested/folder/content.opf"
        }
      });
      expect(result).toEqual('deeply/nested/folder');
    });

    it("returns empty string when rootfile is at epub root", () => {
      var result = getRelativePath({
        rootfiles: {
          ['full-path']: "content.opf"
        }
      });
      expect(result).toEqual('');
    });
  });

  describe('requestContainer', () => {
    it("should make request", () => {
      requestContainer({settings:{}}, 'fakeUrl');
      expect(requestCalled).toEqual(true);
    });

    it("should call next", (done) => {
      requestContainer({settings:{}}, 'fakeUrl', () => {
        done();
      });
    });
  });

  describe('requestRootFile', () => {
    const container = {
      rootfiles:{
        ['full-path']:""
      }
    };

    it("should make request", () => {
      requestRootFile({settings:{}}, container, 'fakeUrl');
      expect(requestCalled).toEqual(true);
    });

    it("should call next", (done) => {
      requestRootFile({settings:{}}, container,'fakeUrl', 'fakepath', () => {
        done();
      });
    });
  });

  describe('requestTableOfContents', () => {
    const manifest = {
      manifest: [{ id:'not-toc' }, { id:'toc' }],
      spine: { toc:'toc' },
      metadata: {
        meta:[{
          property: 'dcterms:modified',
          text: '2016-09-30T12:10:59Z'
        }]
      }
    };

    it("should make request", () => {
      requestTableOfContents({ settings:{} }, manifest, 'fakeUrl');
      expect(requestCalled).toEqual(true);
    });

    it("should call next", (done) => {
      requestTableOfContents({ settings:{} }, manifest, 'fakeUrl', (item, url, meta) => {
        expect(meta.bibliography).toEqual(undefined);
        done();
      });
    });

    it('should send bibliography to next', (done) => {
      manifest.guide = [{
        type: 'bibliography',
        href: 'Text/credits.html'
      }];
      requestTableOfContents({ settings:{} }, manifest, 'fakeUrl', (item, url, meta) => {
        expect(meta.bibliography).toEqual('Text/credits.html');
        done();
      });
    });

    it('should work when guide is only one element', (done) => {
      manifest.guide = {
        type: 'bibliography',
        href: 'Text/credits.html'
      };
      requestTableOfContents({ settings:{} }, manifest, 'fakeUrl', (item, url, meta) => {
        expect(meta.bibliography).toEqual('Text/credits.html');
        done();
      });
    });
  });

  describe('separateOutBibliography', () => {
    let item;

    beforeEach(() => {
      item = {
        navMap: [{
          navLabel: 'foo',
          content: 'Text/bar.html',
          id: 'navPoint1'
        }]
      };
    });

    it('should return params unchanged if no bibliography', (done) => {
      separateOutBibliography(
        item, 'fakeUrl', { foo: 'bar' },
        (tableOfContents, item2, epubUrl, tocMeta, bibliography) => {
          expect(tableOfContents).toEqual(item.navMap);
          expect(bibliography).toEqual(undefined);
          expect(tocMeta).toEqual({ foo: 'bar' });
          done();
        }
      );
    });

    it('should return params unchanged if no bibliography match', (done) => {
      separateOutBibliography(
        item, 'fakeUrl', { foo: 'bar', bibliography: 'Text/baz.html' },
        (tableOfContents, item2, epubUrl, tocMeta, bibliography) => {
          expect(tableOfContents).toEqual(item.navMap);
          expect(bibliography).toEqual(undefined);
          expect(tocMeta).toEqual({ foo: 'bar' });
          done();
        }
      );
    });

    it('should separate out bibliography if match', (done) => {
      separateOutBibliography(
        item, 'fakeUrl', { foo: 'bar', bibliography: 'Text/bar.html' },
        (tableOfContents, item2, epubUrl, tocMeta, bibliography) => {
          expect(tableOfContents).toEqual([]);
          expect(bibliography).toEqual(item.navMap[0]);
          expect(tocMeta).toEqual({ foo: 'bar' });
          done();
        }
      );
    });

  });
});
