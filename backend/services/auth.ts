import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";

const user = {
  id: 1,
  username: "user",
  password: "secret",
};

const fecthUser = async () => {
  return user;
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await fecthUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    fecthUser()
      .then((user) => {
        if (username === user.username && password === user.password) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(done);
  }),
);
