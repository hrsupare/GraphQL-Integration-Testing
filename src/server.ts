import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ListenOptions } from "net";

export let userData = [
  {
    id: 1,
    first_name: "Josee",
    last_name: "Lightwing",
  },
  {
    id: 2,
    first_name: "Cassandre",
    last_name: "Denyer",
  },
  {
    id: 3,
    first_name: "Marketa",
    last_name: "Itzcovichch",
  },
  {
    id: 4,
    first_name: "Ashlie",
    last_name: "Whitington",
  },
  {
    id: 5,
    first_name: "Hoyt",
    last_name: "Dunlop",
  },
];

export const typeDefs = `
  #graphql

  type user {
    id: Int,
    first_name:String,
    last_name: String,
  }

  type successResponceOutput {
    status: String
    message: String
  }
  
  type Query {
    hello(name: String): String!
    hii(name: String): String!
    getUser:[user]
  } 

  input createUserInput  {
    id: Int,
    first_name:String,
    last_name: String,
  }

  type Mutation {
    createUser(input :createUserInput ):successResponceOutput
  }
`;

// Resolver map
export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
    hii: (_, { name }) => `Hiiiii ${name}!`,
    getUser: (_, {}) => userData,
  },
  Mutation: {
    createUser: (_, args) => {
      const { id, first_name, last_name } = args.input;
      console.log(id, first_name, last_name, "id, first_name, last_name");
      userData.push({ id, first_name, last_name });
      return {
        status: "SUCCESS",
        message: "User has been successfully Added",
      };
    },
  },
};

export const createApolloServer = async (
  listenOptions: ListenOptions = { port: 4000 }
) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: listenOptions,
  });

  return { server, url };
};

(async () => {
  if (process.env.NODE_ENV !== "test") {
    const { url } = await createApolloServer();
    console.log(`🚀 Query endpoint ready at ${url}`);
  }
})();
