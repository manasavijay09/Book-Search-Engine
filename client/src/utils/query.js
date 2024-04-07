import {gql} from'@apollo/client'
 export const QUERY_ME=gql`
{
    me {
      _id
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }`