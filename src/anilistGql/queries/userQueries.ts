import { gql } from "graphql-request";
import { UserFragment } from "../fragments/userFragment";

export const searchUserQuery = gql`
    query searchUser($user: String) {
        User(search: $user) {
            ...UserFragment
        }
    }
    ${UserFragment}
`;
