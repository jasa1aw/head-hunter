'use client'
import Header from '@/components/header'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
export default function CreateResume() {
  axios.get(`${END_POINT}/api/region/cities`).then(res => {
    console.log(res);
  })

  return (
    <main>
        <Header/>
        <div className='container ptb-7'>
            <h1>Ваше резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder={'Введите имя'} type='text' label="Имя" size="fieldset-md"/>
            <Input placeholder={'Введите фамилию'} type='text' label="Фамилия" size="fieldset-md"/>
            <Input placeholder={'+7'} type='text' label="Мобильный телефон" size="fieldset-md"/>
            <Input placeholder={''} type='text' label="Город проживание" size="fieldset-md"/>
        </div>
    </main>
  )
}
