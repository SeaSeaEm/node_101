const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
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
    let course = await Course.findById(req.params.id);

    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this course`, 201))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });


    if (!course) {
        return next(error);
    }

    res.status(201).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/v1/course/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(error);
    }

    if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this course`, 201))
    }

    course.remove();

    res.status(200).json({ success: true });
});
