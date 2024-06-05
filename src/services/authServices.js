const Firestore = require("@google-cloud/firestore");

//inisiasi firestore dan collection users
const db = new Firestore({
  databaseId: "urfruit",
});
const usersCollection = db.collection("users");

//ambil user berdasarkan email
const getUserByEmail = async (email) => {
  return await usersCollection.where("email", "==", email).get();
};

//create new ser
const createUser = (userData) => {
  return db.collection("users").add(userData);
};

//update user berdasarkan Id
const updateUserById = async (id, user) => {
  const userDoc = usersCollection.doc(id);
  const updateData = {};

  if (user.email !== undefined) {
    updateData.email = user.email;
  }

  if (user.password !== undefined) {
    updateData.password = user.password;
  }

  if (user.name !== undefined) {
    updateData.name = user.name;
  }

  return await userDoc.update(updateData);
};

//hapus user berdasarkan Id
const deleteUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return await userDoc.delete();
};

//ambil dara user berdasarkan Id
const getUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return await userDoc.get();
};

module.exports = { getUserByEmail, createUser, updateUserById, deleteUserById, getUserById };
