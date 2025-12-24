"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
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
                toast.loading('Redirecting')
                setTimeout(() => {
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
            <Toaster position='top-center' theme='dark' />
            <h1 className='text-2xl'>SignUp</h1>
            <form onSubmit={SignUp} method='POST' className='flex flex-col gap-2 w-md border-2 p-4 rounded-xl hover:shadow-2xl shadow-green-700 ease-in-out duration-300'>
                <Input type='email' name='email' placeholder='E-Mail' />
                <Input type='password' name='password' placeholder='Password' />
                <Button type='submit' className='w-full'>
                    SignUp
                </Button>
            </form>
            <Button variant={'link'} onClick={login}>Already Have an Account?Login?</Button>
        </div>
    );
}
