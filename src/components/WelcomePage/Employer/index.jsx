'use client'
import Header from '@/components/header'
import styles from './Employer.module.css'

export default function Employer() {
	return (
		<div className={styles.applicantContainer}>
			<div className={styles.sendVacancyContain}>
				<Header bgColor={'transparent'} textColor={'#000'}/>
				<div className={styles.vacancyMain}>
					<h1>Разместите <br /> вакансию на hh.kz</h1>
					<p>
						И находите сотрудников среди тех, кто хочет у вас работать. <br />
						hh.kz — сервис №1 по поиску сотрудников в Казахстане*
					</p>
					<button className="button">Разместить вакансию</button>
					<span>
						* По посещаемости за 31 день среди сайтов по поиску работы и персонала,<br />
						по данным SimilarWeb по РК на 15.08.2023 г.
					</span>
				</div>
			</div>
			<div className={styles.staffSearch}>
				<h1>Какие сотрудники <br /> есть на hh.kz?</h1>
				<p>
					Не ждите откликов — найдите идеального сотрудника сами <br /> 
					среди 5 890 557 резюме у 4 234 974 соискателей
				</p>
				<div className={styles.staffSearchField}>
					<input type="text" placeholder='Поиск по резюме'/>
					<button className="button">Найти сотрудника</button>
				</div>
				<div className={styles.oftenSearch}>
					<p>Часто ищут резюме: </p>
					<span style={{backgroundColor: '#e0f6e5'}}>Администратор</span>
					<span style={{backgroundColor: '#d1e4fe'}}>Сварщик</span>
					<span style={{backgroundColor: '#dbcdff'}}>Начальник</span>
				</div>
				
			</div>
			
		</div>
	)
}
