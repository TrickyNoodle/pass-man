export default function Home() {
  return (
    <div>
      <form method="POST" action="/api/user/changepassword" className="bg-white text-black flex flex-col justify-center items-center">
        <input placeholder="email" type="email"  name='email'/>
        <input placeholder="current password" type='password' name='password'/>
        <input placeholder="new password" type="password" name='newpassword' />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
