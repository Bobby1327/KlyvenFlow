import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPARISON_POINTS, TRANSLATIONS } from '../data/showcaseData';

export default function ComparisonSection({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];

  const getFeature = (pt) => {
    if (lang === 'pt') return pt.feature;
    return pt.featureEn || pt.feature;
  };

  const getOldWay = (pt) => {
    if (lang === 'pt') return pt.oldWay;
    return pt.oldWayEn || pt.oldWay;
  };

  const getNewWay = (pt) => {
    if (lang === 'pt') return pt.newWay;
    return pt.newWayEn || pt.newWay;
  };

  const getImpact = (pt) => {
    if (lang === 'pt') return pt.impact;
    return pt.impactEn || pt.impact;
  };

  return (
    <section id="comparison" style={{ padding: '60px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--theme-accent)', fontWeight: '800', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
            {t.compBadge}
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '12px' }}>
            {t.compTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '740px', margin: '0 auto', lineHeight: '1.5' }}>
            {t.compSub}
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }} className="demo-grid-layout">

          {/* Old Static Website Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', background: 'transparent', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <XCircle size={18} color="#ef4444" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: '700' }}>{t.compOldTitle}</h3>
                <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600' }}>{t.compOldSub}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {COMPARISON_POINTS.map((pt, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>{getFeature(pt)}</div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                    <XCircle size={14} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{getOldWay(pt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Modern Web App Card */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '12px', background: 'transparent', borderColor: 'var(--theme-accent)', boxShadow: '0 4px 30px rgba(139, 92, 246, 0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'var(--theme-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={18} color="var(--theme-accent)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: '700' }}>{t.compNewTitle}</h3>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700' }}>{t.compNewSub}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {COMPARISON_POINTS.map((pt, idx) => (
                <div key={idx} style={{ padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--theme-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{getFeature(pt)}</div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>{getImpact(pt)}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                    <CheckCircle2 size={14} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{getNewWay(pt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Callout */}
        <div className="glass-panel" style={{ padding: '20px 28px', borderRadius: '12px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#fff', margin: '0 0 4px 0', fontWeight: '700' }}>{t.compFooterText}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{t.compFooterSub}</p>
          </div>
          <button onClick={onOpenContactModal} className="btn-primary" style={{ padding: '12px 24px', borderRadius: '6px', fontSize: '0.9rem' }}>
            <span>{t.compCta}</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
