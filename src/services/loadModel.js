const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  try {
    // Log untuk memastikan MODEL_URL diatur dengan benar
    console.log("Loading model from URL:", process.env.MODEL_URL);

    // Muat model menggunakan URL yang diberikan
    const model = await tf.loadLayersModel(process.env.MODEL_URL);
    console.log("Model loaded successfully");

    return model;
  } catch (error) {
    // Tambahkan informasi lebih detail dalam penanganan kesalahan
    console.error("Error loading model:", error.message);
  }
}

// Ekspor fungsi loadModel
module.exports = loadModel;
