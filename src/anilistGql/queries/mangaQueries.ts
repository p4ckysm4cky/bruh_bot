import { gql } from "graphql-request";
import { MangaFragment } from "../fragments/mangaFragment";

export const searchMangaQuery = gql`
    query searchManga($mangaName: String) {
        Media(search: $mangaName, type: MANGA) {
            ...MangaFragment
        }
    }
    ${MangaFragment}
`;
