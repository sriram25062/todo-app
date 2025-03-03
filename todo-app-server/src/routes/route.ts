const router = require("express").Router();

const qryCntrl = require("../controllers/queryController");

router.get('/ping', (req: any, res: any) => {
    res.json({ message: "Pong" })
});

router.post("/user/create", async (req: any, res: any) => {
    try {
        console.log(req.body)
        let result = await qryCntrl.createUser(req.body);
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

router.post("/user/login", async (req: any, res: any) => {
    try {
        let result = await qryCntrl.loginUser(req.body);
        res.json(result);
    } catch (e: any) {
        res.json({ success: false, error: true, message: e.message });
    }
});

module.exports = router;