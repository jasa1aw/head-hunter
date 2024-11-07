'use client'

export default function Suggestions({ filteredJobs, setValue, setDisableValue, disableValue }) {

    const onHandleClick = (item) => {
        setValue(item);
        setTimeout(() => {setDisableValue(false)}, 50);
    }
    return (
        <>
            {(filteredJobs.length > 0 && disableValue) && (
                <section className="suggestionCard">
                    {filteredJobs.map((item, index) => (
                        <div onClick={() => onHandleClick(item)} className="itemCard" key={index}>
                            {item}
                        </div>
                    ))}
                </section>
            )}
        </>
    )
}
