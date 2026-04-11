"""
wagtail/models.py
════════════════════════════════════════════════════════════════
Wagtail CMS — HomePage StreamField model

Each StreamField block here corresponds to one entry in the
'body' array returned by the Wagtail API v2 endpoint, and maps
to a React component in src/components/sections/.

BLOCK TYPE → REACT COMPONENT MAPPING
──────────────────────────────────────
  HeroBlock          → Hero.jsx
  FeatureListBlock   → FeatureList.jsx
  RetreatBlock       → Retreat.jsx
  ProcessBlock       → Process.jsx
  AmenitiesBlock     → Amenities.jsx
  FamilyBlock        → Family.jsx
  ActivitiesBlock    → Activities.jsx
  HostingBlock       → Hosting.jsx
  EscapeBlock        → Escape.jsx
  DetailsBlock       → Details.jsx
  PlaceBlock         → Place.jsx
  FAQBlock           → FAQ.jsx
  CTAEscapeBlock     → CTAEscape.jsx
  ContactBlock       → Contact.jsx
  NewsletterBlock    → Newsletter.jsx

SETUP
─────
1. Install dependencies:
     pip install wagtail

2. Add to INSTALLED_APPS in settings.py:
     'wagtail.contrib.settings',
     'wagtail.api.v2',
     'wagtail',
     'wagtail.admin',
     'wagtail.documents',
     'wagtail.images',
     'wagtail.search',
     'wagtail.sites',
     'wagtail.users',
     'wagtail.snippets',
     'taggit',

3. Add to urls.py:
     from wagtail.api.v2.views import PagesAPIViewSet
     from wagtail.api.v2.router import WagtailAPIRouter
     api_router = WagtailAPIRouter('wagtailapi')
     api_router.register_endpoint('pages', PagesAPIViewSet)
     urlpatterns += [path('api/v2/', api_router.urls)]

4. Run migrations:
     python manage.py makemigrations
     python manage.py migrate

5. Set VITE_WAGTAIL_API_URL=http://localhost:8000 in React .env
════════════════════════════════════════════════════════════════
"""

from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


# ─────────────────────────────────────────────────────────────
# SHARED / REUSABLE BLOCKS
# ─────────────────────────────────────────────────────────────

class CTABlock(blocks.StructBlock):
    """
    A single call-to-action button.
    'style' maps to CSS modifier class via the React Btn component.
    """
    label = blocks.CharBlock(max_length=60)
    href  = blocks.CharBlock(max_length=200, help_text="URL or anchor e.g. #book")
    style = blocks.ChoiceBlock(choices=[
        ('outline-white',    'Outlined white (on blue bg)'),
        ('outline-dark',     'Outlined dark (on white/light-blue bg)'),
        ('primary-blue',     'Filled blue — main conversion'),
        ('primary',          'Filled black — nav only'),
        ('text-arrow',       'Text + arrow dark (on white/light-blue bg)'),
        ('text-arrow-white', 'Text + arrow white (on blue bg)'),
    ], required=False, default='outline-dark')

    class Meta:
        icon = 'link'


class ImageBlock(blocks.StructBlock):
    """
    A reusable image + alt-text pair.
    The src field stores a relative URL path (e.g. /assets/hero.jpg).
    In production, link this to a Wagtail Image via ImageChooserBlock instead.
    """
    src = blocks.CharBlock(
        max_length=300,
        help_text="Relative URL: /assets/filename.jpg — or use image field below"
    )
    alt = blocks.CharBlock(max_length=200, help_text="Alt text for accessibility")
    # Optional: uncomment to use Wagtail image management instead of raw src
    # image = ImageChooserBlock(required=False)

    class Meta:
        icon = 'image'


# ─────────────────────────────────────────────────────────────
# SECTION 1 · HERO BLOCK
# ─────────────────────────────────────────────────────────────

class HeroBlock(blocks.StructBlock):
    """
    Section 1 — Full-viewport hero with farmhouse photo + centred text.
    React component: Hero.jsx
    """
    image   = ImageBlock()
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()
    ctas    = blocks.ListBlock(CTABlock(), min_num=0, max_num=2)

    class Meta:
        icon  = 'image'
        label = 'S1 · Hero'


