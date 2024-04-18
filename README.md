# Web Application Name

## Running Locally

To run this web application locally on your machine, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js**: You can download and install Node.js from the [official website](https://nodejs.org/).
   
### Setup Instructions

1. **Clone the Repository**:
git clone [<repository-url>](https://github.com/Johann-Uytanlet/Mern.git)


2. **Navigate to the Frontend Folder**:
cd frontend


3. **Install Dependencies**:
npm install


4. **Run the Frontend Server**:
npm run dev

5. **Open Another Terminal**:

6. **Navigate to the Backend Folder**:

cd ../backend


7. **Install Backend Dependencies**:
npm install


8. **Run the Backend Server**:
npm run dev


### Accessing the Application

Once both the frontend and backend servers are running, you can access the application by opening your web browser and navigating to:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5555`

### Development Mode

- Running `npm run dev` starts the application in development mode, which enables hot-reloading for frontend changes and restarts the backend server on code changes.

### Production Build

- To build the application for production, you can run `npm run build` in the frontend folder. This will create an optimized build of your frontend code in the `build` folder.
- For the backend, ensure that you have appropriate configurations for deploying to a production environment.

### Additional Notes

- Make sure to configure environment variables, API endpoints, and other settings as needed for your local development environment.
- For more detailed instructions on running the application and configuring specific features, refer to the documentation provided in the project repository.

