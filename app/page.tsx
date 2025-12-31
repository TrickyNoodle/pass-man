"use client"
import Navbar from '@/components/ui/Navbar'
import PasswordCard from '@/components/ui/PasswordCard'
import PasswordTool from '@/components/ui/PasswordTool'
import Filter from '@/components/ui/Filter'
import { useEffect, useState } from 'react'

const page = () => {
  const [data, setdata] = useState<any[]>([])
  const [name, setname] = useState('')
  const [filter, setfilter] = useState('')

  async function getdata() {
    const res = await fetch('/api/password/getpasswords')
    const json = await res.json()
    setdata(json.msg)
  }

  useEffect(() => {
    async function getname() {
      const res = await fetch('/api/user/getname')
      const json = await res.json()
      setname(json.msg)
    }
    getdata()
    getname()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar username={name} />
      <div className="flex-1 md:flex w-full gap-4 overflow-hidden">
        <div
          className={`${data.length === 0
            ? 'md:w-1/2 mx-auto flex justify-center'
            : 'md:w-1/3 gap-4'
            } flex flex-col`}
        >
          <PasswordTool getdata={getdata} />
          {data.length === 0 ? (
            <h1 className="text-xl text-center my-8">
              Your Passwords List Seems to be Empty 😭 Why not Add one? 🙂
            </h1>
          )
            :
            <Filter setfilter={setfilter} filter={filter} />
          }
        </div>
        {data.length > 0 && (
          <div className="md:w-2/3 flex overflow-y-auto p-2">
            <div className="grid gap-4 md:grid-cols-2 h-min">
              {
                data.map((password) => {
                  if (filter.trim() == '') {  
                    return (
                      <PasswordCard
                        key={password.id}
                        id={password.id}
                        password={password.password}
                        sitename={password.sitename}
                        username={password.username}
                        getdata={getdata}
                      />
                    )
                  } else {
                    if (password.sitename.includes(filter)) {
                      return (
                        <PasswordCard
                          key={password.id}
                          id={password.id}
                          password={password.password}
                          sitename={password.sitename}
                          username={password.username}
                          getdata={getdata}
                        />
                      )
                    }
                  }
                }
                )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
