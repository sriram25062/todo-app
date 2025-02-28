import { NextFunction, Request, Response } from "express";

const qryCntrl = require("../../controllers/queryController");

module.exports = basicAuth;

async function basicAuth(req: Request, res: Response, next: NextFunction) {

    if (req.path === '/users/authenticate') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    const user = await qryCntrl.loginUser({ email: email != '' ? email : undefined, password: password != '' ? password : undefined });
    if (!user.success) {
        return res.status(401).json({ message: user.message || 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.body = Object.assign({ user_id: user.result.user_id }, req.body);

    next();
}