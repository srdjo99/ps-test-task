import { useMemo } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';

import MapForm from './MapForm';
import MapControls from './MapControls';
import { osm, DEFAULT_POSITION, ZOOM_LEVEL } from '../utils/osm';
import { StyledButton, StyledMapWrapper } from '../styles/components/StyledMapWrapper';

import '../index.css';
import 'leaflet/dist/leaflet.css';

import { PolyGeoJSON } from '../types/Map.type';
import { logout } from '../store/slices/authSlice';
import { getPolygonCenter } from '../utils/polygon';
import { setPolygonGeoData } from '../store/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const MapWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const geoData = useAppSelector((state) => state.mapData.polygonGeoData);

  const polygonCenter = useMemo(() => {
    if (!geoData) return null;

    const coordinates = geoData.features[0].geometry.coordinates[0] as unknown as [
      number,
      number
    ][];
    const [lat, lng] = getPolygonCenter(coordinates);

    return new L.LatLng(lat, lng);
  }, [geoData]);

  const updatePolygonCoordinates = (newCenter: L.LatLng | null) => {
    if (!geoData || !polygonCenter || !newCenter) return;

    const latOffset = newCenter.lat - polygonCenter.lat;
    const lngOffset = newCenter.lng - polygonCenter.lng;

    const coordinates = geoData.features[0].geometry.coordinates[0] as unknown as [
      number,
      number
    ][];

    const newCoordinates = coordinates.map(([lat, lng]) => {
      return [lat + latOffset, lng + lngOffset];
    });

    const newGeoData: PolyGeoJSON = {
      type: 'Polygon',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [newCoordinates as unknown as number[]],
          },
        },
      ],
    };
    dispatch(setPolygonGeoData(newGeoData));
  };

  return (
    <StyledMapWrapper>
      {polygonCenter && (
        <MapForm center={polygonCenter} updatePolygonCoordinates={updatePolygonCoordinates} />
      )}
      <MapContainer center={DEFAULT_POSITION} zoom={ZOOM_LEVEL} attributionControl={false}>
        <MapControls />

        <TileLayer url={osm.url} attribution={osm.attribution} />
      </MapContainer>
      <StyledButton
        onClick={() => {
          navigate('/login');
          dispatch(logout());
        }}
      >
        Logout
      </StyledButton>
    </StyledMapWrapper>
  );
};

export default MapWrapper;
