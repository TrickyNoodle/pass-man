import React from 'react'

const page = () => {
  return (
    <div>
        <form action="/api/auth/login" method='POST'>
            <input type="email" name='email' placeholder='email'/>
            <input type="password" name='password' placeholder='password' />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default page