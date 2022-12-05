import React from 'react';
import styles from './Footer.module.scss';
import rss from '../../assets/icons/rss.svg';
import github from '../../assets/icons/github.svg';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className={styles.wrapper}>
        <div className={styles.footer}>
          <a
            className={styles['footer__rss-link']}
            href="https://rs.school/js/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={rss} alt="rss logo" className={styles['rs-logo']} />
          </a>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/alexOm98"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>{t('footer.alex')}</span>
          </a>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/OrangeJazz"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>{t('footer.maria')}</span>
          </a>
          <a
            className={styles['footer__github-link']}
            href="https://github.com/Lneer"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github logo" />
            <span>{t('footer.aleksei')}</span>
          </a>
        </div>
        <div className={styles.footer__copyrigth}>© 2022 RS School. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
export default Footer;
