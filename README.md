# CarRental Application

This repository contains a **Car Rental Application** with:  

- **Backend**: .NET 7 Web API (`backend`)  
- **Frontend**: React app (`frontend`) using Context API  

Users can:  
- View available vehicles  
- Select a vehicle  
- Pick booking start and end dates  
- Calculate total price  
- Book a vehicle  

---

## Folder Structure

CarRentalRepo/
├── VehicleBookingApi/ # .NET API
└── vehicle-booking-frontend/ # React app



---

## Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)  
- [Node.js](https://nodejs.org/) (v18+)  
- npm (comes with Node.js)

---

## Run Backend (.NET API)

1. Open terminal / PowerShell
2. Navigate to backend folder:

```bash
cd backend
3. Restore dependencies:
Restore dependencies (optional)::
dotnet restore
4. Run the API:
Run the API:
dotnet run
The backend should now be running on:
http://localhost:5017/

Run Frontend (React)
Open a new terminal
Navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Start development server:
npm run dev

The frontend will run on:

http://localhost:5173
