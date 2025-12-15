# FilmLedger Backend API Documentation

## Overview
This document outlines all the backend API endpoints required for the FilmLedger application. The backend should be built using **Java Spring Boot** with **MongoDB** as the database.

## Base URL
```
http://localhost:8080/api
```

## Authentication
- JWT tokens are used for authentication
- Tokens should be included in the `Authorization` header as `Bearer <token>`
- Two types of tokens: `userToken` (regular users) and `adminToken` (admin users)

---

## Database Schemas

### Movie Schema (MongoDB Collection: `movies`)
```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "genre": "String (required, enum: Action|Drama|Comedy|Sci-Fi|Horror|Thriller|Romance|Adventure|Animation|Documentary)",
  "year": "Number (required)",
  "duration": "Number (minutes)",
  "director": "String",
  "description": "String (required)",
  "poster_url": "String (URL)",
  "rating": "Number (default: 0, calculated from approved reviews)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Review Schema (MongoDB Collection: `reviews`)
```json
{
  "_id": "ObjectId",
  "movieId": "String (required, reference to Movie)",
  "userId": "String (required, Firebase UID)",
  "userName": "String (required)",
  "userPhoto": "String (URL, nullable)",
  "rating": "Number (required, 1-5)",
  "title": "String (required, review headline)",
  "comment": "String (required)",
  "status": "String (enum: pending|approved|rejected, default: pending)",
  "date": "Date (default: current date)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### User Schema (MongoDB Collection: `users`)
```json
{
  "_id": "ObjectId",
  "firebaseUid": "String (required, unique)",
  "email": "String (required, unique)",
  "displayName": "String (required)",
  "photoURL": "String (URL, nullable)",
  "role": "String (enum: user|admin, default: user)",
  "bio": "String (nullable)",
  "favoriteGenres": "Array<String>",
  "createdAt": "Date",
  "updatedAt": "Date",
  "lastLogin": "Date"
}
```

---

## API Endpoints

### 1. Movie Endpoints

#### GET /api/movies
Get all movies with optional filters.

**Query Parameters:**
- `genre` (optional): Filter by genre
- `year` (optional): Filter by year
- `search` (optional): Search in title/description
- `sortBy` (optional): Sort field (title|year|rating)
- `order` (optional): Sort order (asc|desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "movie_id",
      "title": "Inception",
      "genre": "Sci-Fi",
      "year": 2010,
      "duration": 148,
      "director": "Christopher Nolan",
      "description": "A thief who steals corporate secrets...",
      "poster_url": "https://...",
      "rating": 4.5,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /api/movies/:id
Get single movie by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "movie_id",
    "title": "Inception",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Movie not found"
}
```

#### POST /api/movies
Create new movie (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Request Body:**
```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "year": 2010,
  "duration": 148,
  "director": "Christopher Nolan",
  "description": "A thief who steals corporate secrets...",
  "poster_url": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Movie created successfully"
}
```

#### PUT /api/movies/:id
Update existing movie (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Request Body:** (Partial movie object)

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Movie updated successfully"
}
```

