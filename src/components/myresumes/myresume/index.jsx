'use client'
import { Link } from '@/i18n/routing';
import { useDispatch } from 'react-redux';
import { deleteResume } from '@/app/[locale]/store/slices/resumeSlice';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';

export default function MyResume({item}) {
    const t = useTranslations("CreateResume")
    const dispatch = useDispatch()
    return (
        <div className="card mtb-2">
            <Link href={`/resumes/${item.id}`} className="h3 link"> {item.position} </Link>
            <p> {t("Myresumes.Created")} {formatDate(item.createdAt)}</p>
            <h3>{t("Myresumes.Statistic")}</h3>
            <div className="flex">
                <a href="" className="p3">{0} {t("Myresumes.shows")}</a>
                <a href="" className="p3">{0} {t("Myresumes.views")}</a>
                <a href="" className="p3">{0} {t("Myresumes.inv")}</a>
            </div>
            <span className="deleteResume" onClick={() => {dispatch(deleteResume(item.id))}}>Удалить</span>
        </div>
    )
}