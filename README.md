# CW1 Project: Secure API Middleware for Country Data

## Overview

This project implements a secure API middleware service that interfaces with the **RestCountries.com API**, offering essential country data like name, currency information, capital city, spoken languages, and national flags. The application includes a fully-featured authentication system, including user registration, login, API key management, and security protections. All sensitive data is securely stored in an SQLite database, with password hashing and session management in place.

### Features:
- Fetch country information (name, currency, capital city, languages, flag) from RestCountries API
- User registration and login with secure password hashing
- API key generation and management for authenticated users
- Robust error handling and data validation
- All services are Dockerized for easy deployment and scalability

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
  - [User Authentication](#user-authentication)
    - [Register a new user](#register-a-new-user)
    - [Login and obtain an API key](#login-and-obtain-an-api-key)
  - [Retrieve Country Information](#retrieve-country-information)
- [Security Features](#security-features)
  - [API Key Authentication](#api-key-authentication)
  - [Other Security Protections](#other-security-protections)
- [Deployment Guide](#deployment-guide)

## Setup Instructions

### Prerequisites

Before starting, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. **Install backend dependencies:**

    Navigate to the `backend` folder and install the Python dependencies:

    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3. **Install frontend dependencies:**

    Navigate to the `frontend` folder and install the JavaScript dependencies:

    ```bash
    cd frontend
    npm install
    ```

4. **Build and start the Docker containers:**

    From the project root, run:

    ```bash
    docker-compose up --build
    ```

5. Once the containers are up and running, access the application:
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend: [http://localhost:5001](http://localhost:5001)

## API Documentation

### User Authentication

#### 1. Register a new user

**Endpoint:** `POST /register`  
**Request Body:**


```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### 2. Login and obtain an API key

**Endpoint:** `POST /login`  
**Request Body:**


```json
{
  "username": "testuser",
  "password": "test123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "api_key": "some-api-key"
}
```

Note: Use the api_key from the response for subsequent API requests.

### Retrieve Country Information

**Endpoint:** `GET /api/country/<country_name>`  
**Headers:**


```json
Key | Value
X-API-Key | api-key-here
```
**Response:**
```json
{
  "capital": "Paris",
  "currencies": {
    "EUR": {
      "name": "Euro",
      "symbol": "\u20ac"
    }
  },
  "flag": "https://flagcdn.com/w320/fr.png",
  "languages": {
    "fra": "French"
  },
  "name": "France"
}
```

Note: Use the api_key from the response for subsequent API requests.

## Security Features
### API Key Authentication

**API Key Validation:**
Each request to the ```/api/country/<country_name> ``` endpoint requires a valid API key.

**API Key Storage:** API keys are securely stored in the database. Passwords are hashed using bcrypt, and sessions are managed using secure tokens.

**Access Control:** Requests without an API key or with an invalid key will be rejected with appropriate error messages.

## Other Security Protections

**Password Hashing:** User passwords are hashed using bcrypt before being stored in the database.

**Input Validation:** All user inputs are validated and sanitized to prevent SQL injection and other common security issues.

**Session Management:** Once logged in, the user receives a session token, which is required for subsequent requests to secure endpoints.

## Deployment Guide
### Docker Deployment
Build the Docker images:

From the project root, run:
```docker-compose up --build```

This will start the backend and frontend services in Docker containers.

