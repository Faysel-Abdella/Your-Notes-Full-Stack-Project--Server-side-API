👋 Hi there, 
 👉 <a href="https://your-notes-full-stack-project.onrender.com">See Live Now</a>
 👉 <a href="https://github.com/Faysel-Abdella/Your-Notes-Full-Stack-Project-Client-Side">See Client-side(Frontend) repo</a>
 
# Full-Stack Project

This is a full-stack web application that provides functionality for user authentication, task management, and task filtering. Users can sign up, log in, update their information, add tasks, mark tasks as completed, view tasks, filter tasks, delete individual tasks, and delete all completed tasks.

## Technologies Used

- CSS
- React
- Node.js
- Express.js
- MongoDB
- Redux Toolkit
- React Router DOM
- Styled Components
- Axios
- Bcrypt.js
- Body-parser
- CORS
- dotenv
- Express Async Error
- Express Validator
- HTTP Status Codes
- JSON Web Token (JWT)
- Mongoose
- Morgan

## Features

- User Authentication:
  - Signup: Users can create new accounts by providing their email and password.
  - Login: Existing users can log in using their credentials.
  - Update User Info: Users can update their profile information, such as their name or profile picture.

- Task Management:
  - Add Task: Users can create new tasks with a title and description.
  - Mark Task as Completed: Users can mark tasks as completed to track their progress.
  - View Tasks: Users can view their tasks, including both pending and completed tasks.
  - Filter Tasks: Users can filter tasks based on their completion status (all, pending, completed).
  - Delete Task: Users can delete individual tasks.

- Delete All Completed Tasks: Users can delete all completed tasks at once to declutter their task list.

## Setup and Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using the package manager of your choice:
   ````shell
   npm install
   ```
4. Create a `.env` file in the root directory and configure the following environment variables:
   ````plaintext
   PORT=8080
MONGO_URL=mongodb+srv://new-faysel:0966463034f@cluster0.ogdb2gk.mongodb.net/YOUR_NOTES?retryWrites=true&w=majority

JWT_SECRET=mysecret

NODE_VERSION=20.3.0
   ```
5. Start the development server:
   ````shell
   npm run dev
   ```
6. Open a web browser and access the application at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.




