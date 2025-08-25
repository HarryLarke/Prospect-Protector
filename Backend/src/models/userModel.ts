import { pool } from '../config/connDB';



export const addNewUser = async (username: string, pwd: string) => {
    const [result] = await pool.query("INSERT INTO users (_id, username, pwd) VALUES(UUID(), ?, ?)", [username, pwd])
    return result 
}

export const getUsers = async () => {
    const [users] = await pool.query("SELECT * FROM users");
    console.log(users[0])
    return users; //Need to specify type here?
}
//can by hyper specific if need be! WIth get user email, so we don't have to send out heft amounts of data! 
export const getUserById = async(id: string) => {
    const [user] = await pool.query("SELECT * FROM users WHERE _id = ?", [id])
    console.log(user[0])
    return user[0]
}

export const getUserbyUsername = async(username: string) => {
    const [user] = await pool.query("SELECT username FROM user WHERE username = ?", [username]) 
    console.log(user[0])
    return user[0]
}