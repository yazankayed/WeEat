const Restraunt = require('../models/restraunt');


exports.create = (req, res) => {
  const {
    name,
    city_name,
    city,
    area,
    locality,
    thumb,
    cost,
    address,
    type,
    Cuisine,
    menu,
  } = req.body;
  Restraunt.create({
    name,
    city_name,
    city,
    area,
    locality,
    thumb,
    cost,
    address,
    type,
    Cuisine,
    menu,
  })
    .then((restaurant) => res.json(restaurant))
    .catch((err) => res.status(400).json(err));
};

//getting all restaraunt details by city name
exports.getResByCity = (req, res, next) => {
    const city = req.params.city;
    
    Restraunt.find({"city_name" : city})
     
    .then(products => {
        
        res.json({"restraunts" : products})
      })
    .catch(err => console.log(err));
};

//get restaraunt detail by id
exports.getResById = (req, res, next) => {
  const id = req.params.id;
  
  Restraunt.findOne({"_id" : id})
   
  .then(products => {
      
      res.json({"restraunt" : products})
    })
  .catch(err => console.log(err));
};

// Controller method to get restaurants based on applied filters
exports.getRestaurantsByFilter = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const restaurants = await Restraunt.find(filter)
      .sort({ cost_for_two: req.query.sort === 'asc' ? 1 : -1 }) // Sort by cost_for_two
      .exec();

    res.status(200).json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Build the filter object based on query parameters
function buildFilter(queryParams) {
  const filter = {};

  if (queryParams.city_name) {
    filter.city_name = queryParams.city_name;
  }

  if (queryParams.cuisines) {
    filter['Cuisine.name'] = { $in: queryParams.cuisines.split(',') };
  }

  return filter;
}


// Controller method to get restaurants sorted by cost
exports.getRestaurantsByCost = async (req, res) => {
  try {
    const { sortOrder } = req.params; // Numeric sorting order (1 or -1)

    const restaurants = await Restraunt.find({})
      .sort({ cost: sortOrder }) // Sort by cost
      .exec();

    res.status(200).json({ restaurants });
  } catch (error) {
    console.error('Error fetching restaurants by cost:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




