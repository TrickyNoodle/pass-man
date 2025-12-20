import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    user: process.env.SQL_user,
    password: process.env.SQL_password,
    database: process.env.SQL_database,
    port: parseInt(process.env.SQL_port),
    host: process.env.SQL_host
})
export const query = {
    'addUser': 'insert into users(email,password) values(?,?)',
    'deleteUser': 'delete from users where email=?',
    'updateUserPassword': 'update users set password=? where email=?',
    'getUserDetails': 'select * from users where email=?',

    'createPassword': 'insert into passwords(username,password,sitename,created_by) values(?,?,?,?)',
    'deletePassword': 'delete from passwords where id=?',
    'updatePassword': 'update passwords set username=?,password=? where id=?',
    'getPasswordsforUID': 'select * from passwords where created_by=?'
}