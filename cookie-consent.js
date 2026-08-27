(function () {
  'use strict';
  const GA_ID = 'G-VHGSSBMGB9';
  const STORAGE_KEY = 'gsci_cookie_consent';

  // Inject banner styles here so the consent UI works on every page,
  // including pages that use their own inline CSS rather than styles.css.
  function injectConsentStyles() {
    if (document.getElementById('gsci-cookie-consent-styles')) return;
    const style = document.createElement('style');
    style.textContent = `
      .gsci-cookie-banner{
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        transform:none;
        width:100%;
        z-index:99999;
        background:#ffffff;
        color:#002B5B;
        border-top:4px solid #FF6000;
        border-radius:0;
        box-shadow:0 -8px 28px rgba(0,0,0,.28);
        font-family:Arial,Helvetica,sans-serif;
      }
      .gsci-cookie-inner{
        width:min(1320px,calc(100% - 64px));
        margin:0 auto;
        display:grid;
        grid-template-columns:minmax(0,1fr) auto;
        gap:28px;
        align-items:center;
        padding:20px 24px;
      }
      .gsci-cookie-copy{
        display:grid;
        grid-template-columns:auto 1fr;
        column-gap:18px;
        row-gap:5px;
        align-items:start;
      }
      .gsci-cookie-copy strong.gsci-cookie-title{
        grid-row:1 / span 2;
        font-size:19px;
        line-height:1.25;
        white-space:nowrap;
        color:#002B5B;
      }
      .gsci-cookie-copy span{
        font-size:15px;
        line-height:1.45;
        color:#243b53;
      }
      .gsci-cookie-copy span strong{
        color:#002B5B;
      }
      .gsci-cookie-copy a{
        font-size:13px;
        color:#002B5B;
        font-weight:700;
        text-decoration:underline;
        width:max-content;
      }
      .gsci-cookie-actions{
        display:flex;
        align-items:center;
        gap:12px;
        white-space:nowrap;
      }
      .gsci-cookie-btn{
        min-width:138px;
        padding:13px 18px;
        border-radius:4px;
        font-size:14px;
        font-weight:700;
        cursor:pointer;
      }
      .gsci-cookie-btn.secondary{
        background:#fff;
        color:#002B5B;
        border:2px solid #002B5B;
      }
      .gsci-cookie-btn.primary{
        background:#FF6000;
        color:#fff;
        border:2px solid #FF6000;
      }
      .gsci-cookie-btn:hover{filter:brightness(.97)}
      @media(max-width:900px){
        .gsci-cookie-banner{bottom:0;width:100%}
        .gsci-cookie-inner{grid-template-columns:1fr;gap:16px;padding:18px}
        .gsci-cookie-copy{grid-template-columns:1fr}
        .gsci-cookie-copy strong.gsci-cookie-title{grid-row:auto;white-space:normal}
        .gsci-cookie-actions{justify-content:flex-end;flex-wrap:wrap}
      }
      @media(max-width:560px){
        .gsci-cookie-actions{display:grid;grid-template-columns:1fr 1fr}
        .gsci-cookie-btn{min-width:0;width:100%}
      }

      .gsci-cookie-copy{
        grid-template-columns:auto minmax(0,1fr);
        column-gap:22px;
        row-gap:0;
        align-items:start;
      }
      .gsci-cookie-copy strong.gsci-cookie-title{
        grid-row:auto;
        white-space:nowrap;
      }
      .gsci-cookie-messages{
        display:grid;
        grid-template-columns:1fr 1.35fr;
        gap:22px;
      }
      .gsci-cookie-message{
        display:flex;
        flex-direction:column;
        gap:4px;
        padding-left:18px;
        border-left:1px solid #c9d3dc;
      }
      .gsci-cookie-message > strong{
        color:#002B5B;
        font-size:15px;
      }
      .gsci-cookie-message span{
        font-size:14px;
        line-height:1.4;
      }
      .gsci-cookie-message a{
        display:inline;
        font-size:inherit;
      }
      @media(max-width:1050px){
        .gsci-cookie-inner{grid-template-columns:1fr}
        .gsci-cookie-actions{justify-content:flex-end}
      }
      @media(max-width:760px){
        .gsci-cookie-copy{grid-template-columns:1fr;gap:12px}
        .gsci-cookie-messages{grid-template-columns:1fr;gap:12px}
        .gsci-cookie-message{padding-left:12px}
      }

      .gsci-cookie-banner{
        background:#ffffff !important;
        opacity:1 !important;
        backdrop-filter:none !important;
        -webkit-backdrop-filter:none !important;
      }

      .gsci-cookie-backdrop{
        position:fixed;
        inset:0;
        z-index:99998;
        background:rgba(0,27,55,.42);
        backdrop-filter:blur(1.5px);
        -webkit-backdrop-filter:blur(1.5px);
      }
      .gsci-cookie-banner{
        z-index:99999 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function loadAnalytics() {
    if (window.__gsciAnalyticsLoaded) return;
    window.__gsciAnalyticsLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function getChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }

  function removeBanner() {
    const el = document.getElementById('gsci-cookie-banner');
    if (el) el.remove();
  }

  function choose(v) {
    setChoice(v);
    removeBanner();
    if (v === 'accepted') loadAnalytics();
    removeBackdrop();
  }


  function ensureBackdrop() {
    if (document.querySelector('.gsci-cookie-backdrop')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'gsci-cookie-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);
  }

  function removeBackdrop() {
    const backdrop = document.querySelector('.gsci-cookie-backdrop');
    if (backdrop) backdrop.remove();
  }

  function showBanner() {
    ensureBackdrop();
    removeBanner();
    const banner = document.createElement('div');
    banner.id = 'gsci-cookie-banner';
    banner.className = 'gsci-cookie-banner';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-label','Cookie preferences');
    banner.innerHTML = `
      <div class="gsci-cookie-inner">
        <div class="gsci-cookie-copy">
          <strong class="gsci-cookie-title">Cookies &amp; Analytics</strong>
          <div class="gsci-cookie-messages">
            <div class="gsci-cookie-message">
              <strong>Cookies</strong>
              <span>We use cookies and by continuing to use this website you accept their use. Please read our <a href="governance.html#cookies">Cookie Policy</a> for further information.</span>
            </div>
            <div class="gsci-cookie-message">
              <strong>Google Analytics</strong>
              <span>Google Analytics is extremely important to improving our website. We would very much appreciate it if you would <strong>accept analytics</strong>. If you reject analytics, you can still access the site normally; it simply limits the information available to us to improve it.</span>
            </div>
          </div>
        </div>
        <div class="gsci-cookie-actions">
          <button type="button" class="gsci-cookie-btn primary" data-cookie-choice="accepted">Accept analytics</button>
          <button type="button" class="gsci-cookie-btn secondary" data-cookie-choice="rejected">Reject analytics</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelectorAll('[data-cookie-choice]').forEach(btn => {
      btn.addEventListener('click', () => choose(btn.dataset.cookieChoice));
    });
  }

  window.GSCI = window.GSCI || {};
  window.GSCI.openCookieSettings = function () { showBanner(); };

  document.addEventListener('DOMContentLoaded', function () {
    injectConsentStyles();
    const choice = getChoice();
    if (choice === 'accepted') loadAnalytics();
    else if (choice !== 'rejected') showBanner();

    document.querySelectorAll('[data-cookie-settings]').forEach(a => {
      a.addEventListener('click', function(e){ e.preventDefault(); showBanner(); });
    });
  });
})();
