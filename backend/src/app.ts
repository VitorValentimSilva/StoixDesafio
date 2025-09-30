import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import csurf from "csurf";

const app = express();

app.use(express.json());
app.use(cookieParser());

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET não definido no .env");
}

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const csrfProtection = csurf({ cookie: true });

app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(routes);

export { csrfProtection };
export default app;
