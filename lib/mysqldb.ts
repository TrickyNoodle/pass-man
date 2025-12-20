import mysql from 'mysql2/promise'

export const db=mysql.createPool({
    user:'sagar',
    password:'3971',
    database:'passman',
    port:3306,
    host:'localhost'
})
export const query={
    'addUser':'insert into users(email,password) values(?,?)',
    'deleteUser':'delete from users where email=?',
    'updateUserPassword':'update users set password=? where email=?',
    'getUserDetails':'select * from users where email=?'
}