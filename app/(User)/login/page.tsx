"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

const Page = () => {
  const router = useRouter()
  async function Login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const loading = toast.loading('Trying to Log In ')
    const formdata = await new FormData(e.currentTarget)
    const msg = await fetch('/api/auth/login', {
      method: 'POST',
      body: formdata
    })
    msg.json().then((data) => {
      toast.dismiss(loading)
      if (data.msg == 'OK') {
        toast.success('Login Succesfull')
        const loading = toast.loading('Redirecting')
        setTimeout(() => {
          toast.dismiss(loading)
          router.push('/')
        }, 3000);
      }
      else {
        toast.error(data.summary ? data.summary : data.msg)
      }
    })
  }
  async function signup() {
    router.push('/signup')
  }
  return (
    <div className='flex flex-col justify-center h-screen items-center gap-4'>
      <motion.h1 className='text-2xl'>Login</motion.h1>
      <motion.form initial={{ rotate: 0 }} animate={{ rotate: [10, 0] }} transition={{ type: 'spring' }} onSubmit={Login} method='POST' className='transition-none flex w-full flex-col gap-2 md:w-md lg:w-lg border-2 p-4 rounded-xl hover:shadow-2xl shadow-green-700 ease-in-out duration-300 bg-background'>
        <Input type='email' name='email' placeholder='E-Mail' />
        <Input type='password' name='password' placeholder='Password' />
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </motion.form>
      <Button variant={'link'} onClick={signup}>Don&apos;t Have An Account?SignUp?</Button>
    </div>
  )
}

export default Page