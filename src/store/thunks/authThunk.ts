import { createAsyncThunk } from '@reduxjs/toolkit';

import * as userAPI from '../../api/user';

export const getUser = createAsyncThunk('user/fetchUser', async () => userAPI.fetchUser());
