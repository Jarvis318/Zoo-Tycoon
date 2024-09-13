// import user model
const { User, Animal, Environment, Pen} = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        getUser: async(parent,args,context) => {
            if(context.user) {
            const foundUser = await User.findOne({
                _id: context.user._id
            });

            return foundUser
        }
        throw AuthenticationError;
        },
  
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        addUser: async( parent, args)=> {
            const user = await User.create(args);
            const token = signToken(user);
           return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        login: async (parent,args ) => {
            const user = await User.findOne({ email: args.email});
            if (!user) {
                 throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
  
    }

};



