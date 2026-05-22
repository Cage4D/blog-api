# Blog API

A scalable RESTful Blog API built with Node.js and Express for managing blog posts, users, authentication, comments, and more.

---

## Features

- User authentication with JWT
- Create, read, update, and delete blog posts
- Comment system
- Protected routes and authorization
- Input validation & error handling
- RESTful API architecture
- MongoDB database integration
- Environment-based configuration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- dotenv

---

## Project Structure

```bash
blog-api/
│
├── controllers/      # Request handlers
├── middleware/       # Authentication & error handling
├── models/           # Database schemas
├── routes/           # API routes
├── services/         # Business logic
├── utils/            # Helper functions
├── config/           # DB and app configuration
├── .env
├── server.js
└── package.json
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Cage4D/blog-api.git
cd blog-api
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Run the development server

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:5000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

### Blog Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create a post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

---

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts/:id/comments` | Add comment |
| DELETE | `/api/comments/:id` | Delete comment |

---

## Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer your_token_here
```

---

## Example Request

### Create a Blog Post

```http
POST /api/posts
Content-Type: application/json
Authorization: Bearer your_token_here
```

```json
{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime..."
}
```

---

## Error Handling

Example error response:

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

## Running Tests

```bash
npm test
```

---

## Future Improvements

- Pagination
- Search and filtering
- Image uploads
- Role-based authorization
- Swagger API documentation
- Rate limiting
- Email verification

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

Built by [Cage4D](https://github.com/Cage4D)