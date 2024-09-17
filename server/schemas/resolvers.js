// import user model
const { User, Animal, Environment, Pen } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');
const path= require('path')

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        // getUser: async (parent, args, context) => {
        //     if (context.user) {
        //         const foundUser = await User.findOne({
        //             _id: context.user._id
        //         });

        //         return foundUser
        //     }
        //     throw AuthenticationError;
        // },
        getUser: async (parent, args, context) => {
            if (context.user) {
                //const foundUser = await User.findById(context.user._id).populate('unlockedPens').populate('unlockedAnimals').populate('unlockedEnvironments');
                const foundUser = await User.findById(context.user._id).populate('unlockedEnvironments');

                return foundUser
            }
            throw AuthenticationError;
        },
        getEnvironment: async () => {
            return await Environment.find().populate('pens');
        },
        // getEnvironment: async (parent, args, context) => {
        //     if (context.user) {
        //         const foundEnvironment = await Environment.findOne({
        //             _id: context.environment._id
        //         });
        //         return foundEnvironment
        //     }
        // },
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
        getPen: async (parent, args, context) => {
            if (context.pen) {
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
        addUser: async (parent, args) => {
            const environments = await Environment.insertMany([
                {
                  name: 'Swamp',
                  unlocked: true,
                },
                { name: 'Avian', unlocked: false },
                { name: 'Arctic', unlocked: false },
                { name: 'Savanna', unlocked: false },
                { name: 'Marine', unlocked: false },
              ]);
              const envIds = environments.map(env => env._id)

            const user = await User.create({//sets up user with default values
                username: args.username,
                email: args.email,
                password: args.password,
                unlockedEnvironments: envIds
            });
            const token = signToken(user);

            return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
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
        updateEnvironment: async (parent, args, context) => {
            // const environment1 = args.unlockedEnvironments
            // await User.findByIdAndUpdate(context.user._id, { $set: { unlockedEnvironments: environment1 }}, {new: true});

            // return environment1;
            if (context.user) {
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $set: { unlockedEnvironments: args.EnvironmentInput } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                } catch (err) {
                    console.log(err);
                    return err
                }

            }
            throw AuthenticationError;
        },
        updateCurrency: async (parent, args, context ) => {
            //console.log(args, context.user,args.currency,context.user._id )
            const currency1 = args.currency
            const updateUser = User.findByIdAndUpdate(context.user._id, { $set: { currency: currency1 }} , {new: true});
            //console.log(updateUser)
            return("update",updateUser)
        },
        updatePen: async (parent, { _id }) => {
            const increment = Math.abs(quantity) * +1;

            return await Animal.findByIdAndUpdate(_id, { $inc: { quantity: increment } }, { new: true });
        },
        updateAnimal: async (parent, { _id, quantity }) => {
            const increment = Math.abs(quantity) * +1;

            return await Animal.findByIdAndUpdate(_id, { $inc: { quantity: increment } }, { new: true });
        },
    },
};



module.exports = resolvers;
