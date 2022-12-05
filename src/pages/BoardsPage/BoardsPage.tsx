import { BoardsContainer, SearchBar } from 'components';
import React, { useEffect, useState } from 'react';
import styles from './BoardsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserBoards } from '../../store/sliceBoards';
import { useTranslation } from 'react-i18next';

const BoardsPage = () => {
  const boardsState = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const [filteredBoards, setFilteredBoards] = useState([...boardsState.boards]);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUserBoards());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBoards([...boardsState.boards]);
  }, [boardsState.boards]);

  const searchValue = (value: string) => {
    if (!value) {
      setFilteredBoards([...boardsState.boards]);
      return;
    }
    const filteredBoards = boardsState.boards.filter((el) => el.title.includes(value));
    setFilteredBoards(filteredBoards);
  };

  return (
    <main className={styles['boards__wrapper']}>
      <div className={styles['boards__content']}>
        <h2 className={styles['boards__heading']}>{t('boardPage.title')}</h2>
        <SearchBar searchValue={searchValue} />
        <BoardsContainer boards={filteredBoards} />
      </div>
    </main>
  );
};

export default BoardsPage;
