import ModalColumn from 'components/ModalColumn/ModalColumn';
import { IColumnData } from 'interfaces/interface';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAddColumn } from 'store/columnDataSlice';
import getMaxOrder from 'utils/getMaxOrder';
import styles from './ColumnAddButton.module.scss';

interface IColumnAddButtonProps {
  onClick?: (query: IAddColumn) => void;
  state?: IColumnData[];
  boardId?: string;
}

const ColumnAddButton: React.FC<IColumnAddButtonProps> = ({ state = [], onClick = () => {} }) => {
  const [isVisibleModal, setIsVisilbeModal] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>('');
  const { id } = useParams();

  const onClickHandler = () => {
    setIsVisilbeModal(true);
  };

  const onCancel = () => {
    setIsVisilbeModal(false);
  };

  const onCreateColumnHandler = () => {
    if (!columnTitle || !id) {
      return;
    }
    const query = {
      title: columnTitle,
      order: (getMaxOrder(state) ?? 0) + 1,
      boardID: id,
    };
    onClick(query);
    onCancel();
  };

  return (
    <>
      <ModalColumn
        isVisible={isVisibleModal}
        onCancel={onCancel}
        onOk={onCreateColumnHandler}
        onValueChange={setColumnTitle}
      />
      <div className={styles['column-add-button']} onClick={onClickHandler} />
    </>
  );
};

export default ColumnAddButton;
