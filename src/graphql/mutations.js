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
