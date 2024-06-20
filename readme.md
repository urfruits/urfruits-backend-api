# Cloud Computing (CC) Branch

This branch is for the cloud computing part of our capstone project. The code in this branch implements a REST API to support the backend of the UrFruits mobile application features. We also use Google Cloud Platform to use the cloud services.

## Installation

1. Enable 3 Google Cloud API : Artifact Registry, Cloud Build, Cloud Run.
   
       gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com
2. Clone this repository to your Cloud CLI using
   
       https://github.com/urfruits/urfruits-backend-api.git
3. Navigate to the cloned repository directory.

        cd [directory path]
5. Make an Artifact Repository from the cloned repository 
   
       gcloud artifacts repositories create <repository name> --repository-format=docker --location=asia-southeast2 --async
   
7. Build an Image from that Artifact Registry 

        gcloud builds submit --tag asia-southeast2-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/<repository name>/<image name>:<version>
   
9. Deploy the service by running, and wait for the deployment process to complete.

        gcloud run deploy --image asia-southeast2-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/<repository name>/<image name>:<version>
   
11. Once deployed, the service is ready to be used!

## Features

There are several routes in the backend of this API service based on their features. Here is the route list:

1. **Predict Data Buah (ML Feature)** : `POST /fruit` , This API endpoint is use to run ML model to predict fruit based on image.
2. **User Register** : `POST /register` , This endpoint is used to register a new user in the URfruits backend API.
3. **User Login** : `POST /login` , This endpoint is used to authenticate a user and obtain a token for accessing protected resources.
4. **Edit Data User** : `PUT /users/:id` , This endpoint is used to update the details of a specific user.
5. **Get User** : `GET /users/:id` , This endpoint retrieves the details of a user with the specified ID.
6. **Delete User** : `DELETE /users/:id` , This endpoint delete a user with the specified ID.
7. **Get Data Tanaman Buah** : `GET /fruit/:namabuah`  , This API endpoint retrieves details of a specific fruit based on the provided fruit name.
8. **Get History** : `GET /history`  , This API endpoint retrieves history for all request to fruits database.

For more information, you can visit our **Postman API Documentation** on : [API Documentation](https://documenter.getpostman.com/view/35363736/2sA3XJnRTW).

## Contact Information

If you have any questions, feedback, or suggestions related to the cloud computing branch, feel free to reach out to us at :

- Hernanda Dzaki Permana c006d4ky0232@bangkit.academy
- Santiago Sylvantoni c006d4ky0281@bangkit.academy 

## Acknowledgements

We also extend our heartfelt gratitude to the following individuals for their invaluable contributions to the success of our cloud computing project

- Hernanda Dzaki Permana (Core CC Team)
- Santiago Sylvantoni (Core CC Team)
- Capstone Project Group C241-PS415
- Bangkit Mentor
