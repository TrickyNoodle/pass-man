"use client"
import Navbar from '@/components/ui/Navbar'
import PasswordCard from '@/components/ui/PasswordCard'
import PasswordTool from '@/components/ui/PasswordTool'
import Filter from '@/components/ui/Filter'
import { useEffect, useState } from 'react'
import { passworddetails } from '@/types/table'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'

const Page = () => {
  const [data, setdata] = useState<passworddetails[]>([])
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
      await getdata()
    }

    getname()
  }, [])

  return (
    <div className="min-h-screen flex flex-col h-screen md:overflow-clip">
      <Navbar username={name} />
      <div className="md:flex w-full gap-4 h-full">
        <div
          className={`${data.length === 0
            ? 'md:w-1/2 mx-auto flex justify-center'
            : 'md:w-1/3 gap-4'
            } flex flex-col my-2`}
        >
          <PasswordTool getdata={getdata} />
          {data.length === 0 ? (
            <motion.h1 initial={{ translateY: 50 }} animate={{ translateY: 0 }} className="transition-none text-xl text-center my-8">
              Your Passwords List Seems to be Empty 😭 Why not Add one? 🙂
            </motion.h1>
          )
            :
            <Filter setfilter={setfilter} filter={filter} />
          }
        </div>
        {data.length > 0 && (
          <div className="md:w-2/3 flex md:h-15/16 overflow-y-auto overflow-x-visible">
            <div className="my-2 grid gap-2 md:grid-cols-2 mx-auto h-min">
              <AnimatePresence>
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
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