# ─────────────────────────────────────────────────────────────
# SECTION 2 · FEATURE LIST BLOCK
# ─────────────────────────────────────────────────────────────

class FeatureItemBlock(blocks.StructBlock):
    """Single feature row: image left, tag/heading/body/ctas right."""
    id      = blocks.CharBlock(max_length=60, help_text="Unique slug e.g. feature-dogs")
    tag     = blocks.CharBlock(max_length=40, help_text="Small label e.g. Essentials")
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()
    image   = ImageBlock()
    ctas    = blocks.ListBlock(CTABlock(), min_num=0, max_num=2)

    class Meta:
        icon  = 'list-ul'
        label = 'Feature row'


class FeatureListBlock(blocks.StructBlock):
    """
    Section 2 — Five alternating image/text feature rows on white bg.
    React component: FeatureList.jsx
    """
    items = blocks.ListBlock(FeatureItemBlock(), min_num=1)

    class Meta:
        icon  = 'list-ul'
        label = 'S2 · Feature List'


# ─────────────────────────────────────────────────────────────
# SECTION 3 · RETREAT BLOCK
# ─────────────────────────────────────────────────────────────

class SubFeatureBlock(blocks.StructBlock):
    """Small icon + label + description item inside the retreat section."""
    icon        = blocks.ChoiceBlock(choices=[('hot-tub', 'Hot tub'), ('garden', 'Garden')])
    label       = blocks.CharBlock(max_length=60)
    description = blocks.TextBlock()

    class Meta:
        icon = 'pick'


class RetreatBlock(blocks.StructBlock):
    """
    Section 3 — Light-blue split: text (with 2-col sub-features) + photo.
    React component: Retreat.jsx
    """
    tag         = blocks.CharBlock(max_length=40)
    heading     = blocks.CharBlock(max_length=120)
    body        = blocks.TextBlock()
    sub_features = blocks.ListBlock(SubFeatureBlock(), min_num=2, max_num=2)
    ctas        = blocks.ListBlock(CTABlock(), min_num=0, max_num=2)
    image       = ImageBlock()

    class Meta:
        icon  = 'pick'
        label = 'S3 · Retreat'


# ─────────────────────────────────────────────────────────────
# SECTION 4 · PROCESS BLOCK
# ─────────────────────────────────────────────────────────────

class ProcessStepBlock(blocks.StructBlock):
    """One step card in the 3-step booking process."""
    number  = blocks.ChoiceBlock(choices=[('One','One'),('Two','Two'),('Three','Three')])
    heading = blocks.CharBlock(max_length=120)
    subline = blocks.CharBlock(max_length=60)
    cta     = CTABlock()
    image   = ImageBlock()

    class Meta:
        icon = 'order'


class ProcessBlock(blocks.StructBlock):
    """
    Section 4 — White bg, dashed blue border, 3-step photo cards.
    React component: Process.jsx
    """
    tag      = blocks.CharBlock(max_length=40, default='Process')
    heading  = blocks.CharBlock(max_length=120)
    subtitle = blocks.TextBlock()
    steps    = blocks.ListBlock(ProcessStepBlock(), min_num=3, max_num=3)

    class Meta:
        icon  = 'order'
        label = 'S4 · Process'


# ─────────────────────────────────────────────────────────────
# SECTION 5 · AMENITIES BLOCK
# ─────────────────────────────────────────────────────────────

class AmenityItemBlock(blocks.StructBlock):
    """
    One column in the 4-col amenities icon grid.
    icon choices correspond to the SVG icon keys in Amenities.jsx.
    """
    icon    = blocks.ChoiceBlock(choices=[('kitchen','Kitchen'),('outdoor','Outdoor'),('location','Location'),('room','Room')])
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock(required=False)
    note    = blocks.TextBlock(required=False, help_text="Italic accessibility note (optional)")
    cta     = CTABlock(required=False)

    class Meta:
        icon = 'tick-inverse'


