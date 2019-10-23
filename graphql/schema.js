const axios = require('axios');
/* const PastLaunchesType = require('./pastLaunchType').PastLaunchesType; */

const data = [
  { id: '1', name: 'Jacob', address: { city: 'toronto', province: 'Ontario' } },
  { id: '1', name: 'Sam', address: { city: 'Chicago', province: 'Illinois' } },
  {
    id: '1',
    name: 'George',
    address: { city: 'Halifax', province: 'Nova Scotia' }
  },
  {
    id: '1',
    name: 'Bob',
    address: { city: 'Boston ', province: 'Massechussets' }
  }
];

// The construction pillers of GraphQL
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql');

const PastLaunchesType = new GraphQLObjectType({
  name: 'PastLauches',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    rocket: { type: RocketType }
  })
});

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
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
    },
    rocket: {
      type: new GraphQLList(RocketType),
      resolve(parentValue, args) {
        return axios.get('https://api.spacexdata.com/v3/rockets').then(res => {
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
