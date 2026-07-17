<script setup lang="ts">
import type {
  CommerceAnalyticsPageContext,
  CommerceHeroConfig,
  CommerceLocaleContext
} from '~/types/commerce'
import CommerceLocaleBadge from './CommerceLocaleBadge.vue'
import MetricPill from './MetricPill.vue'

const props = defineProps<{
  hero: CommerceHeroConfig
  locale?: CommerceLocaleContext
  analyticsContext?: CommerceAnalyticsPageContext
}>()

const { track } = useCommerceAnalytics()

const accent = computed(() => {
  const eyebrow = props.hero.eyebrow.toLowerCase()

  if (eyebrow.includes('local')) {
    return 'green'
  }

  if (eyebrow.includes('e-commerce')) {
    return 'amber'
  }

  return 'cyan'
})

const isHomeHero = computed(() => props.hero.eyebrow === 'DopaMatrix')

const accentTextClass = computed(() => {
  if (accent.value === 'green') {
    return 'text-dopa-green'
  }

  if (accent.value === 'amber') {
    return 'text-dopa-amber'
  }

  return 'text-dopa-cyan'
})

const ctaClass = (variant = 'primary') => {
  const accentMap = {
    cyan: {
      primary: 'bg-dopa-cyan text-dopa-bg hover:bg-white',
      secondary: 'border border-dopa-cyan/50 bg-dopa-cyan/10 text-dopa-text hover:bg-dopa-cyan/20',
      ghost: 'border border-dopa-border bg-transparent text-dopa-muted hover:border-dopa-cyan/60 hover:text-dopa-text'
    },
    green: {
      primary: 'bg-dopa-green text-dopa-bg hover:bg-white',
      secondary: 'border border-dopa-green/50 bg-dopa-green/10 text-dopa-text hover:bg-dopa-green/20',
      ghost: 'border border-dopa-border bg-transparent text-dopa-muted hover:border-dopa-green/60 hover:text-dopa-text'
    },
    amber: {
      primary: 'bg-dopa-amber text-dopa-bg hover:bg-white',
      secondary: 'border border-dopa-amber/50 bg-dopa-amber/10 text-dopa-text hover:bg-dopa-amber/20',
      ghost: 'border border-dopa-border bg-transparent text-dopa-muted hover:border-dopa-amber/60 hover:text-dopa-text'
    }
  }

  return accentMap[accent.value][variant as 'primary' | 'secondary' | 'ghost'] || accentMap[accent.value].primary
}

const isRouteLink = (href: string) => href.startsWith('/')

const routeTargetByHref: Record<string, string> = {
  '/use-cases/local-brands': 'local_brands',
  '/use-cases/ecommerce-products': 'ecommerce_products',
  '/use-cases/b2b-leads': 'b2b_leads'
}

const isRouteLabel = (href: string) => {
  return props.analyticsContext?.pageType === 'commerce_growth' && href === '#routes'
}

const trackCtaClick = (cta: { label: string; href: string; variant?: string }) => {
  if (!props.analyticsContext) {
    return
  }

  const targetRoute = routeTargetByHref[cta.href]

  if (targetRoute) {
    track('commerce_route_select', {
      page: props.analyticsContext,
      locale: props.locale,
      properties: {
        targetRoute
      }
    })
    return
  }

  track('commerce_cta_click', {
    page: props.analyticsContext,
    locale: props.locale,
    properties: {
      ctaLabel: cta.label,
      ctaHref: cta.href,
      ctaVariant: cta.variant || 'primary',
      heroEyebrow: props.hero.eyebrow
    }
  })
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-20 sm:px-10" :class="{ 'flex min-h-[72vh] flex-col justify-center': isHomeHero }">
    <p class="text-sm font-semibold uppercase tracking-[0.24em]" :class="accentTextClass">
      {{ hero.eyebrow }}
    </p>
    <h1
      class="mt-5 max-w-5xl font-semibold leading-tight text-dopa-text"
      :class="isHomeHero ? 'text-5xl sm:text-7xl' : 'text-4xl sm:text-6xl'"
    >
      {{ hero.title }}
    </h1>
    <p class="mt-6 max-w-3xl text-lg leading-8 text-dopa-muted">
      {{ hero.subtitle }}
    </p>

    <div class="mt-8 flex flex-wrap gap-3">
      <MetricPill
        v-if="isRouteLabel(hero.primaryCta.href)"
        :label="hero.primaryCta.label"
      />
      <NuxtLink
        v-else-if="isRouteLink(hero.primaryCta.href)"
        :to="hero.primaryCta.href"
        :class="ctaClass(hero.primaryCta.variant)"
        class="rounded-md px-5 py-3 text-sm font-semibold transition"
        @click="trackCtaClick(hero.primaryCta)"
      >
        {{ hero.primaryCta.label }}
      </NuxtLink>
      <a
        v-else
        :href="hero.primaryCta.href"
        :class="ctaClass(hero.primaryCta.variant)"
        class="rounded-md px-5 py-3 text-sm font-semibold transition"
        @click="trackCtaClick(hero.primaryCta)"
      >
        {{ hero.primaryCta.label }}
      </a>

      <template v-for="cta in hero.secondaryCtas" :key="cta.label">
        <NuxtLink
          v-if="isRouteLink(cta.href)"
          :to="cta.href"
          :class="ctaClass(cta.variant)"
          class="rounded-md px-5 py-3 text-sm font-semibold transition"
          @click="trackCtaClick(cta)"
        >
          {{ cta.label }}
        </NuxtLink>
        <a
          v-else
          :href="cta.href"
          :class="ctaClass(cta.variant)"
          class="rounded-md px-5 py-3 text-sm font-semibold transition"
          @click="trackCtaClick(cta)"
        >
          {{ cta.label }}
        </a>
      </template>
    </div>

    <div v-if="hero.badges.length" class="mt-10 flex flex-wrap gap-2">
      <MetricPill v-for="badge in hero.badges" :key="badge" :label="badge" />
    </div>

    <CommerceLocaleBadge v-if="locale" :locale="locale" class="mt-5" />
  </section>
</template>
