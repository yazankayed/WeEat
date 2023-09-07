const express = require('express');
const restrauntController = require('../controllers/restraunt');
const router = express.Router();
// module.exports = function (app) {
router.get("/restraunt/city/:city", restrauntController.getResByCity);
router.get("/restraunt/id/:id", restrauntController.getResById);
router.get("/restraunt/filter", restrauntController.getRestaurantsByFilter);
router.get("/restraunt/sort/:order", restrauntController.getRestaurantsByCost);
// router.get("/restraunt/pages", restrauntController.getRestaurantPages);
// router.post("/create", restrauntController.create);
// }
module.exports = router;    