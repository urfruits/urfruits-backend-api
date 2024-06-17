const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, createdAt, data, formattedConfidenceScore) {
  const db = new Firestore({
    databaseId: "urfruit",
  });

  const predictCollection = db.collection("history");
  const docData = {
    id: id,
    createdAt: createdAt,
    ...(formattedConfidenceScore !== undefined ? { confidenceScore: formattedConfidenceScore } : {confidenceScore: null}),
    ...data,
  };

  return predictCollection.doc(id).set(docData);
}

module.exports = storeData;
