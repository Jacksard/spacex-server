const axios = require('axios');
/* const PastLaunchesType = require('./pastLaunchType').PastLaunchesType; */

// The construction pillers of GraphQL
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const PastLaunchesType = new GraphQLObjectType({
  name: 'PastLauches',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString }
    /* rocket: { type: new GraphQLList(RocketType) } */
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pastLaunches: {
      type: new GraphQLList(PastLaunchesType),
      resolve(parentValue, args) {
        return axios
          .get('https://api.spacexdata.com/v3/launches/past')
          .then(res => {
            console.log(res.data);
            return res.data;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
