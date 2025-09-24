# Ashrafi Graphic Backend

This is the Express.js and MongoDB backend for the Ashrafi Graphic full-stack application.

## Setup Instructions

1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure environment variables in `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/ashrafi_graphic
   PORT=5000
   ```
3. Start the backend server:
   ```sh
   npm start
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- Products: `GET /api/products`, `POST /api/products`
- Users: `GET /api/users`, `POST /api/users`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Orders: `GET /api/orders`, `POST /api/orders`, `PUT /api/orders/:id`, `DELETE /api/orders/:id`
- Reviews: `GET /api/reviews`, `POST /api/reviews`
- Categories: `GET /api/categories`, `POST /api/categories`
- Brands: `GET /api/brands`, `POST /api/brands`
- Wishlists: `GET /api/wishlists`, `POST /api/wishlists`
- `POST /api/test` — Test endpoint for frontend-backend communication.

## Example API Usage

### Create a Product
```sh
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Cap","price":100,"description":"Premium cap"}'
```

### Register a User
```sh
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret"}'
```

### Place an Order
```sh
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"user":"<userId>","products":[{"product":"<productId>","quantity":1}],"total":100}'
```

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `PORT`: Backend server port

## Notes

- Ensure MongoDB is accessible.
- CORS is enabled for frontend integration.

## Contact & Support

- Email: ashrafigraphicservices@gmail.com
- Instagram: [@ashrafi_graphic](https://www.instagram.com/ashrafi_graphic)
- Telegram: [Ashrafi_graphic](http://t.me/Ashrafi_graphic)
