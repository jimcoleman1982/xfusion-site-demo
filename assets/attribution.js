/* xFusion attribution + lead persistence.
   Captures ad click IDs (gclid/gbraid/wbraid) and UTM parameters on landing,
   stores them for 90 days, and keeps the in-progress lead (email, name, ...)
   so it survives navigation from the homepage funnel to /book and /call-booked.
   Exposed as window.xfAttribution. No external requests. */
(function () {
  'use strict';

  // Lead delivery endpoints. Each is optional: empty string = skipped.
  // Leads always also go to Netlify Forms as a baseline backup.
  //
  // GHL: paste the URL from your GoHighLevel workflow
  // (Automation → Workflow → "Inbound Webhook" trigger).
  var GHL_WEBHOOK_URL = '';
  // Google Sheet: paste the Apps Script web-app URL
  // (see "Google Sheet lead log" in GOOGLE-ADS-LAUNCH-CHECKLIST.md).
  var SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyt7EK-zkh38obNEcGUc5L_ssA0JdNlCBjiCh6CeqvsuWxmF874iEYK6W8Z0Httqfvy/exec';

  var ATTR_KEY = 'xf_attribution';
  var LEAD_KEY = 'xf_lead';
  var TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days, matching Google Ads click windows

  function readStore(key) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && parsed.ts && Date.now() - parsed.ts > TTL_MS) {
        window.localStorage.removeItem(key);
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeStore(key, data) {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) { /* storage unavailable (private mode) — degrade silently */ }
  }

  // --- Capture click IDs / UTMs from the current URL ------------------------
  var TRACKED = ['gclid', 'gbraid', 'wbraid', 'msclkid',
                 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  var params = new URLSearchParams(window.location.search);
  var found = {};
  var hasAny = false;
  TRACKED.forEach(function (name) {
    var v = params.get(name);
    if (v) { found[name] = v; hasAny = true; }
  });

  var stored = readStore(ATTR_KEY) || { ts: Date.now(), values: {} };
  if (hasAny) {
    // Last-touch: a fresh ad click overwrites older attribution.
    Object.keys(found).forEach(function (k) { stored.values[k] = found[k]; });
    stored.ts = Date.now();
    stored.landing = window.location.pathname;
    writeStore(ATTR_KEY, stored);
  }

  // --- Public API ------------------------------------------------------------
  window.xfAttribution = {
    /** All stored attribution values (gclid, utm_*, ...), or {}. */
    get: function () {
      var s = readStore(ATTR_KEY);
      return (s && s.values) || {};
    },

    /** The in-progress lead ({email, name, company, ...}), or {}. */
    getLead: function () {
      var s = readStore(LEAD_KEY);
      return (s && s.values) || {};
    },

    /** Merge fields into the stored lead. */
    saveLead: function (patch) {
      var s = readStore(LEAD_KEY) || { ts: Date.now(), values: {} };
      Object.keys(patch || {}).forEach(function (k) {
        if (patch[k] !== undefined && patch[k] !== null) s.values[k] = patch[k];
      });
      s.ts = Date.now();
      writeStore(LEAD_KEY, s);
    },

    /** Deliver lead data to every configured destination (GoHighLevel and/or
        the Google Sheet log). `stage` is 'lead_form' or 'call_booked' so
        receivers can branch on it. Only the fields passed in `data` are sent,
        plus stored attribution. Fire-and-forget; endpoints that are not
        configured are skipped. */
    sendLead: function (stage, data) {
      var payload = Object.assign(
        { stage: stage, page: window.location.pathname },
        data || {},
        this.get()
      );
      var body = JSON.stringify(payload);
      var jobs = [];
      if (GHL_WEBHOOK_URL) {
        jobs.push(window.fetch(GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true, // survives the redirect to /call-booked/
        }));
      }
      if (SHEET_WEBHOOK_URL) {
        // Apps Script web apps don't answer browser CORS preflights, so this
        // goes as a "simple" no-cors request (text/plain body, unreadable
        // response). The script parses the JSON out of the raw body.
        jobs.push(window.fetch(SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: body,
          mode: 'no-cors',
          keepalive: true,
        }));
      }
      if (!jobs.length) return Promise.resolve(false);
      return Promise.allSettled(jobs).then(function () { return true; });
    },

    /** Back-compat alias. */
    sendToGHL: function (stage, data) { return this.sendLead(stage, data); },

    /** SHA-256 hex of a normalized email (for enhanced conversions).
        Returns a Promise<string|null>. */
    hashEmail: function (email) {
      var normalized = String(email || '').trim().toLowerCase();
      if (!normalized || !(window.crypto && window.crypto.subtle)) {
        return Promise.resolve(null);
      }
      var bytes = new TextEncoder().encode(normalized);
      return window.crypto.subtle.digest('SHA-256', bytes).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
      }).catch(function () { return null; });
    }
  };
})();
