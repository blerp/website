import { useMemo } from "react";
import { concatPagination } from "@apollo/client/utilities";
import { InMemoryCache } from "@apollo/client/cache";
import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    from,
    split,
    execute,
    gql,
    defaultDataIdFromObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const { createUploadLink } = require("apollo-upload-client");
import projectConfig from "../config";

const isBrowser = typeof window !== "undefined";
const uri = projectConfig.apiEndpoint;

let apolloClient;

export const defaults = {
    globalVolume: 1.0,
    globalSrcId: "",
};

export const typeDefs = gql`
    extend type Query {
        globalVolume: Float
        globalSrcId: String
    }
`;

export const resolvers = {
    Mutation: {
        setGlobalVolume: (_, { volume }, { cache }) => {
            // cache.writeData({ data: { globalVolume: volume } });
            return null;
        },
        setGlobalSrc: (_, { id }, { cache }) => {
            // cache.writeData({ data: { globalSrcId: id } });
            return null;
        },
    },
};

const authLink = setContext((_, { headers }) => {
    if (projectConfig.env === "DEV") {
        // get the authentication token from local storage if it exists
        const token = isBrowser
            ? window.localStorage
                ? window.localStorage.getItem("jwt")
                : ""
            : "";

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    } else {
        return {
            headers: {
                ...headers,
            },
        };
    }
});

// https://www.apollographql.com/docs/react/caching/cache-configuration/
const apolloCache = new InMemoryCache({
    dataIdFromObject(responseObject) {
        switch (responseObject.__typename) {
            case "Bite":
                return `Bite:${responseObject._id}`;
            case "Playlist":
                return `Playlist:${responseObject._id}`;
            case "Category":
                return `Category:${responseObject._id}`;
            case "User":
                return `User:${responseObject._id}`;
            default:
                return defaultDataIdFromObject(responseObject);
        }
    },
    typePolicies: {
        Bite: {
            fields: {
                audio: {
                    original: {
                        merge(existing, incoming, { mergeObjects }) {
                            return existing._id;
                        },
                    },
                },
            },
        },
        Query: {
            queryType: true,
            fields: {
                web: {
                    merge: true,
                    queryType: true,
                },
                twitch: {
                    merge: true,
                    queryType: true,
                },
            },
        },
    },
});

function createApolloClient() {
    return new ApolloClient({
        cache: apolloCache,
        connectToDevTools: !!isBrowser,
        link: ApolloLink.from([
            authLink,
            createUploadLink({ credentials: "include", uri }),
        ]),
        ssrMode: !isBrowser,
        typeDefs,
        resolvers,
    });
}

export function initializeApollo(initialState = {}) {
    const _apolloClient = apolloClient || createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
