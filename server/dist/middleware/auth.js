import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        if (decoded) {
            req.user = decoded; // Cast to JwtPayload to ensure type safety
            return next();
        }
        else {
            return res.sendStatus(403); // Forbidden
        }
    });
    // Add a return statement to ensure all code paths return
    return;
};
