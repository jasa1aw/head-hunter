'use client';
import styles from './Cards.module.css'
export default function Cards({data}) {
	return (
		<div className={styles.mainCard} style={{borderColor: `${data.brColor}`}}>
			<div className={styles.cardTop}>
				<h4>{data.title}</h4>
				{data.amountStart || data.amountEnd ? <span>{`${data.amountStart} - ${data.amountEnd} ₸`}</span> : <></>}
			</div>
			<span>{`${data.allVacancy} вакансий`}</span>
		</div>
	)
}
