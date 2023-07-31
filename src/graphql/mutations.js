/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFromData = /* GraphQL */ `
  mutation CreateFromData(
    $input: CreateFromDataInput!
    $condition: ModelFromDataConditionInput
  ) {
    createFromData(input: $input, condition: $condition) {
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
export const updateFromData = /* GraphQL */ `
  mutation UpdateFromData(
    $input: UpdateFromDataInput!
    $condition: ModelFromDataConditionInput
  ) {
    updateFromData(input: $input, condition: $condition) {
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
export const deleteFromData = /* GraphQL */ `
  mutation DeleteFromData(
    $input: DeleteFromDataInput!
    $condition: ModelFromDataConditionInput
  ) {
    deleteFromData(input: $input, condition: $condition) {
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
export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
      id
      user
      friends {
        name
        MessageID
        __typename
      }
      friendRequest
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
      id
      user
      friends {
        name
        MessageID
        __typename
      }
      friendRequest
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
      id
      user
      friends {
        name
        MessageID
        __typename
      }
      friendRequest
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      id
      name
      messages {
        sender
        content
        timestamp
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      id
      name
      messages {
        sender
        content
        timestamp
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      id
      name
      messages {
        sender
        content
        timestamp
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
