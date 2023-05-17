import pkg from 'pg'
const Pool = pkg.Pool
const pool = new Pool({
    user: "postgres",
    password: "25642564Aa",
    host: "localhost",
    port: "5432",
    database: "node_postgres"
})

export default pool