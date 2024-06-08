const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser, updateUserById, deleteUserById, getUserById } = require("../services/authServices");
const { JWT_SECRET } = require("../../config");

//Register
const register = async (request, h) => {
  const { name, email, password } = request.payload;

  try {
    // Check if user already exists
    const userSnapshot = await getUserByEmail(email);
    if (!userSnapshot.empty) {
      return h
        .response({
          status: "gagal",
          message: "User already exists",
        })
        .code(400);
    }

    //enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };

    // Create the user and get the document reference
    const userRef = await createUser(userData);

    // Get the documentId
    const id = userRef.id;

    // Update the user document with the documentId
    await userRef.update({ id });

    return h
      .response({
        status: "success",
        message: "User registered successfully",
        user: {
          id,
          email,
          name,
        },
      })
      .code(201);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "gagal",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

//Login
const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    // ngecek email user
    const userSnapshot = await getUserByEmail(email);
    if (userSnapshot.empty) {
      return h
        .response({
          status: "gagal",
          message: "Invalid email or password",
        })
        .code(400);
    }

    //ngambil data user
    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return h
        .response({
          status: "gagal",
          message: "Invalid email or password",
        })
        .code(400);
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "12h" });
    // const token = jwt.sign({email}, JWT_SECRET, { expiresIn: "12h" });
    await userDoc.ref.update({ token });

    return h
      .response({
        status: "success",
        message: "Login successful",
        user: {
          id: userDoc.id,
          email: user.email,
          name: user.name,
          token,
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "gagal",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

//Update User
const updateUser = async (request, h) => {
  const userId = request.params.id;
  const { name, email, password } = request.payload;

  try {
    const updatedData = request.payload;
    // let token;

    // enkripsi password baru
    let hashedPassword = undefined;
    if (updatedData.password) {
      hashedPassword = await bcrypt.hash(updatedData.password, 10);
    }

    // if (updatedData.email && updatedData.email !== request.user.email) {
    //   token = jwt.sign({id: userId}, JWT_SECRET, { expiresIn: "12h" });
    //   // token = jwt.sign({ email: updatedData.email }, JWT_SECRET, { expiresIn: "12h" });
    //   updatedData.token = token;
    // }

    //update user
    await updateUserById(userId, updatedData);

    const responseData = {
      status: "success",
      message: "User updated successfully",
    };
    // if (token) {
    //   responseData.token = token; // Include the new token in the response if email was updated
    // }

    return h.response(responseData).code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "gagal",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

//delete user
const deleteUser = async (request, h) => {
  const userId = request.params.id;

  try {
    await deleteUserById(userId);

    return h
      .response({
        status: "success",
        message: "User deleted successfully",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "success",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

//get user
const getUser = async (request, h) => {
  const userId = request.params.id;

  try {
    const userSnapshot = await getUserById(userId);

    //cek user ada atau tidak
    if (!userSnapshot.exists) {
      return h
        .response({
          status: false,
          message: "User not found",
        })
        .code(404);
    }

    const user = userSnapshot.data();
    delete user.password;

    return h
      .response({
        status: "success",
        data: user,
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "success",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

module.exports = { register, login, updateUser, deleteUser, getUser };
