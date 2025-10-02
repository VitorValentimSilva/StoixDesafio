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
  process.env.API_BASE_URL_PROD,
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
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    },
  })
);

const csrfProtection = csurf({
  cookie: {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  },
});

app.use(csrfProtection);

app.use((req, res, next) => {
  if (req.csrfToken) {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.locals.csrfToken = token;
  }
  next();
});

app.use(routes);

app.use((err: any, _req: any, res: any, next: any) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({
      message: "Requisição rejeitada: token CSRF inválido ou ausente",
    });
  }
  next(err);
});

export { csrfProtection };
export default app;
