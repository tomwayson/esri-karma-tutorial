define([
  'dojo/dom-construct',
  'esri/map',
  'esri-utils/imageServiceUtils'
], function(
  domConstruct,
  Map,
  imageServiceUtils
) {

  describe('when setting layer url', function() {
    var map;
    var url;

    // runs before each spec
    beforeEach(function() {
      // test service
      url = "/arcgis/rest/services/LandsatGLS/FalseColor/ImageServer";
      // init map
      var div = domConstruct.create('div', {style: 'width:300px;height:200px'});
      map = new Map(div, {
          basemap: "topo",
          center: [-122.45, 37.75],
          zoom: 13,
          sliderStyle: "small"
      });
    });

    // runs after each spec
    afterEach(function() {
      // clear map
      map.destroy();
      map = null;
    });

    // specs
    it("should add the layer if not already added", function() {
      // empty variable to hold results
      var options = {id: 'myLayerId'},
        added = false,
        myLayer;
      // run test w/ some async operation
      runs(function() {
        // after each layer has been added
        map.on('layer-add-result', function(e) {
          console.log(e.layer.id, e.layer.url);
          if (e.layer.url === url) {
            myLayer = e.layer;
            added = true;
          }
        });
        imageServiceUtils.setUrl(map, url, options);
      });
      // continually test for completion of async operation
      // or 5 sec which ever comes first
      waitsFor(function() {
        return added;
      }, 'the layer to load', 5000);
      // test assertions only after async operation complete
      runs(function () {
        expect(myLayer).toBeDefined();
        expect(myLayer.id).toEqual(options.id);
        expect(myLayer.url).toEqual(url);
      });
    });

    it("should replace the layer if already added", function() {
      // empty variable to hold results
      var options = {id: 'myLayerId'},
        replaceUrl = '/arcgis/rest/services/LandsatGLS/GLS2010_Enhanced/ImageServer',
        added = false,
        replaced = false,
        myLayer;
      // run test w/ some async operation
      runs(function() {
        // after each layer has been added
        map.on('layer-add-result', function(e) {
          console.log(e.layer.id, e.layer.url);
          if (e.layer.url === url) {
            myLayer = e.layer;
            added = true;
          }
          if (e.layer.url === replaceUrl) {
            myLayer = e.layer;
            replaced = true;
          }
        });
        imageServiceUtils.setUrl(map, url, options);
      });
      // continually test for completion of async operation
      // or 5 sec which ever comes first
      waitsFor(function() {
        return added;
      }, 'the layer to load for the first time', 5000);
      // test assertions only after async operation complete
      runs(function () {
        // test assertions
        expect(myLayer).toBeDefined();
        expect(myLayer.id).toEqual(options.id);
        expect(myLayer.url).toEqual(url);

        // now let's update the layer and re test
        imageServiceUtils.setUrl(map, replaceUrl, options);
      });

      waitsFor(function() {
        return replaced;
      }, 'the layer to load with the new url', 5000);
      // test assertions only after async operation complete
      runs(function () {
        // test assertions
        // - id should be same, but url updated
        expect(myLayer).toBeDefined();
        expect(myLayer.id).toEqual(options.id);
        expect(myLayer.url).toEqual(replaceUrl);
      });
    });
  });
});
