const fs = require('fs'),
  path = require('path'),
  {graphqlSchema, graphqlLib: {graphql}} = require('paper-walrus-server'),
  {introspectionQuery} = require('graphql/utilities');

graphql(graphqlSchema, introspectionQuery).then(result => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, './schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
});
