// const express = require('express');
const widgetController = require('../controllers/widget');
// const router = express.Router();
module.exports = function (app) {
app.get('/widget', widgetController.getWidget);
app.get('/cities', widgetController.getCities);
app.get("/email", widgetController.email);
app.post("/create", widgetController.create);
}

// module.exports = router;