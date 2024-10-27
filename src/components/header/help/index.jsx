import styles from './help.module.css'
export default function Help ( {disabled, setDisable} ) {
    return (
        <>
            {disabled && <section className={styles.helpBg}>
                <div className={styles.help}>
                    <h3>Need help?</h3>
                    <span>You can ask or find the answer yourself</span>
                    <div className={styles.itemsHelp}>
                        <img src="/img/question.svg" alt="" />
                        <p>Find an answer</p>
                    </div>
                    <div className={styles.itemsHelp}>
                        <img src="/img/at.svg" alt="" />
                        <p>Send an email</p>
                    </div>
                    <div className={styles.bottomHelp}>
                        <h5>Call us</h5>
                        <span>+7 747 031 96 45</span>
                    </div>
                    <span className={styles.cancel} onClick={() => setDisable(false)}>&#10006;</span>
                </div>
            </section>}
        </>
    )
}