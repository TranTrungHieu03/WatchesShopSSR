// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const memberService = require('../services/memberService');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'membername' }, async (membername, password, done) => {
            try {
                const user = await memberService.getOneByMemberName(membername);
                if (!user) {
                    return done(null, false, { message: 'Incorrect membername.' });
                }

                const isMatch = await user.matchPassword(password);

                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await memberService.getMemberById(id);
            done(null, {
                _id: user._id,
                isAdmin: user.isAdmin,
                membername: user.membername
            });
        } catch (err) {
            done(err);
        }
    });
};
