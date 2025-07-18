# Mini Node.js/Express API
A simple REST API for managing users with GET and POST endpoints.

## Setup
1. Clone the repository: `git clone https://github.com/dreamofarsss/practice.git`
2. Install dependencies: `npm install`
3. Create a `.env` file (see Environment Variables below).
4. Start the server: `npm start`

## Endpoints
- **GET /api/users**: Retrieve all users.
- **POST /api/users**: Create a new user.

## Environment Variables
This project requires a `.env` file in the root directory to configure the application. Create a `.env` file with the following variables:

```plaintext
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
