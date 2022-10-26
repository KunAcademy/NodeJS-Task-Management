const express = require('express');
const router = express.Router();
const { getTasks, getTask, updateTask, deleteTask, createTask } = require('../controllers/tasks');

router.route('/').get(getTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router