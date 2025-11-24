import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import Hero from '@/components/pages/Hero';
import FeaturesSection from '@/components/pages/FeatureSection';
import QuickLinksSection from '@/components/pages/QuickLinksSection';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <QuickLinksSection />
      <FeaturesSection />
    </Layout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        [
          'hero',
          'quickLinks',
          'featuresSection',
          'githubSection',
          'contributorsSection',
          'githubContentSection',
          'footer',
          'pages',
        ],
        i18nConfig,
      )),
    },
  };
}
