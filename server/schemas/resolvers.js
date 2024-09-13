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
        getUser: async(parent,args,context) => {
            if(context.user) {
            const foundUser = await User.findById(context.user._id).populate('unlockedPens');

            return foundUser
        }
        throw AuthenticationError;
        },
        getEnvironment: async(parent, args, context) => {
            if(context.environment) {
                const foundEnvironment = await Environment.findOne({
                    _id: context.environment._id
                });
                return foundEnvironment
            }
        },
        // getAnimal: async(parent, args, context) => {
        //     if(context.animal) {
        //         const foundAnimal = await Animal.findOne({
        //             _id: context.animal._id
        //         });
        //         return foundAnimal
        //     }
        // },
        getAnimal: async () => {
            return await Animal.find();
        },
        getPen: async(parent, args, context) => {
            if(context.pen) {
                const foundPen = await Pen.findOne({
                    _id: context.pen._id,
                    name: context.pen.name,
                    environment: context.pen.environment
                });
                return foundPen
            }
        },
        // }, getAllPens: async(parent, { evnironment, name }) => {
        //         const params = {};
          
        //         if (evnironment) {
        //           params.evnironment = evnironment;
        //         }
          
        //         if (name) {
        //           params.name = {
        //             $regex: name
        //           };
        //         }
          
        //         return await Pen.find(params).populate('evnironment');
        //       },
        getAllPens: async () => {
            return await Pen.find();
          }
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



module.exports = resolvers;
