"use client"
import { Button } from './button'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Popover } from './popover'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from './input'
import { AnimatePresence, motion } from 'motion/react'

const Navbar = (props: { username: string }) => {
    const router = useRouter()
    const [changepassword, setchangepassword] = useState(false)
    const [duser, setduser] = useState(false)
    const [count, setcount] = useState(0)
    async function Logout() {
        const loggingout = toast.loading('Logging Out')
        try {
            const resp = await fetch('/api/auth/logout')
            toast.dismiss(loggingout)
            toast.success('Logged Out')
            toast.info('Redirecting')
            router.push('/login')
        }
        catch (err) {
            toast.error('Logout Failed')
        }
    }
    async function updatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const loading = toast.loading('Updating Password')
        const resp = await fetch('/api/user/changepassword', {
            method: 'POST',
            body: formdata
        })
        const msg = await resp.json()
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
            const resp = await fetch('/api/user/deleteuser')
            const data = await resp.json()
            toast.dismiss(loading)
            toast.success(data.msg)
            setTimeout(() => {
                router.push('/api/auth/logout')
            }, 2000);
        }
    }
    return (
        <motion.div initial={{translateY:-50}} animate={{translateY:0}} className={`shadow-xl flex justify-between items-center sticky top-0 ${(changepassword || duser) ? '' : 'backdrop-blur-md'}`}>
            {changepassword ?
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: [1.05, 1] }} transition={{ type: 'spring' }} onClick={() => setchangepassword(false)} className='z-1 flex justify-center items-center h-screen w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-lg'>
                    <form onClick={(e) => e.stopPropagation()} method="POST" onSubmit={updatePassword} className="flex flex-col bg-accent p-4 rounded-md gap-2 items-center">
                        <h1 className='text-xl'>Update Password</h1>
                        <Input placeholder="Current Password" type='password' name='password' />
                        <Input placeholder="New Password" type="password" name='newpassword' />
                        <Button type="submit" className='w-3/4'>Submit</Button>
                    </form>
                </motion.div>
                :
                null
            }
            {
                duser ?
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: [1.05, 1] }} transition={{ type: 'spring' }} onClick={() => setduser(false)} className='z-1 flex justify-center items-center h-screen w-full fixed left-0 right-0 top-0 bottom-0 backdrop-blur-lg '>
                        <form onClick={(e) => e.stopPropagation()} method="GET" onSubmit={deleteAccount} className="flex flex-col bg-accent p-4 rounded-md gap-2 items-center">
                            <h1 className='text-xl'>Delete User</h1>
                            <div className='text-red-600 text-center font-bold'>
                                <p>These Will delete your account from our database</p>
                                <p>All Your Passwords will be deleted as well from our database</p>
                            </div>
                            <Button variant={'destructive'} type="submit" className='w-3/4 text-xl'>DELETE MY ACCOUNT</Button>
                            <p className='text-red-600 font-black'>(Proceed with Caution)</p>
                        </form>
                    </motion.div>
                    : null
            }
            <h1 className='text-2xl p-2'>Pass-Man</h1>
            <AnimatePresence>
                <Popover>
                    <PopoverTrigger>
                        <Button asChild variant={'link'}>
                            <span>
                                {props.username}
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <motion.div exit={{ translateY: -20 }} initial={{ translateY: -20 }} animate={{ translateY: 0 }} className='w-min bg-accent/90 rounded-md'>
                            <Button onClick={Logout} variant={'outline'} className='w-full rounded-b-none'>Logout</Button>
                            <Button onClick={() => setchangepassword(true)} variant={'outline'} className='w-full rounded-none'>Update Password</Button>
                            <Button onClick={() => setduser(true)} variant={'destructive'} className='w-full rounded-t-none'>Delete User</Button>
                        </motion.div>
                    </PopoverContent>
                </Popover>
            </AnimatePresence>
        </motion.div>
    )
}

export default Navbar