'use client'
import Header from '@/components/header'
import styles from './Applicant.module.css'
import Cards from './ui/Cards'

export default function Applicant({onSwitchPage}) {
	const cardsData = [
		{
			brColor: '#ff9f8f', 
			title: 'Вакансия дня', 
			amountStart: '210 000', 
			amountEnd: '650 000', 
			allVacancy: '14'
		},
		{
			brColor: '#ff9f8f', 
			title: 'Компания дня', 
			allVacancy: '237'
		},
		{
			brColor: '#ff9f8f', 
			title: 'Работа из дома',
			allVacancy: '1704'
		},
		{
			brColor: '#ff9f8f', 
			title: 'Подработка', 
			amountStart: '200', 
			amountEnd: '508 400', 
			allVacancy: '168'
		},
		{
			brColor: '#f9e19366', 
			title: 'Курьер', 
			amountStart: '7 900', 
			amountEnd: '552 400', 
			allVacancy: '45'
		},
		{
			brColor: '#e0f6e566', 
			title: 'Водитель', 
			amountStart: '49 900', 
			amountEnd: '1 100 700', 
			allVacancy: '155'
		},
		{
			brColor: '#d1e4fe66', 
			title: 'Продавец', 
			amountStart: '59 900', 
			amountEnd: '596 200', 
			allVacancy: '149'
		},
		{
			brColor: '#dbcdff66', 
			title: 'Кассир', 
			amountStart: '59 900', 
			amountEnd: '305 700', 
			allVacancy: '95'
		},
		{
			brColor: '#dbcdff66', 
			title: 'Администратор', 
			amountStart: '14 000', 
			amountEnd: '471 600', 
			allVacancy: '104'
		},
		{
			brColor: '#ffddbb66',
			title: 'Оператор', 
			amountStart: '80 000', 
			amountEnd: '449 100', 
			allVacancy: '159'
		},
		{
			brColor: '#f9e19366', 
			title: 'Программист', 
			amountStart: '117 900', 
			amountEnd: '567 200', 
			allVacancy: '55'
		},
		{
			brColor: '#e0f6e566',
			title: 'Менеджер', 
			amountStart: '117 900', 
			amountEnd: '852 500', 
			allVacancy: '494'
		},
	]
	return (
		<div className={styles.applicantContainer}>
			<div className={styles.searchContain}>
				<Header bgColor={'transparent'} textColor={'#fff'}/>
				<div className={styles.searchPanel}>
					<h1>Найди работу мечты</h1>
					<div className={styles.searchField}>
						<div className={styles.inputField}>
							<img src="/img/search.svg" alt="icon" />
							<input type="text" placeholder='Профессия, должность или компания' />
						</div>
						<button className="button searchBtn">Найти</button>
					</div>
					<button className={styles.btnLink} onClick={() => onSwitchPage('employer')}>Я ищу сотрудника</button>
				</div>
			</div>
			<div className="containerInner">
				<div className={styles.offerJob}>
					<div className={styles.offerJobLeft}>
						<img src="/img/logo.svg" alt="logo" />
						<p>Напишите адрес электронной почты, чтобы работодатели могли предложить вам работу</p>
					</div>
					<div className={styles.offerJobRight}>
						<div className={styles.offerJobField}>
							<input type="text" placeholder='Электронная почта'/>
							<button>Продолжить</button>
						</div>
						<p>
							Нажимая «Продолжить», вы подтверждаете, что ознакомлены <br />, полностью согласны и принимаете условия 
							«<span>Соглашения об оказании услуг по содействию в трудоустройстве (оферта)</span>»
						</p>
					</div>
				</div>
				<div className={styles.mainCardsContain}>
					{cardsData.map((item, index) => <Cards data={item} key={index}/>)}
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	)
}
