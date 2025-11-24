import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import Hero from '@/components/pages/Hero';
import FeaturesSection from '@/components/pages/FeatureSection';
import QuickLinksSection from '@/components/pages/QuickLinksSection';
import GithubSection from '@/components/pages/GithubSection';
import ContributorsSection from '@/components/pages/ContributorsSection';
import Seo from '@/components/Seo';
import { i18nNamespaces } from '@/constants/i18nNamespaces';

export default function HomePage() {
  return (
    <>
      <Seo
        title="TikTok Shop SDK | Unofficial API Integration"
        description="Documentation for integrating TikTok Shop SDK"
        url="https://tiktok-shop-sdk-docs.vercel.app/"
        image="/images/docs-og.png"
      />
      <Layout>
        <Hero />
        <QuickLinksSection />
        <FeaturesSection />
        <GithubSection />
        <ContributorsSection />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces, i18nConfig)),
    },
  };
}
