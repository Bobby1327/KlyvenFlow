import React from 'react';
import { ArrowRight, Sparkles, Utensils, Scissors, Wrench, ShoppingBag, Dumbbell, Zap, MessageCircle, Mail } from 'lucide-react';
import { TRANSLATIONS, INDUSTRIES } from '../data/showcaseData';

export default function Hero({ lang, onOpenContactModal, onSelectIndustry }) {
  const t = TRANSLATIONS[lang];

  const HERO_METRICS = [
    { label: t.metricSavedCommissionTitle, value: t.metricSavedCommissionValue, suffix: t.metricSavedCommissionSuffix, sub: t.metricSavedCommissionSub },
    { label: t.metricSalesTitle, value: t.metricSalesValue, suffix: t.metricSalesSuffix, sub: t.metricSalesSub },
    { label: t.metricHoursTitle, value: t.metricHoursValue, suffix: t.metricHoursSuffix, sub: t.metricHoursSub },
  ];

  const getIndustryLabel = (ind) => {
    if (lang === 'pt') return ind.namePt;
    return ind.name;
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return Utensils;
      case 'Scissors': return Scissors;
      case 'Wrench': return Wrench;
      case 'ShoppingBag': return ShoppingBag;
      case 'Dumbbell': return Dumbbell;
      default: return Utensils;
    }
  };

  return (
    <section style={{ padding: '56px 24px 44px 24px', position: 'relative', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Animated Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div className="badge badge-glow" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} />
            <span>{t.heroBadge}</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 style={{ 
          fontSize: 'clamp(2.3rem, 5.5vw, 4rem)', 
          fontWeight: '700', 
          lineHeight: '1.12', 
          marginBottom: '16px',
          textAlign: 'center',
          maxWidth: '960px',
          marginInline: 'auto'
        }}>
          {t.heroTitlePart1} <span className="gradient-accent-text">{t.heroTitlePart2}</span>
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.15rem', 
          color: 'var(--text-muted)', 
          maxWidth: '740px', 
          margin: '0 auto 28px auto',
          textAlign: 'center',
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          {t.heroSub}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <a href="#showcase" className="btn-primary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
            <span>{t.heroCtaPrimary}</span>
            <ArrowRight size={18} />
          </a>
          <button onClick={onOpenContactModal} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '0.95rem' }}>
            <Zap size={18} color="var(--accent-orange)" />
            <span>{t.heroCtaSecondary}</span>
          </button>
        </div>

        {/* Standout Direct Contact Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '36px' }}>
          <div className="contact-highlight-bar">
            <a
              href="https://wa.me/5535997745407"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill-whatsapp"
              title="Falar no WhatsApp"
            >
              <span className="live-pulse-dot" />
              <MessageCircle size={16} />
              <span>WhatsApp: <strong style={{ letterSpacing: '0.02em' }}>(55) 35 99774-5407</strong></span>
            </a>

            <a
              href="mailto:KlyvenFlow@gmail.com"
              className="contact-pill-email"
              title="Enviar e-mail para KlyvenFlow@gmail.com"
            >
              <Mail size={16} color="var(--theme-accent)" />
              <span>E-mail: <strong style={{ letterSpacing: '0.02em' }}>KlyvenFlow@gmail.com</strong></span>
            </a>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600' }}>
            {lang === 'pt' ? '⚡ Atendimento imediato de Segunda a Sábado' : '⚡ Instant direct response Monday to Saturday'}
          </span>
        </div>

        {/* Industry Quick Selector */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: '12px', fontWeight: '700' }}>
            {t.heroQuickLinks}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {INDUSTRIES.map((item) => {
              const IconComponent = getIcon(item.icon);
              return (
                <a
                  key={item.id}
                  href="#showcase"
                  onClick={() => onSelectIndustry(item.id)}
                  className="glass-card"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    background: 'transparent',
                    border: '1px solid var(--border-line)'
                  }}
                >
                  <IconComponent size={17} color={item.accentColor} />
                  <span>{getIndustryLabel(item)}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Metric Cards Banner - Editorial Grid layout */}
        <div className="editorial-grid">
          {HERO_METRICS.map((metric, idx) => (
            <div key={idx} className="editorial-grid-item">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.08em' }}>
                {metric.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'monospace', color: '#ffffff', letterSpacing: '-0.03em' }}>
                  {metric.value}
                </span>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--theme-accent)' }}>
                  {metric.suffix}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                {metric.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
