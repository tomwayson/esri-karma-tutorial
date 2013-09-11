define([
  'dojo/_base/array',
  'esri/geometry/Polygon',
  'esri-utils/geometryUtils'
], function(
  array,
  Polygon,
  geometryUtils
) {

  describe('when creating a merged polygon from geometries', function() {
    var polygons;

    // runs before each spec
    beforeEach(function() {
      // create an array of two polygons
        polygons = [
          new Polygon({
            "rings": [
              [
                [-122.63, 45.52],
                [-122.57, 45.53],
                [-122.52, 45.50],
                [-122.49, 45.48],
                [-122.64, 45.49],
                [-122.63, 45.52],
                [-122.63, 45.52]
              ]
            ],
            "spatialReference": {
              " wkid": 4326
            }
          }),
          new Polygon({
            "rings": [
              [
                [-121.63, 44.52],
                [-121.57, 44.53],
                [-121.52, 44.50],
                [-121.49, 44.48],
                [-121.64, 44.49],
                [-121.63, 44.52],
                [-121.63, 44.52]
              ]
            ],
            "spatialReference": {
              " wkid": 4326
            }
          })
        ];
      });

    // runs after each spec
    afterEach(function() {
      polygons.length = 0;
    });

    // specs
    it("should have the same number of rings as all input polygons", function() {
      var ringCount = 0,
        mergedPolygon;
      polygons.forEach(function(polygon) {
        ringCount += polygon.rings.length;
      });
      mergedPolygon = geometryUtils.createMergedPolygon(polygons, polygons[0].spatialReference);
      expect(mergedPolygon.rings.length).toEqual(ringCount);
    });
  });
});
