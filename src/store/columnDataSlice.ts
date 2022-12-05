import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import i18n from 'i18n';
import sortByOrder from 'utils/sortByOrder';
import { IColumn, IColumnData, ITask } from '../interfaces/interface';

interface IBoardID {
  boardID: string;
}

interface IState {
  columnsData: IColumnData[];
  loading: boolean;
}

const initialState: IState = {
  columnsData: [],
  loading: false,
};

export const getColumn = createAsyncThunk('columnDataSlice/getColumn', async (boardID: string) => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get<IColumn[]>(`boards/${boardID}/columns/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const columnsData: IColumnData[] = [];

  for await (const column of data) {
    const { data } = await axios.get<ITask[]>(`/boards/${boardID}/columns/${column._id}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    columnsData.push({ ...column, tasks: sortByOrder(data) });
  }
  return columnsData;
});

export interface IAddColumn extends IBoardID {
  title: string;
  order: number;
}

export const addColumn = createAsyncThunk(
  'columnDataSlice/addColumn',
  async (query: IAddColumn) => {
    const token = localStorage.getItem('token') || '';
    const body = {
      title: query.title,
      order: query.order,
    };
    const { data } = await axios.post<IColumn>(`boards/${query.boardID}/columns/`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result: IColumnData = { ...data, tasks: [] };
    return result;
  }
);

export const deleteColumn = createAsyncThunk(
  'columnDataSlice/deleteColumn',
  async (column: IColumn) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.delete<IColumn>(`boards/${column.boardId}/columns/${column._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const editColumn = createAsyncThunk(
  'columnDataSlice/editColumn',
  async (params: IColumn) => {
    const token = localStorage.getItem('token');
    const query = {
      title: params.title,
      order: params.order,
    };

    const { data } = await axios.put<IColumn>(
      `/boards/${params.boardId}/columns/${params._id}`,
      query,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  }
);

interface IGetTask {
  boardID: string;
  columnID: string;
}

export interface ICreateTask extends IGetTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export const createTask = createAsyncThunk(
  'columnDataSlice/createTask',
  async (params: ICreateTask) => {
    const token = localStorage.getItem('token');
    const body = {
      title: params.title,
      order: params.order,
      description: params.description,
      userId: params.userId,
      users: params.users,
    };
    const { data } = await axios.post<ITask>(
      `boards/${params.boardID}/columns/${params.columnID}/tasks`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  }
);

export const editTaskFetch = createAsyncThunk(
  'columnDataSlice/changeTask',
  async (params: ITask) => {
    const query = {
      title: params.title,
      description: params.description,
      order: params.order,
      columnId: params.columnId,
      userId: params.userId,
      users: params.users,
    };
    const token = localStorage.getItem('token');
    const { data } = await axios.put<ITask>(
      `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params._id}`,
      query,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
);

export interface IDeleteTask extends IGetTask {
  taskID: string;
}
export const deleteTask = createAsyncThunk(
  'columnDataSlice/deleteTask',
  async (params: IDeleteTask) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.delete<ITask>(
      `boards/${params.boardID}/columns/${params.columnID}/tasks/${params.taskID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
);

interface IUpdateTask {
  _id: string;
  columnId: string;
  order: number;
}

export const updateTaskList = createAsyncThunk(
  'columnDataSlice/updateTaskList',
  async (body: IUpdateTask[]) => {
    const token = localStorage.getItem('token');
    const { data } = await axios.patch<ITask[]>('/taskSet', body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
);

export const columnDataSilce = createSlice({
  name: 'columnData',
  initialState: initialState,
  reducers: {
    setColumnData(state, action) {
      state.columnsData = sortByOrder(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(getColumn.fulfilled, (state, action) => {
        state.columnsData = sortByOrder(action.payload);
        state.loading = false;
      })
      .addCase(getColumn.rejected, (state) => {
        message.error(i18n.t('messages.error.name6'));
        state.loading = false;
      })

      .addCase(addColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        const columnData: IColumnData = { ...action.payload, tasks: [] };
        state.columnsData.push(columnData);
        message.success(i18n.t('messages.success.name6'));
      })

      .addCase(deleteColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<IColumn>) => {
        state.columnsData.splice(action.payload.order, 1);
        state.loading = false;
        message.success(i18n.t('messages.success.name7'));
      })

      .addCase(deleteColumn.rejected, (state) => {
        state.loading = false;
        message.error(i18n.t('messages.error.name7'));
      })

      .addCase(editColumn.fulfilled, (state, actions: PayloadAction<IColumn>) => {
        state.columnsData[actions.payload.order].title = actions.payload.title;
      })

      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.columnsData.findIndex(
          (column) => column._id === action.payload.columnId
        );
        state.columnsData[index].tasks.push(action.payload);
        message.success(i18n.t('messages.success.name8'));
      })

      .addCase(editTaskFetch.fulfilled, (state, actions: PayloadAction<ITask>) => {
        const columnIndex = state.columnsData.findIndex(
          (column) => column._id === actions.payload.columnId
        );
        const taskIndex = state.columnsData[columnIndex].tasks.findIndex(
          (task) => task._id === actions.payload._id
        );
        state.columnsData[columnIndex].tasks.splice(taskIndex, 1, actions.payload);
        message.success(i18n.t('messages.success.name9'));
      })

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const columnIndex = state.columnsData.findIndex(
          (column) => column._id === action.payload.columnId
        );
        const taskIndex = state.columnsData[columnIndex].tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        state.columnsData[columnIndex].tasks.splice(taskIndex, 1);
        message.success(i18n.t('messages.success.name10'));
      });
  },
});

export default columnDataSilce.reducer;

export const { setColumnData } = columnDataSilce.actions;
