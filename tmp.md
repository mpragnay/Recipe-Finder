# Chart Dashboard Application

This project is a web application that displays a dashboard with various charts, built using Next.js for the frontend and Django for the backend API. The charts (Candlestick, Line, Bar, and Pie) dynamically fetch data from the Django backend.

## Table of Contents
Setup Instructions
Libraries and Tools Used
Approach and Thought Process
Running the Application

## Setup Instructions
### Backend (Django)
1. Install Python: Ensure you have Python 3.x installed on your machine.
2. Install Django and Django REST Framework:
   pip install django djangorestframework
3. Navigate to the Backend Directory: Make sure you are in the backend project directory (where manage.py is located).
4. Run Migrations:
   python manage.py migrate
5. Start the Django Development Server:
   python manage.py runserver

### Frontend (Next.js)
1. Install Node.js and npm: Ensure you have Node.js and npm installed on your machine. You can download them from nodejs.org.
2. Navigate to the Frontend Directory: 
   cd chart-dashboard
3. Install Dependencies:
   npm install
4. Start the Next.js Development Server:
   npm run dev

## Libraries and Tools Used
Django: A high-level Python web framework used for the backend API.
Django REST Framework: An extension for building APIs in Django.
Next.js: A React-based framework for building the frontend.
Axios: A promise-based HTTP client used for making API requests from the frontend.
Charting Libraries: The following libraries are used to render different charts:
Chart.js or Recharts

## Approach and Thought Process
Backend (Django API):
The backend is set up using Django with a single app named charts.
Hardcoded JSON data is served via different API endpoints (/api/candlestick-data/, /api/line-chart-data/, /api/bar-chart-data/, /api/pie-chart-data/).
Django REST framework is used to create simple APIs that return data in the appropriate format for each chart.


Frontend (Next.js):
The frontend is built using Next.js, a framework for React.
Components are created for each chart (CandlestickChart, LineChart, BarChart, PieChart).
The main dashboard page (Dashboard.js) fetches data from the Django backend using Axios and passes the data to the chart components for rendering.
The design is kept responsive to ensure proper display on different devices.
