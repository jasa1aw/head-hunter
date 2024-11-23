import MyResume from "./myresume";
export default function MyResumes({resumes}) {
    console.log(resumes.length);
    
    if (!resumes.length) {
        return (<>Not found...</>)
    }

    const showResumes = resumes.map((item, index) => (<MyResume item={item} key={index} />))

    return (
        <div>
            {showResumes}
        </div>
    )
}