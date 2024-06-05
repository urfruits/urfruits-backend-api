const Firestore = require("@google-cloud/firestore");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData")

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
      const fruitData = fruitDoc.data();
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
    
      await storeData(id, createdAt, fruitData);

      return h
        .response({
          status: "success",
          message: "Fruit found",
          data: {
            id,
            createdAt,
            ...fruitData,
          },
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

async function getHistory(request, h) {
  const allData = await loadData();
  const response = h.response({
    status: "success",
    data: allData,
  });
  response.code(200);
  return response;
}
module.exports = { getFruit, getHistory };
