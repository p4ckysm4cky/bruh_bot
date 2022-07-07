import { gql } from "graphql-request";
import { AnimeFragment } from "../fragments/animeFragment";

export const searchAnimeQuery = gql`
    query searchAnime($animeName: String){
        Media(search: $animeName, type: ANIME) {
        ...AnimeFragment
    
        }
    }
    ${AnimeFragment}
`
