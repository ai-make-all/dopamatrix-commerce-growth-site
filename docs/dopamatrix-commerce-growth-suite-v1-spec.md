你是 DopaMatrix Commerce Growth Suite 官网多落地页 1.0 的产品架构师、文案策划、Nuxt 3 前端开发顾问和 Cloudflare Pages 部署顾问。

请基于以下上下文，协助我完成 DopaMatrix 面向实物商品、实体企业和商业客户的多落地页内容设计、组件拆分、Nuxt 3 SSG 页面开发、Cloudflare Pages 部署和 PostHog 数据追踪。

一、总背景

DopaMatrix 主平台定位是：

面向漫剧、游戏买量和互动内容出海团队的情绪体验型 UA Creative OS。

核心主张：

Declare growth. Compile creatives. Learn from attribution.

中文表达：

声明增长目标，编译创意矩阵，归因驱动进化。

但本次任务不是游戏 / 漫剧页面，而是面向实物商品和商业客户的垂直落地页体系。

这些客户包括：

1. 本地门店型客户
   例如菲律宾餐饮、茶饮、零售、美业、本地服务、连锁门店、绝味鸭脖这类有线下门店和到店需求的企业。

2. ToC 电商商品客户
   例如美妆、服饰、小家电、食品、消费品、跨境电商 SKU、TikTok Shop / Shopee / Lazada / 独立站商品。

3. ToB 线索型企业
   例如电梯、汽车配件、工业设备、建材、机械、工厂服务、工程产品、渠道招商、批发采购类企业。

重要分类原则：

不要把所有“实物产品企业”都归到实体商家。
应该按用户看完内容后的下一步转化动作来分类：

到店 / 导航 / 核销 / 复购 = Local Brands
PDP / 加购 / 下单 / ROAS = E-commerce Products
询盘 / 报价 / 规格咨询 / 样品 / 销售跟进 = B2B Leads

二、建议 URL 结构

正式 SEO 阶段建议拆成独立细分页：

/use-cases/local-brands
本地门店 / 餐饮 / 茶饮 / 零售 / 美业 / 本地生活

/use-cases/ecommerce-products
ToC 电商商品 / 美妆 / 服饰 / 消费品 / TikTok Shop / Shopee / Lazada / 独立站

/use-cases/b2b-leads
ToB 工业品 / 汽配 / 电梯 / 建材 / 设备 / 机械 / 工厂 / 批发 / 渠道招商

可选总览页：

/use-cases/commerce-growth
DopaMatrix Commerce Growth Suite 总览页，用于统一介绍三类商业增长场景，并分流到三个细分页。

三、统一产品母定位

DopaMatrix Commerce Growth Suite 是面向出海实体企业、商品品牌和 ToB 线索型企业的商业增长创意系统。

它把门店、产品、SKU、工厂资料、客户案例、优惠活动、顾客场景和品牌故事，编译成 TikTok、Facebook、Instagram、Google Maps、WhatsApp、Telegram、Messenger、PDP、独立站和线索表单可用的内容矩阵，并追踪从曝光、点击、咨询、导航、下单、核销、询盘到复购和成交线索的增长路径。

统一底层逻辑：

Declare growth goal
↓
Mine product / store / business assets
↓
Compile creative matrix
↓
Capture leads / visits / orders / inquiries
↓
Review attribution
↓
Iterate next campaign

中文表达：

声明增长目标
↓
识别门店 / 商品 / 业务资产
↓
编译内容矩阵
↓
承接线索 / 到店 / 下单 / 询盘
↓
归因复盘
↓
迭代下一轮增长

四、技术栈

前端框架：Nuxt 3，Static SSG 模式。
样式：Tailwind CSS。
辅助工具：VueUse。
部署：Cloudflare Pages。
数据追踪：PostHog，用于事件追踪、A/B 测试、Session Replay 和漏斗分析。
动态交互：页面整体静态，但包含前端交互 Demo 和线索收集表单。
线索提交：通过 fetch 调用后端 POST /api/leads，或者后续可切换为 Cloudflare Pages Functions / Worker。
右下角浮动按钮：WhatsApp / Telegram 快速咨询。

注意：

1. 落地页 1.0 先做静态页面，不做登录，不做后台，不做真实 AI 生成。
2. Demo 先做前端规则化模拟，不接真实模型。
3. 表单字段涉及邮箱、WhatsApp、Telegram、公司、门店、产品信息，PostHog Session Replay 需要遮罩敏感输入。
4. /api/leads 如果不是 Cloudflare Pages Function，就用环境变量配置 API_BASE_URL。
5. 建议预留 Cloudflare Turnstile、honeypot 字段或简单防刷机制。

五、三类页面的核心差异

1. Local Brands

目标客户：

餐饮、茶饮、零售、美业、本地服务、连锁门店、有线下客流需求的实体企业。

客户最关心：

有没有人来店？
有没有人导航？
有没有人私信？
有没有人领券？
有没有核销？
有没有复购？

核心资产：

门店照片、菜单、菜品、产品图、优惠活动、顾客评价、地址、Google Maps、WhatsApp、Messenger、员工 / 顾客视角短视频。

内容矩阵：

探店视频、菜品短视频、套餐海报、优惠图文、员工视角、顾客视角、节日活动、新店开业、本地达人脚本、私域转发图。

核心归因：

WhatsApp 点击、Messenger 咨询、Google Maps 导航、电话点击、优惠码领取、到店核销、复购、会员加入。

2. E-commerce Products

目标客户：

美妆、服饰、小家电、消费品、食品礼盒、TikTok Shop、Shopee、Lazada、独立站商品、跨境电商 SKU。

客户最关心：

有没有点击商品页？
有没有加购？
有没有下单？
哪个卖点最能转化？
哪个内容角度 ROAS 更好？
哪个达人脚本能带来销售？

核心资产：

