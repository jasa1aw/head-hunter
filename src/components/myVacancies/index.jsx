import MyVacancy from "./myVacancy"
import { useSelector } from 'react-redux';
export default function MyVacancies() {
    
    const vacancies = useSelector((state) => state.vacancy.vacancies)

    if (!vacancies.length) {
        return (<>Not found...</>)
    }

    const showVacancies = vacancies.map((item, index) => (<MyVacancy item={item} key={index} />))

    return (
        <div>
            {showVacancies}
        </div>
    )
}