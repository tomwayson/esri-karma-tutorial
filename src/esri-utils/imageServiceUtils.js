define([
  "dojo/io-query",

  "esri/request",
  "esri/layers/ArcGISImageServiceLayer",

  // "esri/request"
],
function(
  ioQuery,
  esriRequest, ArcGISImageServiceLayer
) {
  return {
    // if layer exists and does not have same URL then
    //   get existing options and remove the layer
    // then re-add the layer w/ same id/options, but new URL
    setUrl: function(map, url, options) {
      var layer = map.getLayer(options.id);
      if (layer){
        if (layer.url === url) {
          return layer;
        }
        map.removeLayer(layer);
      }
      var imageServiceLayer = new ArcGISImageServiceLayer(url, options);
      return map.addLayer(imageServiceLayer);
    },
    getItemInfo: function(serviceUrl) {
      var url = serviceUrl + "/info/iteminfo";
      var requestParams = { f: "pjson"};
      url += "?" + ioQuery.objectToQuery(requestParams);
      return esriRequest({
        url: url
      }, {
        // NOTE: this might fail if we didn't have
        // the karma reverse proxy which prevents
        // the POST request from being cross-domain
        usePost: true
      });
    }
  };
});
