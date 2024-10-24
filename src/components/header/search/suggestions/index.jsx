export default function Suggestions ( {filteredJobs, setValue} ) {
    return (
        <section className="suggestionCard">
            {filteredJobs.map((item, index) => (
                <div onClick={() => setValue(item)} className="itemCard" key={index}>
                    {item}
                </div>
            ))}
        </section>
    )
}