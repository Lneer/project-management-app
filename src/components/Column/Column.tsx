import React, { useState } from 'react';
import styles from './Column.module.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IColumn, IColumnData } from 'interfaces/interface';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';
import ModalColumn from 'components/ModalColumn/ModalColumn';
import { useAppDispatch } from 'hooks';
import { editColumn } from 'store/columnDataSlice';
import { t } from 'i18next';

interface ColumnProps {
  column?: IColumnData;
  columnOrder: number;
  children?: React.ReactNode;
  addTaskButton: React.ReactNode;
  onClose?: () => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  children,
  columnOrder,
  addTaskButton,
  onClose,
}) => {
  const [isVisibleColumModal, setIsVisibleColumModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onOkHandler = (column?: IColumn) => {
    if (!column) return;
    dispatch(editColumn(column));
  };

  const openEditColumModal = () => {
    setIsVisibleColumModal(true);
  };

  const closeEditColumModal = () => {
    setIsVisibleColumModal(false);
  };

  if (!column) {
    return null;
  }

  return (
    <>
      <Draggable draggableId={column._id} index={columnOrder}>
        {(provided) => (
          <div
            className={styles['card-container']}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.column}>
              <div className={styles.column__header}>
                <ModalConfirm element="column" confirmHandler={onClose} />
                <div className={styles['column-header']}>
                  <h3>{column.title}</h3>
                  <div className={styles['column-btn-edit']} onClick={openEditColumModal} />
                </div>
              </div>
              <div>
                <Droppable droppableId={column._id} type="tasks">
                  {(provided) => (
                    <div
                      className={styles['task-container']}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {children}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {addTaskButton}
              </div>
              <div className={styles.column__footer} />
            </div>
          </div>
        )}
      </Draggable>
      <ModalColumn
        title={<h4>{t('columnPopap.editTitle')}</h4>}
        column={column}
        type="edit"
        isVisible={isVisibleColumModal}
        onCancel={closeEditColumModal}
        onOk={onOkHandler}
      />
    </>
  );
};

export default Column;
