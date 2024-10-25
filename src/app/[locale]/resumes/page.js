'use client'
import Header from '@/components/header';
import MyResumes from '@/components/myresumes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumes } from '@/app/[locale]/store/slices/resumeSlice';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
  const t = useTranslations('Header')
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);
  console.log(resumes);
  const didMount = () => {
    dispatch(getMyResumes())
  }
  useEffect(didMount, [])


  return (
    <div className='wrapper'>
      <Header/>
        <main>
            <div className='container'>
                <Search/>
                <div className='flex flex-ai-c flex-jc-sb ptb7'>
                    <h1>{t("resumes")}</h1>
                    <Link href={'/create-resume'} className='button button-secondary-bordered'>{t('createResume')}</Link>
                </div>
                <MyResumes resumes={resumes}/>
            </div>
        </main>
      <Footer/>
    </div>
  )
}
