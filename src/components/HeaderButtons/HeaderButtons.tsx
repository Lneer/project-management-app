import React from 'react';
import { Button } from 'antd';
import styles from './HeaderButtons.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleLogOut } from 'store/authSlice';
import { Select, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';
import langIcon from '../../assets/icons/language.svg';

export const handleChangeLang = (value: string) => {
  localStorage.setItem('lang', value);
  i18n.changeLanguage(value.toLocaleLowerCase());
};

const HeaderButtons = () => {
  const dispath = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { Option } = Select;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const storageLang = localStorage.getItem('lang') || 'EN';
  return (
    <div className={styles['btns-wrapper']}>
      <div className={styles.btns}>
        <Spin
          spinning={loading!}
          size="large"
          style={{
            position: 'fixed',
            top: '44%',
            left: '53%',
            zIndex: '100',
            transform: 'translate(-50%,-50%)',
          }}
        />
        {isLoggedIn ? (
          <>
            <Button onClick={() => navigate('/profile')} type="default">
              {t('header.edit')}
            </Button>
            <Button
              onClick={() => {
                navigate('/');
                dispath(handleLogOut());
              }}
              type="primary"
            >
              {t('header.signout')}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate('/signin')} type="default">
              {t('header.signin')}
            </Button>
            <Button onClick={() => navigate('/signup')} type="primary">
              {t('header.signoup')}
            </Button>
          </>
        )}
      </div>
      <BurgerMenu />
      <Select
        defaultValue={storageLang}
        onChange={handleChangeLang}
        suffixIcon={<img src={langIcon} />}
        style={{ width: '70px', margin: 'auto 0' }}
      >
        <Option value="EN">EN</Option>
        <Option value="RU">РУ</Option>
      </Select>
    </div>
  );
};
export default HeaderButtons;
