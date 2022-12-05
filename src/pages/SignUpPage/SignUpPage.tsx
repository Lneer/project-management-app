import React from 'react';
import styles from './SignUpPage.module.scss';
import { Button, Form, Input, Spin } from 'antd';
import { IFormData } from 'interfaces/interface';
import { useAppDispatch, useAppSelector } from 'hooks';
import { handleSingUp } from 'store/authSlice';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SingUpPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const onFinish = (formData: IFormData) => {
    dispatch(handleSingUp(formData));
    form.resetFields();
  };

  return (
    <main className={styles.container}>
      <h2>{t('sign.title2')}</h2>
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
      <Form
        form={form}
        labelAlign="left"
        name="basic"
        style={{ margin: '0 auto', width: '300px' }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t('sign.name')}
          name="name"
          rules={[{ required: true, message: t('errors.empty')! }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('sign.login')}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t('sign.btn')}
          </Button>
        </Form.Item>
      </Form>
      <NavLink to="/signin">{t('sign.already')}</NavLink>
    </main>
  );
};

export default SingUpPage;
