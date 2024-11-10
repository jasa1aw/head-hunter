'use client'
import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Link } from '@/i18n/routing';
import { formatDate } from '@/app/[locale]/utils/dateToLocale';
import { useTranslations } from 'next-intl';
export default function Favorites(){
	const [likedItems, setLikedItems] = useState([]);
	const t = useTranslations("CreateResume");

    useEffect(() => {
        // Fetch liked items from localStorage
        const items = JSON.parse(localStorage.getItem('likedItems')) || [];
        setLikedItems(items);
    }, []);
	return(
		<div className='wrapper'>
			<Header />
			<main>
				<div className="container">
					{likedItems.length > 0 ? (
						likedItems.map((item) => (
							<div className="card mtb-2">
								<div className="cardTop">
									<Link href={`/resumes/${item.id}`} className="h3 link">{item.contact}</Link>
									<div className="like" style={{ width: "36px" }}>
										<img
											src={"/img/liked.svg"}
											alt=""
											className="img"
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
						))):(
							<p>No liked resumes.</p>
						)
					}
				</div>
			</main>
		</div>
	)
}