import App from "./app";
import { handleError } from "./common/helpers/errorHandler";
import PostNotFoundException from "./common/exceptions/post-not-found.exception";
const PORT = process.env.PORT;

function logger(req, res, next) {
    const err = new PostNotFoundException('incorrect route');
    next(err)
}

const app = new App().app;

app.use(logger, handleError);
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
    console.log(process.env.BASE)
});
