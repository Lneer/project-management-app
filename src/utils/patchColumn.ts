import axios, { AxiosError } from 'axios';
import { IColumnData, IColumn, ITask } from 'interfaces/interface';
import sortByOrder from './sortByOrder';

const patchColumn = async (query: IColumnData[]) => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const patchColumn = sortByOrder(query).map((columndata) => {
    const { order, _id } = columndata;
    return { order, _id };
  });

  const nestedTasks = query.map((columndata) => sortByOrder(columndata.tasks)).flat();
  const patchTasks = nestedTasks.map((tasks) => {
    const { _id, order, columnId } = tasks;
    return { _id, order, columnId };
  });

  try {
    if (patchColumn.length) {
      axios.patch<IColumn[]>('/columnsSet', patchColumn);
    }
    if (patchTasks.length) {
      axios.patch<ITask[]>('/tasksSet', patchTasks);
    }
  } catch (error) {
    console.error((error as AxiosError).message);
  }
};

export default patchColumn;
