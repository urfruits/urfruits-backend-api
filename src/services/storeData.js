const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, createdAt, data) {
  const db = new Firestore({
    databaseId: "urfruit",
  });

  const predictCollection = db.collection("history");
  const docData = {
    id: id,
    createdAt: createdAt,
    ...data,
  };

  return predictCollection.doc(id).set(docData);
}

module.exports = storeData;
