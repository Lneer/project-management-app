import { Card, Modal } from 'antd';
import { Column } from 'components';
import React, { useState } from 'react';
// import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const [tasks, setTask] = useState([1, 2, 3, 4, 5, 6]);
  return (
    <Modal open={true}>
      <Column title="task">
        {tasks.map((task) => (
          <Card key={task}>{task}</Card>
        ))}
      </Column>
    </Modal>
  );
};

export default NotFoundPage;
