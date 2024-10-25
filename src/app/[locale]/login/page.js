
import UserLogin from '@/components/auth/user'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Search from '@/components/header/search'

export default function Login() {
  return (
    <div className='wrapper'>
      <Header/>
      <main>
        <Search/>
          <UserLogin/>
      </main>
      <Footer/>
    </div>
  )
}
