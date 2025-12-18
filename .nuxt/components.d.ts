
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'OFooter': typeof import("../components/organisms/OFooter.vue")['default']
    'ONavbar': typeof import("../components/organisms/ONavbar.vue")['default']
    'MFooterColumn': typeof import("../components/molecules/MFooterColumn.vue")['default']
    'MNewsletter': typeof import("../components/molecules/MNewsletter.vue")['default']
    'MSearchBar': typeof import("../components/molecules/MSearchBar.vue")['default']
    'ABaseBadge': typeof import("../components/atoms/BaseBadge.vue")['default']
    'ABaseButton': typeof import("../components/atoms/BaseButton.vue")['default']
    'ABaseIcon': typeof import("../components/atoms/BaseIcon.vue")['default']
    'ABaseInput': typeof import("../components/atoms/BaseInput.vue")['default']
    'IconsIconCart': typeof import("../components/icons/IconCart.vue")['default']
    'IconsIconChevronDown': typeof import("../components/icons/IconChevronDown.vue")['default']
    'IconsIconDiscord': typeof import("../components/icons/IconDiscord.vue")['default']
    'IconsIconFacebook': typeof import("../components/icons/IconFacebook.vue")['default']
    'IconsIconHeart': typeof import("../components/icons/IconHeart.vue")['default']
    'IconsIconInstagram': typeof import("../components/icons/IconInstagram.vue")['default']
    'IconsIconReddit': typeof import("../components/icons/IconReddit.vue")['default']
    'IconsIconSearch': typeof import("../components/icons/IconSearch.vue")['default']
    'IconsIconTiktok': typeof import("../components/icons/IconTiktok.vue")['default']
    'IconsIconTwitter': typeof import("../components/icons/IconTwitter.vue")['default']
    'IconsIconUser': typeof import("../components/icons/IconUser.vue")['default']
    'IconsIconYoutube': typeof import("../components/icons/IconYoutube.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyOFooter': LazyComponent<typeof import("../components/organisms/OFooter.vue")['default']>
    'LazyONavbar': LazyComponent<typeof import("../components/organisms/ONavbar.vue")['default']>
    'LazyMFooterColumn': LazyComponent<typeof import("../components/molecules/MFooterColumn.vue")['default']>
    'LazyMNewsletter': LazyComponent<typeof import("../components/molecules/MNewsletter.vue")['default']>
    'LazyMSearchBar': LazyComponent<typeof import("../components/molecules/MSearchBar.vue")['default']>
    'LazyABaseBadge': LazyComponent<typeof import("../components/atoms/BaseBadge.vue")['default']>
    'LazyABaseButton': LazyComponent<typeof import("../components/atoms/BaseButton.vue")['default']>
    'LazyABaseIcon': LazyComponent<typeof import("../components/atoms/BaseIcon.vue")['default']>
    'LazyABaseInput': LazyComponent<typeof import("../components/atoms/BaseInput.vue")['default']>
    'LazyIconsIconCart': LazyComponent<typeof import("../components/icons/IconCart.vue")['default']>
    'LazyIconsIconChevronDown': LazyComponent<typeof import("../components/icons/IconChevronDown.vue")['default']>
    'LazyIconsIconDiscord': LazyComponent<typeof import("../components/icons/IconDiscord.vue")['default']>
    'LazyIconsIconFacebook': LazyComponent<typeof import("../components/icons/IconFacebook.vue")['default']>
    'LazyIconsIconHeart': LazyComponent<typeof import("../components/icons/IconHeart.vue")['default']>
    'LazyIconsIconInstagram': LazyComponent<typeof import("../components/icons/IconInstagram.vue")['default']>
    'LazyIconsIconReddit': LazyComponent<typeof import("../components/icons/IconReddit.vue")['default']>
    'LazyIconsIconSearch': LazyComponent<typeof import("../components/icons/IconSearch.vue")['default']>
    'LazyIconsIconTiktok': LazyComponent<typeof import("../components/icons/IconTiktok.vue")['default']>
    'LazyIconsIconTwitter': LazyComponent<typeof import("../components/icons/IconTwitter.vue")['default']>
    'LazyIconsIconUser': LazyComponent<typeof import("../components/icons/IconUser.vue")['default']>
    'LazyIconsIconYoutube': LazyComponent<typeof import("../components/icons/IconYoutube.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const OFooter: typeof import("../components/organisms/OFooter.vue")['default']
export const ONavbar: typeof import("../components/organisms/ONavbar.vue")['default']
export const MFooterColumn: typeof import("../components/molecules/MFooterColumn.vue")['default']
export const MNewsletter: typeof import("../components/molecules/MNewsletter.vue")['default']
export const MSearchBar: typeof import("../components/molecules/MSearchBar.vue")['default']
export const ABaseBadge: typeof import("../components/atoms/BaseBadge.vue")['default']
export const ABaseButton: typeof import("../components/atoms/BaseButton.vue")['default']
export const ABaseIcon: typeof import("../components/atoms/BaseIcon.vue")['default']
export const ABaseInput: typeof import("../components/atoms/BaseInput.vue")['default']
export const IconsIconCart: typeof import("../components/icons/IconCart.vue")['default']
export const IconsIconChevronDown: typeof import("../components/icons/IconChevronDown.vue")['default']
export const IconsIconDiscord: typeof import("../components/icons/IconDiscord.vue")['default']
export const IconsIconFacebook: typeof import("../components/icons/IconFacebook.vue")['default']
export const IconsIconHeart: typeof import("../components/icons/IconHeart.vue")['default']
export const IconsIconInstagram: typeof import("../components/icons/IconInstagram.vue")['default']
export const IconsIconReddit: typeof import("../components/icons/IconReddit.vue")['default']
export const IconsIconSearch: typeof import("../components/icons/IconSearch.vue")['default']
export const IconsIconTiktok: typeof import("../components/icons/IconTiktok.vue")['default']
export const IconsIconTwitter: typeof import("../components/icons/IconTwitter.vue")['default']
export const IconsIconUser: typeof import("../components/icons/IconUser.vue")['default']
export const IconsIconYoutube: typeof import("../components/icons/IconYoutube.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyOFooter: LazyComponent<typeof import("../components/organisms/OFooter.vue")['default']>
export const LazyONavbar: LazyComponent<typeof import("../components/organisms/ONavbar.vue")['default']>
export const LazyMFooterColumn: LazyComponent<typeof import("../components/molecules/MFooterColumn.vue")['default']>
export const LazyMNewsletter: LazyComponent<typeof import("../components/molecules/MNewsletter.vue")['default']>
export const LazyMSearchBar: LazyComponent<typeof import("../components/molecules/MSearchBar.vue")['default']>
export const LazyABaseBadge: LazyComponent<typeof import("../components/atoms/BaseBadge.vue")['default']>
export const LazyABaseButton: LazyComponent<typeof import("../components/atoms/BaseButton.vue")['default']>
export const LazyABaseIcon: LazyComponent<typeof import("../components/atoms/BaseIcon.vue")['default']>
export const LazyABaseInput: LazyComponent<typeof import("../components/atoms/BaseInput.vue")['default']>
export const LazyIconsIconCart: LazyComponent<typeof import("../components/icons/IconCart.vue")['default']>
export const LazyIconsIconChevronDown: LazyComponent<typeof import("../components/icons/IconChevronDown.vue")['default']>
export const LazyIconsIconDiscord: LazyComponent<typeof import("../components/icons/IconDiscord.vue")['default']>
export const LazyIconsIconFacebook: LazyComponent<typeof import("../components/icons/IconFacebook.vue")['default']>
export const LazyIconsIconHeart: LazyComponent<typeof import("../components/icons/IconHeart.vue")['default']>
export const LazyIconsIconInstagram: LazyComponent<typeof import("../components/icons/IconInstagram.vue")['default']>
export const LazyIconsIconReddit: LazyComponent<typeof import("../components/icons/IconReddit.vue")['default']>
export const LazyIconsIconSearch: LazyComponent<typeof import("../components/icons/IconSearch.vue")['default']>
export const LazyIconsIconTiktok: LazyComponent<typeof import("../components/icons/IconTiktok.vue")['default']>
export const LazyIconsIconTwitter: LazyComponent<typeof import("../components/icons/IconTwitter.vue")['default']>
export const LazyIconsIconUser: LazyComponent<typeof import("../components/icons/IconUser.vue")['default']>
export const LazyIconsIconYoutube: LazyComponent<typeof import("../components/icons/IconYoutube.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
