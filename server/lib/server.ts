import App from "./app";
import { handleError } from "./common/helpers/errorHandler";
import BadRequest from "./common/exceptions/bad-request.exception";
const PORT = process.env.PORT;

function logger(req, res, next) {
    const err = new BadRequest('incorrect route');
    next(err)
}

const app = new App().app;

app.use(logger, handleError);
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`)
});
