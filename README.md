# Fit Plan Hub

Fit Plan Hub is a full-stack MERN application that serves as a marketplace for fitness plans. It connects fitness trainers with trainees, allowing trainers to create and sell their fitness courses, and trainees to browse, subscribe, and follow their favorite trainers. The platform features role-based access control, providing distinct functionality for trainers and trainees.

## Features

**For Trainers:**
- **Secure Authentication:** Register and log in as a trainer.
- **Course Management Dashboard:** A central place to manage all created fitness plans.
- **Create Plans:** Add new fitness plans with a title, description, price, and duration.
- **Update Plans:** Edit the details of existing fitness plans.
- **Delete Plans:** Remove fitness plans from the platform.

**For Trainees:**
- **Secure Authentication:** Register and log in as a trainee.
- **Discover Plans:** Browse a feed of all available fitness plans from various trainers.
- **Subscribe to Plans:** Purchase and gain access to the details of a fitness plan.
- **View Subscriptions:** See a list of all subscribed plans.
- **Follow System:** Follow and unfollow favorite trainers to keep track of their offerings.

**General:**
- **Role-Based Access:** The user experience and available actions are tailored to whether the user is a trainer or a trainee.
- **Dark/Light Mode:** A theme-switching toggle for user preference.
- **JWT Authentication:** Secure API endpoints using JSON Web Tokens.

## Tech Stack

- **Backend:**
  - **Framework:** Node.js, Express.js
  - **Database:** MongoDB with Mongoose ODM
  - **Authentication:** JSON Web Token (JWT), bcrypt.js
  - **Middleware:** CORS

- **Frontend:**
  - **Framework/Library:** React.js, Vite
  - **Styling:** Tailwind CSS
  - **Routing:** React Router
  - **API Communication:** Axios

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

```
.
├── backend/
│   ├── config/       # MongoDB connection setup
│   ├── controllers/  # Business logic for API routes
│   ├── middleware/   # Authentication middleware
│   ├── models/       # Mongoose schemas (User, Course, Subscription)
│   ├── routes/       # API route definitions
│   └── server.js     # Express server entry point
└── frontend/
    ├── src/
    │   ├── components/   # Reusable React components (Navbar, etc.)
    │   ├── context/      # Authentication context for global state
    │   ├── pages/        # Page components (Login, Signup, Dashboards)
    │   └── services/     # Axios API client configuration
    └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm (or your preferred package manager)
- MongoDB (local instance or a cloud service like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file** in the `backend` root and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The backend server will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

## API Endpoints

All protected routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint                    | Description                           | Protected |
| :----- | :-------------------------- | :------------------------------------ | :-------- |
| `POST` | `/api/auth/signup`          | Register a new user (trainee/trainer) | No        |
| `POST` | `/api/auth/login`           | Log in a user                         | No        |
| `POST` | `/api/trainer/course`       | Create a new fitness course           | Yes       |
| `GET`  | `/api/trainer/my-courses`   | Get all courses for the logged-in trainer | Yes       |
| `PUT`  | `/api/trainer/course/:id`   | Update a specific course              | Yes       |
| `DELETE`| `/api/trainer/course/:id`   | Delete a specific course              | Yes       |
| `GET`  | `/api/trainee/courses`      | Get all available courses from all trainers | Yes       |
| `POST` | `/api/trainee/subscribe`    | Subscribe the trainee to a course     | Yes       |
| `GET`  | `/api/trainee/my-subscriptions`| Get all subscriptions for the logged-in trainee | Yes       |
| `POST` | `/api/trainee/follow`       | Follow or unfollow a trainer          | Yes       |
| `GET`  | `/api/trainee/following`    | Get all trainers the trainee is following | Yes       |


SSCREENSHOTS
<img width="1197" height="902" alt="Screenshot 2025-12-14 202439" src="https://github.com/user-attachments/assets/18172cdd-6687-478a-b07f-25699261b948" />


<img width="1920" height="1080" alt="Screenshot (346)" src="https://github.com/user-attachments/assets/fc2f9926-9ae2-4f66-baee-8d10e3af9b19" />

<img width="1894" height="804" alt="Screenshot 2025-12-14 202903" src="https://github.com/user-attachments/assets/04dadba8-4828-461c-9206-fe6ea74963ab" />




