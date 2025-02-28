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

export async function connectDB() {
    try {
        await pool.connect();
        return { success: true, error: false, message: config.pgConfig.application_name +  " Connected to " + config.pgConfig.host + " PostgreSQL Database as " + config.pgConfig.user + " Successfully" }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

pool.on('error', (err: any) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});