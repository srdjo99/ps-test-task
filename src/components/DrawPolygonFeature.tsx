import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeomanControls } from 'react-leaflet-geoman-v2';

import { PolygonLayer } from '../types/Map.type';
import { getPolygonArea } from '../utils/polygon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setArea, setPolygonGeoData } from '../store/slices/mapSlice';

const DrawPolygonFeature: React.FC = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const geoData = useAppSelector((state) => state.mapData.polygonGeoData);

  useEffect(() => {
    const layers = map.pm.getGeomanLayers();
    layers.forEach((layer) => {
      layer.removeFrom(map);
    });

    if (!geoData) {
      map.pm.Toolbar.setButtonDisabled('Polygon', false);
    }

    if (geoData) {
      const group = new L.LayerGroup([], { pmIgnore: false });
      const geoJSON = L.geoJSON(geoData);
      geoJSON.addTo(group);
      const layers = group.getLayers();
      layers.forEach((layer) => {
        layer.on('pm:edit', handleMapChange);
        layer.on('pm:dragend', handleMapChange);
      });
      group.addTo(map);

      return () => {
        layers.forEach((layer) => {
          layer.off('pm:edit', handleMapChange);
          layer.off('pm:dragend', handleMapChange);
        });
        group.removeFrom(map);
      };
    }
  }, [geoData]);

  const handleMapChange = () => {
    const geoDataFeatures = map.pm.getGeomanLayers();

    if (!geoDataFeatures.length) {
      dispatch(setPolygonGeoData(null));
      return map.pm.Toolbar.setButtonDisabled('Polygon', false);
    }

    const geoJsonLayer = geoDataFeatures[0] as PolygonLayer;
    dispatch(
      setPolygonGeoData({
        type: 'Polygon',
        features: [geoJsonLayer.toGeoJSON()],
      })
    );

    const coordinates = geoJsonLayer.toGeoJSON().geometry.coordinates[0];
    const polygonArea = getPolygonArea(coordinates as unknown as [number, number][]);
    dispatch(setArea(polygonArea));

    map.pm.Toolbar.setButtonDisabled('Polygon', true);
  };

  return (
    <GeomanControls
      options={{
        position: 'topleft',
        drawText: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawRectangle: false,
        cutPolygon: false,
        drawMarker: false,
        drawPolyline: false,
        rotateMode: false,
        removalMode: false,
      }}
      onCreate={handleMapChange}
      onMapRemove={handleMapChange}
      onDragEnd={handleMapChange}
      onEdit={handleMapChange}
    />
  );
};

export default DrawPolygonFeature;
