import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const useGraphQL = (sessionKey) =>
  new HttpLink({
    uri: "http://localhost:3001/graphql",
    fetch,
    headers: {
      Authorization: sessionKey,
    },
  });

export default useGraphQL;
