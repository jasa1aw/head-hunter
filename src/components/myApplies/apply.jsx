'use client';
import { useDispatch} from 'react-redux';
import { deleteApply } from '@/app/[locale]/store/slices/applySlice';
export default function MyApply ({item, t}) {
    
    const dispatch = useDispatch();
    
    return (
        <div className="row flex">
            <div className='col'>
                {item.status}
            </div>
            <div className='col'>
                {item.vacancy.name}
                <div className='link mt2' onClick={() => dispatch(deleteApply(item.id))}>
                    {t('delete')}
                </div>
            </div>
            <div className='col'>
                {item.updatedAt}
            </div>
        </div>
    )
}