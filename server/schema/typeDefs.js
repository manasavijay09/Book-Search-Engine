const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks:[Book]
  }

  type Book {
    
   authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }

   type Auth{
    token:ID!
    user: User
   }

  input BookInput{
    authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }
  type Query {
    me:User
  }

  type Mutation {
    createUser(username:String!,email:String!,password:String!):Auth!
    login(email:String!,password:String!):Auth!
    saveBooks(bookdetails: BookInput): User
    deleteBooks(bookId:ID!):User
  }
`;

module.exports = typeDefs;
