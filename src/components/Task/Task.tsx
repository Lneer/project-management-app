import React, { useEffect, useState } from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from 'interfaces/interface';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';
import ModalTask from 'components/ModalTask/ModalTask';
import { editTaskFetch } from 'store/columnDataSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Switch, Tag } from 'antd';
import getRandomColor from 'utils/geRandomColor';
import { createPointsFetch, patchPointFetch } from 'store/pointsSlice';
import { useTranslation } from 'react-i18next';

interface TaskProps {
  task: ITask;
  taskOrder: number;
  onRemove?: () => void;
}

const Task: React.FC<TaskProps> = ({ task, taskOrder = 0, onRemove }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const points = useAppSelector((state) => state.points);
  const [isVisilbeModal, setIsVisibleModal] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (points.loading || points.error) return;
    const point = points.points.find((point) => point.title === task.title);
    if (point) {
      setIsCompleted(point.done);
    }
  }, [points.loading, task.title, points.error, points.points]);

  const getUserNameById = (id: string) => {
    const findedUser = users.find((user) => user._id === id);
    if (!findedUser) return id;
    return findedUser.name;
  };

  const openEditModal = () => {
    if (!isCompleted) {
      setIsVisibleModal(true);
    }
  };

  const closeEditModal = () => {
    setIsVisibleModal(false);
  };

  const editTask = (task: ITask) => {
    dispatch(editTaskFetch(task));
  };

  const onSwitcherToggle = (toggle: boolean) => {
    const point = points.points.find((point) => point.title === task.title);
    if (point) {
      const query = { ...point, done: toggle };
      dispatch(patchPointFetch(query));
    } else {
      const param = {
        _id: '',
        title: task.title,
        taskId: task._id,
        boardId: task.boardId,
        done: toggle,
      };
      dispatch(createPointsFetch(param));
    }
  };

  return (
    <>
      <Draggable draggableId={task._id} index={taskOrder} isDragDisabled={isCompleted}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${styles['task-container']} ${styles[`task-container__${isCompleted}`]}`}
          >
            <div className={styles['task-header-container']}>
              <h3 className={styles['task-header__title']}>{task.title}</h3>
              <div className={styles['task-btn-edit']} onClick={openEditModal} />
            </div>
            <p className={styles['task-description']}>{task.description}</p>
            <div className={styles.task__users}>
              {task.users?.map((user, index) => (
                <Tag key={`${user}-${index}`} color={getRandomColor()}>
                  {getUserNameById(user)}
                </Tag>
              ))}
            </div>
            <Switch
              className={styles['task-done-switcher']}
              checkedChildren={t('toggle.done')}
              unCheckedChildren={t('toggle.working')}
              checked={isCompleted}
              defaultChecked={isCompleted}
              loading={points.loading}
              onChange={onSwitcherToggle}
            />
            <ModalConfirm element="task" confirmHandler={onRemove} />
          </div>
        )}
      </Draggable>
      <ModalTask
        type="edit"
        task={task}
        title={<h5>{t('taskPopap.editTitle')} </h5>}
        isVisible={isVisilbeModal}
        onCancel={closeEditModal}
        onOk={editTask as () => void}
      />
    </>
  );
};

export default Task;
