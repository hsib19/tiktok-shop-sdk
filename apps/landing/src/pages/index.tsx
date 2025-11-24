import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome to TikTok Shop SDK</h1>
      <p className="mt-4">This is the landing page content.</p>
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['footer'], i18nConfig)),
    },
  };
}
