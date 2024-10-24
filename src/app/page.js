'use client'
import Header from '@/components/header';
import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import Search from '@/components/header/search';

export default function Home() {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const router = useRouter()
  useEffect(() => {
    if(isAuth) router.push("/resumes")
  },[isAuth])
  return (
    <div className='wrapper'>
      <Header/>
      <main>
        <Search/>
      </main>
      <Footer/>
    </div>
  )
}
