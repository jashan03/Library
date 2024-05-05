

// import express from 'express';
// import bodyParser from 'body-parser';
// // Import routers
// import adminRouter from "./Routes/Admin.js";
// import userRouter from "./Routes/User.js";

// const app = express();

// // Parse URL-encoded bodies (e.g., form data)
// app.use(bodyParser.urlencoded({ extended: true }));

// // Parse JSON bodies
// app.use(express.json());

// // Middleware for parsing request bodies

// app.use("/admin", adminRouter) // whatever request starts with admin  - go to adminRouter
// app.use("/user", userRouter) // whatever request starts with admin  - go to adminRouter

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import express from 'express';
import bodyParser from 'body-parser';

import adminRouter from "./Routes/Admin.js";
import userRouter from "./Routes/User.js";
import cors from 'cors'
const app = express();

// Middleware for parsing request bodies
app.use(cors())
app.use(express.json());
app.use("/admin", adminRouter) // whatever request starts with admin  - go to adminRouter
app.use("/user", userRouter) // whatever request starts with admin  - go to adminRouter


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

