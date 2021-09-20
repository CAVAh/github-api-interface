import * as S from './styles';
import { Header } from '../../components';

const Layout = ({ children }) => {
  return (
    <S.WrapperLayout>
      <Header />
      {children}
    </S.WrapperLayout>
  );
};

export default Layout;
