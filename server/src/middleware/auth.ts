import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('offheader', authHeader);

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    if (decoded) {
      req.user = decoded as JwtPayload; // Cast to JwtPayload to ensure type safety
      return next();
    } else {
      return res.sendStatus(403); // Forbidden
    }
  });

  // Add a return statement to ensure all code paths return
  return;
};
