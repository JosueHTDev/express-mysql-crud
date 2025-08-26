const express = require("express");
const router = express.Router();
const { getCategoria, postCategoria  } = require('../../controller')
const { verifyToken } = require('../../middleware/authMiddleware')

router.get('/user', verifyToken, getCategoria )

module.exports = router;