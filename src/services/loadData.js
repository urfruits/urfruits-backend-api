const { Firestore } = require("@google-cloud/firestore");

async function loadData() {
  const db = new Firestore({
    databaseId: "urfruit"
  });
  const snapshotData = await db.collection("history").get();
  const allData = [];
  snapshotData.forEach((doc) => {
    allData.push({
      id: doc.id,
      history: doc.data(),
    });
  });
  return allData;
}

module.exports = loadData;