SKU、产品图、产品视频、PDP、用户评价、达人素材、开箱素材、优惠信息、功能卖点、使用场景、前后对比。

内容矩阵：

产品卖点视频、UGC 种草、开箱、测评、前后对比、场景化使用、达人脚本、限时优惠、PDP 导流素材、购物车召回素材。

核心归因：

CTR、PDP 点击、加购率、购买转化率、优惠码使用、客单价、ROAS、复购率。

3. B2B Leads

目标客户：

电梯、汽车配件、工业设备、建材、机械、工程产品、工厂服务、批发采购、渠道招商、代理招商类企业。

客户最关心：

有没有精准采购商咨询？
有没有经销商询盘？
有没有人要报价？
有没有人问规格？
有没有人要样品？
有没有销售可以跟进的线索？

核心资产：

产品规格、工厂能力、认证资质、安装案例、客户案例、对比优势、售后服务、目录 PDF、样品、报价单、WhatsApp、Email、RFQ 表单。

内容矩阵：

产品解释视频、工厂实力视频、案例展示、规格对比、应用场景、FAQ 短视频、报价引导页、目录下载页、WhatsApp 咨询素材、经销商招募内容。

核心归因：

表单提交、WhatsApp 咨询、报价请求、样品请求、Catalog 下载、规格页点击、销售跟进状态、SQL、成交线索。

六、页面一：/use-cases/local-brands

页面定位：

DopaMatrix for Local Brands 是面向出海实体企业的本地生活增长创意系统。它把门店、产品、顾客场景、优惠活动和品牌故事，编译成 TikTok、Facebook、Instagram、Google Maps、WhatsApp、Telegram、Messenger 和私域社群可用的内容矩阵，并追踪从曝光、咨询、导航、到店、核销、复购到私域沉淀的增长路径。

Hero 标题：

把门店、产品和顾客体验，变成本地增长内容矩阵

副标题：

DopaMatrix for Local Brands 帮助菲律宾及东南亚出海实体企业，把菜品、门店、优惠、顾客场景和品牌故事，自动编译成 TikTok、Facebook、Instagram、Google Maps 和私域社群可用的短视频、图文、活动页和线索转化素材。

CTA：

获取门店增长方案
上传 3 张门店 / 产品图体验
WhatsApp 快速咨询
Telegram 咨询

内容漏斗：

Section 1：Hero 首屏
Section 2：门店客流痛点
Section 3：Local Brands 解决方案定位
Section 4：3 步 Local Growth Demo
Section 5：本地获客成果物展示
Section 6：餐饮 / 茶饮 / 零售重点方案
Section 7：本地内容矩阵
Section 8：轻归因：咨询、导航、核销、复购
Section 9：门店资产入库
Section 10：Manual / Copilot / Autopilot 工作模式
Section 11：线索收集 CTA
Section 12：FAQ + SEO

Local Growth Demo：

Step 1：选择行业
餐饮 / 茶饮 / 零售 / 美业 / 家具建材 / 本地服务

Step 2：选择目标
提高到店 / 推广新品 / 推广套餐 / 获取 WhatsApp 咨询 / 吸引本地达人 / 做节日活动

Step 3：选择市场和语言
Philippines / Taglish / English / Chinese Community / Local Filipino

输出：

Local Growth Card
门店卖点提炼
内容矩阵计划
活动转化路径
线索追踪建议

PostHog 事件：

page_view_local_brands
local_hero_cta_click
local_demo_started
local_demo_industry_selected
local_demo_goal_selected
local_demo_market_selected
local_demo_result_viewed
local_lead_form_started
local_lead_form_submitted
local_whatsapp_click
local_telegram_click
section_viewed_restaurant_solution
section_viewed_local_matrix
section_viewed_local_attribution

SEO 关键词：

Philippines local business marketing
restaurant marketing Philippines
TikTok marketing for restaurants
local store growth platform
Chinese restaurant marketing Philippines
food brand marketing Southeast Asia
local business content marketing
WhatsApp lead generation for stores

七、页面二：/use-cases/ecommerce-products

页面定位：

DopaMatrix for E-commerce Products 是面向 ToC 电商商品、消费品品牌和跨境电商团队的商品增长创意系统。它把 SKU、产品卖点、用户场景、达人素材、评价内容和 PDP 转化路径，编译成可测试、可归因、可转化的短视频、图文、达人脚本、广告素材和商品页导流矩阵。

Hero 标题：

把商品卖点和用户场景，编译成可转化的电商内容矩阵

副标题：

DopaMatrix for E-commerce Products 帮助美妆、服饰、消费品和跨境电商品牌，把 SKU、PDP、用户评价、达人素材和优惠活动，自动生成 TikTok、Facebook、Instagram、TikTok Shop、Shopee、Lazada 和独立站可用的内容矩阵，并追踪从曝光、点击、加购到购买的转化路径。

CTA：

获取商品增长方案
生成 SKU 内容矩阵 Demo
WhatsApp 咨询
Telegram 咨询

内容漏斗：

Section 1：Hero 首屏
Section 2：电商商品增长痛点
Section 3：E-commerce Products 解决方案定位
Section 4：3 步 Product Growth Demo
Section 5：商品增长成果物展示
Section 6：美妆 / 服饰 / 消费品内容方案
Section 7：商品内容矩阵
Section 8：PDP / 加购 / 下单归因
Section 9：SKU 资产入库
Section 10：达人脚本与 UGC 复用
Section 11：线索收集 CTA
Section 12：FAQ + SEO

痛点：

产品很多，但不知道哪个卖点适合做广告。
达人素材很多，但缺少复用和结构化测试。
内容有播放量，但不一定带来 PDP 点击和购买。
短视频、图文、商品页、优惠活动之间割裂。
不知道哪个内容角度带来加购和 ROAS。
不同平台需要不同素材，人工改版效率低。

Product Growth Demo：

Step 1：选择品类
美妆 / 服饰 / 小家电 / 食品 / 日用品 / 其他消费品

