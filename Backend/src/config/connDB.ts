import mysql from 'mysql2'

const host = process.env.HOST;
const pwd = process.env.POOLPWD;
const user = process.env.POOLUSER

export const pool = mysql.createPool({
    host: host,
    user: user,
    password: pwd,
    database: 'prospects'
}).promise()
