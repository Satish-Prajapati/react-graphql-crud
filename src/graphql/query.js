import { gql } from "@apollo/client";

export const GET_ALL_POST = gql`
query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`

export const GET_POST = gql`
query post($id: ID!) {
    post(id: $id) {
        id
        title
        body
    }
  }
`

export const DELETE_POST = gql`
mutation (
  $id: ID!
) {
  deletePost(id: $id)
}
`

export const EDIT_POST = gql`
mutation (
  $id: ID!,
  $input: UpdatePostInput!
) {
  updatePost(id: $id, input: $input) {
    id
    title
    body
  }
}
`

export const CREATE_POST = gql`
mutation (
  $input: CreatePostInput!
) {
  createPost(input: $input) {
    id
    title
    body
  }
}
`