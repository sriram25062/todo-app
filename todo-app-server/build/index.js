/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.serverConfig = exports.pgConfig = void 0;\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\ndotenv.config();\nexports.pgConfig = {\n    user: process.env.PGUSER,\n    password: process.env.PGPASSWORD,\n    host: process.env.PGHOST,\n    port: process.env.PGPORT,\n    database: process.env.PGDATABASE,\n    application_name: process.env.APPNAME, // The name of the application that created this Client instance\n    connectionTimeoutMillis: process.env.CONTIME, // number of milliseconds to wait for connection, default is no timeout\n    idle_in_transaction_session_timeout: process.env.SESTIMEOUT, // number of milliseconds before terminating any session with an open idle transaction, default is no timeout\n    // ssl: {\n    //     rejectUnauthorized: false\n    // }\n};\nexports.serverConfig = {\n    jwtSecret: process.env.JWTSECRET,\n};\n\n\n//# sourceURL=webpack://todo-app-server/./src/config.ts?");

/***/ }),

/***/ "./src/controllers/queryController.ts":
/*!********************************************!*\
  !*** ./src/controllers/queryController.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createUser = createUser;\nexports.createGroup = createGroup;\nexports.getMyGroups = getMyGroups;\nexports.getGroupTasks = getGroupTasks;\nexports.deleteGroup = deleteGroup;\nexports.createTask = createTask;\nexports.updateTask = updateTask;\nexports.deleteTask = deleteTask;\nexports.loginUser = loginUser;\nconst queryModel_1 = __webpack_require__(/*! ../models/queryModel */ \"./src/models/queryModel.ts\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst config = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst JWT_SECRET = config.serverConfig.jwtSecret;\nconst qryClass = new queryModel_1.qryModel();\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nfunction createUser(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            yield bcrypt.hash(param['password'], 10).then(function (hash) { param['hash_password'] = hash; });\n            let result = yield qryClass.createUser(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, message: \"User Created Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, message: \"User Already Exists\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction createGroup(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.createGroup(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Group Created Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"Group Already Exists\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction getMyGroups(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.getMyGroups(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Group Data Fetched Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"No Data Found\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction getGroupTasks(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.getGroupTasks(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Group Tasks Fetched Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"No Data Found\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction deleteGroup(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.deleteGroup(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Group Deleted Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"NO Data Found\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction createTask(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        var _a;\n        try {\n            let result = yield qryClass.createTask(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Task Created Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"NO Data Found\" };\n                }\n            }\n            else {\n                if ((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes(\"tasks_group_id_fkey\")) {\n                    result['message'] = \"No Group found in id: \" + param.group_id;\n                }\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction updateTask(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.updateTask(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Task Updated Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"No Data Found\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction deleteTask(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        var _a;\n        try {\n            let result = yield qryClass.deleteTask(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    return { success: true, error: false, result: result.rows, message: \"Task deleted Successfully\" };\n                }\n                else {\n                    return { success: true, error: false, result: result.rows, message: \"NO Data Found\" };\n                }\n            }\n            else {\n                if ((_a = result.message) === null || _a === void 0 ? void 0 : _a.includes(\"tasks_group_id_fkey\")) {\n                    result['message'] = \"No Group found in id: \" + param.group_id;\n                }\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction loginUser(param) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield qryClass.loginUser(param);\n            if (result.success) {\n                if (result.rowCount > 0) {\n                    let crypt = yield bcrypt.compare(param.password, result.rows[0].hash_password);\n                    if (crypt) {\n                        delete result.rows[0].hash_password;\n                        return { success: true, error: false, result: result.rows[0], token: jwt.sign({ user_id: result.rows[0].user_id, email: result.rows[0].email }, JWT_SECRET, { expiresIn: '1h' }), message: \"User Logged In Successfully\" };\n                    }\n                    else {\n                        return { success: false, error: false, message: \"Invalid User Credentials\" };\n                    }\n                }\n                else {\n                    return { success: false, error: false, message: \"User Doesn't Exists\" };\n                }\n            }\n            else {\n                return { success: false, error: true, message: result.message };\n            }\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\n\n\n//# sourceURL=webpack://todo-app-server/./src/controllers/queryController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst express = __webpack_require__(/*! express */ \"express\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst mountEncryptRoute = __webpack_require__(/*! ./routes/auth_route */ \"./src/routes/auth_route.ts\");\nconst mountRoute = __webpack_require__(/*! ./routes/route */ \"./src/routes/route.ts\");\nconst basicAuth = __webpack_require__(/*! ./routes/_helpers/basic-auth */ \"./src/routes/_helpers/basic-auth.ts\");\nconst bearerAuth = __webpack_require__(/*! ./routes/_helpers/bearer-auth */ \"./src/routes/_helpers/bearer-auth.ts\");\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nconst pgconnect = __webpack_require__(/*! ./pgconnect */ \"./src/pgconnect.ts\");\ndotenv.config();\nconst app = express();\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(cors());\napp.use((req, res, next) => {\n    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');\n    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');\n    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');\n    next();\n});\napp.get('/', (req, res) => {\n    res.send(\"Welcome to Task To-do App Server\");\n});\napp.use('/', mountRoute);\napp.use(bearerAuth);\napp.use('/api', mountEncryptRoute);\nconst port = process.env.APPPORT;\napp.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        console.log(\"Task To-do App Server Listening on Port : \" + port);\n        let connect = yield pgconnect.connectDB();\n        console.info(connect.message);\n    }\n    catch (error) {\n        console.error(\"Error in connecting to PostgreSQL Database\", error);\n    }\n}));\nprocess.on('uncaughtException', (error) => {\n    console.error('Uncaught Exception:', error);\n    // Perform cleanup and exit process if necessary\n});\nprocess.on('unhandledRejection', (reason, promise) => {\n    console.error('Unhandled Rejection at:', promise, 'reason:', reason);\n    // Perform cleanup and exit process if necessary\n});\n\n\n//# sourceURL=webpack://todo-app-server/./src/index.ts?");

/***/ }),

/***/ "./src/models/queryModel.ts":
/*!**********************************!*\
  !*** ./src/models/queryModel.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.qryModel = void 0;\nconst pg = __webpack_require__(/*! ../pgconnect */ \"./src/pgconnect.ts\");\nclass qryModel {\n    createUser(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"INSERT INTO todo.users_data (email, full_name, mobile, hash_password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *;\";\n            let queryParam = [param.email, param.full_name, param.mobile, param.hash_password];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    loginUser(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            var _a, _b;\n            let queryText = \"SELECT user_id, email, hash_password FROM todo.users_data WHERE TRIM(LOWER(email)) = $1;\";\n            let queryParam = [(_b = (_a = param.email) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim()];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    createGroup(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"INSERT INTO todo.groups(group_name, group_owner_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;\";\n            let queryParam = [param.group_name, param.user_id];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    getMyGroups(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"SELECT g.group_id, g.group_name, COALESCE(g.updated_on, g.created_on) last_updated_on, ud.full_name group_owner_name, (SELECT CAST(COUNT(task_id) AS INT) FROM todo.tasks WHERE group_id = g.group_id AND completed LIMIT 1) completed_task_count, (SELECT CAST(COUNT(task_id) AS INT) FROM todo.tasks WHERE group_id = g.group_id AND NOT completed LIMIT 1) pending_task_count FROM todo.groups g LEFT JOIN todo.users_data ud ON ud.user_id = g.group_owner_id WHERE g.group_owner_id = $1;\";\n            let queryParam = [param.user_id];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    getGroupTasks(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"SELECT g.group_id, t.task_id, t.task_name, t.completed, COALESCE(t.updated_on, t.created_on) last_updated_on, ud.full_name group_owner_name FROM todo.tasks t LEFT JOIN todo.groups g ON g.group_id = t.group_id LEFT JOIN todo.users_data ud ON ud.user_id = g.group_owner_id WHERE g.group_id = $1 ORDER BY t.completed, last_updated_on;\";\n            let queryParam = [param.group_id];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    deleteGroup(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"DELETE FROM todo.groups WHERE group_id = $1;\";\n            let queryParam = [param.group_id];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    createTask(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"INSERT INTO todo.tasks (group_id, task_name) VALUES ($1, $2) RETURNING *;\";\n            let queryParam = [param.group_id, param.task_name];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    updateTask(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"UPDATE todo.tasks SET task_name = $2, completed = $3, updated_on = NOW() WHERE task_id = $1 RETURNING *;\";\n            let queryParam = [param.task_id, param.task_name, param.completed];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n    deleteTask(param) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let queryText = \"DELETE FROM todo.tasks WHERE task_id = $1;\";\n            let queryParam = [param.task_id];\n            return yield pg.executeScript(queryText, queryParam);\n        });\n    }\n}\nexports.qryModel = qryModel;\n\n\n//# sourceURL=webpack://todo-app-server/./src/models/queryModel.ts?");

/***/ }),

/***/ "./src/pgconnect.ts":
/*!**************************!*\
  !*** ./src/pgconnect.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.executeScript = executeScript;\nexports.connectDB = connectDB;\nconst { Pool } = __webpack_require__(/*! pg */ \"pg\");\nconst config = __webpack_require__(/*! ./config */ \"./src/config.ts\");\nconst pool = new Pool(config.pgConfig);\nfunction executeScript(query, parameters) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            let result = yield pool.query(query, parameters);\n            if (result) {\n                return { success: true, error: false, rows: result.rows, rowCount: result.rowCount };\n            }\n            ;\n            yield pool.end();\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\nfunction connectDB() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            yield pool.connect();\n            return { success: true, error: false, message: config.pgConfig.application_name + \" Connected to \" + config.pgConfig.host + \" PostgreSQL Database as \" + config.pgConfig.user + \" Successfully\" };\n        }\n        catch (error) {\n            return { success: false, error: true, message: new Error(error).message };\n        }\n    });\n}\npool.on('error', (err) => {\n    console.error('Unexpected error on idle client', err);\n    process.exit(-1);\n});\n\n\n//# sourceURL=webpack://todo-app-server/./src/pgconnect.ts?");

/***/ }),

/***/ "./src/routes/_helpers/basic-auth.ts":
/*!*******************************************!*\
  !*** ./src/routes/_helpers/basic-auth.ts ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst qryCntrl = __webpack_require__(/*! ../../controllers/queryController */ \"./src/controllers/queryController.ts\");\nmodule.exports = basicAuth;\nfunction basicAuth(req, res, next) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (req.path === '/users/authenticate') {\n            return next();\n        }\n        // check for basic auth header\n        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {\n            return res.status(401).json({ message: 'Missing Authorization Header' });\n        }\n        const base64Credentials = req.headers.authorization.split(' ')[1];\n        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');\n        const [email, password] = credentials.split(':');\n        const user = yield qryCntrl.loginUser({ email: email != '' ? email : undefined, password: password != '' ? password : undefined });\n        if (!user.success) {\n            return res.status(401).json({ message: user.message || 'Invalid Authentication Credentials' });\n        }\n        // attach user to request object\n        req.body = Object.assign({ user_id: user.result.user_id }, req.body);\n        next();\n    });\n}\n\n\n//# sourceURL=webpack://todo-app-server/./src/routes/_helpers/basic-auth.ts?");

