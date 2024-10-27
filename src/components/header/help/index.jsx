import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import styles from './help.module.css';

export default function Help({ disabled, setDisable }) {
    const t = useTranslations();

    return (
        <>
            {disabled && <section className={styles.helpBg}>
                <div className={styles.help}>
                    <h3>{t('help.needHelp')}</h3>
                    <span>{t('help.askOrFindAnswer')}</span>
                    <Link href={'/ticket'} className={styles.itemsHelp} onClick={() => setDisable(false)}>
                        <img src="/img/question.svg" alt="" />
                        <p>{t('help.findAnswer')}</p>
                    </Link>
                    <Link href={'/ticket'} className={styles.itemsHelp} onClick={() => setDisable(false)}>
                        <img src="/img/at.svg" alt="" />
                        <p>{t('help.sendEmail')}</p>
                    </Link>
                    <div className={styles.bottomHelp}>
                        <h5>{t('help.callUs')}</h5>
                        <span>+7 747 031 96 45</span>
                    </div>
                    <span className={styles.cancel} onClick={() => setDisable(false)}>&#10006;</span>
                </div>
            </section>}
        </>
    );
}
