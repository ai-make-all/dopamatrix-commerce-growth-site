import type { CommercePageConfig } from '~/types/commerce'

export const commerceGrowthConfig: CommercePageConfig = {
  pageType: 'commerce_growth',
  eventPrefix: 'commerce',
  slug: '/use-cases/commerce-growth',
  seo: {
    title: 'DopaMatrix Commerce Growth Suite | Store, Product & B2B Growth',
    description: 'Compile store, SKU and B2B business assets into conversion-focused content matrices for visits, orders and inquiries.',
    canonicalPath: '/use-cases/commerce-growth',
    ogTitle: 'DopaMatrix Commerce Growth Suite',
    ogDescription: 'One creative system for three business outcomes: store visits, ecommerce orders and B2B inquiries.',
    ogImage: '/og/commerce-growth.png',
    keywords: [
      'commerce growth suite',
      'content matrix for commerce',
      'store visit marketing',
      'ecommerce creative matrix',
      'B2B lead generation content'
    ]
  },
  hero: {
    eyebrow: 'Commerce Growth Suite',
    title: '把门店、商品和企业产品，编译成可转化的增长内容矩阵',
    subtitle: '无论你的目标是到店、下单还是询盘，DopaMatrix 都能把业务资产转化为多平台内容矩阵，并追踪真实业务结果。',
    primaryCta: { label: '选择你的增长场景', href: '#routes', variant: 'primary' },
    secondaryCtas: [
      { label: '查看 Local Brands', href: '/use-cases/local-brands', variant: 'secondary' },
      { label: '查看 E-commerce Products', href: '/use-cases/ecommerce-products', variant: 'ghost' },
      { label: '查看 B2B Leads', href: '/use-cases/b2b-leads', variant: 'ghost' }
    ],
    badges: ['到店', '下单', '询盘']
  },
  painPoints: [
    { title: '同样是实物业务，转化终点完全不同', description: '门店要人到店，电商要人下单，B2B 要采购商留下可跟进线索。' },
    { title: '内容矩阵不能只讲平台', description: 'TikTok、Facebook、Google、WhatsApp 都只是路径，真正要对齐的是业务结果。' },
    { title: '归因口径需要分开', description: '核销、加购和 RFQ 不能用同一套指标解释。' }
  ],
  solution: [
    { title: 'Declare growth goal', description: '先声明转化终点：到店、下单或询盘。' },
    { title: 'Mine business assets', description: '识别门店、SKU、产品规格、案例、优惠和客户场景。' },
    { title: 'Compile creative matrix', description: '把业务资产编译成各平台可用的内容矩阵。' },
    { title: 'Capture and review', description: '承接线索、到店、订单或询盘，并复盘归因。' }
  ],
  outcomes: [
    { title: 'Local Brands', description: '适合餐饮、茶饮、零售、美业、本地服务。目标是到店、导航、咨询、核销、复购。' },
    { title: 'E-commerce Products', description: '适合美妆、服饰、消费品、跨境电商 SKU。目标是 PDP、加购、下单、ROAS。' },
    { title: 'B2B Leads', description: '适合电梯、汽配、工业设备、建材、机械和工厂。目标是询盘、报价、样品、销售线索。' }
  ],
  matrix: [
    { title: '门店内容矩阵', description: '探店、优惠、菜单、顾客视角和本地社群转发。' },
    { title: '商品内容矩阵', description: 'SKU 卖点、UGC、达人脚本、PDP 导流和购物车召回。' },
    { title: 'B2B 线索矩阵', description: '规格、认证、工厂实力、案例、Catalog 和 RFQ 入口。' }
  ],
  attribution: [
    { title: '到店归因', description: '导航、咨询、领券、核销和复购。' },
    { title: '下单归因', description: 'PDP 点击、加购、购买、优惠码和 ROAS。' },
    { title: '询盘归因', description: 'RFQ、报价、样品、Catalog 下载和销售跟进。' }
  ],
  assets: [
    { title: 'Store assets', description: '门店、菜单、优惠、地址和评价。' },
    { title: 'SKU assets', description: '商品图、PDP、卖点、评价和达人素材。' },
    { title: 'B2B assets', description: '规格、认证、案例、目录和报价入口。' }
  ],
  faq: [
    { question: 'Commerce Growth Suite 是一个总览页吗？', answer: '是。它负责解释三类业务结果，并把用户分流到 Local、Ecom 和 B2B 三个细分页。' },
    { question: '1.0 会做后台或真实 AI 吗？', answer: '不会。1.0 只做静态 SSG、规则化前端 Demo、线索收集预留和后续埋点基础。' }
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Commerce Growth', path: '/use-cases/commerce-growth' }
  ]
}
