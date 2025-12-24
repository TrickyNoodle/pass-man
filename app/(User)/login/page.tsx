"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'

const page = () => {
  const router=useRouter()
  async function Login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const loading = toast.loading('Trying to Log In ')
    const formdata = await new FormData(e.currentTarget)
    const msg = await fetch('/api/auth/login', {
      method: 'POST',
      body: formdata
    })
    msg.json().then((data)=>{
      toast.dismiss(loading)
      if(data.error){
        toast.error(data.error)
      }
      else{
        toast.success('Login Succesfull')
        toast.loading('Redirecting')
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000);
      }
    })
  }
  return (
    <div className='flex flex-col justify-center h-screen items-center gap-4 outline-2'>
      <Toaster position='top-center' theme='dark' />
      <h1 className='text-2xl'>Login</h1>
      <form onSubmit={Login} method='POST' className='flex flex-col gap-2 w-md border-2 p-4 rounded-xl hover:shadow-2xl shadow-green-700 ease-in-out duration-300'>
        <Input type='email' name='email' placeholder='E-Mail' />
        <Input type='password' name='password' placeholder='Password' />
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </form>
    </div>
  )
}

export default page