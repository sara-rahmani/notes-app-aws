// import mysql from "mysql2"
// import dotenv from "dotenv"
const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()
MYSQLHOST='containers-us-west-55.railway.app'
MYSQLUSER='root'
MYSQLPASSWORD='UC1n99rNlo2fehVK2DfZ'
MYSQLDATABASE='railway'
MYSQLPORT='6599'
const pool = mysql
  .createPool({
    host: MYSQLHOST,
    user:MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    port: MYSQLPORT ,
    // socketPath: '/var/run/mysqld/mysqld.sock',

})
  .promise()

  async function getNotes() {
    let query = `
    SELECT * 
    FROM notes
    `
  
    const [rows] = await pool.query(query)
    return rows
  }
  
exports.getNotes = getNotes

async function getNote(id) {
    let query = `
    SELECT * 
    FROM notes
    WHERE id = ?
    `
  
    const [rows] = await pool.query(query, [id])
    return rows[0]

  }
exports.getNote = getNote

async function addNote(data) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [data.title, data.content])
    return result
}
exports.addNote = addNote

async function deleteNote(id) {
    const [result] = await pool.query(`
    DELETE FROM notes
    WHERE id = ?
    `, [id])
    return result
    
}

exports.deleteNote = deleteNote
// export.default{
//     getNote,
//     getNotes
// }