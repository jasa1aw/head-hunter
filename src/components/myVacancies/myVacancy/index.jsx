'use client'
import { Link } from '@/i18n/routing';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVacancy } from '@/app/[locale]/store/slices/vacancySlice';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';
import { useTranslations } from 'next-intl';

export default function MyVacancy({item}) {
    const dispatch = useDispatch();
    const t = useTranslations('CreateResume.Myresumes')
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div className="card mtb-2">
            <Link href={`/vacancy/${item.id}`} className="h3 link"> {item.name} </Link>
            <p>{item.salary_from && `от ${item.salary_from}`} {item.salary_to&& `до ${item.salary_to}`} {item.salary_type}</p>
            <p>{t("Created")} {formatDate(item.createdAt)}</p>
            {currentUser && currentUser.id === item.userId && <span className="deleteResume" onClick={() => {dispatch(deleteVacancy(item.id))}}>{t("delete")}</span>}
        </div>
    )
}