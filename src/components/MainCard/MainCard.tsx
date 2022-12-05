import React from 'react';
import styles from './MainCard.module.scss';

interface MainCardProps {
  type: 'features' | 'about';
  title: string;
  subtitle?: string | null;
  text: string;
  img: string;
}

const MainCard: React.FC<MainCardProps> = ({ type, title, subtitle, text, img }) => {
  return (
    <div className={styles[`card__${type}`]}>
      <div className={styles[`card-img-container__${type}`]}>
        <img src={img} alt={`${title} image`} className={styles[`card-img__${type}`]} />
      </div>
      <div className={styles[`card-content__${type}`]}>
        <h4 className={styles[`card-header__${type}`]}>{title}</h4>
        {subtitle && <h6 className={styles[`card-subtitle__${type}`]}>{subtitle}</h6>}
        <p className={styles[`card-text__${type}`]}>{text}</p>
      </div>
    </div>
  );
};

export default MainCard;