class AmenitiesBlock(blocks.StructBlock):
    """
    Section 5 — Blue bg, 4-col icon grid of villa amenities.
    React component: Amenities.jsx
    """
    tag        = blocks.CharBlock(max_length=40, default='Amenities')
    heading    = blocks.CharBlock(max_length=120)
    subtitle   = blocks.TextBlock()
    items      = blocks.ListBlock(AmenityItemBlock(), min_num=4, max_num=4)
    footer_cta = CTABlock(required=False)

    class Meta:
        icon  = 'tick-inverse'
        label = 'S5 · Amenities'


# ─────────────────────────────────────────────────────────────
# SECTION 6 · FAMILY BLOCK
# ─────────────────────────────────────────────────────────────

class StatBlock(blocks.StructBlock):
    """Large display number stat (e.g. 4 Parking spaces)."""
    value = blocks.CharBlock(max_length=10)
    label = blocks.CharBlock(max_length=80)

    class Meta:
        icon = 'form'


class FamilyBlock(blocks.StructBlock):
    """
    Section 6 — Light-blue split: photo left, text + big stat numbers right.
    React component: Family.jsx
    """
    tag     = blocks.CharBlock(max_length=40, default='Family')
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()
    stats   = blocks.ListBlock(StatBlock(), min_num=2, max_num=2)
    cta     = CTABlock(required=False)
    image   = ImageBlock()

    class Meta:
        icon  = 'group'
        label = 'S6 · Family'


# ─────────────────────────────────────────────────────────────
# SECTION 7 · ACTIVITIES BLOCK
# ─────────────────────────────────────────────────────────────

class ActivityCardBlock(blocks.StructBlock):
    """Single activity card: photo + centred heading + centred body."""
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()
    image   = ImageBlock()

    class Meta:
        icon = 'site'


class ActivitiesBlock(blocks.StructBlock):
    """
    Section 7 — White bg, 3-col activity photo cards.
    React component: Activities.jsx
    """
    tag        = blocks.CharBlock(max_length=40, default='Activities')
    heading    = blocks.CharBlock(max_length=120)
    subtitle   = blocks.TextBlock()
    cards      = blocks.ListBlock(ActivityCardBlock(), min_num=3, max_num=3)
    footer_cta = CTABlock(required=False)

    class Meta:
        icon  = 'site'
        label = 'S7 · Activities'


# ─────────────────────────────────────────────────────────────
# SECTION 8 · HOSTING BLOCK
# ─────────────────────────────────────────────────────────────

class AccordionItemBlock(blocks.StructBlock):
    """One always-visible accordion item (heading + body, white dividers)."""
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()

    class Meta:
        icon = 'collapse-down'


class HostingBlock(blocks.StructBlock):
    """
    Section 8 — Blue bg, centred header + 2-col split (yoga photo + accordion).
    React component: Hosting.jsx
    """
    tag             = blocks.CharBlock(max_length=80, default='Hosting and Gatherings')
    heading         = blocks.CharBlock(max_length=120)
    subtitle        = blocks.TextBlock()
    ctas            = blocks.ListBlock(CTABlock(), min_num=0, max_num=2)
    image           = ImageBlock()
    accordion_items = blocks.ListBlock(AccordionItemBlock(), min_num=3, max_num=3)

    class Meta:
        icon  = 'collapse-down'
        label = 'S8 · Hosting'


# ─────────────────────────────────────────────────────────────
# SECTION 9 · ESCAPE BLOCK
# ─────────────────────────────────────────────────────────────

class ListItemBlock(blocks.StructBlock):
    """One divider list item (heading + body, thin horizontal rules)."""
    heading = blocks.CharBlock(max_length=120)
    body    = blocks.TextBlock()

    class Meta:
        icon = 'list-ul'


class EscapeBlock(blocks.StructBlock):
    """
    Section 9 — White bg, centred header + 2-col split (photo + divider list).
    React component: Escape.jsx
    """
    tag        = blocks.CharBlock(max_length=40, default='Escape')
    heading    = blocks.CharBlock(max_length=120)
    subtitle   = blocks.TextBlock()
    ctas       = blocks.ListBlock(CTABlock(), min_num=0, max_num=2)
    image      = ImageBlock()
    list_items = blocks.ListBlock(ListItemBlock(), min_num=3, max_num=3)

    class Meta:
        icon  = 'list-ul'
        label = 'S9 · Escape'


