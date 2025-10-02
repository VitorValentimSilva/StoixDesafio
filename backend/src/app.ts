import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import csurf from "csurf";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://stoix-desafio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS não permitido"));
      }
    },
    credentials: true,
  })
);

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
    cookie: { secure: true, sameSite: "none" },
  })
);

const csrfProtection = csurf({ cookie: true });

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use((err: any, _req: any, res: any, next: any) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({
      message: "Requisição rejeitada: token CSRF inválido ou ausente",
    });
  }
  next(err);
});

app.use(routes);

export { csrfProtection };
export default app;
