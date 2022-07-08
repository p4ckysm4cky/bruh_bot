import { gql } from "graphql-request";

export const characterFragment = gql`
    fragment characterFragment on Character {
        id
        name {
            userPreferred
        }
        image {
            large
        }
        gender
        age
        siteUrl
        description
    }
`;
