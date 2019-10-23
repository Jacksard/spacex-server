const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLInt },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

module.exports = {
  PastLaunchesType,
  RocketType
};
