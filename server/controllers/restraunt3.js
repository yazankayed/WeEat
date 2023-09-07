// Controller method to get restaurants based on applied filters
exports.getRestaurantsByFilter = async (req, res, next) => {
    try {
      console.log("Query is :", req.query)
      console.log("Query is :", req.query)
      // Retrieve filter parameters from the request
      // const { city_name } = req.body.city_name;
      const { city_name, cuisines, sort } = req.body;
  
  
      // console.log("The real city is ", city_name)
      // console.log(req.body)
      // Build the filter object based on the request parameters
      const filter = {};
  
      // if (city) {
      //   filter.city = city;
      // }
  
      if (cuisines) {
        filter['Cuisine.name'] = { $in: cuisines.split(',') };
      }
      // console.log(req.body)
      // Sort restaurants by price in ascending or descending order
      const sortOrder = sort === 'asc' ? 1 : sort === 'desc' ? -1 : 1;
      const sortField = 'cost';
      console.log("Filter is ", filter)
      // Query the database using the filter and sort options
      const restaurants = await Restraunt.find({ city: city_name })
        .sort({ [sortField]: sortOrder })
        .exec();
  
      res.status(200).json({ restraunts: restaurants });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //getting page no. based on applied filter
  exports.getPagenos = (req, res, next) => {
    const city = req.body.city_name ? req.body.city_name : "Nablus";
    const min_price = req.body.mincost ? req.body.mincost : 0;
    const max_price = req.body.maxcost ? req.body.maxcost : 999999;
    const cuisine_types = req.body.cuisine
      ? req.body.cuisine
      : ["arabian", "italian", "fastfood", "seafood", "chinese"];
    const meal_type = req.body.type
      ? req.body.type
      : ["breakfast", "lunch", "dinner", "snacks", "drinks", "nightlife"];
  
    Restraunt.find({
      city_name: city,
      cost: { $gt: min_price, $lt: max_price },
      Cuisine: { $elemMatch: { name: { $in: cuisine_types } } },
      type: { $elemMatch: { name: { $in: meal_type } } },
    })
      .countDocuments()
  
      .then((products) => {
        const pages = Math.ceil(products / 2);
        res.json({ restraunts: products, pages: pages });
      })
      .catch((err) => console.log(err));
  };