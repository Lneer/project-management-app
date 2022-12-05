import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IFormData } from 'interfaces/interface';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { handleDeleteAcc, handleUpdateAcc } from 'store/authSlice';
import avatar from '../../assets/icons/avatar.svg';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.auth.login);
  const name = useAppSelector((state) => state.auth.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(handleDeleteAcc());
    setIsModalOpen(false);
    navigate('/');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (formData: IFormData) => {
    dispatch(handleUpdateAcc(formData));
    form.resetFields();
  };
  return (
    <main className={styles.container}>
      <div className={styles['wrapper-card']}>
        <div className={styles.card}>
          <img src={avatar} alt="avatar" />
        </div>
        <Button htmlType="button" type="primary" danger onClick={showModal}>
          {t('sign.delete')}
        </Button>
        <Modal
          title={t('popapBtn.warning')}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{t('confirmPopap.confirmMessage')}</p>
        </Modal>
      </div>
      <Form
        form={form}
        labelAlign="left"
        name="basic"
        style={{ width: '300px', marginTop: '4rem' }}
        labelCol={{ span: 7 }}
        autoComplete={'nope'}
        onFinish={onFinish}
      >
        <Form.Item
          label={t('sign.name')}
          name="name"
          initialValue={name}
          rules={[{ required: true, message: t('errors.empty')! }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('sign.login')}
          initialValue={login}
          name="login"
          rules={[
            { required: true, message: t('errors.empty')! },
            { min: 4, message: t('errors.login')! },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('sign.pass')}
          name="password"
          rules={[
            { required: true, message: t('errors.empty')! },
            { min: 6, message: t('errors.pass')! },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '200px', margin: '1rem 50px 0 50px' }}
          >
            {t('sign.edit')}
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default ProfilePage;
