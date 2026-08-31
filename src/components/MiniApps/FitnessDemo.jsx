import React, { useState } from 'react';
import { Dumbbell, Flame } from 'lucide-react';
import { FITNESS_CLASSES, TRANSLATIONS } from '../../data/showcaseData';

export default function FitnessDemo({ lang }) {
  const t = TRANSLATIONS[lang];
  const [reservedClasses, setReservedClasses] = useState([]);
  const [freeTrialClaimed, setFreeTrialClaimed] = useState(false);

  const toggleReserve = (id) => {
    setReservedClasses(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getClassName = (item) => {
    if (lang === 'pt') return item.name;
    return item.nameEn || item.name;
  };

  const getClassLevel = (item) => {
    if (lang === 'pt') return item.level;
    return item.levelEn || item.level;
  };

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-line)', overflow: 'hidden' }}>
      
      {/* Mini App Top Header Bar */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'var(--bg-card-hover)', 
        borderBottom: '1px solid var(--border-line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Dumbbell size={18} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Studio Pilates Corpo & Mente</h4>
            <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <Flame size={14} /> {t.fitOpenStatus}
            </span>
          </div>
        </div>

        {!freeTrialClaimed && (
          <button 
            onClick={() => setFreeTrialClaimed(true)}
            style={{
              background: 'var(--bg-card)', border: '1px solid #10b981', color: '#10b981',
              padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '700',
              transition: 'all 0.2s ease'
            }}
          >
            {t.fitFreeTrialBtn}
          </button>
        )}
      </div>

      <div style={{ padding: '24px' }}>
        {freeTrialClaimed && (
          <div style={{ padding: '14px 18px', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #10b981', color: 'var(--text-main)', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{t.fitTrialSuccess}</span>
            <button onClick={() => setFreeTrialClaimed(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}>{t.fitDismiss}</button>
          </div>
        )}

        <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '14px', fontWeight: '700' }}>{t.fitScheduleTitle}</h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FITNESS_CLASSES.map(item => {
            const isBooked = reservedClasses.includes(item.id);
            const spotsLeftText = item.spots === 1 ? (lang === 'pt' ? `1 ${t.fitSpotsLeft}` : `1 ${t.fitSpotsLeft}`) : `${item.spots} ${t.fitSpotsOpen}`;
            return (
              <div key={item.id} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', border: '1px solid var(--border-line)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#10b981', background: 'var(--bg-card-hover)', border: '1px solid var(--border-line)', padding: '2px 8px', borderRadius: '4px' }}>{item.time}</span>
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>{getClassName(item)}</h5>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Instructor: <strong>{item.instructor}</strong> &bull; Level: {getClassLevel(item)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: item.spots === 1 ? '#ef4444' : '#10b981', fontWeight: '700' }}>
                      {spotsLeftText}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.fitCapacity} {item.capacity}</div>
                  </div>

                  <button
                    onClick={() => toggleReserve(item.id)}
                    style={{
                      padding: '8px 18px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700',
                      background: isBooked ? 'var(--bg-card-hover)' : '#10b981',
                      color: isBooked ? '#ef4444' : '#fff',
                      border: isBooked ? '1px solid #ef4444' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isBooked ? t.fitCancelSpot : t.fitReserveSpot}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
