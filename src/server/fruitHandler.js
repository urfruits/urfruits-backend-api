const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  databaseId: "urfruit",
});

const getFruit = async (request, h) => {
  // Ambil parameter 'name' dari URL
  const fruitName = request.params.name.toLowerCase();

  try {
    const fruitDoc = await db.collection("fruit").doc(fruitName).get();
    // Cek nama buah
    if (fruitDoc.exists) {
      return h
        .response({
          status: "success",
          message: "Fruit found",
          data: fruitDoc.data(),
        })
        .code(200);
    } else {
      return h
        .response({
          status: "fail",
          message: "Fruit not found",
        })
        .code(404);
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return h
      .response({
        status: "error",
        message: "Internal Server Error",
      })
      .code(500);
  }
};
module.exports = { getFruit };
