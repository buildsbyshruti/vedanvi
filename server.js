const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const dotenv     = require('dotenv');
const cookieParser= require('cookie-parser');
const session    = require('express-session');
const flash      = require('connect-flash');

dotenv.config();

const logger                    = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { attachUser }            = require('./middleware/authMiddleware');

const indexRoutes   = require('./routes/indexRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const authRoutes    = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const wishlistRoutes= require('./routes/wishlistRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'vedanvi-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7200000 } 
}));
app.use(flash());


app.use(attachUser);
app.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success');
    res.locals.flashError   = req.flash('error');
    res.locals.flashInfo    = req.flash('info');
    res.locals.session      = req.session;
    
  
    if (typeof req.session.orderCount === 'undefined') {
        req.session.orderCount = 0;
    }
    
    next();
});

app.use(logger);

app.use('/',        indexRoutes);
app.use('/cart',    cartRoutes);
app.use('/',        authRoutes);
app.use('/profile', profileRoutes);
app.use('/wishlist', wishlistRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Vedanvi server running at http://localhost:${PORT}`);
});
