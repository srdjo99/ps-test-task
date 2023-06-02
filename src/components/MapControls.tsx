import { FeatureGroup } from 'react-leaflet';

import DrawPolygonFeature from './DrawPolygonFeature';

const MapControls: React.FC = () => {
  return (
    <FeatureGroup>
      <DrawPolygonFeature />
    </FeatureGroup>
  );
};

export default MapControls;
