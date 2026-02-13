📚 Smart Education – AI-Based Student Performance Analysis System
🚀 Project Overview

Modern classrooms generate large amounts of academic data such as assignments, class tests, attendance, and quiz scores. Tracking and analyzing this data manually becomes difficult for teachers, especially in large classrooms.
Smart Education is a Spring Boot based backend application that automatically generates academic questions using AI and stores them in a MySQL database

This project focuses on:

📊 Student performance data management
📉 Weak subject identification
🧠 AI-based rule-driven analysis
📝 Automated test generation logic
📄 Performance summary APIs
🤖 Generating AI-based questions
🗄️ Storing questions in DB
🎓 Managing classes and subjects


✅ Currently Implemented Features
🎓 1. Student Management
Add students
View student details
Store academic records

📚 2. Subject & Marks Management
Store subject-wise marks
Track test scores
Maintain performance records

📉 3. Weak Subject Detection (Rule-Based AI Logic)
Identifies subjects where marks fall below a threshold
Generates improvement suggestions
Helps teachers understand performance gaps quickly

📝 4. AI Test Generation API (Basic Version)
Backend API to generate customized test data
Questions can be created based on weak subjects
Supports structured question format

📄 5. Performance Summary API
Returns student-level academic insights
Can be used to generate parent-friendly reports
Aggregates marks and improvement suggestions


🚧 Planned Features (Phase 2)
These features are planned but not yet implemented:
📊 Teacher Dashboard
Class-level performance summary
Pass percentage
Average marks per subject
Visual charts using frontend libraries

📝 Real-Time Quiz System
Timed quiz interface
Auto evaluation
Instant scoring
Leaderboard functionality

🤖 Advanced AI Model

Machine Learning-based performance prediction
Trend analysis using historical data

🏗️ System Architecture
Client (React / Postman)
        ↓
Spring Boot REST APIs
        ↓
Service Layer (Business Logic)
        ↓
Repository Layer (JPA)
        ↓
MySQL Database

🛠️ Tech Stack
🔹 Backend
Java
Spring Boot
Spring Data JPA
REST API
Lombok
AI API Integration

🔹 Database
MySQL

🔹 Frontend (Basic Integration)
React (for API consumption)



⚙️ How to Run the Project

1️⃣ Clone Repository
git clone https://github.com/Harishkrishnakumarr/Smart__Education.git

2️⃣ Configure Database
Update application.properties:


spring.datasource.url=jdbc:mysql://localhost:3306/smart_eduai?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

google.api.key=Api key       -> (To create api key -> https://aistudio.google.com/app/api-keys and paste it )
google.genai.model=gemini-1.5-flash

server.port=8080

3️⃣ Run Backend
mvn spring-boot:run

Server runs on:

http://localhost:8080

💻 4️⃣ Frontend Setup (React)

Go to frontend folder:

cd smart-edu-frontend
npm install
npm start


Frontend runs on:
http://localhost:5173
The goal of this project is to demonstrate:

Backend system design
Clean layered architecture
REST API development

Database modeling

Basic AI rule-based logic

Real-world education domain application
