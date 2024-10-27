'use client';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { suggestion } from "@/app/mocks/suggestion";
import Suggestions from './suggestions';
export default function Search( {disabled, size} ) {
    const t = useTranslations("Header")
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const searchState = useSelector((state) => state.resume.search);

    useEffect(() => {
        if (searchState || disabled) {
            setIsVisible(true);
            setIsAnimating(false);
        } else {
            setIsAnimating(true);
            setTimeout(() => setIsVisible(false), 500); 
        }
    }, [searchState]);
    useEffect(() => {        
        if (value) {
            const filtered = suggestion.filter(job => 
                job.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredJobs(filtered)
        } else {
            setFilteredJobs([])
        }
    }, [value])
    return (
        <>
            {(isVisible || disabled) && (
                <div className={`search ${isAnimating ? 'hide' : ''} ${size}`}>
                    <div className="search-left">
                        <img src="/img/search.svg" alt="icon" />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            placeholder={`${t('placeholder')}`}
                        />
                        <span className="clear-icon" onClick={() => setValue("")}>&#10006;</span>
                        <Suggestions filteredJobs={filteredJobs} setValue={setValue}/>
                    </div>
                    <div className="search-right">
                        <button className="button searchBtn">{size === 'large' ? t('searchEmployee') : t('search')}</button>
                        {!disabled && <Link href={'/search/vacancy/advanced'}>
                            <img src="/img/filter.png" alt="" />
                        </Link>}
                    </div>
                </div>
            )}
        </>
    );
}
