import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IPoint {
  taskId: string;
  _id: string;
  title: string;
  boardId: string;
  done: boolean;
}

export type PointsState = {
  points: IPoint[];
  loading: boolean;
  error: boolean;
};

export const initialState: PointsState = {
  points: [],
  error: false,
  loading: false,
};

export const getPointsFetch = createAsyncThunk(
  'pointsSlice/getPointsFetch',
  async (userId: string) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`/points?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const createPointsFetch = createAsyncThunk(
  'pointsSlice/createPointsFetch',
  async (params: IPoint) => {
    const { _id, ...query } = params;
    _id.toString();
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`/points`, query, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const deletePointFetch = createAsyncThunk(
  'pointsSlice/deletePointFetch',
  async (params: IPoint) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.delete(`/points/${params._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const patchPointFetch = createAsyncThunk(
  'pointsSlice/patchPointFetch',
  async (params: IPoint) => {
    const { _id, boardId, taskId, ...query } = params;
    boardId.toLowerCase();
    taskId.toLowerCase();
    const token = localStorage.getItem('token');
    const { data } = await axios.patch(`/points/${_id}`, query, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

const pointsSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPointsFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPointsFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPointsFetch.fulfilled, (state, action: PayloadAction<IPoint[]>) => {
        state.loading = false;
        state.error = false;
        state.points = action.payload;
      })

      .addCase(createPointsFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createPointsFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createPointsFetch.fulfilled, (state, action: PayloadAction<IPoint>) => {
        state.loading = false;
        state.error = false;
        state.points.push(action.payload);
      })
      .addCase(deletePointFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePointFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deletePointFetch.fulfilled, (state, action: PayloadAction<IPoint>) => {
        state.loading = false;
        state.error = false;
        const pointsIndex = state.points.findIndex((point) => point._id === action.payload._id);
        state.points.splice(pointsIndex, 1);
      })
      .addCase(patchPointFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(patchPointFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(patchPointFetch.fulfilled, (state, action: PayloadAction<IPoint>) => {
        state.loading = false;
        state.error = false;
        const pointsIndex = state.points.findIndex((point) => point._id === action.payload._id);
        state.points[pointsIndex].done = action.payload.done;
      });
  },
});

export default pointsSlice.reducer;
