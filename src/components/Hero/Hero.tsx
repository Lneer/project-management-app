import { StartBtn } from 'components';
import React from 'react';
import styles from './Hero.module.scss';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <h2 className={styles.hero__heading}>{t('hero.title')}</h2>
          <div className={styles.hero__text}>
            <p>{t('hero.desc1')}</p>
            <p>{t('hero.desc2')}</p>
          </div>
          <div className={styles.hero__buttons}>
            <StartBtn title={t('hero.btn1')} link="/signin" type="primary" />
            <StartBtn title={t('hero.btn2')} anchor={true} link="/#features" type="secondary" />
          </div>
        </div>
        <div className={styles.hero__img}></div>
      </div>
    </section>
  );
};

export default Hero;
