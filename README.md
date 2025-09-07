**E-commerce Dashboard - Frontend** 
--------------------------------------------
A React-based dashboard for managing and analyzing e-commerce data.
This frontend connects with a Django REST Framework backend and provides an interactive interface for sales analytics, CSV uploads, KPIs, and more


**🚀 Features**
User Authentication (Login/Logout using JWT tokens)
Dynamic KPI Dashboard:
Total Sales
Total Orders
Average Order Value
Total Quantity
CSV Upload Module:
Upload CSV files
Backend processes CSV and tracks logs
View past upload logs with metadata
Pagination for Large Data Sets
Responsive UI using Bootstrap 5
Charts & Graphs using Recharts
Auto-redirect to login when token expires
No sidebar/nav visible on login screen
Backend Swagger API Documentation

**🖥 Tech Stack**
Frontend:
React (v19)
React Router DOM (v7)
Axios
Bootstrap 5
Recharts (for visualizations)
Framer Motion (animations)
Backend (API)
Django
Django REST Framework
MySQL
Pandas (for CSV processing)

**⚙️ Installation & Setup**
**1️⃣ Prerequisites**
Make sure you have the following installed:
Node.js (>=18.x)
npm or yarn

**2️⃣ Clone the Repository**
git clone https://github.com/your-username/ecommerce-dashboard-frontend.git
cd ecommerce-dashboard-frontend

**3️⃣ Install Dependencies**
If you face dependency issues, use the --legacy-peer-deps flag:
npm install --legacy-peer-deps

**4️⃣ Configure Environment Variables**
Create a .env file in the project root.
REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api

**5️⃣ Run the Development Server**
npm start
The application will be available at:
http://localhost:3000

**🔐 Authentication Flow**
On login, JWT token is stored securely in localStorage.
Token is automatically included in each API request via Axios.
If the token expires:
The user is redirected to the login page.
Sidebar and Navbar are hidden on the login screen

**👥 Contributors**
Pankaj Bhaltilak - Full Stack Developer
