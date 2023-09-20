import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

// typeDefs : 형식 정의 스키마, 타입 정의 스키마 모음 - 필수
const typeDefs = `
 type Note {
  id: String!
  author: String!
  content: String!
}

type Query {
  hello: String!
  notes: [Note!]!
}
`

// data
const notes = [
  {
    id: '1', content: 'This is a first note',  author: 'Adam Scott'
  },
  {
    id: '2', content: 'This is a second note',  author: 'Jack Daniel'
  },
  {
    id: '3', content: 'This is a third note',  author: 'Smith Johns'
  },
];

// resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes
  }
}



const server = new ApolloServer({
  typeDefs, resolvers
});

const {url} = await startStandaloneServer(server, {
  listen: { port: 4000}
});

console.log(`🚀  Server ready at: ${url}`);

app.get('/', (req, res) => res.send('hello web world!'));

// app.listen(port, () => {
// 	console.log(`listening on port ${port}`);
// });
