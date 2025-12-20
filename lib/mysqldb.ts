import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    user: 'sagar',
    password: '3971',
    database: 'passman',
    port: 3306,
    host: 'localhost'
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