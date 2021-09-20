import { useEffect, useState } from 'react';

import * as S from './styles';

import { RepositoryItem } from '../../components';
import useGithub from '../../hooks/github-hooks';

const Repositories = () => {
  const { githubState, getUserRepos, getUserStarred } = useGithub();
  const [hasRepos, setHasRepos] = useState(false);

  useEffect(() => {
    setHasRepos(false);

    if (githubState.user.login) {
      getUserRepos(githubState.user.login);
      getUserStarred(githubState.user.login);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubState.user.login]);

  useEffect(() => {
    setHasRepos(!!githubState.repositories);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubState.repositories]);

  if (hasRepos) {
    return (
      <S.WrapperTabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
      >
        <S.WrapperTabList>
          <S.WrapperTab>Repositories</S.WrapperTab>
          <S.WrapperTab>Starred</S.WrapperTab>
        </S.WrapperTabList>
        <S.WrapperTabPanel>
          <S.WrapperList>
            {githubState.repositories.length > 0 ?
              githubState.repositories.map((repo) => (
                <RepositoryItem key={repo.id} name={repo.name} linkToRepo={repo.html_url} fullName={repo.full_name} />
              )) : (
                <S.WrapperNoRepo>Nenhum repositório.</S.WrapperNoRepo>
              )
            }
          </S.WrapperList>
        </S.WrapperTabPanel>
        <S.WrapperTabPanel>
          <S.WrapperList>
            {githubState.starred.length > 0 ?
              githubState.starred.map((repo) => (
                <RepositoryItem key={repo.id} name={repo.name} linkToRepo={repo.html_url} fullName={repo.full_name} />
            )) : (
                <S.WrapperNoRepo>Nenhum repositório.</S.WrapperNoRepo>
            )}
          </S.WrapperList>
        </S.WrapperTabPanel>
      </S.WrapperTabs>
    );
  }

  return null;
};

export default Repositories;
