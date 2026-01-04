"use client"
import React, { useRef, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { Delete, Edit3, Save } from 'lucide-react'
import { toast } from 'sonner'

type PasswordCardProps = {
    id: string | number
    sitename: string
    username: string
    password: string
    getdata: () => void
}

const PasswordCard = ({ id, sitename, username, password, getdata }: PasswordCardProps) => {
    const form = useRef<HTMLFormElement | null>(null)
    const sitenamelocal = useRef<HTMLHeadingElement | null>(null)
    const [edit, setedit] = useState(false)
    function Edit() {
        setedit(true)
    }
    function Submit() {
        setedit(false)
        form.current?.requestSubmit()
    }
    async function updatepassword(e: React.FormEvent<HTMLFormElement>) {
        const loading = toast.loading('Updating Password')
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        formdata.append('id', String(id))
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
    async function deletepassword() {
        const loading = toast.loading('Deleting Password')
        const formdelete = new FormData();
        formdelete.append('id', String(id))
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
    function copytoclipboard(e: React.MouseEvent<HTMLInputElement>) {
        if (e.currentTarget.readOnly) {
            try {
                navigator.clipboard.writeText(e.currentTarget.value)
                toast.success(`${e.currentTarget.name} copied to Clipboard!`)
            }
            catch (error) {
                console.log(error)
                toast.error('Error Copying To Clipboard')
            }
        }
    }
    return (
        <div key={id} className='break-inside-avoid w-fit h-fit flex border-2 p-4 rounded-md bg-accent gap-2 items-center'>
            <div className='flex flex-col gap-2 grow'>
                <h1 ref={sitenamelocal} className='text-lg'>{sitename}</h1>
                <form ref={form} onSubmit={updatepassword} className='flex gap-2'>
                    <Input className='bg-background' readOnly={edit ? false : true} onClick={copytoclipboard} type='text' defaultValue={username} name='username' />
                    <Input className='bg-background' readOnly={edit ? false : true} onClick={copytoclipboard} type='text' defaultValue={password} name='password' />
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