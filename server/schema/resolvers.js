const { User } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth")
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userDetails = await User.findOne({ _id: context.user._id }).select('-__v -password')

        return userDetails;
      }
      throw AuthenticationError

    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { BookInput }, context) => {
      console.log("Savebook", context.user)
      if (context.user._id) {
        const userData = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: BookInput } },
          { new: true }
        );

        return userData;
      }
      throw AuthenticationError
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return userData;
      }
      throw AuthenticationError
    },
  },
};

module.exports = resolvers;

