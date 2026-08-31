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
    } else {
      if (cat === 'all') return 'All Sectors';
      if (cat === 'restaurant') return 'Restaurants';
      if (cat === 'salon') return 'Salons';
      if (cat === 'contractor') return 'Services';
    }
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const getAuthor = (study) => {
    if (lang === 'pt') return study.author;
    return study.authorEn || study.author;
  };

  const getLocation = (study) => {
    if (lang === 'pt') return study.location;
    return study.locationEn || study.location;
  };

  return (
    <section style={{ padding: '60px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--theme-accent)', fontWeight: '800', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
            {t.testBadge}
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '12px' }}>
            {t.testTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.5' }}>
            {t.testSub}
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {['all', 'restaurant', 'salon', 'contractor'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border-line)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'capitalize',
                background: filter === cat ? 'var(--theme-accent)' : 'var(--bg-card)',
                color: filter === cat ? '#ffffff' : 'var(--text-main)',
                transition: 'all 0.2s ease'
              }}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredStudies.map(study => (
            <div key={study.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '3px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <TrendingUp size={12} /> {getMetric(study)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--border-line-hover)', lineHeight: '1' }}>“</span>
                </div>

                <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.5' }}>
                  {getDesc(study)}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-line)' }}>
                <img src={study.avatar} alt={getAuthor(study)} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h5 style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>{getAuthor(study)}</h5>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{study.client} &bull; {getLocation(study)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
