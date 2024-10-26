'use client'
import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import styles from './Employer.module.css';
import Search from '@/components/header/search';

export default function Employer() {
  const t = useTranslations('Employer');

  return (
    <div className={styles.applicantContainer}>
      <div className={styles.sendVacancyContain}>
        <Header bgColor={'transparent'} textColor={'#000'} />
        <div className={styles.vacancyMain}>
          <h1>{t('postJobTitle')}</h1>
          <p>
            {t('postJobDescription')}
          </p>
          <button className="button">{t('postJobButton')}</button>
          <span>
            {t('disclaimer')}
          </span>
        </div>
      </div>
      <div className={styles.staffSearch}>
        <h1>{t('findEmployeesTitle')}</h1>
        <p>
          {t('findEmployeesDescription')}
        </p>
        <Search disabled size={'large'}/>
        <div className={styles.oftenSearch}>
          <p>{t('oftenSearched')} </p>
          <span style={{ backgroundColor: '#e0f6e5' }}>{t('administrator')}</span>
          <span style={{ backgroundColor: '#d1e4fe' }}>{t('welder')}</span>
          <span style={{ backgroundColor: '#dbcdff' }}>{t('manager')}</span>
        </div>
      </div>
    </div>
  );
}
