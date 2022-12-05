import React from 'react';
import { IBoard } from '../../interfaces/interface';
import styles from './BoardCard.module.scss';
import ModalConfirm from 'components/ModalConfirm/ModalConfirm';
import { NavLink } from 'react-router-dom';
import { ModalBoard } from 'components';

interface BoardCardProps {
  board: IBoard;
  userID: string;
  onCloseClick: (board: IBoard) => void;
  onEditClick: (board: IBoard) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, userID, onCloseClick, onEditClick }) => {
  const getTitle = (fetchedTitle: string) => {
    const title = fetchedTitle.slice(0, fetchedTitle.indexOf('|'));
    return title.length > 5 ? `${title.slice(0, 5)}...` : title;
  };

  const getDescription = (fetchedTitle: string) => {
    const description = fetchedTitle.slice(fetchedTitle.indexOf('|') + 1, -1);
    return description.length > 70 ? `${description.slice(0, 70)}...` : description;
  };

  return (
    <div className={styles['board-card__container']}>
      <div className={styles['board-card__content']}>
        <NavLink to={board._id || ''} className={styles['board-card__heading']}>
          {getTitle(board.title)}
        </NavLink>
        <ModalBoard
          user={userID}
          editBoard={onEditClick}
          type="edit"
          title={getTitle(board.title)}
          description={getDescription(board.title)}
          board={board}
        />
        <p className={styles['board-card__text']}>{`${getDescription(board.title)}`}</p>
      </div>
      <div className={styles['board-card__img']}></div>
      <ModalConfirm element="board-card" confirmHandler={() => onCloseClick(board)} />
    </div>
  );
};

export default BoardCard;
