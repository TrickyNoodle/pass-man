export default function Home() {
  return (
    <div>
      <form method="POST" action="/api/user/deleteuser" className="bg-white text-black flex flex-col justify-center items-center">
        <input placeholder='email' type="email"  name='email'/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
