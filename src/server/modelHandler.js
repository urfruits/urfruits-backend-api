// const predictClassification = require("../services/authServices");

// async function postPredictHandler(request, h) {
//   const { image } = request.payload;
//   const { model } = request.server.app;

//   const { label, suggestion } = await predictClassification(model, image);

//   const data = {
//     id: id,
//     result: label,
//   };

//   const response = h.response({
//     status: "success",
//     message: "Model is predicted successfully",
//     data,
//   });
//   response.code(201);
//   return response;
// }


// module.exports = { postPredictHandler };
