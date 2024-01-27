# Broken App Issues
Here are the identified issues and suggested improvements:

    Missing Express Middleware for Parsing JSON: The code is trying to access req.body.developers, but there's no middleware set up to parse JSON in the request body. You should add the express.json() middleware.

    Handling Promises Properly: The axios.get calls return promises. You need to use Promise.all to wait for all promises to resolve before processing the results.

    Proper Error Handling: The try-catch block is not catching errors properly. It should be catch (err) instead of just catch.

    Error Handling for Axios Requests: You should handle errors that might occur during the axios requests. For instance, if a user does not exist, the axios request might throw an error.