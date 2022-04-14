const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampid) {
        query = await Course.find({ bootcamp: req.params.bootcampid });
    } else {
        query = await Course.find().populate({ path: 'bootcamp' });
    }

    const courses = await query;

    res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc    Get course
// @route   GET /api/v1/course/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(error);
    }

    res.status(200).json({ success: true, data: course });
});

// @desc    Create course
// @route   POST /api/v1/course
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: course
    });
});

// @desc    Update course
// @route   PUT /api/v1/course/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!course) {
        return next(error);
    }

    res.status(201).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/v1/course/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        return next(error);
    }

    res.status(200).json({ success: true });
});
