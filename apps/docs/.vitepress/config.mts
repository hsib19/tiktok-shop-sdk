import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TikTok Shop SDK Docs",
  description: "Modern SDK documentation for TikTok Shop integrations",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'Authentication', link: '/authentication' },
          { text: 'Errors', link: '/errors' },
          {
            text: 'Core API',
            items: [
              {
                text: 'Authorization',
                collapsed: true,
                items: [
                  { text: 'Get Authorized Category Assets', link: '/core-api/authorization/get-authorized-category-assets' },
                  { text: 'Get Authorized Shop', link: '/core-api/authorization/get-authorized-shop' },
                ]
              },
              {
                text: 'Event',
                collapsed: true,
                items: [
                  { text: 'Get Shop Webhooks', link: '/core-api/event/get-shop-webhooks' },
                  { text: 'Update Shop Webhook', link: '/core-api/event/update-shop-webhook' },
                  { text: 'Delete Shop Webhook', link: '/core-api/event/delete-shop-webhook' },
                ]
              },

            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hsib19/tiktok-shop-sdk' }
    ]
  }
})
