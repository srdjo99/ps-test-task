import L from 'leaflet';
import { Button, Form } from 'antd';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPolygonGeoData } from '../store/slices/mapSlice';
import { StyledForm, StyledFormInput } from '../styles/components/StyledMapForm';

interface MapFormProps {
  center: L.LatLng;
  updatePolygonCoordinates: (newCenter: L.LatLng | null) => unknown;
}

const MapForm: React.FC<MapFormProps> = ({ center, updatePolygonCoordinates }) => {
  const polygonArea = useAppSelector((state) => state.mapData.polygonArea);

  const handleCenterChange = (value: number, name: 'lat' | 'lng') => {
    updatePolygonCoordinates({
      ...center,
      [name]: value,
    } as L.LatLng);
  };

  const dispatch = useAppDispatch();

  return (
    <StyledForm labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout='vertical'>
      <h3>Center coordinates</h3>
      <Form.Item label='Latitude'>
        <StyledFormInput
          name='latitude'
          step='0.5'
          value={center ? center.lat.toPrecision(5) : ''}
          onChange={(e) => handleCenterChange(e ? +e : 0, 'lat')}
        />
      </Form.Item>
      <Form.Item>
        <StyledFormInput
          name='longitude'
          step='0.5'
          value={center ? center.lng.toPrecision(5) : ''}
          onChange={(e) => handleCenterChange(e ? +e : 0, 'lng')}
        />
      </Form.Item>
      <h3>Polygon area</h3>
      <Form.Item label='read-only'>
        <StyledFormInput
          name='polygonarea'
          value={polygonArea ? polygonArea.toFixed(2) : ''}
          readOnly
        />
      </Form.Item>

      <Button
        onClick={() => {
          dispatch(setPolygonGeoData(null));
        }}
      >
        Remove polygon
      </Button>
    </StyledForm>
  );
};

export default MapForm;
