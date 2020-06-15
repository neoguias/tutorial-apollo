import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const listaRepositorios = gql`
{
  search(query: "stars:>10000", first: 20, type: REPOSITORY) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`;

const App = graphql(listaRepositorios)(props =>
  <ol>
    {props.data.loading ? '' : props.data.search.edges.map((repo, i) =>
      <li key={repo.node.owner.login + '-' + repo.node.name}>
        <b>{repo.node.owner.login} / {repo.node.name}</b>: {' '}
        {repo.node.stargazers.totalCount}
      </li>
    )}
  </ol>
);

export default App