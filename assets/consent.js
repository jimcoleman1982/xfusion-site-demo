/* xFusion cookie consent + Google Consent Mode v2.
   MUST load before the GTM snippet on every page.

   Behavior:
   - EEA/UK/CH visitors: consent defaults to DENIED (region-scoped, enforced
     by Google from the user's real location) and a banner asks for a choice.
     The banner is shown based on a timezone heuristic; the region default
     protects even visitors the heuristic misses.
   - Everyone else: consent defaults to granted and no banner is shown.
   - The choice is stored for 12 months and re-applied on every page view
     before GTM boots. No banner inside iframes (deal-room embeds). */
(function () {
  'use strict';

  var KEY = 'xf_consent';
  var TTL_MS = 365 * 24 * 60 * 60 * 1000;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  var EU_REGIONS = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR',
    'HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
    'IS','LI','NO','GB','CH'];

  // Global default: granted. Region-specific default (more specific, wins
  // inside those regions): denied until the visitor decides.
  gtag('consent', 'default', {
    ad_storage: 'granted', ad_user_data: 'granted',
    ad_personalization: 'granted', analytics_storage: 'granted',
  });
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', analytics_storage: 'denied',
    region: EU_REGIONS, wait_for_update: 500,
  });
  gtag('set', 'url_passthrough', true);

  function readChoice() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.status || Date.now() - (parsed.ts || 0) > TTL_MS) return null;
      return parsed.status;
    } catch (e) { return null; }
  }

  function saveChoice(status) {
    try { window.localStorage.setItem(KEY, JSON.stringify({ status: status, ts: Date.now() })); }
    catch (e) { /* private mode */ }
  }

  function applyChoice(status) {
    var v = status === 'accepted' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v,
    });
    if (v === 'denied') gtag('set', 'ads_data_redaction', true);
  }

  function tzInScope() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    return /^Europe\//.test(tz) ||
      ['Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Reykjavik'].indexOf(tz) !== -1;
  }

  // Best-effort consent check for other scripts (e.g. attaching user-provided
  // data to conversion events): explicit choice wins; otherwise EU-scope
  // visitors default to denied, everyone else to granted.
  window.xfConsent = {
    adUserDataGranted: function () {
      var choice = readChoice();
      if (choice) return choice === 'accepted';
      return !tzInScope();
    },
  };

  var stored = readChoice();
  if (stored) { applyChoice(stored); return; }

  // No stored choice. Only prompt visitors who look like they're in scope;
  // the region-scoped default already protects anyone this misses.
  var inScope = tzInScope();
  if (!inScope) return;
  if (window.self !== window.top) return; // never inside embeds/iframes

  function renderBanner() {
    if (document.getElementById('xf-consent')) return;
    var el = document.createElement('div');
    el.id = 'xf-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML =
      '<style>' +
      '#xf-consent{position:fixed;left:20px;right:20px;bottom:20px;z-index:900;' +
        'max-width:420px;background:#F7F2EB;border:1px solid #D9CFBF;border-radius:12px;' +
        'box-shadow:0 12px 40px rgba(31,26,23,0.18);padding:22px 24px;' +
        'font-family:"IBM Plex Sans",sans-serif;color:#1F1A17}' +
      '#xf-consent h2{font-family:"Source Serif 4",serif;font-size:19px;font-weight:600;' +
        'margin:0 0 8px;letter-spacing:-0.01em}' +
      '#xf-consent p{font-size:13.5px;line-height:1.55;color:#3A322D;margin:0 0 16px}' +
      '#xf-consent p a{color:#B8512C}' +
      '#xf-consent .xf-consent-actions{display:flex;gap:10px;align-items:center}' +
      '#xf-consent button{font-family:"IBM Plex Sans",sans-serif;font-size:14px;font-weight:500;' +
        'border-radius:8px;padding:10px 18px;cursor:pointer;line-height:1.1;' +
        'transition:all 160ms cubic-bezier(0.4,0,0.6,1)}' +
      '#xf-consent .xf-accept{background:#B8512C;color:#F7F2EB;border:1px solid transparent}' +
      '#xf-consent .xf-accept:hover{background:#A0451F}' +
      '#xf-consent .xf-decline{background:transparent;color:#1F1A17;border:1px solid #B7A993}' +
      '#xf-consent .xf-decline:hover{background:#EFE8DD}' +
      '@media (max-width:520px){#xf-consent{left:12px;right:12px;bottom:12px;max-width:none}}' +
      '</style>' +
      '<h2>Cookies, briefly.</h2>' +
      '<p>A few cookies help us understand what’s working, from site content to ' +
        'marketing. Say no and the site works just the same. Details in our ' +
        '<a href="/privacy/">privacy policy</a>.</p>' +
      '<div class="xf-consent-actions">' +
        '<button type="button" class="xf-accept">Accept</button>' +
        '<button type="button" class="xf-decline">Decline</button>' +
      '</div>';
    document.body.appendChild(el);
    var close = function (status) {
      saveChoice(status);
      applyChoice(status);
      el.remove();
    };
    el.querySelector('.xf-accept').addEventListener('click', function () { close('accepted'); });
    el.querySelector('.xf-decline').addEventListener('click', function () { close('rejected'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBanner);
  } else {
    renderBanner();
  }
})();
