import  express  from "express";
import  config  from "./config.mjs";
import cors from "cors"
import obtenerRutas from "./rutas/tareasRutas.mjs"
import rateLimit from 'express-rate-limit';

const app = express ();

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'default-src "self"');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'deny');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  
let port;

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 600, // límite de peticiones por hora
    message: 'Has excedido el límite de peticiones por hora.',
  });

app.use(limiter);

app.set('port', config.port);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(obtenerRutas);

export default app