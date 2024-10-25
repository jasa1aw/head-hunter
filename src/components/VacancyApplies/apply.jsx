'use client';
import { useDispatch } from 'react-redux'
import {getAgeFromBirthday} from '@/app/[locale]/utils/format'
import { Link } from '@/i18n/routing';
import { acceptApply, declineApply } from '@/app/[locale]/store/slices/applySlice';
import { useTranslations } from 'next-intl';
export default function Apply ({item}) {
    const t = useTranslations('AppliesOfVacancy')
    const dispatch = useDispatch()
    const age = getAgeFromBirthday(item.resume.birthday)

    return (
        <div className="card">
            <Link className='link' href={`/resumes/${item.resume.id}`}>{item.resume.position}</Link>
            <p>{item.resume.first_name} {item.resume.last_name}, {t('age')}: {age}</p>
            <h3>{item.resume.salary} {item.resume.salary_type}</h3>
            <div className='flex'>
                {item.status !== "INVITATION" && <button className='button button-primary mr4' onClick={() => dispatch(acceptApply(item.id))}>{t('allow')}</button>}
                {item.status !== "DECLINED" &&<button className='button button-secondary' onClick={() => dispatch(declineApply(item.id))}>{t("refuse")}</button>}
            </div>
        </div>
    )
}