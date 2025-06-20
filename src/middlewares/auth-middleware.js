// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: "http://localhost:3001/.well-known/jwks.json",
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function authMiddleware(required = true) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      if (required) {
        return res.status(401).json({ error: "Missing or invalid token" });
      } else {
        return next();
      }
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        issuer: "http://localhost:3001",
        audience: "microservice-app",
      },
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid or expired token" });
        }

        req.user = {
          id: decoded.sub,
          email: decoded.email,
          roles: decoded.roles || [],
        };

        next();
      }
    );
  };
}

export default authMiddleware;
