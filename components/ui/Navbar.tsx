"use client"
import { Button } from './button'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from './popover'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './input'

const Navbar = (props: { username: string }) => {
    const router = useRouter()
    const [changepassword, setchangepassword] = useState(false)
    const [duser, setduser] = useState(false)
    const [count, setcount] = useState(0)
    async function Logout() {
        const loggingout = toast.loading('Logging Out')
        try {
            fetch('/api/auth/logout').then((data) => {
                toast.dismiss(loggingout)
                toast.success('Logged Out')
                toast.info('Redirecting')
                redirect(data.url)
            })
        }
        catch (err) {
            toast.error('Logout Failed')
        }
    }
    async function updatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const loading = toast.loading('Updating Password')
        let msg = await fetch('/api/user/changepassword', {
            method: 'POST',
            body: formdata
        })
        msg = await msg.json()
        toast.dismiss(loading)
        if (msg.msg == 'OK') {
            toast.success('Password Updated')
            toast.loading('Redirecting')
            await fetch('/api/auth/logout')
            setTimeout(() => {
                router.push('/login')
            }, 3000);
        } else if (msg.msg == 'WRONG_PASSWORD') {
            toast.error('Wrong Password')
        }
        else if (msg.msg == 'USER_NOT_FOUND')
            toast.error('User Not Found')
        else toast.error(msg.msg ? msg.msg : msg.error)
    }
    async function deleteAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (count < 1) {
            setcount(count + 1)
            toast.info('CLICK AGAIN TO DELETE THIS ACCOUNT')
        }
        else {
            const loading = toast.loading('Deleting User')
            const msg = await fetch('/api/user/deleteuser')
            toast.dismiss(loading)
            toast.success(msg.json().then((data) => { return data.msg }))
            setTimeout(() => {
                router.push('/api/auth/logout')
            }, 2000);
        }
    }
    return (
        <div className='flex justify-between items-center backdrop-blur-2xl sticky top-0'>
            {changepassword ?
                <div onClick={() => setchangepassword(false)} className='flex justify-center items-center bg-background/80 h-screen w-full fixed left-0 right-0 top-0 bottom-0 z-1'>
                    <form onClick={(e) => e.stopPropagation()} method="POST" onSubmit={updatePassword} className="flex flex-col bg-accent p-4 rounded-md gap-2 items-center">
                        <h1 className='text-xl'>Update Password</h1>
                        <Input placeholder="Current Password" type='password' name='password' />
                        <Input placeholder="New Password" type="password" name='newpassword' />
                        <Button type="submit" className='w-3/4'>Submit</Button>
                    </form>
                </div>
                :
                null
            }
            {
                duser ?
                    <div onClick={() => setduser(false)} className='flex justify-center items-center bg-background/80 h-screen w-full fixed left-0 right-0 top-0 bottom-0 z-1'>
                        <form onClick={(e) => e.stopPropagation()} method="GET" onSubmit={deleteAccount} className="flex flex-col bg-accent p-4 rounded-md gap-2 items-center">
                            <h1 className='text-xl'>Delete User</h1>
                            <div className='text-red-600 text-center font-bold'>
                                <p>These Will delete your account from our database</p>
                                <p>All Your Passwords will be deleted as well from our database</p>
                            </div>
                            <Button variant={'destructive'} type="submit" className='w-3/4 text-xl'>DELETE MY ACCOUNT</Button>
                            <p className='text-red-600 font-black'>(Proceed with Caution)</p>
                        </form>
                    </div>
                    : null
            }
            <h1 className='text-2xl p-2'>Pass-Man</h1>
            <Popover>
                <PopoverTrigger>
                    <Button variant={'link'}>
                        {props.username}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col border rounded-md bg-background'>
                    <Button onClick={Logout} variant={'outline'} className='w-full rounded-b-none'>Logout</Button>
                    <Button onClick={() => setchangepassword(true)} variant={'outline'} className='w-full rounded-none'>Update Password</Button>
                    <Button onClick={() => setduser(true)} variant={'destructive'} className='w-full rounded-t-none'>Delete User</Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Navbar