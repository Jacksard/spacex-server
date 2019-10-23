const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema');
const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

// Test API
app.get('/', (req, res) => {
  res.send('Space X server Test');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
