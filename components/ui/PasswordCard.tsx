"use client"
import React, { useRef, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { Delete, Edit3, Save } from 'lucide-react'
import { toast } from 'sonner'

const PasswordCard = ({ id, sitename, username, password, getdata }) => {
    const form: HTMLFormElement = useRef()
    const sitenamelocal: HTMLFormElement = useRef()
    const [usernamenew, setUsername] = useState(username)
    const [passwordnew, setPassword] = useState(password)
    const [edit, setedit] = useState(false)
    function Edit() {
        setedit(true)
    }
    function Submit() {
        setedit(false)
        form.current.requestSubmit()
    }
    async function updatepassword(e: React.FormEvent) {
        const loading = toast.loading('Updating Password')
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        formdata.append('id', id)
        const msg = await fetch('/api/password/updatepassword', {
            method: 'POST',
            body: formdata
        }).then(async (data) => { return await data.json() })
        toast.dismiss(loading)
        if (msg.msg == 'OK') {
            toast.success('Passwords Updated')
        }
        else {
            toast.error('Failed')
        }
        getdata()
    }
    async function deletepassword(e) {
        const loading = toast.loading('Deleting Password')
        const formdelete = new FormData();
        formdelete.append('id', id)
        const msg = await fetch('/api/password/deletepassword', {
            method: 'POST',
            body: formdelete
        }).then(async (data) => { return await data.json() })
        toast.dismiss(loading)
        if (msg.msg == 'OK') {
            toast.success('Password Deleted')
        }
        else {
            toast.error('Failed')
        }
        getdata()
    }
    return (
        <div key={id} className='my-2 -z-10 break-inside-avoid w-fit h-fit flex border-2 p-4 rounded-md bg-accent gap-2 items-center'>
            <div className='flex flex-col gap-2 grow'>
                <h1 ref={sitenamelocal} className='text-lg'>{sitename}</h1>
                <form ref={form} onSubmit={updatepassword} className='flex gap-2'>
                    <Input className='bg-background' type='text' onChangeCapture={(e)=>setUsername(e.currentTarget.value)} value={usernamenew} name='username' />
                    <Input className='bg-background' type='text' onChangeCapture={(e)=>setPassword(e.currentTarget.value)} value={passwordnew} name='password' />
                </form>
            </div>
            <div className='flex flex-col gap-2'>
                <Button onClick={edit ? Submit : Edit}>{edit ? <Save /> : <Edit3 />}</Button>
                <Button onClick={deletepassword} variant={'destructive'}><Delete /></Button>
            </div>
        </div>
    )
}

export default PasswordCard