import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IUsers {
  name: string;
  _id: string;
  login: string;
}

export type UsersState = {
  users: IUsers[];
  loading: boolean;
  error: boolean;
};

export const initialState: UsersState = {
  users: [],
  error: false,
  loading: false,
};

export const getUsersFetch = createAsyncThunk('usersSlice/getUsersFetch', async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get('/users', { headers: { Authorization: `Bearer ${token}` } });
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsersFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUsersFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUsersFetch.fulfilled, (state, action: PayloadAction<IUsers[]>) => {
        state.loading = false;
        state.error = false;
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
