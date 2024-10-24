'use client';
import { suggestion } from "@/app/data/suggestion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Suggestions from "./suggestions";
export default function Search() {
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const searchState = useSelector((state) => state.resume.search);

    useEffect(() => {
        if (searchState) {
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
            {isVisible && (
                <div className={`search ${isAnimating ? 'hide' : ''}`}>
                    <div className="search-left">
                        <img src="/img/search.png" alt="" />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            placeholder="Профессия, позиция или компания"
                        />
                        <span className="clear-icon" onClick={() => setValue("")}>&#10006;</span>
                        {filteredJobs.length > 0 && <Suggestions filteredJobs={filteredJobs} setValue={setValue}/>}
                    </div>
                    <div className="search-right">
                        <button className="button button-primary">Поиск</button>
                        <Link href={'/search/vacancy/advanced'}>
                            <img src="/img/filter.png" alt="" />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
