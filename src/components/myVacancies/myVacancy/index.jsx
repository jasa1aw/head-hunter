'use client'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVacancy } from '@/app/store/slices/vacancySlice';

export default function MyVacancy({item}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div className="card mtb-2">
            <Link href={`/vacancy/${item.id}`} className="h3 link"> {item.name} </Link>
            <p>{item.salary_from && `от ${item.salary_from}`} {item.salary_to&& `до ${item.salary_to}`} {item.salary_type}</p>
            <p>Создан {item.createdAt}</p>
            {currentUser && currentUser.id === item.userId && <span className="deleteResume" onClick={() => {dispatch(deleteVacancy(item.id))}}>Удалить</span>}
        </div>
    )
}