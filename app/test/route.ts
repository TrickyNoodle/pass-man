import { cookies } from "next/headers";

export async function GET(req:Request){
    const cookieStore=await cookies()
    cookieStore.set('authentication','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzZ9.e5n3-wfnpaioOhB3A8IzUYdV7Xvyc246Y7qq4JKdELA')
    cookieStore.set('authorisation','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNvbWVvbmVAc29tZXRoaW5nLmNvbSJ9.hDk9OWIIZLj1oOu6IpoN9MdFL8_Ks7HtoWqbZxainUg')
    return Response.json('ok')
}