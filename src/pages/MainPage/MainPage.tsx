import { AboutUs, Features, Hero } from 'components';
import React from 'react';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <main className={styles.maindsds}>
      <Hero />
      <Features />
      <AboutUs />
    </main>
  );
};

export default MainPage;
