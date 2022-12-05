import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { NewBoardCard } from 'components';
import styles from './ModalBoard.module.scss';
import { IBoard } from 'interfaces/interface';
import TextArea from 'antd/es/input/TextArea';
import { t } from 'i18next';

interface ModalProps {
  addBoard?: (board: IBoard) => void;
  editBoard?: (board: IBoard) => void;
  user: string;
  type: 'new' | 'edit';
  title?: string;
  description?: string;
  board?: IBoard;
}

const ModalLayout: React.FC<ModalProps> = ({ addBoard, editBoard, board, type, user }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const cancelHandler = () => {
    setOpen(false);
  };

  const okHandler = (type: 'new' | 'edit') => {
    setConfirmLoading(true);
    if (type === 'new') {
      const newBoard: IBoard = {
        title: `${form.getFieldValue('title') || ''}|${form.getFieldValue('description') || ''}`,
        owner: user,
        users: [user],
      };
      addBoard && addBoard(newBoard);
      form.resetFields();
    }
    if (type === 'edit') {
      const title = `${form.getFieldValue('title') || ''}|${
        form.getFieldValue('description') || ''
      }`;
      const editedBoard = {
        ...board,
        title: title,
      };
      editBoard && editBoard(editedBoard);
    }
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      {type === 'new' && <NewBoardCard onClick={showModal} />}
      {type === 'edit' && <div className={styles['edit-btn']} onClick={showModal} />}
      <Modal
        title={type === 'new' ? t('boardPopap.createTitle') : t('boardPopap.editTitle')}
        open={open}
        onOk={form.submit}
        okButtonProps={{ htmlType: 'submit' }}
        confirmLoading={confirmLoading}
        onCancel={cancelHandler}
        centered={true}
        okText={t('popapBtn.Ok')}
        cancelText={t('popapBtn.Cancel')}
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          labelAlign={'right'}
          requiredMark={true}
          onFinish={() => okHandler(type)}
        >
          <Form.Item
            label={t('boardPopap.projectTitle')}
            name="title"
            rules={[
              { required: true, message: t('errors.empty')! },
              { min: 4, message: t('errors.login')! },
            ]}
            initialValue={board?.title.slice(0, board?.title.indexOf('|'))}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('boardPopap.projectDesc')}
            name="description"
            rules={[{ required: false }]}
            initialValue={board?.title.slice(board?.title.indexOf('|') + 1, -1)}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalLayout;
