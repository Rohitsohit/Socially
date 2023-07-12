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
