import type { CommercePageConfig } from '~/types/commerce'

export const homeConfig: CommercePageConfig = {
  pageType: 'home',
  eventPrefix: 'home',
  slug: '/',
  seo: {
    title: 'DopaMatrix Commerce Growth Suite',
    description: 'A lightweight entry to DopaMatrix Commerce Growth Suite for local brands, ecommerce products and B2B leads.',
    canonicalPath: '/',
    ogTitle: 'DopaMatrix Commerce Growth Suite',
    ogDescription: 'Choose the right commerce growth path: store visits, ecommerce orders or B2B inquiries.',
    ogImage: '/og/commerce-growth.png',
    keywords: ['DopaMatrix', 'commerce growth', 'creative matrix', 'local brands', 'ecommerce products', 'B2B leads']
  },
  hero: {
    eyebrow: 'DopaMatrix',
    title: 'Commerce Growth Suite',
    subtitle: '一个轻量入口，帮助你从到店、下单和询盘三种商业结果中选择正确的增长页面。',
    primaryCta: { label: '进入 Commerce Growth Suite', href: '/use-cases/commerce-growth', variant: 'primary' },
    secondaryCtas: [
      { label: 'Local Brands', href: '/use-cases/local-brands', variant: 'secondary' },
      { label: 'E-commerce Products', href: '/use-cases/ecommerce-products', variant: 'ghost' },
      { label: 'B2B Leads', href: '/use-cases/b2b-leads', variant: 'ghost' }
    ],
    badges: ['Declare growth', 'Compile creatives', 'Learn from attribution']
  },
  painPoints: [
    { title: 'Local Brands', description: '到店、导航、核销、复购。' },
    { title: 'E-commerce Products', description: 'PDP、加购、下单、ROAS。' },
    { title: 'B2B Leads', description: '询盘、报价、样品、销售线索。' }
  ],
  solution: [],
  outcomes: [],
  matrix: [],
  attribution: [],
  assets: [],
  faq: [
    { question: '首页的作用是什么？', answer: '首页作为轻量入口，引导用户进入 Commerce Growth Suite 总览页和三个细分场景页。' }
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' }
  ]
}
