import { gql } from 'graphql-request';

export const MangaFragment = gql`
    fragment MangaFragment on Media {
        id
        type
        title {
            userPreferred
        }
        siteUrl
        description(asHtml: false)
        coverImage {
            extraLarge
            color
        }
    }
`;
