export const getPolygonArea = (latLngs: [number, number][]) => {
  const pointsCount = latLngs.length;
  const d2r = Math.PI / 180;

  let p1,
    p2,
    area = 0.0;

  if (pointsCount > 2) {
    for (let i = 0; i < pointsCount; i++) {
      p1 = latLngs[i];
      p2 = latLngs[(i + 1) % pointsCount];
      area += (p2[1] - p1[1]) * d2r * (2 + Math.sin(p1[0] * d2r) + Math.sin(p2[0] * d2r));
    }
    area = (area * 6378137.0 * 6378137.0) / 2.0;
    area /= 1000000;
  }

  return Math.abs(area);
};

export const getPolygonCenter = (polygon: [number, number][]): [number, number] => {
  let sumLat = 0;
  let sumLng = 0;
  const numPoints = polygon.length;

  for (const [lat, lng] of polygon) {
    sumLat += lat;
    sumLng += lng;
  }

  const centerLat = sumLat / numPoints;
  const centerLng = sumLng / numPoints;

  return [centerLat, centerLng];
};
