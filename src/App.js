import {
  Profile,
  Repositories,
  NoSearch,
} from './components';
import useGithub from './hooks/github-hooks';

const App = () => {
  const { githubState } = useGithub();

  if (githubState.hasError) {
    return (
      <p>Ocorreu um erro ao procurar o usuário. Verifique se você digitou corretamente.</p>
    );
  }

  if (githubState.loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (!githubState.hasUser) {
    return (
      <NoSearch />
    );
  }

  return (
    <>
      <Profile />
      <Repositories />
    </>
  );
};

export default App;
