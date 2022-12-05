import React from 'react';
import styles from './AboutUs.module.scss';
import { MainCard } from 'components';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.about}>
      <div className={styles.about__container}>
        <h3 className={styles.about__heading}>{t('about.main')}</h3>
        <div className={styles.about__cards}>
          <MainCard
            type="about"
            title={t('about.title1')}
            subtitle={t('about.subtitle1')}
            text={t('about.text1')}
            img="about1.jpg"
          />
          <MainCard
            type="about"
            title={t('about.title2')}
            subtitle={t('about.subtitle2')}
            text={t('about.text2')}
            img="about2.jpg"
          />
          <MainCard
            type="about"
            title={t('about.title3')}
            subtitle={t('about.subtitle3')}
            text={t('about.text3')}
            img="about3.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
