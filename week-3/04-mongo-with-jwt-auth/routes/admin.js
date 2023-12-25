const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const Admin = require("../db").Admin;
const Course = require("../db").Course;
const Auth = require('../auth');
const { v1: uuidv1 } = require('uuid');
const { User } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username or password missing in body" });
    }

    const queryResult = await Admin.findOne({ username: username });
    if (queryResult) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
        username: username,
        password: password,
    });

    await newAdmin.save().then(() => {
        return res.status(201).json({ message: "Admin created successfully" });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Failed to create admin" });
    });

});

router.post('/login', async (req, res) => {
    // Implement admin login logic
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username or password missing in body" });
    }

    User.findOne({ username: username }).then((user) => {
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = Auth.signJwt(username);
        return res.status(200).json({ message: "Login successful", token: token });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Failed to login" });
    });

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    if (!title || !description || !price || !imageLink) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const queryResult = await Admin.findOne({ title: title });
    if (queryResult) {
        return res.status(400).json({ message: "Course already exists" });
    }

    const courseId = uuidv1().split("-");

    const newCourse = new Course({
        id: courseId[courseId.length - 1],
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: true,
    });

    await newCourse.save().then(() => {
        return res.status(201).json({ message: "Course created successfully", courseId: courseId[courseId.length - 1] });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Failed to create course" });
    });

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}, { "_id": 0, "__v": 0 }).then((courses) => {
        return res.status(200).json({ courses: courses });
    }).catch((err) => {
        return res.status(400).json({ message: "Failed to fetch courses" });
    });

});

module.exports = router;