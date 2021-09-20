import { createContext, useCallback, useState } from 'react';
import api from '../services/api';

export const GithubContext = createContext({
  hasUser: false,
  loading: false,
  hasError: false,
  user: {},
  repository: [],
  starred: [
    {
      full_name: '',
    },
  ],
});

const GithubProvider = ({ children }) => {
  const [githubState, setGithubState] = useState({
      hasUser: false,
      loading: false,
      hasError: false,
      user: {
        avatar_url: '',
        login: '',
        name: '',
        html_url: '',
        blog: '',
        company: '',
        location: '',
        followers: 0,
        following: 0,
        public_gists: 0,
        public_repos: 0,
      },
      repository: [],
      starred: [],
    },
  );

  const getUser = (username) => {
    setGithubState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    api.get(`users/${username}`)
      .then(({ data }) => {
        setGithubState((prevState) => ({
          ...prevState,
          hasUser: true,
          loading: false,
          hasError: false,
          user: {
            avatar_url: data.avatar_url,
            login: data.login,
            name: data.name,
            html_url: data.html_url,
            blog: data.blog,
            company: data.company,
            location: data.location,
            followers: data.followers,
            following: data.following,
            public_gists: data.public_gists,
            public_repos: data.public_repos,
          },
        }));
      }).catch((e) => {
        setGithubState((prevState) => ({
          ...prevState,
          hasUser: false,
          loading: false,
          hasError: true,
        }));
    });
  };

  const getUserRepos = (username) => {
    api.get(`users/${username}/repos`)
      .then(({ data }) => {
        setGithubState((prevState) => ({
          ...prevState,
          repositories: data,
        }));
      });
  };

  const getUserStarred = (username) => {
    api.get(`users/${username}/starred`)
      .then(({ data }) => {
        setGithubState((prevState) => ({
          ...prevState,
          starred: data,
        }));
      });
  };

  const contextValue = {
    githubState,
    getUser: useCallback((username) => getUser(username), []),
    getUserRepos: useCallback((username) => getUserRepos(username), []),
    getUserStarred: useCallback((username) => getUserStarred(username), []),
  };

  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
