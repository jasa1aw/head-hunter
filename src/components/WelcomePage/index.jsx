'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl';
import Applicant from './Applicant';
import Employer from './Employer'
import styles from './Welcome.module.css'
import Footer from '../footer';

export default function WelcomePage() {
  const t = useTranslations('WelcomePage');
  const [activePage, setActivePage] = useState('applicant');

  const switchPage = (page) => {
    setActivePage(page);
  }

  return (
    <div className={styles.mainPageContainer}>
      <header className={styles.topHeader}>
        <div className="container">
          <div className={styles.topHeaderIn}>
            <span>{t('kazakhstan')}</span>
            <div className={styles.switchPageLink}>
              <button
                className={activePage === 'applicant' ? '' : styles.pageInactive}
                onClick={() => switchPage('applicant')}
              >
                {t('applicants')}
              </button>
              <button
                className={activePage === 'employer' ? '' : styles.pageInactive}
                onClick={() => switchPage('employer')}
              >
                {t('employers')}
              </button>
            </div>
          </div>
        </div>
      </header>
      {activePage === 'applicant' && <Applicant onSwitchPage={switchPage}/>}
      {activePage === 'employer' && <Employer />}
      <Footer/>
    </div>
  )
}
