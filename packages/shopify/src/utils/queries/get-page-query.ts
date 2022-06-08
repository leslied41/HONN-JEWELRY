export const getPageQuery = /* GraphQL */ `
  query getPage($id: ID!) {
    node(id: $id) {
      id
      ... on Page {
        title
        handle
        body
        bodySummary
        availableTime: metafield(namespace: "page", key: "available_time") {
          description
          id
          key
          namespace
          value
          valueType
        }
      }
    }
  }
`
export default getPageQuery
