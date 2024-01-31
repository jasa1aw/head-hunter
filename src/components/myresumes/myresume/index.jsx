'use client'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteResume } from '@/app/store/slices/resumeSlice';

export default function MyResume({item}) {
    const dispatch = useDispatch()
    return (
        <div className="card mtb-2">
            <Link href={`/resumes/${item.id}`} className="h3 link"> {item.position} </Link>
            <p>Создан {item.createdAt}</p>
            <h3>Статистика</h3>
            <div className="flex">
                <a href="" className="p3">{0} показов</a>
                <a href="" className="p3">{0} просмотров</a>
                <a href="" className="p3">{0} приглашений</a>
            </div>
            <span className="deleteResume" onClick={() => {dispatch(deleteResume(item.id))}}>Удалить</span>
        </div>
    )
}