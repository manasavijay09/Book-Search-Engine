const { User} = require('../models');
const {signToken, AuthenticationError } = require("../utils/auth")
const resolvers = {
  Query: {
    me: async (parent,args,context) => {
        if(context.user){
            const userDetails = await User.findOne({_id:context.user._id}).select('-__v -password')
       
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
     // },
    //   saveBook: async (parent, { BookInpt }) => {
    //     const Book = await Thought.create({ BookInpt });
  
    //     await User.findOneAndUpdate(
    //       { username: thoughtAuthor },
    //       { $addToSet: { thoughts: thought._id } }
    //     );
  
    //     return User;
    //   },
    //   addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: { comments: { commentText, commentAuthor } },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
      },
    //   removeThought: async (parent, { thoughtId }) => {
    //     return Thought.findOneAndDelete({ _id: thoughtId });
    //    },
      removeBook: async (parent, { bookId:Id }) => {
        return Book.findOneAndDelete(
          { _id: bookId },
          { $pull: { Books: { _id: bookId } } },
          { new: true }
        );
      },
    },
  };
  
  module.exports = resolvers;
  
