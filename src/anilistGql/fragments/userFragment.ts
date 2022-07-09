import { gql } from "graphql-request";

export const UserFragment = gql`
    fragment UserFragment on User {
        id
        name
        about
        avatar {
            large
        }
        siteUrl
        statistics {
            anime {
                meanScore
                episodesWatched
            }
            manga {
                meanScore
                chaptersRead
            }
        }
    }
`;
