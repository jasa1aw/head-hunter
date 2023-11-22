import MyResume from "./myresume";
export default function MyResumes({resumes}) {
    // const {resumes} = props //вытащить из объекта props resumes
    const showResumes = resumes.map((item, index) => (<MyResume item={item} key={index} />))

    return (
        <div>
            {showResumes}
        </div>
    )
}