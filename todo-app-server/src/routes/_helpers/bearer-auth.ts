import { NextFunction, Request, Response } from "express";
const config = require('../../config');
const JWT_SECRET = config.serverConfig.jwtSecret;

const jwt = require('jsonwebtoken');

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Missing Authorization Header' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.body = Object.assign(req.body, user);
    next();
  });
};

module.exports = authenticateToken;
