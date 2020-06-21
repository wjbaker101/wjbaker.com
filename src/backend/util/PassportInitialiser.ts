import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';

import { UserService } from '@backend/service/UserService';
import { UserModel } from '@common/model/UserModel';

passport.use(new LocalStrategy(async (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void) => {

    const user = await UserService.getUserByCredentials(username, password);

    if (user instanceof Error) {
        return done(user.message);
    }

    if (user === null) {
        return done(null, false);
    }

    return done(null, user);
    }));

    passport.serializeUser((user: UserModel, done) => {
    done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
    const user = await UserService.getUserByID(id);

    if (user instanceof Error) {
        return done(user.message);
    }

    return done(null, user);
});
