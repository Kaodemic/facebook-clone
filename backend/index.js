require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/database");

const port = process.env.PORT || 8080;
// Connect Database
connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => ({ req }),
});

server.listen(port).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});