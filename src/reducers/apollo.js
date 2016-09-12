import {createApolloReducer} from 'apollo-client';
import {reducerConfig} from '../apolloClient';

let rawApolloReducer = createApolloReducer(reducerConfig);

export default function(state, action) {
  if (action.type === 'reset') {
    // HACK not properly handling in progress queries
    rawApolloReducer = createApolloReducer(reducerConfig);
    return rawApolloReducer(undefined, {});
  }
  return rawApolloReducer(state, action);
}
