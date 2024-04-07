import {gql} from'@apollo/client'


export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
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
        username
      }
    }
  }`

export const LOGIN =gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
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
    }
  }`

export const SAVEBOOK=gql`
  mutation saveBook($bookdetails: BookInput) {
    saveBook(bookdetails: $bookdetails) {
      _id
      email
      username
      savedBooks {
        bookId
        description
        title
        image
        link
        authors
      }
    }
  }`

  export const DELETEBOOK=gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }`