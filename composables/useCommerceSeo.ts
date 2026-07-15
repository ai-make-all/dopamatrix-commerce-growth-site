import type { CommerceSeoConfig } from '~/types/commerce'

export const useCommerceSeo = (seo: CommerceSeoConfig) => {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/$/, '')
  const ogImage = seo.ogImage.startsWith('http') ? seo.ogImage : `${siteUrl}${seo.ogImage}`
  const canonicalUrl = seo.canonicalPath.startsWith('http') ? seo.canonicalPath : `${siteUrl}${seo.canonicalPath}`

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImage,
    twitterCard: 'summary_large_image'
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }]
  })
}
