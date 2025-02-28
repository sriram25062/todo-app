const pg = require("../pgconnect");

export class qryModel {
   
     async createUser(param: any) {
        let queryText: string = "INSERT INTO users.users_data (email, full_name, mobile, hash_password) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *;";
        let queryParam: any[] = [param.email, param.full_name, param.mobile, param.hash_password];
        return await pg.executeScript(queryText, queryParam);
     }

     async loginUser(param: any) {
        let queryText: string = "SELECT user_id, email, hash_password FROM users.users_data WHERE TRIM(LOWER(email)) = $1;";
        let queryParam: any[] = [param.email?.toLowerCase()?.trim()];
        return await pg.executeScript(queryText, queryParam);
     }

     async createGroup(param: any) {
        let queryText: string = "INSERT INTO list.groups(group_name, group_owner_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;";
        let queryParam: any[] = [param.group_name, param.user_id];
        return await pg.executeScript(queryText, queryParam);
     }
     
     async getMyGroups(param: any) {
        let queryText: string = "SELECT g.group_id, g.group_name, COALESCE(g.updated_on, g.created_on) last_updated_on, ud.full_name group_owner_name, (SELECT CAST(COUNT(task_id) AS INT) FROM list.tasks WHERE group_id = g.group_id AND completed LIMIT 1) completed_task_count, (SELECT CAST(COUNT(task_id) AS INT) FROM list.tasks WHERE group_id = g.group_id AND NOT completed LIMIT 1) pending_task_count FROM list.groups g LEFT JOIN users.users_data ud ON ud.user_id = g.group_owner_id WHERE g.group_owner_id = $1;";
        let queryParam: any[] = [param.user_id];
        return await pg.executeScript(queryText, queryParam);
     }
     
     async getGroupTasks(param: any) {
        let queryText: string = "SELECT g.group_id, t.task_id, t.task_name, t.completed, COALESCE(t.updated_on, t.created_on) last_updated_on, ud.full_name group_owner_name FROM list.tasks t LEFT JOIN list.groups g ON g.group_id = t.group_id LEFT JOIN users.users_data ud ON ud.user_id = g.group_owner_id WHERE g.group_id = $1 ORDER BY t.completed, last_updated_on;";
        let queryParam: any[] = [param.group_id];
        return await pg.executeScript(queryText, queryParam);
     }

     async deleteGroup(param: any) {
        let queryText: string = "DELETE FROM list.groups WHERE group_id = $1;";
      let queryParam: any[] = [param.group_id];
        return await pg.executeScript(queryText, queryParam);
     }

     async createTask(param: any) {
        let queryText: string = "INSERT INTO list.tasks (group_id, task_name) VALUES ($1, $2) RETURNING *;";
        let queryParam: any[] = [param.group_id, param.task_name];
        return await pg.executeScript(queryText, queryParam);
     }

     async updateTask(param: any) {
         let queryText: string = "UPDATE list.tasks SET task_name = $2, completed = $3, updated_on = NOW() WHERE task_id = $1 RETURNING *;";
         let queryParam: any[] = [param.task_id, param.task_name, param.completed];
         return await pg.executeScript(queryText, queryParam);
      }

     async deleteTask(param: any) {
        let queryText: string = "DELETE FROM list.tasks WHERE task_id = $1;";
        let queryParam: any[] = [param.task_id];
        return await pg.executeScript(queryText, queryParam);
     }
}