import React from 'react'
import { Input } from './input'

const Filter = ({ setfilter, filter }) => {
  function handlechange(e: React.InputEvent<HTMLInputElement>) {
    setfilter(e.currentTarget.value)
  }
  return (
    <div className='rounded-md flex flex-col gap-2'>
      <h3 className='text-xl'>Filter Passwords</h3>
      <div className='bg-accent rounded-md'>
        <Input type='text' name='filter' placeholder='Enter Sitename to Filter' onChange={handlechange} defaultValue={''} />
      </div>
    </div>
  )
}

export default Filter