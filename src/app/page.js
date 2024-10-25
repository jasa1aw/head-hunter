// 'use client';
// import Header from '@/components/header';
// import { useEffect } from 'react';
// import {useSelector} from 'react-redux';
// import { useRouter } from 'next/navigation';
import WelcomePage from '@/components/WelcomePage'


export default function Home() {
  // const isAuth = useSelector((state) => state.auth.isAuth)
  // const router = useRouter()
  // useEffect(() => {
  //   if(isAuth) router.push("/resumes")
  // },[isAuth])
  return (
    <div>
      <WelcomePage/>
        {/* <Header bgColor={'#000'}/> */}

    </div>
  )
}
