'use client'
import Header from '@/components/header';
import MyResumes from '@/components/myresumes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumes } from '@/app/store/slices/resumeSlice';
import Link from 'next/link';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
export default function ResumePage() {
  
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
                    <h1>Мои резюме</h1>
                    <Link href={'/create-resume'} className='button button-secondary-bordered'>Создать резюме</Link>
                </div>
                <MyResumes resumes={resumes}/>
            </div>
        </main>
      <Footer/>
    </div>
  )
}
