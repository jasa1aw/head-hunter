'use client'
import Header from '@/components/header';
import Input from '@/components/input';
import { END_POINT } from '@/config/end-point';
import axios from 'axios';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import SelectDate from '@/components/SelectDate';
import { useEffect, useState } from 'react';

export default function CreateResume() {
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  useEffect(() => {
      console.log('didMount');
      axios.get(`${END_POINT}/api/region/cities`).then(res => {
        setCities(res.data);
      })
      axios.get(`${END_POINT}/api/region/countries`).then(res => {
        setCountries(res.data);
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

            <h3>Основная информация</h3>

            <SelectDate size="fieldset-sm" label="Дата рождения"/>  

            <fieldset className={"fieldset fieldset-sm"} >
              <label>Пол</label>

              <div className='radio-group'>
                <div className="radio">
                  <input  type="radio" name="gender" id="g1" value={"Мужской"}/>
                  <label for="g1">Мужской</label>
                </div>
                <div className="radio">
                  <input  type="radio" name="gender" id="g2" value={"Женский"}/>
                  <label for="g2">Женский</label>
                </div>
              </div>
            </fieldset>

            <AutoCompliteSelect placeholder={''} type='text' label="Гражданство" size="fieldset-md" items={countries} onSelect={onSelect}/>

        </div>
    </main>
  )
}