Step 2：选择目标
提高 PDP 点击 / 提高加购 / 提高购买转化 / 推广新品 / 清库存 / 做达人种草

Step 3：选择渠道
TikTok Shop / Shopee / Lazada / Independent Site / Facebook / Instagram

输出：

Product Growth Card
商品卖点地图
创意内容矩阵
PDP 转化路径
电商归因计划

核心成果物：

Product Growth Card
SKU Selling Point Map
Creative Matrix Plan
PDP Funnel Plan
Commerce Attribution Plan
UGC / Influencer Script Pack

PostHog 事件：

page_view_ecommerce_products
ecom_hero_cta_click
ecom_demo_started
ecom_demo_category_selected
ecom_demo_goal_selected
ecom_demo_channel_selected
ecom_demo_result_viewed
ecom_lead_form_started
ecom_lead_form_submitted
ecom_whatsapp_click
ecom_telegram_click
section_viewed_product_matrix
section_viewed_pdp_funnel
section_viewed_ugc_scripts

SEO 关键词：

TikTok ecommerce product ads
ecommerce creative automation
product ad creative matrix
TikTok Shop marketing
Shopee product marketing
beauty product ad creatives
fashion ecommerce marketing
PDP conversion creatives
UGC ad script generator

八、页面三：/use-cases/b2b-leads

页面定位：

DopaMatrix for B2B Leads 是面向工业品、汽配、电梯、建材、机械设备、工厂和高客单 ToB 企业的线索增长创意系统。它把产品规格、工厂能力、应用场景、客户案例、认证资质和报价路径，编译成可获客、可询盘、可跟进的 B2B 内容线索矩阵。

Hero 标题：

把产品规格、工厂实力和客户案例，变成可询盘的 B2B 内容矩阵

副标题：

DopaMatrix for B2B Leads 帮助电梯、汽车配件、工业设备、建材和工厂型企业，把产品资料、应用场景、案例证明和报价入口，自动生成 LinkedIn、Facebook、TikTok、Google、WhatsApp、Email 和 RFQ 表单可用的内容矩阵，并追踪从浏览、咨询、报价到销售跟进的线索路径。

CTA：

获取 B2B 线索增长方案
生成产品询盘内容 Demo
WhatsApp 咨询
Telegram 咨询

内容漏斗：

Section 1：Hero 首屏
Section 2：B2B 获客痛点
Section 3：B2B Leads 解决方案定位
Section 4：3 步 B2B Lead Demo
Section 5：B2B 线索成果物展示
Section 6：汽配 / 电梯 / 工业品方案
Section 7：产品线索内容矩阵
Section 8：RFQ / WhatsApp / Catalog 归因
Section 9：B2B 资产入库
Section 10：销售跟进与线索分层
Section 11：线索收集 CTA
Section 12：FAQ + SEO

痛点：

产品专业，但普通短视频讲不清价值。
社媒有曝光，但询盘质量低。
销售资料、规格表、案例、资质分散，不能转成内容矩阵。
客户需要信任和证据，不是看完马上下单。
不知道哪些内容能带来报价请求和真实采购线索。
多语言、多地区、多产品线推广成本高。

B2B Lead Demo：

Step 1：选择行业
汽车配件 / 电梯 / 工业设备 / 建材 / 机械 / 工厂服务 / 批发招商

Step 2：选择目标
获取报价请求 / 获取 WhatsApp 咨询 / 推广产品规格 / 招募代理商 / 获取样品请求 / 下载 Catalog

Step 3：选择市场
Philippines / Southeast Asia / Middle East / United States / Global B2B

输出：

B2B Growth Card
Product Proof Map
Lead Content Matrix
RFQ Funnel Plan
Sales Follow-up Plan

核心成果物：

B2B Growth Card
Product Proof Map
Content Matrix Plan
RFQ / WhatsApp Funnel
Catalog Download Plan
Lead Qualification Plan

PostHog 事件：

page_view_b2b_leads
b2b_hero_cta_click
b2b_demo_started
b2b_demo_industry_selected
b2b_demo_goal_selected
b2b_demo_market_selected
b2b_demo_result_viewed
b2b_lead_form_started
b2b_lead_form_submitted
b2b_whatsapp_click
b2b_telegram_click
section_viewed_b2b_matrix
section_viewed_rfq_funnel
section_viewed_sales_followup

SEO 关键词：

auto parts B2B lead generation
industrial product marketing
elevator company lead generation
B2B lead generation for manufacturers
factory marketing overseas
B2B WhatsApp lead generation
industrial equipment marketing
RFQ lead generation
B2B content marketing for manufacturers

九、可选总览页：/use-cases/commerce-growth

页面作用：

如果项目时间允许，可以做一个 Commerce Growth Suite 总览页，用于统一介绍三类商业增长页面，并把用户分流到 Local Brands、E-commerce Products、B2B Leads。

Hero 标题：

DopaMatrix Commerce Growth Suite
把门店、商品和企业产品，编译成可转化的增长内容矩阵

副标题：

无论你的目标是到店、下单还是询盘，DopaMatrix 都能把业务资产转化为多平台内容矩阵，并追踪真实业务结果。

分流卡片：

Local Brands
适合餐饮、茶饮、零售、美业、本地服务。
目标：到店、导航、咨询、核销、复购。
按钮：查看本地门店方案

E-commerce Products
适合美妆、服饰、消费品、跨境电商 SKU。
目标：PDP、加购、下单、ROAS。
按钮：查看电商商品方案

B2B Leads
适合电梯、汽配、工业设备、建材、机械和工厂。
目标：询盘、报价、样品、销售线索。
按钮：查看 B2B 线索方案

十、建议组件结构

/pages/use-cases/local-brands.vue
/pages/use-cases/ecommerce-products.vue
/pages/use-cases/b2b-leads.vue
/pages/use-cases/commerce-growth.vue，可选

