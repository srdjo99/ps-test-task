import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MapState, PolyGeoJSON } from '../../types/Map.type';

const initialState: MapState = {
  center: [0, 0],
  polygonGeoData: null,
  polygonArea: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, { payload }: PayloadAction<[number, number]>) => {
      state.center = payload;
    },
    setPolygonGeoData: (state, { payload }: PayloadAction<PolyGeoJSON | null>) => {
      state.polygonGeoData = payload;
    },
    setArea: (state, { payload }: PayloadAction<number | null>) => {
      state.polygonArea = payload;
    },
  },
});

export const { setArea, setCenter, setPolygonGeoData } = mapSlice.actions;

export default mapSlice.reducer;
