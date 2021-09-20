import * as S from './styles';
import useGithub from '../../hooks/github-hooks';
import { useState } from 'react';

const Header = () => {
  const [username, setUsername] = useState();
  const { getUser } = useGithub();

  const handleSubmit = () => {
    if (!username) {
      return;
    }

    return getUser(username);
  };

  const handlePress = (e) => {
    if (e.which === 13) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <S.Header>
      <S.Wrapper>
        <input
          type="text"
          placeholder="Digite o username do GitHub para pesquisar..."
          onChange={handleChange}
          onKeyPress={handlePress}
        />
        <button type="submit" onClick={handleSubmit}><span>Buscar</span></button>
      </S.Wrapper>
    </S.Header>
  );
};

export default Header;
