import {createPool} from "@vercel/postgres";

export function connect(){
    const pool = createPool({
        connectionString: process.env.DATABASE_URL,
    });
    return pool;
}

export async function execSql(sqlText: string, params?: any[]){
    const pool = connect();
    if (params) {
        return await pool.query(sqlText, params);
    } else {
        return await pool.query(sqlText);
    }
}