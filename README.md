# Job Recommendation System
## Recommended Jobs LIVE API URL FOR TEST: `POST https://peopelbox-jobrecommend.up.railway.app//api/v1/job/recommend`

## Overview
The Job Recommendation System is a web application that helps users find job postings based on their skills, experience level, and preferences. The application allows users to create profiles, save job postings, and receive job recommendations tailored to their qualifications.

## Features
- **User Management**: Create, retrieve, and manage user profiles.
- **Job Management**: Create, retrieve, and delete job postings.
- **Job Recommendations**: Get job recommendations based on user skills and preferences.
- **RESTful API**: Provides endpoints for user and job management.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and job data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JavaScript**: Programming language used for both front-end and back-end development.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/saran-mani/peoplebox-assignment.git
   cd peoplebox-assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```bash
   MONGODB_URI=<mongodb_connection_string>
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## API Documentation

### Job Management API

#### Base URL
`http://localhost:3000/api/v1/job`

- **Get All Jobs**: `GET /`
- **Create Job**: `POST /`
- **Get Job by ID**: `GET /:id`
- **Delete Job**: `DELETE /:id`
- **Recommended Jobs**: `POST /recommend`

### User Management API

#### Base URL
`http://localhost:3000/api/v1/user`

- **Get All Users**: `GET /`
- **Create User**: `POST /`
- **Get User by ID**: `GET /:id`