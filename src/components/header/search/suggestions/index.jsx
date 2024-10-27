'use client'

import { useState } from "react"

export default function Suggestions ( {filteredJobs, setValue} ) {
    const [disable, setDisable] = useState(false)
    const handleClick  = (item) => {
        setValue(item)
        setDisable(true)
    }
    return (
        <>
            {(filteredJobs.length > 0 && !disable) && <section className="suggestionCard">
                {filteredJobs.map((item, index) => (
                    <div onClick={() => handleClick(item)} className="itemCard" key={index}>
                        {item}
                    </div>
                ))}
            </section>}
        </>
    )
}