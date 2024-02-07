const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const weatherRoutes = require("./routes/weatherRoutes");

require("./auth");

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

//************** CONFIGURE SESSION **************//
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//************** ENABLE CORS FOR FRONTEND **************//
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//************** MIDDLEWARE TO CHECK WHETHER USER IS LOGGED IN OR NOT **************//
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

//************** GOOGLE AUTH ROUTES **************//
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Sign In with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    res.redirect("http://localhost:3000/home"); // Redirect to frontend route
  }
);

app.get("/login-success", isLoggedIn, (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

app.get("/login-failure", (req, res) => {
  res.json({ message: "Login Failure" });
});

// logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    req.session.destroy();
    res.send("Logged out successfully");
  });
});

//************** WEATHER ROUTES **************//
app.use("/api/weather", weatherRoutes);

//************** RUNNING THE SERVER **************//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
