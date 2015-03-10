define([
  "dojo/io-query",

  "esri/request",
  "esri/layers/ArcGISImageServiceLayer"

  // "esri/request"
],
function(
  ioQuery,
  esriRequest, ArcGISImageServiceLayer
) {
  return {

    // get service item info as json
    getItemInfo: function(serviceUrl) {
      var url = serviceUrl + "/info/iteminfo";
      var requestParams = { f: "json"};
      url += "?" + ioQuery.objectToQuery(requestParams);
      return esriRequest({
        url: url
      });
    },

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
    }
  };
});
