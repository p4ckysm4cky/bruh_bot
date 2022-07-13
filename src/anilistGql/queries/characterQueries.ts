import { gql } from 'graphql-request';
import { characterFragment } from '../fragments/characterFragment';

export const searchAnimeCharacterQuery = gql`
    query searchAnimeCharacter($characterName: String) {
        Character(search: $characterName) {
            ...characterFragment
        }
    }
    ${characterFragment}
`;
