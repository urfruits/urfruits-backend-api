const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const { getUserByEmail } = require("../services/authServices");

const verifyToken = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return h
      .response({
        status: "gagal",
        message: "No token provided",
      })
      .code(401)
      .takeover();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userSnapshot = await getUserByEmail(decoded.email);
    if (userSnapshot.empty) {
      return h
        .response({
          status: "gagal",
          message: "User not found",
        })
        .code(401)
        .takeover();
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Attach user information to the request object
    request.user = user;
    request.user.id = userDoc.id;
    return h.continue;
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "gagal",
        message: "Invalid token",
      })
      .code(401)
      .takeover();
  }
};

module.exports = { verifyToken };
