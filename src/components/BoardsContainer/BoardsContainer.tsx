import React from 'react';
import { BoardCard, ModalBoard } from 'components';
import styles from './BoardsContainer.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { createUserBoard, deleteBoardFetch, editUserBoard } from '../../store/sliceBoards';
import { IBoard } from '../../interfaces/interface';

interface BoardsContainerProps {
  boards: IBoard[];
}

const BoardsContainer: React.FC<BoardsContainerProps> = ({ boards }) => {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const deleteBoardHandler = async (board: IBoard) => {
    await dispatch(deleteBoardFetch(board));
  };

  const fetchNewBoard = async (board: IBoard) => {
    await dispatch(createUserBoard(board));
  };
  const editBoard = (board: IBoard) => {
    dispatch(editUserBoard(board));
  };

  return (
    <div className={styles['boards-container']}>
      {boards.map((el) => (
        <BoardCard
          key={el._id}
          board={el}
          onCloseClick={deleteBoardHandler}
          onEditClick={editBoard}
          userID={authState.id}
        />
      ))}
      <ModalBoard user={authState.id} addBoard={fetchNewBoard} type="new" />
    </div>
  );
};

export default BoardsContainer;
