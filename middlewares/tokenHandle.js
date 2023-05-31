const usuario = require("../models/usuario");
const { sign, verify } = require("jsonwebtoken");
const { comparePass } = require("./encryptPass");

const secret = "mySecretToken";
const accessTokenExpiration = "6h";

// Middleware que verifica la autenticación con Basic Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  // Decodificamos el token en Base64 y comparamos las credenciales de usuario
  const decoded = Buffer.from(token, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  // Verificamos las credenciales con Sequelize (asumiendo que tenemos un modelo User)
  usuario
    .findOne({ where: { nombre: username } })
    .then((user) => {
      if (!user) {
        return res.sendStatus(403);
      } else {
        // Verificar la contraseña del usuario aquí usando bcrypt o alguna otra biblioteca
        const comparePassword = comparePass(password, user.password);
        if (!comparePassword)
          return res.status(400).json({ msg: "Contraseña incorrecta" });
        req.user = user;
        next();
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
}

// Función que genera un Basic Token
function generateBasicToken(username, password) {
  const token = `${username}:${password}`;
  const base64Token = Buffer.from(token, "utf-8").toString("base64");
  const basicToken = `${base64Token}`;
  return basicToken;
}

//create token JWT
const createTokenJWT = (payload) => {
  return sign(payload, secret, { expiresIn: accessTokenExpiration });
};

const createRefreshToken = (payload) => {
  return sign(payload, secret, { expiresIn: "6d" });
};

const verifyToken = (token) => {
  try {
    const decoded = verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Token Invalido");
  }
};

const checkType = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No se encontró token" });
  try {
    const decoded = verifyToken(token);
    if (decoded.tipo !== "STAFF") {
      next();
    } else {
      res.status(401).json({ msg: "No estas autorizado" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Token invalido" });
  }
};

module.exports = {
  createTokenJWT,
  createRefreshToken,
  verifyToken,
  checkType,
//   authenticateToken,
  generateBasicToken,
};
