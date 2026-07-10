import type { CommercePageConfig } from '~/types/commerce'
import { commerceMarkets, defaultCommerceLocale } from './markets'

export const ecommerceProductsConfig: CommercePageConfig = {
  pageType: 'ecommerce_products',
  eventPrefix: 'ecom',
  slug: '/use-cases/ecommerce-products',
  locale: {
    ...defaultCommerceLocale,
    ...commerceMarkets.southeast_asia,
    audience: 'ecommerce_products',
    audienceLabel: 'E-commerce Products'
  },
  seo: {
    title: 'DopaMatrix for E-commerce Products | TikTok Shop & PDP Creative Matrix',
    description: 'Compile SKU selling points, UGC, reviews, offers and PDP paths into product ad creatives, influencer scripts and content matrices for TikTok Shop, Shopee, Lazada and independent sites.',
    canonicalPath: '/use-cases/ecommerce-products',
    ogTitle: 'DopaMatrix for E-commerce Products',
    ogDescription: 'Turn SKU selling points, PDP paths and UGC assets into ecommerce content matrices that drive PDP clicks, add-to-cart and purchases.',
    ogImage: '/og/ecommerce-products.png',
    keywords: [
      'TikTok ecommerce product ads',
      'ecommerce creative automation',
      'product ad creative matrix',
      'TikTok Shop marketing',
      'PDP conversion creatives',
      'UGC ad script generator'
    ]
  },
  hero: {
    eyebrow: 'E-commerce Products',
    title: '把商品卖点和用户场景，编译成可转化的电商内容矩阵',
    subtitle: 'DopaMatrix for E-commerce Products 帮助美妆、服饰、消费品和跨境电商品牌，把 SKU、PDP、用户评价、达人素材和优惠活动，生成 TikTok、Facebook、Instagram、TikTok Shop、Shopee、Lazada 和独立站可用的内容矩阵，并追踪从曝光、点击、加购到购买的转化路径。',
    primaryCta: { label: '获取商品增长方案', href: '#lead', variant: 'primary' },
    secondaryCtas: [
      { label: '生成 SKU 内容矩阵 Demo', href: '#demo', variant: 'secondary' },
      { label: 'WhatsApp 咨询', href: '#contact', variant: 'ghost' },
      { label: 'Telegram 咨询', href: '#contact', variant: 'ghost' }
    ],
    badges: ['PDP 点击', '加购', '下单', 'ROAS']
  },
  painPoints: [
    { title: '卖点多但测试少', description: 'SKU、评价、达人素材很多，但缺少结构化复用和测试路径。' },
    { title: '内容不一定带来购买', description: '播放量和互动没有稳定转化为 PDP 点击、加购和订单。' },
    { title: '平台素材割裂', description: 'TikTok Shop、Shopee、Lazada、独立站需要不同表达。' }
  ],
  solution: [
    { title: '商品增长创意系统', description: '围绕 SKU、PDP、评价、优惠和用户场景编译内容矩阵。' },
    { title: '达人脚本复用', description: '把 UGC、开箱、测评和场景化素材转为可测试脚本。' },
    { title: '电商归因', description: '关注 CTR、PDP 点击、加购率、购买转化率和 ROAS。' }
  ],
  demo: {
    title: '3 步 Product Growth Demo',
    description: '选择品类、增长目标和渠道，模拟生成商品内容矩阵。',
    eventPrefix: 'ecom',
    steps: [
      {
        key: 'category',
        title: '选择品类',
        options: [
          { label: '美妆', value: 'beauty' },
          { label: '服饰', value: 'fashion' },
          { label: '小家电', value: 'home_appliance' },
          { label: '食品', value: 'food' },
          { label: '日用品', value: 'daily_goods' },
          { label: '其他消费品', value: 'other_consumer_goods' }
        ]
      },
      {
        key: 'goal',
        title: '选择目标',
        options: [
          { label: '提高 PDP 点击', value: 'pdp_click' },
          { label: '提高加购', value: 'add_to_cart' },
          { label: '提高购买转化', value: 'purchase_conversion' },
          { label: '推广新品', value: 'new_product_launch' },
          { label: '清库存', value: 'inventory_clearance' },
          { label: '做达人种草', value: 'influencer_seeding' }
        ]
      },
      {
        key: 'channel',
        title: '选择渠道',
        options: [
          { label: 'TikTok Shop', value: 'tiktok_shop' },
          { label: 'Shopee', value: 'shopee' },
          { label: 'Lazada', value: 'lazada' },
          { label: 'Independent Site', value: 'independent_site' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'Instagram', value: 'instagram' }
        ]
      }
    ],
    resultLabels: ['Product Growth Card', 'SKU Selling Point Map', 'Creative Matrix Plan', 'PDP Funnel Plan', 'Commerce Attribution Plan', 'UGC / Influencer Script Pack']
  },
  outcomes: [
    { title: 'SKU Selling Point Map', description: '把功能、场景、评价和优惠拆成可测试卖点。' },
    { title: 'PDP Funnel Plan', description: '从内容点击到商品页、加购、订单和优惠码使用。' },
    { title: 'UGC / Influencer Script Pack', description: '把达人素材复用为可投放、可归因脚本。' }
  ],
  matrix: [
    { title: '产品卖点视频', description: '突出功能、对比、使用场景和限时优惠。' },
    { title: '开箱与测评', description: '适配达人、UGC 和短视频广告素材。' },
    { title: '购物车召回素材', description: '围绕优惠、库存、评价和场景推动回访。' }
  ],
  attribution: [
    { title: 'PDP 点击', description: '判断内容是否带来商品页访问。' },
    { title: '加购和购买', description: '关注从兴趣到交易的真实转化。' },
    { title: 'ROAS', description: '按卖点、渠道和达人脚本复盘投入产出。' }
  ],
  assets: [
    { title: 'SKU 和 PDP', description: '商品标题、卖点、详情页和价格信息。' },
    { title: '评价和达人素材', description: '用于构建信任、种草和测试角度。' },
    { title: '优惠与库存策略', description: '支撑新品、清库存和购物车召回内容。' }
  ],
  faq: [
    { question: 'E-commerce Products 是否关注到店？', answer: '不关注。它的核心终点是 PDP、加购、下单和 ROAS。' },
    { question: 'Demo 会生成真实广告吗？', answer: '第一阶段只做页面和配置，后续 Demo 也只做前端规则化模拟。' }
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Commerce Growth', path: '/use-cases/commerce-growth' },
    { name: 'E-commerce Products', path: '/use-cases/ecommerce-products' }
  ]
}
