import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NewBoardCard.module.scss';

interface NewBoardCardProps {
  onClick: () => void;
}

const NewBoardCard: React.FC<NewBoardCardProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div className={styles['new-card__container']} onClick={onClick}>
      <h3 className={styles['new-card__heading']}>{t('boards.addbtn')}</h3>
      <div className={styles['new-card__add-btn']}>&nbsp;</div>
    </div>
  );
};

export default NewBoardCard;
