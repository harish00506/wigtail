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

/* Base URL of your Wagtail Django server.
   Override via VITE_WAGTAIL_API_URL environment variable in .env */
const WAGTAIL_API_URL = import.meta.env.VITE_WAGTAIL_API_URL || 'http://localhost:8000';

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
    return {
      body:   page.body   || [],
      site:   page.site   || {},
      nav:    page.nav    || {},
      footer: page.footer || {},
    };

  } catch (err) {
    console.warn(
      '[wagtailApi] Could not fetch from Wagtail API — using static fallback.\n',
      err.message
    );

    /* Static fallback — same shape as the Wagtail API response */
    const { pageBody, siteData, navData, footerData } = await import('./content.js');
    return { body: pageBody, site: siteData, nav: navData, footer: footerData };
  }
}
