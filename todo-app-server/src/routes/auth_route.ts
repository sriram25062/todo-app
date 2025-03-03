const authRouter = require("express").Router();

const authQryCntrl = require("../controllers/queryController");

authRouter.post("/groups/create", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.createGroup(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.get("/groups/own-list", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.getMyGroups(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.delete("/groups/:group_id", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.deleteGroup(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.post("/group/tasks", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.getGroupTasks(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.post("/group/tasks/create", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.createTask(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.post("/group/tasks/update", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.updateTask(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

authRouter.delete("/group/tasks/:task_id", async (req: any, res: any) => {
    try {
        let result = await authQryCntrl.deleteTask(Object.assign(req.body, req.params));
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

module.exports = authRouter;