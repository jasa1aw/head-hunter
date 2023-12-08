'use client'
import Header from '@/components/header'
import Input from '@/components/input'
import { END_POINT } from '@/config/end-point'
import axios from 'axios'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import { useEffect, useState } from 'react'

export default function CreateResume() {
  const [cities, setCities] = useState([])
  useEffect(() => {
      console.log('didMount');
      axios.get(`${END_POINT}/api/region/cities`).then(res => {
        setCities(res.data);
      })
  }, [])

  console.log('rerender');
  const onSelect = (data) =>{
    console.log('onselect', data)
  }

  return (
    <main>
        <Header/>
        <div className='container ptb-7'>
            <h1>Ваше резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder={'Введите имя'} type='text' label="Имя" size="fieldset-md"/>
            <Input placeholder={'Введите фамилию'} type='text' label="Фамилия" size="fieldset-md"/>
            <Input placeholder={'+7'} type='text' label="Мобильный телефон" size="fieldset-md"/>
            <AutoCompliteSelect placeholder={''} type='text' label="Город проживание" size="fieldset-md" items={cities} onSelect={onSelect}/>
        </div>
    </main>
  )
}
