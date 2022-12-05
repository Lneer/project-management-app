import { Button, Dropdown } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogOut } from 'store/authSlice';
import { useTranslation } from 'react-i18next';
import downIcon from '../../assets/icons/down.svg';
import { createUserBoard } from 'store/sliceBoards';
import { IBoard } from 'interfaces/interface';
import { ModalAddBoard } from 'components';

const BurgerMenu = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const itemsLoggedIn = [
    {
      label: <NavLink to={'/boards'}>{t('header.boards')}</NavLink>,
      key: 'item-1',
    },
    {
      label: <NavLink to={'/profile'}>{t('header.edit')}</NavLink>,
      key: 'item-2',
    },
    {
      label: (
        <Button
          onClick={() => {
            navigate('/');
            dispatch(handleLogOut());
          }}
        >
          {t('header.signout')}
        </Button>
      ),
      key: 'item-3',
    },
    {
      label: (
        <Button
          type="primary"
          onClick={() => {
            navigate('/boards');
            showModal();
          }}
        >
          {t('header.create')}
        </Button>
      ),
      key: 'item-4',
    },
  ];
  const itemsNotLoggedIn = [
    {
      label: (
        <Button type="default" onClick={() => navigate('/signin')}>
          {t('header.signin')}
        </Button>
      ),
      key: 'item-5',
    },
    {
      label: (
        <Button type="primary" onClick={() => navigate('/signup')}>
          {t('header.signoup')}
        </Button>
      ),
      key: 'item-6',
    },
  ];
  const items = isLoggedIn ? itemsLoggedIn : itemsNotLoggedIn;

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (data?: IBoard) => {
    if (!data) return;
    await dispatch(createUserBoard(data));
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <img src={downIcon} />
        </a>
      </Dropdown>
      <ModalAddBoard isOpen={open} onOk={handleOk} onCancel={handleCancel} />
    </>
  );
};

export default BurgerMenu;
