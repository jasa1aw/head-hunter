'use client'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';
import { useState, useEffect } from 'react';

export default function MyResume({ item }) {
    const [liked, setLiked] = useState(false);
    const t = useTranslations("CreateResume");

    useEffect(() => {
        // Check if item is already liked and stored in localStorage
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLiked(likedItems.some(likedItem => likedItem.id === item.id));
    }, [item.id]);

    const handleLikeToggle = () => {
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

        if (liked) {
            // If already liked, remove it
            const updatedItems = likedItems.filter(likedItem => likedItem.id !== item.id);
            localStorage.setItem('likedItems', JSON.stringify(updatedItems));
            setLiked(false);
        } else {
            // If not liked, add it
            const favoriteData = {
                id: item.id,
                contact: item.contact,
                createdAt: item.createdAt
            };
            likedItems.push(favoriteData);
            localStorage.setItem('likedItems', JSON.stringify(likedItems));
            setLiked(true);
        }
    };
    console.log(item);
    return (
        <div className="card mtb-2">
            <div className="cardTop">
                <Link href={`/resumes/${item.id}`} className="h3 link">{item.id}</Link>
                <div className="like" style={{ width: "36px" }}>
                    <img
                        src={liked ? "/img/liked.svg" : "/img/like.svg"}
                        alt=""
                        className="img"
                        onClick={handleLikeToggle}
                    />
                </div>
            </div>
            <p>{t("Myresumes.Created")} {formatDate(item.createdAt)}</p>
            <h3>{t("Myresumes.Statistic")}</h3>
            <div className="action">
                <div className="flex">
                    <a href="#" className="p3">{0} {t("Myresumes.views")}</a>
                    <a href="#" className="p3">{0} {t("Myresumes.inv")}</a>
                </div>
                <span className="deleteResume">{t("Myresumes.delete")}</span>
            </div>
        </div>
    );
}
