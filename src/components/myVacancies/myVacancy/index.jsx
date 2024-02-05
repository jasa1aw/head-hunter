'use client'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteVacancy } from '@/app/store/slices/vacancySlice';

export default function MyVacancy({item}) {
    const dispatch = useDispatch()
    return (
        <div className="card mtb-2">
            <Link href={`/vacancy/${item.id}`} className="h3 link"> {item.name} </Link>
            <p>Создан {item.createdAt}</p>
            
            <span className="deleteResume" onClick={() => {dispatch(deleteVacancy(item.id))}}>Удалить</span>
        </div>
    )
}