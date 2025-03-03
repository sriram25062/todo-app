import { qryModel } from "../models/queryModel"
const bcrypt = require("bcrypt");
const JWT_SECRET = 'Xh7#$sQW2KlP@1!Zm3ByN8$Vr5Ux&TgJ';
const qryClass = new qryModel();
const jwt = require('jsonwebtoken');

export async function createUser(param: any) {
    try {
        await bcrypt.hash(param['password'], 10).then(function(hash: any) { param['hash_password'] = hash; });
        let result = await qryClass.createUser(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, message: "User Created Successfully" }
            } else {
                return { success: true, error: false, message: "User Already Exists" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function createGroup(param: any) {
    try {
        let result = await qryClass.createGroup(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Group Created Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "Group Already Exists" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function getMyGroups(param: any) {
    try {
        let result = await qryClass.getMyGroups(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Group Data Fetched Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "No Data Found" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function getGroupTasks(param: any) {
    try {
        let result = await qryClass.getGroupTasks(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Group Tasks Fetched Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "No Data Found" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function deleteGroup(param: any) {
    try {
        let result = await qryClass.deleteGroup(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Group Deleted Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "NO Data Found" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function createTask(param: any) {
    try {
        let result = await qryClass.createTask(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Task Created Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "NO Data Found" }
            }
        } else {
            if(result.message?.includes("tasks_group_id_fkey")) { result['message'] = "No Group found in id: " + param.group_id }
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function updateTask(param: any) {
    try {
        let result = await qryClass.updateTask(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Task Updated Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "No Data Found" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function deleteTask(param: any) {
    try {
        let result = await qryClass.deleteTask(param);
        if(result.success) {
            if(result.rowCount > 0) {
                return { success: true, error: false, result: result.rows, message: "Task deleted Successfully" }
            } else {
                return { success: true, error: false, result: result.rows, message: "NO Data Found" }
            }
        } else {
            if(result.message?.includes("tasks_group_id_fkey")) { result['message'] = "No Group found in id: " + param.group_id }
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}

export async function loginUser(param: any) {
    try {
        let result = await qryClass.loginUser(param);
        if(result.success) {
            if(result.rowCount > 0) {
                let crypt = await bcrypt.compare(param.password, result.rows[0].hash_password);
                if(crypt) {
                    delete result.rows[0].hash_password;
                    return { success: true, error: false, result: result.rows[0], token: jwt.sign({ user_id: result.rows[0].user_id, email: result.rows[0].email }, JWT_SECRET, { expiresIn: '1h' }), message: "User Logged In Successfully" }
                } else {
                    return { success: true, error: false, message: "Invalid User Credentials" }
                }
            } else {
                return { success: true, error: false, message: "User Doesn't Exists" }
            }
        } else {
            return { success: false, error: true, message: result.message }
        }
    } catch (error: any) {
        return { success: false, error: true, message: new Error(error).message }
    }
}