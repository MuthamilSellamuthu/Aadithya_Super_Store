# Aadithya Super Store - E-Commerce Platform

A professional, full-stack e-commerce application for **Aadithya Super Store**, featuring a modern UI, local inventory management, and innovative AR navigation.

## 🌟 Key Features

- **Dynamic Product Catalog**: Browse a wide range of products including Cleaning, Food, Snacks, Dairy, and more.
- **Premium User Interface**: A high-end shopping experience with micro-animations, glassmorphism, and responsive design.
- **AR Navigation**: Redirects users to spatial store views for a futuristic shopping experience.
- **Smart Category Filtering**: Seamlessly filter products by category from the home page.
- **Robust Cart System**: Add to cart with quantity management and persistent state.
- **Secure Checkout (COD)**: Specialized Cash on Delivery flow with premium order success tracking.
- **Order History**: Personalized user profile with detailed order tracking and Indian Rupee (₹) currency support.
- **Local Media Integration**: High-quality local product imagery served directly from the frontend.

## 🛠️ Technical Stack

### Frontend
- **React.js**: Library for building the user interface.
- **Vite**: Modern frontend build tool.
- **Tailwind CSS**: Utility-first CSS framework for premium styling.
- **React Router**: For seamless single-page application navigation.
- **Axios**: HTTP client for API communication.

### Backend
- **Node.js & Express**: High-performance backend server.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **JWT (JSON Web Tokens)**: Secure authentication and authorization.
- **dotenv**: Environment variable management.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/try/download/community) server running locally.

### Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd Consultancy_Final
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on example
   npm run data:import # Optional: Seed initial product data
   npm run server
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📂 Project Structure

- `frontend/`: React application (Vite-based).
- `backend/`: Express API and MongoDB models.
- `Photos/`: Local source of high-quality product images.
- `backend/data/`: Seeder scripts and initial datasets.

## 🌐 Deployment & Configuration

For a live deployment, you need to set the following environment variables:

### Backend (.env on Render/Railway)
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secure random string for authentication.
- `PORT`: Usually set to `5000` or provided by the host.

### Frontend (.env on Vercel/Netlify)
- `VITE_API_URL`: The URL of your deployed backend (e.g., `https://api.aadithyastore.com/api`).
- `VITE_RAZORPAY_KEY_ID`: Your production Razorpay Key.

For full step-by-step instructions, see the [Deployment Guide](file:///C:/Users/USER/.gemini/antigravity/brain/1d009bd1-7665-494d-89e1-fe00c6ffa31b/deployment_guide.md).

## 📞 Contact Details

- **Store Address**: 1/17C, Akkaranam periyapalayam, Mudhalipalayam Sidco, Trippur - 641 60
- **Email**: aadithyastore@gmail.com
- **Phone**: 9443256820

---

Developed with ❤️ for Aadithya Super Store.
