"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {motion} from 'motion/react'
export default function Home() {
    const router = useRouter()
    async function SignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const loading = toast.loading('Trying to create a new Account ')
        const formdata = await new FormData(e.currentTarget)
        const msg = await fetch('/api/user/new', {
            method: 'POST',
            body: formdata
        })
        msg.json().then((data) => {
            toast.dismiss(loading)
            if (data.msg == 'OK') {
                toast.success('User Created')
                const loading = toast.loading('Redirecting')
                setTimeout(() => {
                    toast.dismiss(loading)
                    router.push('/login')
                }, 3000);
            }
            else {
                toast.error(data.summary ? data.summary : data.msg)
            }
        })
    }
    async function login() {
        router.push('/login')
    }
    return (
        <div className='flex flex-col justify-center h-screen items-center gap-4'>
            <h1 className='text-2xl'>SignUp</h1>
            <motion.form initial={{ rotate: 0 }} animate={{ rotate: [10, 0] }} transition={{ type: 'spring' }} onSubmit={SignUp} method='POST' className='transition-none flex flex-col gap-2 w-full md:w-md lg:w-lg border-2 p-4 rounded-xl hover:shadow-2xl shadow-green-700 ease-in-out duration-300 bg-background'>
                <Input type='email' name='email' placeholder='E-Mail' />
                <Input type='password' name='password' placeholder='Password' />
                <Button type='submit' className='w-full'>
                    SignUp
                </Button>
            </motion.form>
            <Button variant={'link'} onClick={login}>Already Have an Account?Login?</Button>
        </div>
    );
}
