import React from 'react';
import styles from './TaskAddButton.module.scss';

interface ITaskAddButtonProps {
  onClick?: () => void;
}

const TaskAddButton: React.FC<ITaskAddButtonProps> = ({ onClick = () => {} }) => {
  return (
    <button className={styles['create-button']} onClick={onClick}>
      <div className={styles['add-icon']} />
    </button>
  );
};

export default TaskAddButton;
