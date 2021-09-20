import GithubProvider from './github-provider';
import { ResetCSS } from '../global/resetCSS';
import App from '../App';
import { Layout } from '../components';

const Providers = () => {
  return (
    <main>
      <GithubProvider>
        <ResetCSS />
        <Layout>
          <App />
        </Layout>
      </GithubProvider>
    </main>
  );
};

export default Providers;
