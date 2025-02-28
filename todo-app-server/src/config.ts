export const pgConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host:  process.env.PGHOST,
    port:  process.env.PGPORT,
    database: process.env.PGDATABASE,
    application_name: process.env.APPNAME, // The name of the application that created this Client instance
    connectionTimeoutMillis: process.env.CONTIME, // number of milliseconds to wait for connection, default is no timeout
    idle_in_transaction_session_timeout:  process.env.SESTIMEOUT// number of milliseconds before terminating any session with an open idle transaction, default is no timeout
}