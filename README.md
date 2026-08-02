# Music Academy Platform

A full-stack web application developed for a professional music academy to streamline student enrollment, course management, online payments, and session scheduling. The platform provides a seamless experience for prospective students while integrating with third-party services for customer relationship management and payment processing.

---

## Overview

The application is designed to simplify the admissions workflow by allowing students to explore available programs, register online, book sessions, and complete payments through a secure interface. Administrative processes are enhanced through CRM integration, ensuring efficient lead management and streamlined communication.

---

## Key Features

- Responsive and modern user interface
- Student registration and enrollment workflow
- Course and program information
- Online payment integration with Razorpay
- Session booking and availability management
- Meritto CRM integration for automated lead capture
- Mobile-friendly and cross-browser compatible design
- Scalable architecture for future enhancements

---

## Technology Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend

- Node.js
- Express.js

### Third-Party Integrations

- Meritto CRM API
- Razorpay Payment Gateway

---

## Project Structure

```
music-academy/
├── client/                 # Frontend application
├── server/                 # Backend services
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
├── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/<username>/music-academy.git
cd music-academy
```

### Install dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd ../server
npm install
```

---

## Running the Application

### Start the backend server

```bash
npm start
```

### Start the frontend development server

```bash
cd ../client
npm run dev
```

The application will be available locally once both services are running.

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MERITTO_API_KEY=
MERITTO_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Do not commit environment files or API credentials to the repository.

---

## Integrations

### Meritto CRM

The platform integrates with the Meritto CRM API to automate lead creation and student enrollment workflows.

### Razorpay

Secure online payments are processed using the Razorpay Payment Gateway.

---

## Security

- Environment-based configuration for sensitive credentials
- Secure API communication
- Separation of client and server architecture
- Payment processing handled through Razorpay

---

## Future Enhancements

- Student authentication and dashboard
- Faculty portal
- Attendance management
- Calendar synchronization
- Email and SMS notifications
- Administrative analytics
- Certificate generation
- Learning management features

---

## License

This project is intended for client deployment and demonstration purposes.

---

## Author

**Cleon Machado**

B.Tech Computer Science and Engineering  
Vellore Institute of Technology