/components/commerce/shared/
CommerceHero.vue
CommercePainPoints.vue
CommerceDemo.vue
CommerceOutcomeCards.vue
CommerceMatrixSection.vue
CommerceAttributionSection.vue
CommerceAssetOnboarding.vue
CommerceWorkModes.vue
CommerceLeadForm.vue
CommerceFAQ.vue
FloatingContact.vue

/components/commerce/local/
LocalIndustrySection.vue
RestaurantSolution.vue
LocalAttributionMetrics.vue

/components/commerce/ecommerce/
ProductCategorySection.vue
PdpFunnelSection.vue
UgcScriptSection.vue

/components/commerce/b2b/
B2BIndustrySection.vue
RFQFunnelSection.vue
SalesFollowupSection.vue

建议尽量做成数据驱动组件：

一个 CommerceHero 组件，通过 props 或配置传入不同页面的 title、subtitle、CTA、badges。
一个 CommerceDemo 组件，通过配置传入不同页面的 step options 和 result template。
一个 CommerceLeadForm 组件，通过 hidden field 标记 source_page：local_brands / ecommerce_products / b2b_leads。

十一、PostHog 总体事件规范

公共事件：

commerce_page_viewed
commerce_hero_cta_clicked
commerce_demo_started
commerce_demo_step_selected
commerce_demo_result_viewed
commerce_lead_form_started
commerce_lead_form_submitted
commerce_whatsapp_clicked
commerce_telegram_clicked
commerce_section_viewed

每个事件建议带属性：

page_type:
local_brands / ecommerce_products / b2b_leads / commerce_growth

industry:
restaurant / beauty / retail / auto_parts / elevator / ecommerce_beauty / fashion 等

goal:
store_visit / whatsapp_lead / pdp_click / purchase / rfq / quote_request 等

market:
philippines / southeast_asia / middle_east / global 等

cta_location:
hero / demo / footer / floating 等

十二、SEO 基础要求

每个页面必须有独立：

title
description
canonical
og:title
og:description
og:image
FAQ schema
breadcrumb schema
sitemap entry

页面 SEO 不要互相抢关键词。

Local Brands 聚焦：
restaurant marketing Philippines
local business marketing Philippines
WhatsApp lead generation for stores

E-commerce Products 聚焦：
TikTok ecommerce product ads
TikTok Shop marketing
PDP conversion creatives
UGC ad scripts

B2B Leads 聚焦：
auto parts B2B lead generation
industrial product marketing
B2B lead generation for manufacturers
RFQ lead generation

十三、当前任务

请先帮我生成 DopaMatrix Commerce Growth Suite 多落地页 1.0 的 Nuxt 3 项目实施方案，包括：

1. 多页面信息架构。
2. /use-cases/local-brands 页面内容结构。
3. /use-cases/ecommerce-products 页面内容结构。
4. /use-cases/b2b-leads 页面内容结构。
5. 可选 /use-cases/commerce-growth 总览页结构。
6. 共享组件和垂直页面组件拆分。
7. Tailwind 视觉风格建议。
8. 三类 Demo 的前端状态结构。
9. CommerceLeadForm 的 fetch 提交逻辑。
10. PostHog 事件埋点方案。
11. Cloudflare Pages 部署配置。
12. SEO meta、FAQ schema、breadcrumb schema 建议。
13. 第一版开发任务清单。
14. 可以直接交给 Cursor / Codex / Sonnet 执行的分步开发指令。

请注意：

1. 不要把所有实物商品都叫实体商家。
2. 页面要按转化终点区分：到店、下单、询盘。
3. Local Brands 讲门店、本地生活、导航、核销、复购。
4. E-commerce Products 讲 SKU、PDP、加购、下单、ROAS。
5. B2B Leads 讲产品规格、工厂实力、案例证明、RFQ、报价、销售线索。
6. 页面 1.0 先做静态 SSG，不做登录，不做后台，不做真实 AI 生成。
7. Demo 先用前端规则化模拟。
8. 目标是快速上线、SEO 友好、能收集线索、能验证不同垂直页的转化漏斗。

战友，结论先压实：**这套多落地页不能做成“实物商品企业官网页”。那是垃圾分类法。正确分类是转化终点：到店、下单、询盘。**我会把任务说明来拆成 Local Brands、E-commerce Products、B2B Leads 三条漏斗，并保留 Commerce Growth Suite 总览页作为分流页。

## 0. 技术总原则

DopaMatrix Commerce Growth Suite 1.0 只做四件事：

1. **SEO 获客**：每个垂直页抢不同关键词，不互相打架。
2. **前端 Demo 转化**：让客户 30 秒内理解“我选行业、目标、市场 → 生成增长矩阵”。
3. **线索收集**：WhatsApp / Telegram / 表单三种入口。
4. **PostHog 验证漏斗**：不是为了炫埋点，是为了判断哪个垂直页最值得继续投入。

Nuxt 这边建议用静态生成，Cloudflare Pages 部署时构建命令用 `nuxt generate` / `nuxi generate`，输出目录为 `.output/public`；Nuxt 官方也明确 Cloudflare Pages 静态生成使用 `nuxt generate`，SSG 会生成可托管的静态目录。([Nuxt][1])

---

# 1. 多页面信息架构

## URL 结构

```txt
/
├── /use-cases/commerce-growth
├── /use-cases/local-brands
├── /use-cases/ecommerce-products
└── /use-cases/b2b-leads
```

## 页面角色

| 页面                              | 作用      | 转化终点                 | 主关键词                              |
| ------------------------------- | ------- | -------------------- | --------------------------------- |
| `/use-cases/commerce-growth`    | 总览分流页   | 判断客户类型               | commerce growth creative system   |
| `/use-cases/local-brands`       | 本地门店页   | 到店 / 导航 / 核销 / 复购    | restaurant marketing Philippines  |
| `/use-cases/ecommerce-products` | 电商商品页   | PDP / 加购 / 下单 / ROAS | TikTok ecommerce product ads      |
| `/use-cases/b2b-leads`          | B2B 线索页 | RFQ / 报价 / 样品 / 销售线索 | B2B lead generation manufacturers |

