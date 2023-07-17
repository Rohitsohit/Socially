/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFromData = /* GraphQL */ `
  query GetFromData($id: ID!) {
    getFromData(id: $id) {
      id
      title
      description
      tags
      createby
      likes
      comments
      imageurl
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFromData = /* GraphQL */ `
  query ListFromData(
    $filter: ModelFromDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFromData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        tags
        createby
        likes
        comments
        imageurl
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserData = /* GraphQL */ `
  query GetUserData($id: ID!) {
    getUserData(id: $id) {
      id
      user
      friends
      friendRequest
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserData = /* GraphQL */ `
  query ListUserData(
    $filter: ModelUserDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        friends
        friendRequest
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
