"use client"
import { Input } from './input'
import { Button } from './button'
import { toast } from 'sonner'
import {motion} from 'motion/react'
type PasswordToolProps = {
    getdata: () => void
}

const PasswordTool = ({ getdata }: PasswordToolProps) => {
    async function addpassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form=e.currentTarget
        const formdata = new FormData(e.currentTarget)
        const loading = toast.loading('Adding Password')
        const msg = await fetch('/api/password/addpassword', {
            method: 'POST',
            body: formdata
        }).then(async (data) => { return await data.json() })
        toast.dismiss(loading)
        if (msg.msg == 'OK') {
            toast.success('Password Created')
            form.reset()
        } else {
            toast.error('Failed')
        }
        getdata()
    }
    return (
        <motion.div initial={{translateY:20}} animate={{translateY:0}} className='transition-none w-full flex flex-col gap-2'>
            <h1 className='text-xl'>Add Password</h1>
            <form onSubmit={addpassword} className='flex flex-col gap-4 bg-accent border-2 p-4 rounded-md'>
                <Input type='text' name='sitename' defaultValue='' placeholder='Website Name' />
                <Input type='text' name='username' defaultValue='' placeholder='UserName' />
                <Input type='password' name='password' defaultValue='' placeholder='Password' />
                <Button type='submit' className='w-full'>Add</Button>
            </form>
        </motion.div>
    )
}

export default PasswordTool