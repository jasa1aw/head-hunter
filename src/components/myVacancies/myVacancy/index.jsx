'use client'
import { Link } from '@/i18n/routing';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVacancy } from '@/app/[locale]/store/slices/vacancySlice';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react'

export default function MyVacancy({item}) {
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch();
    const t = useTranslations("CreateResume");
    const currentUser = useSelector(state => state.auth.currentUser);
    useEffect(() => {
        // Check if item is already liked and stored in localStorage
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLiked(likedItems.some(likedItem => likedItem.id === item.id));
    }, [item.id]);

    const handleLikeToggle = () => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

        if (liked) {
            // Remove item if it's already liked
            const updatedItems = likedItems.filter(likedItem => likedItem.id !== item.id);
            localStorage.setItem('likedItems', JSON.stringify(updatedItems));
            setLiked(false);
        } else {
            // Add full item data to localStorage
            likedItems.push(item);
            localStorage.setItem('likedItems', JSON.stringify(likedItems));
            setLiked(true);
        }
    };
    return (
        <div className="card mtb-2">
            <div className="cardTop">
                <Link href={`/vacancy/${item.id}`} className="h3 link"> {item.name} </Link>
                <div className="like" style={{ width: "36px" }}>
                    <img
                        src={liked ? "/img/liked.svg" : "/img/like.svg"}
                        alt=""
                        className="img"
                        onClick={handleLikeToggle}
                    />
                </div>
            </div>
            <p>{item.salary_from && `от ${item.salary_from}`} {item.salary_to&& `до ${item.salary_to}`} {item.salary_type}</p>
            <p>{t("Created")} {formatDate(item.createdAt)}</p>
            <div className="action">
                <div className="flex">
                    <a href="" className="p3">{0} {t("Myresumes.views")}</a>
                    <a href="" className="p3">{0} {t("Myresumes.inv")}</a>
                </div>
                {currentUser && currentUser.id === item.userId && <span className="deleteResume" onClick={() => {dispatch(deleteVacancy(item.id))}}>{t("delete")}</span>}
            </div>
        </div>
    )
}