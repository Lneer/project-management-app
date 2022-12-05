import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import styles from './StartBtn.module.scss';

interface StartBtnProps {
  title: string;
  type: string;
  link: string;
  anchor?: boolean;
}

const StartBtn: React.FC<StartBtnProps> = ({ title, type, link, anchor }) => {
  return anchor ? (
    <Link smooth to={link} className={styles[`start-btn__${type}`]}>
      {title}
    </Link>
  ) : (
    <NavLink to={link} className={styles[`start-btn__${type}`]}>
      {title}
    </NavLink>
  );
};

export default StartBtn;
