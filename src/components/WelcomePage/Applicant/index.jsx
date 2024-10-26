'use client'
import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import styles from './Applicant.module.css';
import Cards from './ui/Cards';
import Search from '@/components/header/search';

export default function Applicant({ onSwitchPage }) {
  const t = useTranslations('ApplicantMain');
  
  const cardsData = [
    {
      brColor: '#ff9f8f', 
      title: t('jobOfTheDay'), 
      amountStart: '210 000', 
      amountEnd: '650 000', 
      allVacancy: '14'
    },
    {
      brColor: '#ff9f8f', 
      title: t('companyOfTheDay'), 
      allVacancy: '237'
    },
    {
      brColor: '#ff9f8f', 
      title: t('workFromHome'),
      allVacancy: '1704'
    },
    {
      brColor: '#ff9f8f', 
      title: t('partTimeJob'), 
      amountStart: '200', 
      amountEnd: '508 400', 
      allVacancy: '168'
    },
    {
      brColor: '#f9e19366', 
      title: t('courier'), 
      amountStart: '7 900', 
      amountEnd: '552 400', 
      allVacancy: '45'
    },
    {
      brColor: '#e0f6e566', 
      title: t('driver'), 
      amountStart: '49 900', 
      amountEnd: '1 100 700', 
      allVacancy: '155'
    },
    {
      brColor: '#d1e4fe66', 
      title: t('seller'), 
      amountStart: '59 900', 
      amountEnd: '596 200', 
      allVacancy: '149'
    },
    {
      brColor: '#dbcdff66', 
      title: t('cashier'), 
      amountStart: '59 900', 
      amountEnd: '305 700', 
      allVacancy: '95'
    },
    {
      brColor: '#dbcdff66', 
      title: t('administrator'), 
      amountStart: '14 000', 
      amountEnd: '471 600', 
      allVacancy: '104'
    },
    {
      brColor: '#ffddbb66',
      title: t('operator'), 
      amountStart: '80 000', 
      amountEnd: '449 100', 
      allVacancy: '159'
    },
    {
      brColor: '#f9e19366', 
      title: t('programmer'), 
      amountStart: '117 900', 
      amountEnd: '567 200', 
      allVacancy: '55'
    },
    {
      brColor: '#e0f6e566',
      title: t('manager'), 
      amountStart: '117 900', 
      amountEnd: '852 500', 
      allVacancy: '494'
    },
  ];

  return (
    <div className={styles.applicantContainer}>
      <div className={styles.searchContain}>
        <Header bgColor={'transparent'} textColor={'#fff'} />
        <div className={styles.searchPanel}>
          <h1>{t('findDreamJob')}</h1>
          <Search size={'medium'} disabled />
          <button className={styles.btnLink} onClick={() => onSwitchPage('employer')}>{t('imLookingForEmployee')}</button>
        </div>
      </div>
      <div className="containerInner">
        <div className={styles.offerJob}>
          <div className={styles.offerJobLeft}>
            <img src="/img/logo.svg" alt="logo" />
            <p>{t('emailPrompt')}</p>
          </div>
          <div className={styles.offerJobRight}>
            <div className={styles.offerJobField}>
              <input type="text" placeholder={t('emailPlaceholder')} />
              <button>{t('continue')}</button>
            </div>
            <p>{t('termsAgreement')}</p>
          </div>
        </div>
        <div className={styles.mainCardsContain}>
          {cardsData.map((item, index) => <Cards data={item} key={index} />)}
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
