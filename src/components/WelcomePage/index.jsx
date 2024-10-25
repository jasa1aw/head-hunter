'use client'
import { useState } from 'react'
import Applicant from './Applicant';
import Employer from './Employer'
import styles from './Welcome.module.css'
export default function WelcomePage() {
	const [activePage, setActivePage] = useState('applicant');
	const switchPage = (page) =>{
		setActivePage(page);
	}
	return (
		<div className={styles.mainPageContainer}>
			<header className={styles.topHeader}>
				<div className="container">
					<div className={styles.topHeaderIn}>
						<span>Казахстан</span>
						<div className={styles.switchPageLink}>
							<button
								className={activePage === 'applicant' ? '' : styles.pageInactive}
								onClick={() => switchPage('applicant')}
							>
								Соискателям
							</button>
							<button
								className={activePage === 'employer' ? '' : styles.pageInactive}
								onClick={() => switchPage('employer')}
							>
								Работодателям
							</button>
						</div>
					</div>
				</div>
			</header>
			{activePage === 'applicant' && <Applicant onSwitchPage={switchPage}/>}
			{activePage === 'employer' && <Employer />}
		</div>
	)
}
