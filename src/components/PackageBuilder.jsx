import React, { useState } from 'react';
import { Check, Sparkles, Send, Zap, Clock } from 'lucide-react';
import { PACKAGE_OPTIONS, INDUSTRIES, TRANSLATIONS } from '../data/showcaseData';

export default function PackageBuilder({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];
  const [selectedInd, setSelectedInd] = useState('restaurant');
  const [selectedFeatures, setSelectedFeatures] = useState(['ordering', 'qr', 'sms', 'google']);
  const [speed, setSpeed] = useState('standard'); // 'standard' | 'express'
  const [proposalSent, setProposalSent] = useState(false);

  const toggleFeature = (id) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const basePrice = 290; // base development price in R$
  const featuresTotal = selectedFeatures.reduce((sum, fId) => {
    const feat = PACKAGE_OPTIONS.find(p => p.id === fId);
    return sum + (feat ? feat.costEstimate : 0);
  }, 0);

  const speedMultiplier = speed === 'express' ? 1.2 : 1.0;
  const totalEstimate = Math.round((basePrice + featuresTotal) * speedMultiplier);

  const daysEstimate = speed === 'express' 
    ? (lang === 'pt' ? '4 - 6 Dias Úteis' : '4 - 6 Business Days')
    : (lang === 'pt' ? '10 - 12 Dias Úteis' : '10 - 12 Business Days');

  const handleSendProposal = (e) => {
    e.preventDefault();
    setProposalSent(true);
  };

  const getIndustryLabel = (ind) => {
    if (lang === 'pt') return ind.namePt;
    return ind.name;
  };

  const getFeatureName = (opt) => {
    if (lang === 'pt') return opt.name;
    return opt.nameEn || opt.name;
  };

  const getFeatureCategory = (opt) => {
    if (lang === 'pt') {
      if (opt.category === 'Core App') return 'App Base';
      if (opt.category === 'Features') return 'Módulos Extras';
      if (opt.category === 'Growth') return 'Divulgação';
    }
    return opt.category;
  };

  const formatPrice = (price) => {
    if (lang === 'pt') {
      return `R$ ${Math.round(price).toLocaleString('pt-BR')}`;
    }
    return `R$ ${Math.round(price).toLocaleString('en-US')}`;
  };

  return (
    <section id="package-builder" style={{ padding: '100px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--theme-accent)', fontWeight: '800', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
            {t.propBadge}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '700', marginBottom: '18px' }}>
            {t.propTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
            {t.propSub}
          </p>
        </div>

        {proposalSent ? (
          <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: '640px', margin: '0 auto', borderRadius: '12px', border: '1px solid #10b981', background: 'transparent' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <Check size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '12px', fontWeight: '700' }}>{t.propSummaryTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '28px', lineHeight: '1.6' }}>
              {lang === 'pt' 
                ? `Escopo personalizado gerado com sucesso. Investimento total estimado: ${formatPrice(totalEstimate)} com entrega estimada em ${daysEstimate}.`
                : `Scope specs configured. Total estimated investment: ${formatPrice(totalEstimate)} with delivery targeted in ${daysEstimate}.`
              }
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => setProposalSent(false)} className="btn-secondary" style={{ borderRadius: '6px' }}>
                {lang === 'pt' ? 'Mudar Ferramentas' : 'Change Specs'}
              </button>
              <button onClick={onOpenContactModal} className="btn-primary" style={{ borderRadius: '6px' }}>
                {t.bookConsultation}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }} className="demo-grid-layout">
            
            {/* Left: Step Builder */}
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '12px', background: 'transparent' }}>
              
              {/* Step 1: Industry */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--theme-accent)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>1</span>
                  {t.propStep1}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {INDUSTRIES.map(ind => (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedInd(ind.id)}
                      style={{
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-line)',
                        background: selectedInd === ind.id ? 'var(--theme-accent)' : 'transparent',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {getIndustryLabel(ind)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Feature Selection */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--theme-accent)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>2</span>
                  {t.propStep2}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {PACKAGE_OPTIONS.map(opt => {
                    const isChecked = selectedFeatures.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleFeature(opt.id)}
                        style={{
                          padding: '14px',
                          borderRadius: '8px',
                          border: isChecked ? '1px solid var(--theme-accent)' : '1px solid var(--border-line)',
                          background: isChecked ? 'var(--theme-accent-light)' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: isChecked ? 'none' : '1px solid #4b5563', background: isChecked ? 'var(--theme-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isChecked && <Check size={12} color="#fff" />}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{getFeatureName(opt)}</div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{getFeatureCategory(opt)}</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', fontFamily: 'monospace', color: 'var(--theme-accent)' }}>+{formatPrice(opt.costEstimate)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Speed */}
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--theme-accent)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800' }}>3</span>
                  {t.propStep3}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    onClick={() => setSpeed('standard')}
                    style={{
                      padding: '14px',
                      borderRadius: '8px',
                      border: speed === 'standard' ? '1px solid var(--theme-accent)' : '1px solid var(--border-line)',
                      background: speed === 'standard' ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.propStandardSpeed}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{t.propStandardSub}</div>
                  </button>

                  <button
                    onClick={() => setSpeed('express')}
                    style={{
                      padding: '14px',
                      borderRadius: '8px',
                      border: speed === 'express' ? '1px solid var(--accent-orange)' : '1px solid var(--border-line)',
                      background: speed === 'express' ? 'rgba(249, 115, 22, 0.05)' : 'transparent',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Zap size={14} /> {t.propExpressSpeed}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{t.propExpressSub}</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Live Quote Summary Card */}
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--theme-accent)', background: 'transparent' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                  <Sparkles size={18} color="var(--theme-accent)" />
                  {t.propSummaryTitle}
                </h4>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-line)', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{t.propOneTimeBuild}</div>
                  <div style={{ fontSize: '2.6rem', fontWeight: '800', color: '#ffffff', fontFamily: 'monospace', margin: '6px 0', letterSpacing: '-0.02em' }}>
                    {formatPrice(totalEstimate)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {t.propReadyIn.replace('{days}', daysEstimate)}
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: '600' }}>
                  {t.propIncludesCount.replace('{count}', selectedFeatures.length)}
                </div>

                <ul style={{ fontSize: '0.82rem', color: 'var(--text-muted)', paddingLeft: '18px', margin: '0 0 32px 0', lineHeight: '1.8' }}>
                  <li>{t.propBullet1}</li>
                  {selectedFeatures.map(fId => {
                    const feat = PACKAGE_OPTIONS.find(p => p.id === fId);
                    return <li key={fId}>{feat ? getFeatureName(feat) : ''}</li>;
                  })}
                  <li>{t.propBullet2}</li>
                  <li>{t.propBullet3}</li>
                </ul>
              </div>

              <button 
                onClick={handleSendProposal}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '6px' }}
              >
                <Send size={16} style={{ marginRight: '4px' }} /> {t.propCta}
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
