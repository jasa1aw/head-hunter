'use client'
import { useState } from "react";
import MyApply from "./apply.jsx";
import { useSelector } from "react-redux";

export default function MyApplies ( {t} ) {

    const [sortKey, setSortKey] = useState("status")
    const [sortDirection, setSortDirection] = useState("asc")

    const applies = useSelector((state) => state.apply.applies) 

    let sortedApplies = []

    sortedApplies = [...applies].sort((a, b) => {
        let aPart, bPart;
        if(sortKey === "status") {
            aPart = a.status;
            bPart = b.status
        } else if(sortKey === "vacancy") {
            aPart = a.vacancy.name;
            bPart = b.vacancy.name;
        } else if(sortKey === "updatedAt"){
            aPart = a.updatedAt;
            bPart = b.updatedAt;
        }
        if(sortDirection === "asc") {
            if (aPart < bPart) {
                return -1;
            }
            if (aPart > bPart) {
                return 1;
            }
        } else {
            if (aPart >bPart) {
                return -1;
            }
            if (aPart < bPart) {
                return 1;
            }
        }
        return 0;
    })
    

    const sortBy = (key) => {
        if(sortKey === key) {
            sortDirection === "asc" ? setSortDirection("desc") : setSortDirection("asc")
        } else {
            setSortKey(key)
            setSortDirection("asc")
        }
    }


    const showApplies = sortedApplies.map(item => (<MyApply t={t} item={item} key={item.id} />));

    return (
        <div className="table">
            <div className="row row-header flex">
                <div className={`col ${sortDirection}`} onClick={() => sortBy('status')}>
                    {t('status')} {sortKey === "status" && <img src="/img/arrow-right.svg"/>}
                </div>
                <div className={`col ${sortDirection}`} onClick={() => sortBy('vacancy')}>
                    {t('vacancy')} {sortKey === "vacancy" && <img src="/img/arrow-right.svg"/> }
                </div>
                <div className={`col ${sortDirection}`} onClick={() => sortBy('updatedAt')}>
                {t('data')}  {sortKey === "updatedAt" && <img src="/img/arrow-right.svg"/>}
                </div>
            </div>
                {showApplies}
        </div>
    )
}