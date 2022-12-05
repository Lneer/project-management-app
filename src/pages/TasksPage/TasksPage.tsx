import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Column, ColumnAddButton, ModalTask, Task, TaskAddButton } from 'components';
import { IColumnData, IColumn, ITask } from 'interfaces/interface';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './TasksPage.module.scss';
import {
  addColumn,
  createTask,
  deleteColumn,
  deleteTask,
  getColumn,
  IAddColumn,
  ICreateTask,
  IDeleteTask,
  setColumnData,
} from 'store/columnDataSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Spin } from 'antd';
import patchColumn from 'utils/patchColumn';
import { getUsersFetch } from 'store/usersSlice';
import { getPointsFetch } from 'store/pointsSlice';
import { getUserBoards } from 'store/sliceBoards';
import { useTranslation } from 'react-i18next';

const TasksPage = () => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.auth.id) || localStorage.getItem('id') || '';
  const boards = useAppSelector((state) => state.boards);
  const columns = useAppSelector((state) => state.columnData.columnsData);
  const columnloading = useAppSelector((state) => state.columnData.loading);
  const [currentColumn, setCurrentColumn] = useState<IColumnData | null>(null);

  const isRender = useRef(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isVisibleCreateModal, setIsCreateVisibleModal] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (id) {
      dispatch(getColumn(id));
      dispatch(getUsersFetch());
      dispatch(getPointsFetch(userId));
    }
  }, [dispatch, id, userId]);

  useEffect(() => {
    if (isRender.current) {
      patchColumn(columns);
    } else {
      isRender.current = true;
    }
  }, [columns]);

  useEffect(() => {
    dispatch(getUserBoards());
  }, [dispatch]);

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const tasksOrder: IColumnData[] = JSON.parse(JSON.stringify(columns));

    if (type === 'columns') {
      const [item] = tasksOrder.splice(source.index, 1);
      tasksOrder.splice(destination.index, 0, item);
      tasksOrder.forEach((elem, index) => (elem.order = index));
      dispatch(setColumnData(tasksOrder));
      return;
    }

    const startColumnID = source.droppableId;
    const endColumnID = destination.droppableId;
    const sourceColumnIndex = columns.findIndex((column) => column._id === startColumnID);
    const destinationColumnIndex = tasksOrder.findIndex((column) => column._id === endColumnID);

    if (startColumnID === endColumnID) {
      const [item] = tasksOrder[destinationColumnIndex].tasks.splice(source.index, 1);

      tasksOrder[destinationColumnIndex].tasks.splice(destination.index, 0, item);
    } else {
      const [dragItem] = tasksOrder[sourceColumnIndex].tasks.splice(source.index, 1);
      tasksOrder[sourceColumnIndex].tasks.forEach((task, index) => (task.order = index));
      dragItem.columnId = endColumnID;
      tasksOrder[destinationColumnIndex].tasks.splice(destination.index, 0, dragItem);
    }
    tasksOrder[destinationColumnIndex].tasks.forEach((task, index) => (task.order = index));

    dispatch(setColumnData(tasksOrder));
  };

  const getBoardTitleById = (id?: string) => {
    if (!id) return 'unknow';
    const currentBoard = boards.boards.filter((board) => board._id === id);
    if (currentBoard.length === 1) return currentBoard[0].title.split('|')[0];
    return '';
  };

  const openCreteModal = (column: IColumnData) => {
    setIsCreateVisibleModal(true);
    setCurrentColumn(column);
  };

  const onCancelCreateModal = () => {
    setIsCreateVisibleModal(false);
    setCurrentColumn(null);
  };

  const createNewTask = (query: ICreateTask) => {
    dispatch(createTask(query));
  };

  const createColumnHandler = (query: IAddColumn) => {
    dispatch(addColumn(query));
    setCurrentColumn(null);
  };

  const deleteColumnHandler = (column: IColumn) => {
    dispatch(deleteColumn(column));
  };

  const eraseTask = (task: ITask) => {
    const query: IDeleteTask = {
      boardID: id || '',
      columnID: task.columnId,
      taskID: task._id,
    };

    dispatch(deleteTask(query));
  };

  if (!columns.length && columnloading) {
    return (
      <Spin size="large">
        <div style={{ height: '30vh' }} />
      </Spin>
    );
  }

  return (
    <main className={styles['task-container']}>
      <h2 className={styles.boardheader}>
        {t('taskPage.title')}: {getBoardTitleById(id)}
      </h2>
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="colums" direction="horizontal" type="columns">
          {(provided) => (
            <div
              className={styles['column-container']}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => (
                <Column
                  addTaskButton={<TaskAddButton onClick={() => openCreteModal(column)} />}
                  column={column}
                  key={column._id}
                  columnOrder={index}
                  onClose={() => deleteColumnHandler(column)}
                >
                  <>
                    {column.tasks.map((task, index) => (
                      <Task
                        key={task._id}
                        task={task}
                        taskOrder={index}
                        onRemove={() => eraseTask(task)}
                      />
                    ))}
                  </>
                </Column>
              ))}
              {provided.placeholder}
              <ColumnAddButton onClick={createColumnHandler} boardId={id} state={columns} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ModalTask
        type="create"
        column={currentColumn}
        title={<h5>{t('taskPopap.createTitle')}</h5>}
        isVisible={isVisibleCreateModal}
        onCancel={onCancelCreateModal}
        onOk={createNewTask as () => void}
      />
    </main>
  );
};

export default TasksPage;
