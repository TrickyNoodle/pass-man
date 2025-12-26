"use client"
import Navbar from '@/components/ui/Navbar'
import PasswordCard from '@/components/ui/PasswordCard'
import PasswordTool from '@/components/ui/PasswordTool'
import { useEffect, useState } from 'react'


const page = () => {
  const [data, setdata] = useState([])
  const [name, setname] = useState('')

  async function getdata() {
    setdata(await fetch('/api/password/getpasswords').then((msg) => msg.json().then((newdata) => { return newdata.msg })))
  }

  useEffect(() => {
    async function getname() {
      let data=await fetch('/api/user/getname')
      data=await data.json()
      setname(data.msg)
    }
    getdata()
    getname()
  }, [])
  return (
    <div className="h-screen overflow-y-clip">
      <Navbar username={name} />
      <div className={`flex h-screen w-full gap-4 justify-center ${data.length == 0 ? 'flex-col items-center' : ''}`}>
        <div className={`my-auto ${data.length == 0 ? 'w-1/2 mx-auto' : 'w-1/'}flex flex-col`}>
          <PasswordTool getdata={getdata} />
          {data.length == 0 ?
            <h1 className='text-xl text-center my-8'>You Passwords List Seems to be Empty 😭 Why not Add one? 🙂</h1>
            : null
          }
        </div>
        <div className={`overflow-y-auto columns-2`}>
          {
            data.map((password) => {
              return <PasswordCard key={password.id} id={password.id} password={password.password} sitename={password.sitename} username={password.username} getdata={getdata} />
            })}
        </div>
      </div>
    </div>
  )
}

export default page