狠话：**不要在 Local 页面讲 SKU，也不要在 Ecom 页面讲导航核销，更不要在 B2B 页面讲“马上下单”。这三类客户的心理账户完全不同。**

---

# 2. `/use-cases/local-brands` 页面结构

## 页面核心定位

**DopaMatrix for Local Brands = 本地门店增长创意系统。**

它不是“实体商家营销工具”，而是把门店、菜品、顾客体验、优惠活动、本地场景编译成可带来咨询、导航、到店、核销和复购的内容矩阵。

## 页面 Section

```txt
01 Hero
02 Pain Points：门店有内容，但没有持续客流
03 Solution：Local Growth Creative System
04 3-Step Local Growth Demo
05 Outcomes：本地获客成果物
06 Vertical Solutions：餐饮 / 茶饮 / 零售 / 美业
07 Local Content Matrix
08 Attribution：咨询 / 导航 / 优惠码 / 核销 / 复购
09 Asset Onboarding：门店资产入库
10 Work Modes：Manual / Copilot / Autopilot
11 Lead CTA
12 FAQ + SEO
```

## Hero 文案

```txt
标题：
把门店、产品和顾客体验，变成本地增长内容矩阵

副标题：
DopaMatrix for Local Brands 帮助菲律宾及东南亚出海实体企业，把菜品、门店、优惠、顾客场景和品牌故事，编译成 TikTok、Facebook、Instagram、Google Maps 和私域社群可用的短视频、图文、活动页和线索转化素材。
```

## Local Demo

```ts
industryOptions = [
  'restaurant',
  'tea_drink',
  'retail',
  'beauty',
  'furniture_building_materials',
  'local_service'
]

goalOptions = [
  'store_visit',
  'new_product_launch',
  'combo_promotion',
  'whatsapp_lead',
  'local_influencer',
  'holiday_campaign'
]

marketOptions = [
  'philippines',
  'taglish',
  'english',
  'chinese_community',
  'local_filipino'
]
```

## Demo 输出

```txt
Local Growth Card
Store Selling Point Map
Local Content Matrix Plan
Campaign Conversion Path
Attribution Tracking Suggestions
```

---

# 3. `/use-cases/ecommerce-products` 页面结构

## 页面核心定位

**DopaMatrix for E-commerce Products = 商品增长创意系统。**

它不是“电商代运营页”，而是围绕 SKU、PDP、UGC、达人脚本、卖点测试、加购和 ROAS 的创意矩阵系统。

## 页面 Section

```txt
01 Hero
02 Pain Points：商品多，但不知道哪个卖点转化
03 Solution：Product Growth Creative System
04 3-Step Product Growth Demo
05 Outcomes：商品增长成果物
06 Vertical Solutions：美妆 / 服饰 / 小家电 / 食品 / 消费品
07 Product Creative Matrix
08 PDP Funnel：PDP / 加购 / 下单归因
09 SKU Asset Onboarding
10 UGC / Influencer Script Reuse
11 Lead CTA
12 FAQ + SEO
```

## Hero 文案

```txt
标题：
把商品卖点和用户场景，编译成可转化的电商内容矩阵

副标题：
DopaMatrix for E-commerce Products 帮助美妆、服饰、消费品和跨境电商品牌，把 SKU、PDP、用户评价、达人素材和优惠活动，自动生成 TikTok、Facebook、Instagram、TikTok Shop、Shopee、Lazada 和独立站可用的内容矩阵，并追踪从曝光、点击、加购到购买的转化路径。
```

## Product Demo

```ts
categoryOptions = [
  'beauty',
  'fashion',
  'home_appliance',
  'food',
  'daily_goods',
  'other_consumer_goods'
]

goalOptions = [
  'pdp_click',
  'add_to_cart',
  'purchase_conversion',
  'new_product_launch',
  'inventory_clearance',
  'influencer_seeding'
]

channelOptions = [
  'tiktok_shop',
  'shopee',
  'lazada',
  'independent_site',
  'facebook',
  'instagram'
]
```

## Demo 输出

```txt
Product Growth Card
SKU Selling Point Map
Creative Matrix Plan
PDP Funnel Plan
Commerce Attribution Plan
UGC / Influencer Script Pack
```

---

# 4. `/use-cases/b2b-leads` 页面结构

## 页面核心定位

**DopaMatrix for B2B Leads = 工业品 / 高客单 ToB 线索增长创意系统。**

B2B 页最容易写废。不能写成“短视频推广工业品”，而要写成：**把规格、工厂实力、认证、案例和报价入口，变成可询盘、可跟进、可分层的内容线索矩阵。**

## 页面 Section

```txt
01 Hero
02 Pain Points：产品专业，但内容讲不清，询盘质量低
03 Solution：B2B Lead Creative System
04 3-Step B2B Lead Demo
05 Outcomes：B2B 线索成果物
06 Vertical Solutions：汽配 / 电梯 / 工业品 / 建材 / 机械
07 B2B Lead Content Matrix
08 RFQ / WhatsApp / Catalog Attribution
09 B2B Asset Onboarding
10 Sales Follow-up & Lead Qualification
11 Lead CTA
12 FAQ + SEO
```

## Hero 文案

```txt
标题：
把产品规格、工厂实力和客户案例，变成可询盘的 B2B 内容矩阵

副标题：
DopaMatrix for B2B Leads 帮助电梯、汽车配件、工业设备、建材和工厂型企业，把产品资料、应用场景、案例证明和报价入口，自动生成 LinkedIn、Facebook、TikTok、Google、WhatsApp、Email 和 RFQ 表单可用的内容矩阵，并追踪从浏览、咨询、报价到销售跟进的线索路径。
```

