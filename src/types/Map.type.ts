import L from 'leaflet';
import * as geojson from 'geojson';

export interface MapState {
  center: [number, number];
  polygonGeoData: PolyGeoJSON | null;
  polygonArea: number | null;
}

export interface PolyGeoJSONFeature {
  type: string;
  properties: object;
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

export interface PolyGeoJSON {
  type: geojson.GeoJsonTypes;
  features: PolyGeoJSONFeature[];
}

export type PolygonLayer = L.Layer & { toGeoJSON: () => PolyGeoJSONFeature };
