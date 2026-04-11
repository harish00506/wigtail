/**
 * src/data/wagtailApi.js
 * ─────────────────────────────────────────────────────────────────
 * Wagtail Headless CMS — API utility for fetching page content.
 *
 * WAGTAIL SETUP REQUIRED
 * ──────────────────────
 * 1. Install wagtail.contrib.settings and wagtail.api.v2 in Django.
 * 2. Add to Django urls.py:
 *      from wagtail.api.v2.router import WagtailAPIRouter
 *      api_router = WagtailAPIRouter('wagtailapi')
 *      api_router.register_endpoint('pages', PagesAPIViewSet)
 *      urlpatterns += [path('api/v2/', api_router.urls)]
 * 3. Set WAGTAIL_API_URL below to your Django server (e.g. http://localhost:8000)
 * 4. The HomePage model in wagtail/models.py defines the StreamField
 *    whose blocks match the 'type' keys in src/data/content.js.
 *
 * USAGE IN App.jsx
 * ────────────────
 *   import { fetchHomePage } from '@/data/wagtailApi';
 *   const { body, site, nav, footer } = await fetchHomePage();
 * ─────────────────────────────────────────────────────────────────
 */

import { footerData, navData, pageBody, siteData } from './content.js';

/* Base URL of your Wagtail Django server.
   Override via VITE_WAGTAIL_API_URL environment variable in .env */
const WAGTAIL_API_URL = import.meta.env.VITE_WAGTAIL_API_URL || 'http://localhost:8000';

const REQUIRED_SECTION_KEYS = {
  hero: ['image.src', 'heading', 'body', 'ctas'],
  feature_list: ['items'],
  retreat: ['tag', 'heading', 'body', 'subFeatures', 'ctas', 'image.src'],
  process: ['tag', 'heading', 'subtitle', 'steps'],
  amenities: ['tag', 'heading', 'subtitle', 'items', 'footerCta'],
  family: ['tag', 'heading', 'body', 'stats', 'cta', 'image.src'],
  activities: ['tag', 'heading', 'subtitle', 'cards', 'footerCta'],
  hosting: ['tag', 'heading', 'subtitle', 'ctas', 'image.src', 'accordionItems'],
  escape: ['tag', 'heading', 'subtitle', 'ctas', 'image.src', 'listItems'],
  details: ['tag', 'heading', 'subtitle', 'stats', 'cta'],
  place: ['tag', 'heading', 'subtitle', 'locations', 'image.src'],
  faq: ['heading', 'subtitle', 'items', 'footerCta'],
  cta_escape: ['heading', 'subtitle', 'ctas', 'image.src'],
  contact: ['tag', 'heading', 'subtitle', 'contactItems', 'map.embedUrl'],
  newsletter: ['heading', 'subtitle', 'inputPlaceholder', 'submitLabel', 'disclaimer'],
};

function snakeToCamel(key) {
  return key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function normalizeKeys(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeKeys);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, nestedValue]) => {
      acc[snakeToCamel(key)] = normalizeKeys(nestedValue);
      return acc;
    }, {});
  }

  return value;
}

function hasRequiredValueAtPath(source, path) {
  const parts = path.split('.');
  let current = source;

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return false;
    }
    current = current[part];
  }

  if (Array.isArray(current)) {
    return current.length > 0;
  }

  return current !== undefined && current !== null && current !== '';
}

function warnForMissingSectionKeys(bodyBlocks) {
  if (!Array.isArray(bodyBlocks)) {
    return;
  }

  bodyBlocks.forEach((block, index) => {
    const blockType = block?.type;
    const requiredKeys = REQUIRED_SECTION_KEYS[blockType];

    if (!requiredKeys) {
      return;
    }

    const blockValue = block?.value;
    if (!blockValue || typeof blockValue !== 'object') {
      console.warn(`[wagtailApi] Block "${blockType}" at index ${index} is missing a value object.`);
      return;
    }

    const missingKeys = requiredKeys.filter((path) => !hasRequiredValueAtPath(blockValue, path));
    if (missingKeys.length > 0) {
      console.warn(
        `[wagtailApi] Block "${blockType}" at index ${index} is missing required keys: ${missingKeys.join(', ')}`
      );
    }
  });
}

/**
 * Fetch the Furze Farmhouse home page from the Wagtail API.
 * Returns the page body (StreamField array) and site-level data.
 *
 * Wagtail API endpoint:
 *   GET /api/v2/pages/?type=home.HomePage&fields=body,site,nav,footer
 *
 * On failure, falls back to the static content in src/data/content.js.
 *
 * @returns {Promise<{ body: Array, site: object, nav: object, footer: object }>}
 */
export async function fetchHomePage() {
  try {
    const res = await fetch(
      `${WAGTAIL_API_URL}/api/v2/pages/` +
      `?type=home.HomePage` +
      `&fields=body,seo_title,search_description` +
      `&limit=1`
    );

    if (!res.ok) {
      throw new Error(`Wagtail API returned ${res.status}`);
    }

    const json = await res.json();
    const page = json.items?.[0];

    if (!page) throw new Error('No homepage found in Wagtail API response');

    /*
     * Wagtail StreamField API response shape:
     * {
     *   "body": [
     *     { "type": "hero",         "value": { ... }, "id": "abc123" },
     *     { "type": "feature_list", "value": { ... }, "id": "def456" },
     *     ...
     *   ]
     * }
     */
    const normalizedBody = normalizeKeys(page.body || []);

    if (import.meta.env.DEV) {
      warnForMissingSectionKeys(normalizedBody);
    }

    return {
      body: normalizedBody,
      site: normalizeKeys(page.site || {}),
      nav: normalizeKeys(page.nav || {}),
      footer: normalizeKeys(page.footer || {}),
    };

  } catch (err) {
    console.warn(
      '[wagtailApi] Could not fetch from Wagtail API — using static fallback.\n',
      err.message
    );

    /* Static fallback — same shape as the Wagtail API response */
    return { body: pageBody, site: siteData, nav: navData, footer: footerData };
  }
}
