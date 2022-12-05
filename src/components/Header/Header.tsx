import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import HeaderButtons from 'components/HeaderButtons/HeaderButtons';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import logoIcon from '../../assets/icons/logo.svg';
import { ModalAddBoard } from 'components';
import { createUserBoard } from 'store/sliceBoards';
import { IBoard } from 'interfaces/interface';

const Header = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const dispatch = useAppDispatch();

  const handleOk = async (data?: IBoard) => {
    if (!data) return;
    await dispatch(createUserBoard(data));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const checkSrolling = () => {
    if (window.scrollY < 73) {
      return setIsScrolling(false);
    } else if (window.scrollY > 70) {
      return setIsScrolling(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkSrolling);
    return () => window.removeEventListener('scroll', checkSrolling);
  }, []);

  return (
    <header className={`${isScrolling ? `${styles['scroll-header']}` : ''} ${styles.container} `}>
      <div className={styles.header}>
        <div className={styles['nav-wrapper']}>
          <NavLink to="/">
            <img src={logoIcon} alt="logo" />
          </NavLink>
          <nav className={styles.nav}>
            {isLoggedIn && (
              <>
                <Button onClick={() => navigate('/boards')} type="default">
                  {t('header.boards')}
                </Button>
                <Button type="primary" style={{ width: '180px' }} onClick={showModal}>
                  {t('header.create')}
                </Button>
              </>
            )}
          </nav>
        </div>
        <HeaderButtons />
      </div>
      <ModalAddBoard isOpen={open} onOk={handleOk} onCancel={handleCancel} />
    </header>
  );
};
export default Header;
