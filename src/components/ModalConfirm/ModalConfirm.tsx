import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './ModalConfirm.module.scss';
import { useTranslation } from 'react-i18next';

interface ModalConfirmProps {
  confirmHandler?: () => void;
  element: 'board-card' | 'column' | 'task';
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ confirmHandler = () => {}, element }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    confirmHandler();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles[`close-btn__${element}`]} onClick={showModal}>
        &nbsp;
      </div>
      <Modal
        title={t('popapBtn.warning')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t('popapBtn.Ok')}
        cancelText={t('popapBtn.Cancel')}
      >
        <p>{t('confirmPopap.confirmMessage')}</p>
      </Modal>
    </>
  );
};

export default ModalConfirm;
