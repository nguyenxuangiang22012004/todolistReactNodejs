const express = require('express');
const router = express.Router();
const TodolistController = require('../controllers/TodolistController');

router.get('/lists',TodolistController.lists);
router.post('/tasks', TodolistController.create);
router.put('/update/:id',TodolistController.update);
router.put('/updateStatus/:id',TodolistController.updateStatus);
router.delete('/delete/:id',TodolistController.delete);
module.exports = router;