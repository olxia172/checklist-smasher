import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const useGraphQL = (sessionKey) => {
  const authHeader = sessionKey && {
    Authorization: `Bearer ${sessionKey}`,
  };

  return new HttpLink({
    uri: "http://localhost:3001/graphql",
    fetch,
    headers: {
      ...authHeader,
    },
  });
};

export default useGraphQL;
