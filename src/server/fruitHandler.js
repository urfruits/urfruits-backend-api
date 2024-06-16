const Firestore = require("@google-cloud/firestore");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData");
const predictClassification = require("../services/inferenceModel");

const db = new Firestore({
  databaseId: "urfruit",
});

//Fungsi Handler untuk hasil prediksi ML Buah
const getPredictFruit = async (request, h) => {
  // Ambil parameter 'name' dari URL
  const { image } = request.payload;
  const { model } = request.server.app;

  try {
    const { fruitName, formattedConfidenceScore } = await predictClassification(model, image);

    const fruitDoc = await db.collection("fruit").doc(fruitName).get();
    // Cek nama buah
    if (fruitDoc.exists) {
      const fruitData = fruitDoc.data();
      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      await storeData(id, createdAt, fruitData, formattedConfidenceScore);

      return h
        .response({
          status: "success",
          message: "Fruit found",
          data: {
            id,
            createdAt,
            confidenceScore: formattedConfidenceScore,
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

//Fungsi Handler untuk mengambil data buah 
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

//Fungsi Handler untuk mengambil history
async function getHistory(request, h) {
  const allData = await loadData();
  const response = h.response({
    status: "success",
    data: allData,
  });
  response.code(200);
  return response;
}
module.exports = { getFruit, getPredictFruit, getHistory };
