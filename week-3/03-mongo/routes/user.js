const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const User = require("../db").User;
const Course = require("../db").Course;

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username or password missing in body" });
    }

    const queryResult = await User.findOne({ username: username });
    if (queryResult) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
        username: username,
        password: password,
    });

    await newUser.save().then(() => {
        return res.status(201).json({ message: "User created successfully" });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Failed to create user" });
    });
});

router.get('/courses', async (req, res) => {
    // Implement fetching all courses logic
    await Course.find({}, { "_id": 0, "__v": 0 }).then((courses) => {
        return res.status(200).json({ courses: courses });
    }).catch((err) => {
        return res.status(400).json({ message: "Failed to fetch courses" });
    });

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;

    if (!courseId) {
        return res.status(400).json({ message: "Course ID missing in params" });
    }

    // check if course exists
    const courseMeta = await Course.findOne({ id: courseId });
    if (!courseMeta) {
        return res.status(400).json({ message: "Course does not exist" });
    }

    // check if user already purchased course
    const user = await User.findOne({ username: username }, { _id: 0 })

    if (user?.purchasedCourses.includes(courseId)) {
        return res.status(400).json({ message: "User already purchased course" });
    }

    // add course to user's purchased courses
    await User.findOneAndUpdate(
        { username: username },
        { $push: { purchasedCourses: courseMeta } },
        { new: true }
    ).then(() => {
        return res.status(200).json({ message: "Course purchased successfully" });
    }
    ).catch((err) => {
        return res.status(400).json({ message: "Failed to purchase course" });
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    await User.find(
        { username: req.headers.username },
        { _id: 0 }
    ).then((courses) => {
        const purchasedCourses = courses[0].purchasedCourses.map((course) => {
            return {
                id: course.id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageLink: course.imageLink,
                published: course.published
            }
        });
        return res.status(200).json({ purchasedCourses: purchasedCourses });
    }).catch((err) => {
        return res.status(400).json({ message: "Failed to fetch courses" });
    });
});

module.exports = router