#### DELETE /api/movies/:id
Delete movie (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Response:**
```json
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

**Note:** Should also delete all associated reviews.

---

### 2. Review Endpoints

#### GET /api/reviews/movie/:movieId
Get reviews for a specific movie.

**Query Parameters:**
- `status` (optional, default: "approved"): Filter by status
- `sortBy` (optional): Sort field (date|rating)
- `order` (optional): Sort order (asc|desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "review_id",
      "movieId": "movie_id",
      "userId": "user_firebase_uid",
      "userName": "John Doe",
      "userPhoto": "https://...",
      "rating": 5,
      "title": "Amazing movie!",
      "comment": "This movie was absolutely incredible...",
      "status": "approved",
      "date": "2024-01-01T00:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /api/reviews/user/:userId
Get all reviews by a specific user.

**Response:** Same as above

#### GET /api/reviews
Get all reviews (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Query Parameters:**
- `status` (optional): Filter by status
- `movieId` (optional): Filter by movie

**Response:** Same as above

#### POST /api/reviews
Create new review (Authenticated users only).

**Headers:**
- `Authorization: Bearer <userToken>`

**Request Body:**
```json
{
  "movieId": "movie_id",
  "userId": "user_firebase_uid",
  "userName": "John Doe",
  "userPhoto": "https://...",
  "rating": 5,
  "title": "Amazing movie!",
  "comment": "This movie was absolutely incredible..."
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Review submitted for moderation"
}
```

**Business Logic:** Update movie's average rating.

#### PUT /api/reviews/:id
Update review (Owner only).

**Headers:**
- `Authorization: Bearer <userToken>`

**Request Body:** (Partial review object - rating, title, comment)

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Review updated successfully"
}
```

**Business Logic:** Recalculate movie's average rating.

#### DELETE /api/reviews/:id
Delete review (Owner or Admin).

**Headers:**
- `Authorization: Bearer <userToken or adminToken>`

**Response:**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

**Business Logic:** Recalculate movie's average rating.

#### PUT /api/reviews/:id/approve
Approve review (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Review approved"
}
```

#### PUT /api/reviews/:id/reject
Reject review (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Review rejected"
}
```

---

### 3. User Endpoints

#### POST /api/users/register
Register new user.

**Request Body:**
```json
{
  "firebaseUid": "firebase_uid",
  "email": "user@example.com",
  "displayName": "John Doe",
  "photoURL": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "firebaseUid": "firebase_uid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "photoURL": "https://...",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "token": "jwt_token_here",
  "message": "User registered successfully"
}
```

#### POST /api/users/login
Login user and return JWT token.

**Request Body:**
```json
{
  "firebaseUid": "firebase_uid",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

**Note:** Verify Firebase token (optional) and return backend JWT.

#### GET /api/users/:id
Get user profile by ID.

**Headers:**
- `Authorization: Bearer <userToken>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "firebaseUid": "firebase_uid",
    "email": "user@example.com",
    "displayName": "John Doe",
    "photoURL": "https://...",
    "role": "user",
    "bio": "Movie enthusiast",
    "favoriteGenres": ["Sci-Fi", "Action"],
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-15T00:00:00Z"
  }
}
```

#### GET /api/users/profile
Get current user's profile (extracts user from JWT token).

**Headers:**
- `Authorization: Bearer <userToken>`

**Response:** Same as above

#### PUT /api/users/:id
Update user profile (Owner only).

**Headers:**
- `Authorization: Bearer <userToken>`

**Request Body:**
```json
{
  "displayName": "John Doe Updated",
  "photoURL": "https://...",
  "bio": "Updated bio",
  "favoriteGenres": ["Sci-Fi", "Drama"]
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Profile updated successfully"
}
```

#### GET /api/users/:id/reviews
Get all reviews by user.

**Response:**
```json
{
  "success": true,
  "data": [ ... ] // Array of reviews
}
```

#### GET /api/users/:id/stats
Get user statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalReviews": 25,
    "averageRating": 4.2,
    "favoriteGenre": "Sci-Fi",
    "reviewsByGenre": {
      "Sci-Fi": 10,
      "Action": 8,
      "Drama": 7
    }
  }
}
```

#### GET /api/users
Get all users (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Query Parameters:**
- `role` (optional): Filter by role
- `search` (optional): Search in name/email

**Response:**
```json
{
  "success": true,
  "data": [ ... ] // Array of users
}
```

#### PUT /api/users/:id/role
Update user role (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Role updated successfully"
}
```

#### DELETE /api/users/:id
Delete user (Admin only).

**Headers:**
- `Authorization: Bearer <adminToken>`

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Note:** Should also delete all user's reviews.

---

## Authentication Flow

1. **Frontend** authenticates user with Firebase
2. **Frontend** sends Firebase UID + email to `/api/users/login` or `/api/users/register`
3. **Backend** verifies Firebase token (optional) and returns JWT token
4. **Frontend** stores JWT token in localStorage
5. **Frontend** includes JWT token in Authorization header for all subsequent requests

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

- `200 OK`: Successful GET/PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server errors

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [ ... ] // Optional array of validation errors
}
```

---

## Business Logic Notes

1. **Movie Rating Calculation:**
   - When a review is created/updated/deleted, recalculate the movie's average rating
   - Only include approved reviews in the calculation

2. **Review Moderation:**
   - New reviews default to "pending" status
   - Only approved reviews are visible to regular users
   - Admins can see all reviews regardless of status

3. **User Permissions:**
   - Users can only edit/delete their own reviews
   - Admins can perform all operations
   - Verify user ownership before allowing edit/delete operations

4. **Cascading Deletes:**
   - When a movie is deleted, delete all associated reviews
   - When a user is deleted, delete all their reviews

---

## Environment Variables

Create a `.env` file in the backend project:

```
MONGODB_URI=mongodb://localhost:27017/filmledger
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=86400000
FIREBASE_PROJECT_ID=your_firebase_project_id
PORT=8080
```

---

## Testing Recommendations

1. Use Postman or similar tool to test all endpoints
2. Test authentication flows thoroughly
3. Test permission checks (user vs admin)
4. Test cascading deletes
5. Test rating calculations
6. Test error handling for invalid data

---

## Additional Notes

- All dates should be stored in ISO 8601 format
- Use pagination for large datasets (implement later if needed)
- Consider implementing rate limiting for API endpoints
- Add logging for all operations
- Implement proper validation for all input data
- Use MongoDB indexes for frequently queried fields (movieId, userId, status)