# ─────────────────────────────────────────────────────────────
# SECTION 10 · DETAILS BLOCK
# ─────────────────────────────────────────────────────────────

class StatBoxBlock(blocks.StructBlock):
    """One outlined stat box: large number · bold label · small description."""
    value       = blocks.CharBlock(max_length=10, help_text="Large display number e.g. 4")
    label       = blocks.CharBlock(max_length=60)
    description = blocks.CharBlock(max_length=120)

    class Meta:
        icon = 'form'


class DetailsBlock(blocks.StructBlock):
    """
    Section 10 — Blue bg, 3 outlined stat boxes (4 · 3 · 12).
    React component: Details.jsx
    """
    tag      = blocks.CharBlock(max_length=40, default='Details')
    heading  = blocks.CharBlock(max_length=120)
    subtitle = blocks.TextBlock()
    stats    = blocks.ListBlock(StatBoxBlock(), min_num=3, max_num=3)
    cta      = CTABlock(required=False)

    class Meta:
        icon  = 'form'
        label = 'S10 · Details'


# ─────────────────────────────────────────────────────────────
# SECTION 11 · PLACE BLOCK
# ─────────────────────────────────────────────────────────────

class LocationBlock(blocks.StructBlock):
    """One location entry: heading · address · bold text link."""
    name       = blocks.CharBlock(max_length=80)
    address    = blocks.CharBlock(max_length=160)
    link_label = blocks.CharBlock(max_length=60)
    link_href  = blocks.CharBlock(max_length=200)

    class Meta:
        icon = 'site'


class PlaceBlock(blocks.StructBlock):
    """
    Section 11 — Light-blue bg, large 'Newburgh' heading + 2-col split.
    React component: Place.jsx
    """
    tag       = blocks.CharBlock(max_length=40, default='Place')
    heading   = blocks.CharBlock(max_length=80)
    subtitle  = blocks.TextBlock()
    locations = blocks.ListBlock(LocationBlock(), min_num=2, max_num=2)
    image     = ImageBlock()

    class Meta:
        icon  = 'site'
        label = 'S11 · Place'


# ─────────────────────────────────────────────────────────────
# SECTION 12 · FAQ BLOCK
# ─────────────────────────────────────────────────────────────

class FAQItemBlock(blocks.StructBlock):
    """One accordion FAQ item. default_open=True → first item starts expanded."""
    question    = blocks.CharBlock(max_length=160)
    answer      = blocks.TextBlock()
    default_open = blocks.BooleanBlock(required=False, default=False)

    class Meta:
        icon = 'help'


class FAQFooterBlock(blocks.StructBlock):
    """'Still have questions?' callout below the accordion."""
    heading = blocks.CharBlock(max_length=80)
    body    = blocks.TextBlock()
    cta     = CTABlock()

    class Meta:
        icon = 'help'


class FAQBlock(blocks.StructBlock):
    """
    Section 12 — White bg, JS accordion (React useState toggle).
    React component: FAQ.jsx
    """
    heading    = blocks.CharBlock(max_length=80)
    subtitle   = blocks.TextBlock()
    items      = blocks.ListBlock(FAQItemBlock(), min_num=1)
    footer_cta = FAQFooterBlock(required=False)

    class Meta:
        icon  = 'help'
        label = 'S12 · FAQ'


# ─────────────────────────────────────────────────────────────
# SECTION 13 · CTA ESCAPE BLOCK
# ─────────────────────────────────────────────────────────────

class CTAEscapeBlock(blocks.StructBlock):
    """
    Section 13 — Light-blue bg, centred heading + 2 CTAs + wide bedroom photo.
    React component: CTAEscape.jsx
    """
    heading  = blocks.CharBlock(max_length=120)
    subtitle = blocks.TextBlock()
    ctas     = blocks.ListBlock(CTABlock(), min_num=1, max_num=2)
    image    = ImageBlock()

    class Meta:
        icon  = 'pick'
        label = 'S13 · CTA Escape'


# ─────────────────────────────────────────────────────────────
# SECTION 14 · CONTACT BLOCK
# ─────────────────────────────────────────────────────────────

