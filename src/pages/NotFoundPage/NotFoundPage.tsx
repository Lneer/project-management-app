import React from 'react';
import styles from './NotFoundPage.module.scss';
import error from '../../assets/img/error.svg';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <main className={styles.container}>
      <img className={styles['error-img']} src={error} alt="error" />
      <Button style={{ width: '250px' }} onClick={() => navigate('/')} type="primary">
        {t('errors.pagebtn')}
      </Button>
    </main>
  );
};

export default NotFoundPage;
