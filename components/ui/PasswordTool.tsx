"use client"
import { Input } from './input'
import { Button } from './button'
import { toast } from 'sonner'
const PasswordTool = ({ getdata }) => {
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
        <div className='w-full flex flex-col gap-2'>
            <h1 className='text-xl'>Add Password</h1>
            <form onSubmit={addpassword} className='flex flex-col gap-4 bg-sidebar-accent p-4 rounded-md'>
                <Input type='text' name='sitename' defaultValue='' placeholder='Website Name' />
                <Input type='text' name='username' defaultValue='' placeholder='UserName' />
                <Input type='password' name='password' defaultValue='' placeholder='Password' />
                <Button type='submit' className='w-full'>Add</Button>
            </form>
        </div>
    )
}

export default PasswordTool