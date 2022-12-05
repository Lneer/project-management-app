import React from 'react';
import styles from './Features.module.scss';
import { MainCard, StartBtn } from 'components';
import features1 from '../../assets/img/features1.svg';
import features2 from '../../assets/img/features2.svg';
import features3 from '../../assets/img/features3.svg';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <h3 className={styles.features__heading} id="features">
          {t('features.maintitle')}
        </h3>
        <div className={styles.features__cards}>
          <MainCard
            type="features"
            title={t('features.title1')}
            text={t('features.text1')}
            img={features1}
          />
          <MainCard
            type="features"
            title={t('features.title2')}
            text={t('features.text2')}
            img={features2}
          />
          <MainCard
            type="features"
            title={t('features.title3')}
            text={t('features.text3')}
            img={features3}
          />
        </div>
        <StartBtn title={t('hero.btn1')} link="/signin" type="primary" />
      </div>
    </section>
  );
};

export default Features;
