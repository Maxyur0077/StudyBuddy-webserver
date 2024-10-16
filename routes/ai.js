const aiController = require('../controller/aiController')
const promptsController = require('../controller/promptControllers')
const express = require('express');
const router = express.Router();
router.post('/gemini', aiController.propmptGeneration);
router.post('/prompts', promptsController.savePromptAndResponse);


module.exports = router