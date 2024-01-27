const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware for parsing JSON in the request body

app.post('/', async (req, res, next) => {
  try {
    const results = await Promise.all(
      req.body.developers.map(async (d) => {
        try {
          const response = await axios.get(`https://api.github.com/users/${d}`);
          return { name: response.data.name, bio: response.data.bio };
        } catch (error) {
          return { name: null, bio: null, error: `Error fetching data for ${d}: ${error.message}` };
        }
      })
    );

    return res.json(results);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
