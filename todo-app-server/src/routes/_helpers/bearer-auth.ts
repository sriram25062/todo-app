import { NextFunction, Request, Response } from "express";
const JWT_SECRET = 'Xh7#$sQW2KlP@1!Zm3ByN8$Vr5Ux&TgJ';

const jwt = require('jsonwebtoken');

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Missing Authorization Header' });

  if(req.originalUrl == '/api/groups/own-list') console.log('Token:', token);
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.body = Object.assign(req.body, user);
    if(req.originalUrl == '/api/groups/own-list') console.log("req.body", req.body)
    next();
  });
};

module.exports = authenticateToken;
