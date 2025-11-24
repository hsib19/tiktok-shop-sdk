import Head from 'next/head';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
};

export default function Seo({
  title = 'TikTok Shop SDK — Unofficial API Integration',
  description = 'Integrate TikTok Shop features into your apps with ease. Manage products, orders, and affiliate programs using the unofficial TikTok Shop SDK.',
  keywords = 'TikTok Shop, tiktok-shop-sdk, tiktok shop api, API, SDK, Node.js, TypeScript, e-commerce, product integration, orders, affiliate',
  author = 'Hasib Muharam',
  image = '/images/tiktok-shop-og.png',
  url = 'https://tiktok-shop-sdk-landing.vercel.app/',
}: SeoProps) {
  return (
    <Head>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