class ContactItemBlock(blocks.StructBlock):
    """One contact method row (Email / Phone / Location)."""
    icon  = blocks.ChoiceBlock(choices=[('email','Email'),('phone','Phone'),('location','Location')])
    label = blocks.CharBlock(max_length=40)
    sub   = blocks.CharBlock(max_length=80)
    value = blocks.CharBlock(max_length=160, required=False, help_text="Display value e.g. email address or phone number")
    href  = blocks.CharBlock(max_length=300, required=False, help_text="Link href e.g. mailto: or tel:")
    cta   = CTABlock(required=False)

    class Meta:
        icon = 'mail'


class MapBlock(blocks.StructBlock):
    """Google Maps embed configuration."""
    embed_url = blocks.URLBlock(
        help_text="Get from maps.google.com → Share → Embed a map → copy iframe src"
    )
    alt = blocks.CharBlock(max_length=120, default='Map')

    class Meta:
        icon = 'site'


class ContactBlock(blocks.StructBlock):
    """
    Section 14 — Blue bg, contact info left + Google Maps iframe right.
    React component: Contact.jsx
    """
    tag           = blocks.CharBlock(max_length=40, default='Connect')
    heading       = blocks.CharBlock(max_length=80)
    subtitle      = blocks.TextBlock()
    contact_items = blocks.ListBlock(ContactItemBlock(), min_num=1, max_num=3)
    map           = MapBlock()

    class Meta:
        icon  = 'mail'
        label = 'S14 · Contact'


# ─────────────────────────────────────────────────────────────
# SECTION 15 · NEWSLETTER BLOCK
# ─────────────────────────────────────────────────────────────

class NewsletterBlock(blocks.StructBlock):
    """
    Section 15 — White bg, email sign-up form.
    React component: Newsletter.jsx
    ACTION: wire handleSubmit in Newsletter.jsx to your email provider.
    """
    heading           = blocks.CharBlock(max_length=160, help_text="Use \\n for line break between two lines")
    subtitle          = blocks.TextBlock()
    input_placeholder = blocks.CharBlock(max_length=60, default='Enter your email')
    submit_label      = blocks.CharBlock(max_length=30, default='Sign up')
    disclaimer        = blocks.TextBlock()

    class Meta:
        icon  = 'mail'
        label = 'S15 · Newsletter'


# ═════════════════════════════════════════════════════════════
# HOME PAGE MODEL
# ═════════════════════════════════════════════════════════════

class HomePage(Page):
    """
    Furze Farmhouse — Home Page

    The 'body' StreamField below defines which blocks editors can
    add in the Wagtail CMS admin. Each block type maps to one React
    component in src/components/sections/.

    The Wagtail API v2 returns this page as:
      GET /api/v2/pages/?type=home.HomePage&fields=body

    Response shape:
      {
        "items": [{
          "id": 3,
          "body": [
            { "type": "hero",         "value": { ... }, "id": "abc" },
            { "type": "feature_list", "value": { ... }, "id": "def" },
            ...
          ]
        }]
      }
    """

    body = StreamField([
        ('hero',         HeroBlock()),
        ('feature_list', FeatureListBlock()),
        ('retreat',      RetreatBlock()),
        ('process',      ProcessBlock()),
        ('amenities',    AmenitiesBlock()),
        ('family',       FamilyBlock()),
        ('activities',   ActivitiesBlock()),
        ('hosting',      HostingBlock()),
        ('escape',       EscapeBlock()),
        ('details',      DetailsBlock()),
        ('place',        PlaceBlock()),
        ('faq',          FAQBlock()),
        ('cta_escape',   CTAEscapeBlock()),
        ('contact',      ContactBlock()),
        ('newsletter',   NewsletterBlock()),
    ], use_json_field=True)  # use_json_field=True required for Wagtail >= 4.0

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]

    class Meta:
        verbose_name = 'Home Page'


class ReactAppPage(Page):
    """
    Simple page type that embeds the running React frontend in an iframe.
    Use this to expose the app inside the Wagtail page tree.
    """
    react_url = models.URLField(default='http://127.0.0.1:5173')

    content_panels = Page.content_panels + [
        FieldPanel('react_url'),
    ]

    template = 'home/react_app_page.html'

    class Meta:
        verbose_name = 'React App Page'
