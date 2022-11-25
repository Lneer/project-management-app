import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import HeaderButtons from 'components/HeaderButtons/HeaderButtons';
import { useAppSelector } from 'hooks';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
            <img src="./assets/icons/logo.svg" alt="logo" />
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
                <Modal
                  title="Title"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
              </>
            )}
          </nav>
        </div>
        <HeaderButtons />
      </div>
    </header>
  );
};
export default Header;