## B2B Demo

```ts
industryOptions = [
  'auto_parts',
  'elevator',
  'industrial_equipment',
  'building_materials',
  'machinery',
  'factory_service',
  'wholesale_distribution'
]

goalOptions = [
  'quote_request',
  'whatsapp_inquiry',
  'product_spec_promotion',
  'dealer_recruitment',
  'sample_request',
  'catalog_download'
]

marketOptions = [
  'philippines',
  'southeast_asia',
  'middle_east',
  'united_states',
  'global_b2b'
]
```

## Demo 输出

```txt
B2B Growth Card
Product Proof Map
Lead Content Matrix
RFQ Funnel Plan
Sales Follow-up Plan
Lead Qualification Plan
```

---

# 5. `/use-cases/commerce-growth` 总览页结构

这个页面建议做，但要轻。它不是主战场，而是分流器。

```txt
01 Hero：Commerce Growth Suite 总定位
02 三类转化终点解释：到店 / 下单 / 询盘
03 三张分流卡片：Local / Ecom / B2B
04 Unified Workflow：Declare → Mine → Compile → Capture → Review → Iterate
05 Comparison Table：三类客户资产、内容、归因差异
06 CTA：选择你的增长场景
07 FAQ
```

## 分流卡片

```txt
Local Brands
适合：餐饮、茶饮、零售、美业、本地服务
目标：到店、导航、咨询、核销、复购
CTA：查看本地门店方案

E-commerce Products
适合：美妆、服饰、消费品、跨境电商 SKU
目标：PDP、加购、下单、ROAS
CTA：查看电商商品方案

B2B Leads
适合：电梯、汽配、工业设备、建材、机械和工厂
目标：询盘、报价、样品、销售线索
CTA：查看 B2B 线索方案
```

---

# 6. 组件拆分

## 目录建议

```txt
/pages/use-cases/
├── commerce-growth.vue
├── local-brands.vue
├── ecommerce-products.vue
└── b2b-leads.vue

/components/commerce/shared/
├── CommerceHero.vue
├── CommercePainPoints.vue
├── CommerceDemo.vue
├── CommerceOutcomeCards.vue
├── CommerceMatrixSection.vue
├── CommerceAttributionSection.vue
├── CommerceAssetOnboarding.vue
├── CommerceWorkModes.vue
├── CommerceLeadForm.vue
├── CommerceFAQ.vue
├── FloatingContact.vue
├── SectionHeader.vue
└── MetricPill.vue

/components/commerce/local/
├── LocalIndustrySection.vue
├── RestaurantSolution.vue
└── LocalAttributionMetrics.vue

/components/commerce/ecommerce/
├── ProductCategorySection.vue
├── PdpFunnelSection.vue
└── UgcScriptSection.vue

/components/commerce/b2b/
├── B2BIndustrySection.vue
├── RFQFunnelSection.vue
└── SalesFollowupSection.vue

/data/commerce/
├── localBrands.ts
├── ecommerceProducts.ts
├── b2bLeads.ts
└── commerceGrowth.ts

/composables/
├── usePosthog.ts
├── useLeadSubmit.ts
└── useSectionTracking.ts

/plugins/
└── posthog.client.ts
```

## 关键原则

所有通用 Section 都应该数据驱动：

```ts
export type CommercePageType =
  | 'local_brands'
  | 'ecommerce_products'
  | 'b2b_leads'
  | 'commerce_growth'
```

页面只负责传配置，不要在 `.vue` 文件里堆死文案。否则 4 个页面一改就爆炸。

---

# 7. Tailwind 视觉风格建议

DopaMatrix Commerce 页建议延续“增长操作系统”气质，不要做成普通广告公司官网。

## 视觉关键词

```txt
深色科技底
高亮渐变卡片
矩阵网格
转化路径线
轻量 dashboard 感
B2B 页面更稳重
Ecom 页面更明亮
Local 页面更有生活气
```

## Tailwind Token 建议

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      dopa: {
        bg: '#080A12',
        panel: '#101522',
        card: '#151B2E',
        border: '#26324A',
        text: '#F7F9FC',
        muted: '#9AA4B2',
        cyan: '#23D3EE',
        purple: '#8B5CF6',
        green: '#22C55E',
        amber: '#F59E0B'
      }
    },
    boxShadow: {
      glow: '0 0 40px rgba(35, 211, 238, 0.18)'
    }
  }
}
```

## 页面风格差异

| 页面    | 主视觉倾向          | 强调              |
| ----- | -------------- | --------------- |
| Local | cyan + green   | 到店、地图、优惠、社群     |
| Ecom  | purple + amber | SKU、PDP、加购、ROAS |
| B2B   | cyan + slate   | 规格、证明、报价、销售跟进   |

---

# 8. 三类 Demo 的前端状态结构

## 通用 Demo 类型

```ts
export interface DemoStepOption {
  label: string
  value: string
  description?: string
}

export interface CommerceDemoConfig {
  pageType: CommercePageType
  eventPrefix: 'local' | 'ecom' | 'b2b'
  steps: {
    key: string
    title: string
    options: DemoStepOption[]
  }[]
  resultLabels: string[]
}

export interface CommerceDemoState {
  pageType: CommercePageType
  currentStep: number
  selections: Record<string, string>
  resultViewed: boolean
}
```

## Demo 组件行为

```txt
1. 用户点击 Start Demo
   → capture commerce_demo_started

2. 用户选择 step option
   → capture commerce_demo_step_selected
   → 同时触发垂直事件，例如 local_demo_industry_selected

3. 三步选完展示结果
   → capture commerce_demo_result_viewed
   → 同时触发 local_demo_result_viewed / ecom_demo_result_viewed / b2b_demo_result_viewed

4. 结果区 CTA
   → 打开 CommerceLeadForm
   → 带上 demo selections
