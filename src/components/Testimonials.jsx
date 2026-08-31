import React, { useState } from 'react';
import { Quote, TrendingUp } from 'lucide-react';
import { CASE_STUDIES, TRANSLATIONS } from '../data/showcaseData';

export default function Testimonials({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState('all');

  const filteredStudies = CASE_STUDIES.filter(cs => filter === 'all' || cs.category === filter);

  const getMetric = (cs) => {
    if (lang === 'pt') return cs.metric;
    return cs.metricEn || cs.metric;
  };

  const getDesc = (cs) => {
    if (lang === 'pt') return cs.desc;
    return cs.descEn || cs.desc;
  };

  const getCategoryLabel = (cat) => {
    if (lang === 'pt') {
      if (cat === 'all') return 'Todos os setores';
      if (cat === 'restaurant') return 'Restaurantes';
      if (cat === 'salon') return 'Salões';
      if (cat === 'contractor') return 'Serviços';
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <section style={{ padding: '100px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--theme-accent)', fontWeight: '800', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
            {t.testBadge}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '700', marginBottom: '18px' }}>
            {t.testTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {t.testSub}
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {['all', 'restaurant', 'salon', 'contractor'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid var(--border-line)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '700',
                textTransform: 'capitalize',
                background: filter === cat ? 'var(--theme-accent)' : 'transparent',
                color: '#fff',
                transition: 'all 0.2s ease'
              }}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {filteredStudies.map(study => (
            <div key={study.id} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'transparent', borderRadius: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 12px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <TrendingUp size={12} /> {getMetric(study)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--border-line-hover)', lineHeight: '1' }}>“</span>
                </div>

                <p style={{ fontSize: '1.05rem', color: '#e5e7eb', fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '32px', lineHeight: '1.6' }}>
                  {getDesc(study)}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-line)' }}>
                <img src={study.avatar} alt={study.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h5 style={{ fontSize: '0.9rem', color: '#fff', margin: 0, fontWeight: '700' }}>{study.author}</h5>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{study.client} &bull; {study.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
