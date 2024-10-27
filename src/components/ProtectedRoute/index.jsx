import { useRouter } from '@/i18n/routing'
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute ({children}) {
    const router = useRouter()
    const token = localStorage.getItem("token")
    console.log(token);
    if(token) {
        let decodedToken = jwtDecode(token)
        if(decodedToken.exp * 1000 > Date.now()) {
            return (<>{children}</>)
        } else if(decodedToken.role.name === "employee"){
            router.push('/login')
        } else {
            router.push('/employer/signin')
        }
    } else {
        router.push('/login')
    }
}