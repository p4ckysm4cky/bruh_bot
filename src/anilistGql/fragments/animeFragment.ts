import { gql } from 'graphql-request';

export const AnimeFragment = gql`
    fragment AnimeFragment on Media {
        id
        type
        title {
            userPreferred
        }
        siteUrl
        episodes
        description(asHtml: false)
        coverImage {
            extraLarge
            color
        }
        bannerImage
    }
`;