```

## Result 生成逻辑

1.0 不接模型，只用规则化模板：

```ts
const result = computed(() => {
  return {
    title: getResultTitle(state.selections),
    summary: getResultSummary(state.selections),
    matrixItems: getMatrixItems(pageType, state.selections),
    attributionItems: getAttributionItems(pageType, state.selections)
  }
})
```

别在 1.0 装 AI。**Demo 的目标不是证明你有模型，而是证明客户能理解增长路径。**

---

# 9. `CommerceLeadForm` fetch 提交逻辑

Cloudflare Pages 可以通过 Pages Functions 给静态站点补 `/api/*` 动态能力，官方说明 Pages Functions 可用于表单提交、认证、中间件等应用逻辑；所以 1.0 有两条路：先外部 `API_BASE_URL`，后续切 Pages Function。([Cloudflare Docs][2])

## 表单字段

```ts
export interface CommerceLeadPayload {
  source_page: CommercePageType
  name?: string
  email: string
  company?: string
  whatsapp?: string
  telegram?: string
  business_type?: string
  product_info?: string
  target_market?: string
  growth_goal?: string
  demo_selections?: Record<string, string>
  honeypot?: string
  turnstile_token?: string
}
```

## `useLeadSubmit.ts`

```ts
export function useLeadSubmit() {
  const config = useRuntimeConfig()

  const submitLead = async (payload: CommerceLeadPayload) => {
    if (payload.honeypot) {
      return { ok: true, ignored: true }
    }

    const endpoint =
      config.public.apiBaseUrl
        ? `${config.public.apiBaseUrl}/api/leads`
        : '/api/leads'

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      throw new Error(`Lead submit failed: ${res.status}`)
    }

    return await res.json()
  }

  return { submitLead }
}
```

## `CommerceLeadForm.vue` 提交流程

```ts
const handleSubmit = async () => {
  track('commerce_lead_form_submitted_attempted', {
    page_type: props.pageType,
    cta_location: props.ctaLocation
  })

  try {
    await submitLead({
      ...form.value,
      source_page: props.pageType,
      demo_selections: props.demoSelections
    })

    track('commerce_lead_form_submitted', {
      page_type: props.pageType,
      cta_location: props.ctaLocation,
      goal: props.demoSelections?.goal,
      market: props.demoSelections?.market
    })

    submitted.value = true
  } catch (error) {
    track('commerce_lead_form_submit_failed', {
      page_type: props.pageType
    })

    errorMessage.value = 'Submission failed. Please contact us via WhatsApp or Telegram.'
  }
}
```

## 防刷建议

```txt
1. honeypot hidden field
2. submit loading lock
3. Turnstile 预留
4. 后端 IP + UA 基础限流
5. PostHog 标记异常重复提交
```

Cloudflare Turnstile 官方定位是保护表单，可嵌入表单并在服务端验证 token；1.0 可以先预留字段，第二版再接入。([Cloudflare Docs][3])

---

# 10. PostHog 事件埋点方案

PostHog Nuxt 集成支持 analytics、custom events、session replay、feature flags 等；Session Replay 需要特别处理隐私，PostHog 文档说明输入元素默认会被遮罩，也建议通过配置控制敏感数据采集。([PostHog][4])

## 插件：`plugins/posthog.client.ts`

```ts
import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (!config.public.posthogKey) {
    return {
      provide: {
        posthog
      }
    }
  }

  posthog.init(config.public.posthogKey, {
    api_host: config.public.posthogHost || 'https://us.i.posthog.com',
    capture_pageview: false,
    autocapture: true,
    session_recording: {
      maskAllInputs: true
    },
    before_send: (event) => {
      if (event.properties) {
        delete event.properties.email
        delete event.properties.whatsapp
        delete event.properties.telegram
      }
      return event
    }
  })

  return {
    provide: {
      posthog
    }
  }
})
```

## 通用埋点 composable

```ts
export function usePosthog() {
  const { $posthog } = useNuxtApp()

  const track = (event: string, properties: Record<string, any> = {}) => {
    if (process.client && $posthog?.capture) {
      $posthog.capture(event, {
        ...properties,
        app: 'dopamatrix_commerce_growth_suite'
      })
    }
  }

  return { track }
}
```

## 公共事件

```txt
commerce_page_viewed
commerce_hero_cta_clicked
commerce_demo_started
commerce_demo_step_selected
commerce_demo_result_viewed
commerce_lead_form_started
commerce_lead_form_submitted
commerce_whatsapp_clicked
commerce_telegram_clicked
commerce_section_viewed
```

## 垂直事件

```txt
page_view_local_brands
page_view_ecommerce_products
page_view_b2b_leads

local_demo_industry_selected
local_demo_goal_selected
local_demo_market_selected

ecom_demo_category_selected
ecom_demo_goal_selected
ecom_demo_channel_selected

b2b_demo_industry_selected
b2b_demo_goal_selected
b2b_demo_market_selected
```

## 事件属性

```ts
{
  page_type: 'local_brands',
  industry: 'restaurant',
  goal: 'store_visit',
  market: 'philippines',
  cta_location: 'hero',
  demo_completed: true
}
```

## 最重要的 3 个漏斗

```txt
Funnel 1：Page → Hero CTA → Demo Started → Result Viewed → Lead Submitted

Funnel 2：Page → Floating WhatsApp Click

Funnel 3：Page → Section View → Lead Form Started → Submitted
```

不要一开始埋 100 个事件。**1.0 最重要的是判断哪条转化终点最有需求：到店、下单、还是询盘。**

---

# 11. Cloudflare Pages 部署配置

Cloudflare Pages 支持通过 Git、Direct Upload 或 C3 部署，也支持配置 build command、output directory 和环境变量。([Cloudflare Docs][5])

## 推荐配置

```txt
Framework preset: Nuxt
Build command: npx nuxi generate
Build output directory: .output/public
Node version: 20 或 22
```

## `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dopamatrix.com',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      whatsappUrl: process.env.NUXT_PUBLIC_WHATSAPP_URL || '',
      telegramUrl: process.env.NUXT_PUBLIC_TELEGRAM_URL || ''
    }
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/use-cases/commerce-growth',
        '/use-cases/local-brands',
        '/use-cases/ecommerce-products',
        '/use-cases/b2b-leads'
      ]
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  }
})
```

## 环境变量

```txt
NUXT_PUBLIC_SITE_URL=https://dopamatrix.com
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_POSTHOG_KEY=phc_xxx
NUXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NUXT_PUBLIC_WHATSAPP_URL=https://wa.me/xxx
NUXT_PUBLIC_TELEGRAM_URL=https://t.me/xxx
```

---

# 12. SEO meta、FAQ schema、breadcrumb schema

Nuxt 官方推荐用 `useSeoMeta` 管理 SEO meta，它有 TypeScript 支持并能降低常见 meta 写错风险；复杂 head 标签可以配合 `useHead`。([Nuxt][6])

## 页面 SEO 配置类型

```ts
export interface CommerceSeoConfig {
  title: string
  description: string
  canonicalPath: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string[]
}
```

## 页面内使用

```ts
const config = useRuntimeConfig()
const seo = localBrandsSeo

useSeoMeta({
  title: seo.title,
  description: seo.description,
  ogTitle: seo.ogTitle,
  ogDescription: seo.ogDescription,
  ogImage: `${config.public.siteUrl}${seo.ogImage}`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}${seo.canonicalPath}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(getFaqSchema(localBrandsFaq))
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Use Cases', url: '/use-cases/commerce-growth' },
        { name: 'Local Brands', url: '/use-cases/local-brands' }
      ]))
    }
  ]
})
```

## Local SEO

```txt
title:
DopaMatrix for Local Brands | Restaurant & Local Business Marketing Philippines

description:
Turn store photos, menus, offers and customer scenes into TikTok, Facebook, Instagram, Google Maps and WhatsApp content matrices that drive visits, inquiries, redemptions and repeat purchases.
```

## Ecom SEO

```txt
title:
DopaMatrix for E-commerce Products | TikTok Shop & PDP Creative Matrix

description:
Compile SKU selling points, UGC, reviews, offers and PDP paths into product ad creatives, influencer scripts and content matrices for TikTok Shop, Shopee, Lazada and independent sites.
```

## B2B SEO

```txt
title:
DopaMatrix for B2B Leads | Industrial Product & Manufacturer Lead Generation

description:
Turn product specs, factory proof, certifications and customer cases into B2B content matrices that drive RFQs, WhatsApp inquiries, catalog downloads and qualified sales leads.
```

---

# 13. 第一版开发任务清单

## Phase 1：项目骨架

```txt
[ ] 创建 Nuxt 3 项目
[ ] 安装 Tailwind CSS
[ ] 安装 VueUse
[ ] 创建 /use-cases 四个页面
[ ] 配置 SSG prerender routes
[ ] 配置 runtimeConfig
```

## Phase 2：数据配置

```txt
[ ] 创建 localBrands.ts
[ ] 创建 ecommerceProducts.ts
[ ] 创建 b2bLeads.ts
[ ] 创建 commerceGrowth.ts
[ ] 抽象 CommercePageConfig 类型
[ ] 抽象 SEO / FAQ / Demo / Matrix / Attribution 配置
```

## Phase 3：共享组件

```txt
[ ] CommerceHero
[ ] CommercePainPoints
[ ] CommerceDemo
[ ] CommerceOutcomeCards
[ ] CommerceMatrixSection
[ ] CommerceAttributionSection
[ ] CommerceAssetOnboarding
[ ] CommerceWorkModes
[ ] CommerceLeadForm
[ ] CommerceFAQ
[ ] FloatingContact
```

## Phase 4：垂直组件

```txt
[ ] LocalIndustrySection
[ ] RestaurantSolution
[ ] LocalAttributionMetrics
[ ] ProductCategorySection
[ ] PdpFunnelSection
[ ] UgcScriptSection
[ ] B2BIndustrySection
[ ] RFQFunnelSection
[ ] SalesFollowupSection
```

## Phase 5：埋点

```txt
[ ] posthog.client.ts
[ ] usePosthog.ts
[ ] page view tracking
[ ] CTA tracking
[ ] demo tracking
[ ] section view tracking
[ ] lead form tracking
[ ] WhatsApp / Telegram tracking
[ ] Session Replay input masking
```

## Phase 6：Lead Form

```txt
[ ] 表单 UI
[ ] honeypot
[ ] loading / success / error state
[ ] fetch /api/leads
[ ] env API_BASE_URL fallback
[ ] Turnstile placeholder
```

## Phase 7：SEO

```txt
[ ] 每页 useSeoMeta
[ ] canonical
[ ] OG tags
[ ] FAQ schema
[ ] breadcrumb schema
[ ] sitemap entry
[ ] robots.txt
```

## Phase 8：部署

```txt
[ ] GitHub repo
[ ] Cloudflare Pages 连接仓库
[ ] Build command: npx nuxi generate
[ ] Output: .output/public
[ ] 配置环境变量
[ ] 验证四个页面 200
[ ] 验证 meta / schema
[ ] 验证 PostHog events
[ ] 验证表单提交
```

这版最容易失败的地方不是技术，而是**页面边界失焦**。

你必须守住三条线：

```txt
Local Brands：我怎么让人来店？
E-commerce Products：我怎么让人下单？
B2B Leads：我怎么让采购商留下可跟进线索？
```

只要页面开始都讲“AI 自动生成内容”“多平台营销”“内容矩阵”，它就会变成一张废官网。
DopaMatrix Commerce 这套页的锋利点，必须是：**同一个创意系统，但服务三种完全不同的商业结果。**
