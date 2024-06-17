const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  try {
    let tensor = tf.node.decodeJpeg(image);
    if (tensor.shape[2] === 4) {
      // If the image has an alpha channel (4 channels), remove it
      tensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
    }

    tensor = tensor.resizeNearestNeighbor([224, 224]).expandDims(0).toFloat().div(tf.scalar(255));

    const classes = ["apel", "pisang", "mangga", "jeruk", "strawberry"];

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const formattedConfidenceScore = confidenceScore.toFixed(2) + "%";

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const fruitName = classes[classResult];

    console.log(fruitName);

    return { fruitName, formattedConfidenceScore };
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
}

module.exports = predictClassification;
