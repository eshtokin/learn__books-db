import app from "./app";
const PORT = 3000;
const env = process.env.NODE_ENV


// enableProdMode();
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});