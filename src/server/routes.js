const { register, login, updateUser, deleteUser, getUser } = require("../server/userHandler");
const { verifyToken } = require("../middleware/authentikasi");
const { getFruit, getHistory } = require("../server/fruitHandler");

const routes = [
  {
    method: "POST",
    path: "/register",
    handler: register,
  },
  {
    method: "POST",
    path: "/login",
    handler: login,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: updateUser,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUser,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    handler: getUser,
    options: {
      pre: [{ method: verifyToken }],
    },
  },

  {
    method: "POST",
    path: "/fruit",
    handler: getFruit,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    path: "/history",
    method: "GET",
    handler: getHistory,
  },
];

module.exports = routes;
