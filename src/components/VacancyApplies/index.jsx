'use client'
import { useTranslations } from "next-intl";
import Apply from "./apply.jsx";

export default function Applies ({applies}) {
    const showApplies = applies.map(item => (<Apply item={item} key={item.id} />)); 
    const t = useTranslations('AppliesOfVacancy')
    return (
        <div className="applies">
            {showApplies.length === 0 && t('notFound')} 
            {showApplies}
        </div>
    )
}