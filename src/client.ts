import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache()
});

export default client;
