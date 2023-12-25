const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://rootuser:rootpass@localhost:27017', {
    dbName: 'course_db',
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    purchasedCourses: {
        type: Array,
        required: true,
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    id: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
        minlength: 8,
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
    }

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}