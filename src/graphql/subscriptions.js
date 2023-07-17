/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFromData = /* GraphQL */ `
  subscription OnCreateFromData($filter: ModelSubscriptionFromDataFilterInput) {
    onCreateFromData(filter: $filter) {
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
export const onUpdateFromData = /* GraphQL */ `
  subscription OnUpdateFromData($filter: ModelSubscriptionFromDataFilterInput) {
    onUpdateFromData(filter: $filter) {
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
export const onDeleteFromData = /* GraphQL */ `
  subscription OnDeleteFromData($filter: ModelSubscriptionFromDataFilterInput) {
    onDeleteFromData(filter: $filter) {
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
export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onCreateUserData(filter: $filter) {
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
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onUpdateUserData(filter: $filter) {
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
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData($filter: ModelSubscriptionUserDataFilterInput) {
    onDeleteUserData(filter: $filter) {
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
