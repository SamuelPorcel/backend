import mysql from "mysql2/promise"

const conexao = await mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "serasa2025_teste"
})

export default conexao;