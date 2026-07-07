import type { CommercePageConfig } from '~/types/commerce'

export const b2bLeadsConfig: CommercePageConfig = {
  pageType: 'b2b_leads',
  eventPrefix: 'b2b',
  slug: '/use-cases/b2b-leads',
  seo: {
    title: 'DopaMatrix for B2B Leads | Industrial Product & Manufacturer Lead Generation',
    description: 'Turn product specs, factory proof, certifications and customer cases into B2B content matrices that drive RFQs, WhatsApp inquiries, catalog downloads and qualified sales leads.',
    canonicalPath: '/use-cases/b2b-leads',
    ogTitle: 'DopaMatrix for B2B Leads',
    ogDescription: 'Compile specs, factory proof, cases and RFQ paths into B2B content that drives inquiries, quotes and qualified sales leads.',
    ogImage: '/og/b2b-leads.png',
    keywords: [
      'auto parts B2B lead generation',
      'industrial product marketing',
      'B2B lead generation for manufacturers',
      'factory marketing overseas',
      'RFQ lead generation'
    ]
  },
  hero: {
    eyebrow: 'B2B Leads',
    title: '把产品规格、工厂实力和客户案例，变成可询盘的 B2B 内容矩阵',
    subtitle: 'DopaMatrix for B2B Leads 帮助电梯、汽车配件、工业设备、建材和工厂型企业，把产品资料、应用场景、案例证明和报价入口，生成 LinkedIn、Facebook、TikTok、Google、WhatsApp、Email 和 RFQ 表单可用的内容矩阵，并追踪从浏览、咨询、报价到销售跟进的线索路径。',
    primaryCta: { label: '获取 B2B 线索增长方案', href: '#lead', variant: 'primary' },
    secondaryCtas: [
      { label: '生成产品询盘内容 Demo', href: '#demo', variant: 'secondary' },
      { label: 'WhatsApp 咨询', href: '#contact', variant: 'ghost' },
      { label: 'Telegram 咨询', href: '#contact', variant: 'ghost' }
    ],
    badges: ['询盘', '报价', '样品', '销售线索']
  },
  painPoints: [
    { title: '产品专业但讲不清', description: '普通短视频很难表达规格、工厂能力和采购价值。' },
    { title: '曝光不等于好线索', description: '浏览和互动没有稳定转化为 RFQ、报价或样品请求。' },
    { title: '销售资料分散', description: '规格表、认证、案例、目录和报价入口没有形成内容线索路径。' }
  ],
  solution: [
    { title: 'B2B 线索增长创意系统', description: '围绕规格、工厂实力、案例、认证和报价入口编译内容矩阵。' },
    { title: '信任证据结构化', description: '把工厂、资质、安装案例和客户证明转成采购决策素材。' },
    { title: 'RFQ 归因', description: '追踪 WhatsApp 咨询、报价请求、Catalog 下载和销售跟进状态。' }
  ],
  demo: {
    title: '3 步 B2B Lead Demo',
    description: '选择行业、询盘目标和市场，模拟生成 B2B 线索内容路径。',
    eventPrefix: 'b2b',
    steps: [
      {
        key: 'industry',
        title: '选择行业',
        options: [
          { label: '汽车配件', value: 'auto_parts' },
          { label: '电梯', value: 'elevator' },
          { label: '工业设备', value: 'industrial_equipment' },
          { label: '建材', value: 'building_materials' },
          { label: '机械', value: 'machinery' },
          { label: '工厂服务', value: 'factory_service' },
          { label: '批发招商', value: 'wholesale_distribution' }
        ]
      },
      {
        key: 'goal',
        title: '选择目标',
        options: [
          { label: '获取报价请求', value: 'quote_request' },
          { label: '获取 WhatsApp 咨询', value: 'whatsapp_inquiry' },
          { label: '推广产品规格', value: 'product_spec_promotion' },
          { label: '招募代理商', value: 'dealer_recruitment' },
          { label: '获取样品请求', value: 'sample_request' },
          { label: '下载 Catalog', value: 'catalog_download' }
        ]
      },
      {
        key: 'market',
        title: '选择市场',
        options: [
          { label: 'Philippines', value: 'philippines' },
          { label: 'Southeast Asia', value: 'southeast_asia' },
          { label: 'Middle East', value: 'middle_east' },
          { label: 'United States', value: 'united_states' },
          { label: 'Global B2B', value: 'global_b2b' }
        ]
      }
    ],
    resultLabels: ['B2B Growth Card', 'Product Proof Map', 'Lead Content Matrix', 'RFQ Funnel Plan', 'Sales Follow-up Plan', 'Lead Qualification Plan']
  },
  outcomes: [
    { title: 'Product Proof Map', description: '把规格、认证、案例和工厂实力组织成信任证据。' },
    { title: 'RFQ / WhatsApp Funnel', description: '从内容浏览到咨询、报价、样品和销售跟进。' },
    { title: 'Lead Qualification Plan', description: '按采购意图、产品线和市场拆分销售线索。' }
  ],
  matrix: [
    { title: '产品解释内容', description: '用规格、场景和对比讲清产品价值。' },
    { title: '工厂实力和认证', description: '展示产能、资质、流程和售后能力。' },
    { title: '案例与 FAQ', description: '用客户案例和常见问题降低询盘门槛。' }
  ],
  attribution: [
    { title: 'RFQ 表单', description: '记录报价请求、规格咨询和样品请求。' },
    { title: 'Catalog 下载', description: '识别有资料需求和采购意图的访客。' },
    { title: '销售跟进状态', description: '连接 MQL、SQL 和成交线索复盘。' }
  ],
  assets: [
    { title: '产品规格和目录', description: '用于规格页、Catalog 下载和 RFQ 表单。' },
    { title: '工厂能力和认证', description: '作为采购信任和供应能力证明。' },
    { title: '案例与报价入口', description: '支撑询盘、样品和销售跟进。' }
  ],
  faq: [
    { question: 'B2B Leads 是否以直接下单为主？', answer: '不是。B2B Leads 的核心是询盘、报价、样品、Catalog 下载和可跟进销售线索。' },
    { question: '工业品页面会写成普通短视频营销吗？', answer: '不会。页面重点是规格、工厂实力、RFQ 和销售跟进。' }
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Commerce Growth', path: '/use-cases/commerce-growth' },
    { name: 'B2B Leads', path: '/use-cases/b2b-leads' }
  ]
}