/***/ }),

/***/ "./src/routes/_helpers/bearer-auth.ts":
/*!********************************************!*\
  !*** ./src/routes/_helpers/bearer-auth.ts ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst config = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nconst JWT_SECRET = config.serverConfig.jwtSecret;\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst authenticateToken = (req, res, next) => {\n    const authHeader = req.headers['authorization'];\n    const token = authHeader && authHeader.split(' ')[1];\n    if (!token)\n        return res.status(401).json({ message: 'Missing Authorization Header' });\n    jwt.verify(token, JWT_SECRET, (err, user) => {\n        if (err)\n            return res.status(403).json({ message: 'Invalid Token' });\n        req.body = Object.assign(req.body, user);\n        next();\n    });\n};\nmodule.exports = authenticateToken;\n\n\n//# sourceURL=webpack://todo-app-server/./src/routes/_helpers/bearer-auth.ts?");

/***/ }),

/***/ "./src/routes/auth_route.ts":
/*!**********************************!*\
  !*** ./src/routes/auth_route.ts ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst authRouter = (__webpack_require__(/*! express */ \"express\").Router)();\nconst authQryCntrl = __webpack_require__(/*! ../controllers/queryController */ \"./src/controllers/queryController.ts\");\nauthRouter.post(\"/groups/create\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.createGroup(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.get(\"/groups/own-list\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.getMyGroups(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.delete(\"/groups/:group_id\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.deleteGroup(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.post(\"/group/tasks\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.getGroupTasks(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.post(\"/group/tasks/create\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.createTask(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.post(\"/group/tasks/update\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.updateTask(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nauthRouter.delete(\"/group/tasks/:task_id\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield authQryCntrl.deleteTask(Object.assign(req.body, req.params));\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nmodule.exports = authRouter;\n\n\n//# sourceURL=webpack://todo-app-server/./src/routes/auth_route.ts?");

/***/ }),

/***/ "./src/routes/route.ts":
/*!*****************************!*\
  !*** ./src/routes/route.ts ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst router = (__webpack_require__(/*! express */ \"express\").Router)();\nconst qryCntrl = __webpack_require__(/*! ../controllers/queryController */ \"./src/controllers/queryController.ts\");\nrouter.get('/ping', (req, res) => {\n    res.json({ message: \"Pong\" });\n});\nrouter.post(\"/user/create\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield qryCntrl.createUser(req.body);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.post(\"/user/login\", (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield qryCntrl.loginUser(req.body);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nmodule.exports = router;\n\n\n//# sourceURL=webpack://todo-app-server/./src/routes/route.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;