# Scalable REST API with Auth, RBAC, and Frontend Test UI

This project is a backend-first internship submission implementing secure authentication, role-based access control, task CRUD APIs, and a lightweight React UI for API testing.

## Tech Stack
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT, Zod
- Frontend: React (Vite, JavaScript)
- Security: bcrypt, helmet, express-rate-limit, express-mongo-sanitize
- API Docs: Swagger UI + Postman collection
- Testing: Jest + Supertest (smoke tests)

## Project Structure
- `backend/` - Auth, RBAC, task CRUD, middleware, Swagger
- `frontend/` - Register/login dashboard and task CRUD UI
- `postman/` - Postman collection
- `docs/` - Scalability note

## Setup Instructions

### 1) Clone and install dependencies
```bash
git clone <your-repo-url>
cd Rahul
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure backend environment
Create `backend/.env` from `backend/.env.example`:
```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/internship_api
JWT_SECRET=replace_with_long_secret_key
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
```

### 3) Run backend
```bash
cd backend
npm run dev
```
Backend starts at `http://localhost:3000`

### 4) Run frontend
```bash
cd frontend
npm run dev
```
Frontend starts at `http://localhost:5173`

## API Documentation
- Swagger: `http://localhost:3000/api-docs`
- Postman collection: `postman/Internship-API.postman_collection.json`

## Core Endpoints
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`
- `GET /api/v1/admin/users` (admin only)
- `DELETE /api/v1/admin/tasks/:id` (admin only)

## Sample Input/Output

### Register Request
```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "password123",
  "role": "user"
}
```

### Register Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "661a7f4e8d9f2e0012a12345",
      "name": "Rahul",
      "email": "rahul@example.com",
      "role": "user"
    },
    "token": "<jwt_token>"
  }
}
```

## Testing

### Backend tests
```bash
cd backend
npm test
```

### Frontend build check
```bash
cd frontend
npm run build
```

## Edge Cases Handled
- Duplicate email registration (`409`)
- Invalid credentials (`401`)
- Missing token (`401`)
- Invalid/expired token (`401`)
- Unauthorized access to other user's task (`403`)
- Non-existent task (`404`)
- Validation errors with clear messages (`422`)

## Security Practices
- Password hashing with bcrypt
- JWT-based protected routes
- Role-based middleware (`user` vs `admin`)
- Input validation via Zod
- Request sanitization against NoSQL injection
- Security headers and rate limiting

## How This Demonstrates Evaluation Criteria
- Clean REST API design and correct status codes
- MongoDB schema modeling for users/tasks
- Strong auth + authorization implementation
- Functional frontend integration with protected APIs
- Scalability-ready modular structure and architecture note

## Interview-Ready Explanation Lines
1. I designed and implemented a production-style Express API with JWT authentication, role-based access control, and versioned REST endpoints to ensure secure and maintainable growth.
2. I applied practical backend security controls including password hashing, input validation, rate limiting, and NoSQL sanitization while keeping the API developer-friendly through Swagger docs.
3. I delivered full-stack ownership by integrating a React dashboard that consumes protected APIs end-to-end for registration, login, and task lifecycle operations.

## Skills Demonstrated
- Backend API design and Express architecture
- Authentication and authorization patterns
- Database schema design with MongoDB
- Frontend API integration with React
- Documentation, testing, and delivery readiness
