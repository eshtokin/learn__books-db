import app from "./app";
const PORT = 3000;
const env = process.env.NODE_ENV

app.use((err, req, res, next) => {
    // console.error(err.message);
    // if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

    // if (err.shouldRedirect) {
    //     res.render('myErrorPage') // Renders a myErrorPage.html for the user
    // } else {
    //     res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
    // }
});

// enableProdMode();
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});