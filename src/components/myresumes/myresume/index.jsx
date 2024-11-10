'use client'
import { Link } from '@/i18n/routing';
import { useDispatch } from 'react-redux';
import { deleteResume } from '@/app/[locale]/store/slices/resumeSlice';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';
import { useState } from 'react'

export default function MyResume({item}) {
    const [liked, setLiked] = useState(false)
    const t = useTranslations("CreateResume")
    const dispatch = useDispatch()
    console.log(item)
    return (
        <div className="card mtb-2">
            <div className="cardTop">
                <Link href={`/resumes/${item.id}`} className="h3 link"> {item.contact} </Link>
                <div className="action">
                    <div className="like">
                        {liked ? <img src="/img/liked.png" alt="" className="img" /> : <img src="/img/like.png" alt="" className="img" />}
                    </div>
                    <span className="deleteResume" onClick={() => {dispatch(deleteResume(item.id))}}>{t("Myresumes.delete")}</span>
                </div>
            </div>
            
            <p> {t("Myresumes.Created")} {formatDate(item.createdAt)}</p>
            <h3>{t("Myresumes.Statistic")}</h3>
            <div className="flex">
                <a href="" className="p3">{0} {t("Myresumes.views")}</a>
                <a href="" className="p3">{0} {t("Myresumes.inv")}</a>
            </div>
            
        </div>
    )
}