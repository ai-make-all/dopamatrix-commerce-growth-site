import type { CommercePageConfig } from '~/types/commerce'

export const localBrandsConfig: CommercePageConfig = {
  pageType: 'local_brands',
  eventPrefix: 'local',
  slug: '/use-cases/local-brands',
  seo: {
    title: 'DopaMatrix for Local Brands | Restaurant & Local Business Marketing Philippines',
    description: 'Turn store photos, menus, offers and customer scenes into TikTok, Facebook, Instagram, Google Maps and WhatsApp content matrices that drive visits, inquiries, redemptions and repeat purchases.',
    canonicalPath: '/use-cases/local-brands',
    ogTitle: 'DopaMatrix for Local Brands',
    ogDescription: 'Compile store, offer and customer scenes into local growth content that drives visits, navigation, redemptions and repeat purchases.',
    ogImage: '/og/local-brands.png',
    keywords: [
      'Philippines local business marketing',
      'restaurant marketing Philippines',
      'TikTok marketing for restaurants',
      'local store growth platform',
      'WhatsApp lead generation for stores'
    ]
  },
  hero: {
    eyebrow: 'Local Brands',
    title: '把门店、产品和顾客体验，变成本地增长内容矩阵',
    subtitle: 'DopaMatrix for Local Brands 帮助菲律宾及东南亚出海实体企业，把菜品、门店、优惠、顾客场景和品牌故事，编译成 TikTok、Facebook、Instagram、Google Maps 和私域社群可用的短视频、图文、活动页和线索转化素材。',
    primaryCta: { label: '获取门店增长方案', href: '#lead', variant: 'primary' },
    secondaryCtas: [
      { label: '上传 3 张门店 / 产品图体验', href: '#demo', variant: 'secondary' },
      { label: 'WhatsApp 快速咨询', href: '#contact', variant: 'ghost' },
      { label: 'Telegram 咨询', href: '#contact', variant: 'ghost' }
    ],
    badges: ['到店', '导航', '核销', '复购']
  },
  painPoints: [
    { title: '曝光没有变成到店', description: '内容有播放量，但顾客没有导航、领券或进店。' },
    { title: '活动无法追踪核销', description: '优惠码、门店活动和私域转发没有形成可复盘路径。' },
    { title: '门店资产分散', description: '菜单、照片、评价、员工视角和顾客场景没有被系统化复用。' }
  ],
  solution: [
    { title: '本地生活增长创意系统', description: '围绕门店、产品、优惠和顾客体验编译内容矩阵。' },
    { title: '渠道适配', description: '生成 TikTok、Facebook、Instagram、Google Maps、WhatsApp 和私域社群可用内容。' },
    { title: '轻归因', description: '追踪咨询、导航、领券、核销、复购和会员加入。' }
  ],
  demo: {
    title: '3 步 Local Growth Demo',
    description: '选择行业、增长目标和市场语言，模拟生成门店增长路径。',
    eventPrefix: 'local',
    steps: [
      {
        key: 'industry',
        title: '选择行业',
        options: [
          { label: '餐饮', value: 'restaurant' },
          { label: '茶饮', value: 'tea_drink' },
          { label: '零售', value: 'retail' },
          { label: '美业', value: 'beauty_service' },
          { label: '家具建材', value: 'home_building' },
          { label: '本地服务', value: 'local_service' }
        ]
      },
      {
        key: 'goal',
        title: '选择目标',
        options: [
          { label: '提高到店', value: 'store_visit' },
          { label: '推广新品', value: 'new_product' },
          { label: '推广套餐', value: 'combo_offer' },
          { label: '获取 WhatsApp 咨询', value: 'whatsapp_inquiry' },
          { label: '吸引本地达人', value: 'local_influencer' },
          { label: '做节日活动', value: 'seasonal_campaign' }
        ]
      },
      {
        key: 'market',
        title: '选择市场和语言',
        options: [
          { label: 'Philippines', value: 'philippines' },
          { label: 'Taglish', value: 'taglish' },
          { label: 'English', value: 'english' },
          { label: 'Chinese Community', value: 'chinese_community' },
          { label: 'Local Filipino', value: 'local_filipino' }
        ]
      }
    ],
    resultLabels: ['Local Growth Card', '门店卖点提炼', '内容矩阵计划', '活动转化路径', '线索追踪建议']
  },
  outcomes: [
    { title: 'Local Growth Card', description: '把门店、优惠和客群目标压缩成一张可执行增长卡。' },
    { title: '活动转化路径', description: '从短视频曝光到 WhatsApp 咨询、导航、领券和核销。' },
    { title: '复购沉淀计划', description: '把到店顾客导入会员、社群或私域复购动作。' }
  ],
  matrix: [
    { title: '探店与菜品短视频', description: '适配 TikTok、Reels 和本地达人脚本。' },
    { title: '优惠图文和社群素材', description: '适合私域转发、门店群和节日活动。' },
    { title: '顾客与员工视角', description: '用真实场景降低到店决策成本。' }
  ],
  attribution: [
    { title: 'Google Maps 导航', description: '关注从内容到门店导航的真实意图。' },
    { title: '优惠码领取与核销', description: '把线上活动和线下到店连接起来。' },
    { title: 'WhatsApp / Messenger 咨询', description: '捕捉顾客到店前的私信和预约。' }
  ],
  assets: [
    { title: '门店照片和菜单', description: '用于首批内容矩阵和活动页素材。' },
    { title: '优惠活动和评价', description: '提炼门店信任点和转化理由。' },
    { title: '地址和联系方式', description: '支撑地图、电话、WhatsApp 和 Messenger 转化。' }
  ],
  workModes: [
    { title: 'Manual', description: '团队手动选择素材和模板。' },
    { title: 'Copilot', description: '系统辅助生成矩阵和活动路径。' },
    { title: 'Autopilot', description: '后续版本再扩展自动投放和归因迭代。' }
  ],
  faq: [
    { question: 'Local Brands 是否等于所有实体商品？', answer: '不是。Local Brands 按到店、导航、核销和复购来定义，不按是否有实物商品来定义。' },
    { question: '1.0 会接真实 AI 吗？', answer: '不会。1.0 只做静态页面、前端规则化 Demo、线索收集预留和后续埋点预留。' }
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Commerce Growth', path: '/use-cases/commerce-growth' },
    { name: 'Local Brands', path: '/use-cases/local-brands' }
  ]
}
