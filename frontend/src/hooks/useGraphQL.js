import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const useGraphQL = (sessionKey) => {
  const authHeader = sessionKey && {
    Authorization: `Bearer ${sessionKey}`,
  };

  const apiUrl = process.env === "production"
    ? "http://192.168.1.248:3001/graphql"
    : "http://localhost:3001/graphql"

  return new HttpLink({
    uri: apiUrl,
    fetch,
    headers: {
      ...authHeader,
    },
  });
};

export default useGraphQL;
