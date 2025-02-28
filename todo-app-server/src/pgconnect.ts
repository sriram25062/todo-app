const { Pool } = require("pg");
const config = require("./config");
const pool = new Pool(config.pgConfig);

export async function executeScript(query: string, parameters: any[]) {
    try {
        await pool.connect();
        let result = await pool.query(query, parameters);
        console.log("res", result)
        if(result) { return { success: true, error: false, rows: result.rows, rowCount: result.rowCount }};
        await pool.end();
    } catch (error: any) {
        console.log(error)
        return { success: false, error: true, message: new Error(error).message }
    }
}

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err: any) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});