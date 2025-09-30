import express from "express";
import path from "path";
import history from "connect-history-api-fallback";
import {fileURLToPath} from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if(process.env.NODE_ENV_SET !== 'local'){
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        }
        next();
    });

}

const staticFileMiddleware = express.static(path.join(__dirname + "/dist"));

app.use(staticFileMiddleware);
app.use(
    history({
        disableDotRule: true,
        verbose: true,
    })
);
// app.use(secure);
app.use(staticFileMiddleware);

app.get("/", function (req, res) {
    res.render(path.join(__dirname + "/dist/index.html"));
});

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
