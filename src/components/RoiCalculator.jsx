import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { INDUSTRIES, TRANSLATIONS } from '../data/showcaseData';

export default function RoiCalculator({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];
  const [selectedInd, setSelectedInd] = useState('restaurant');
  const [ticketSize, setTicketSize] = useState(65); // default R$ 65
  const [monthlyVolume, setMonthlyVolume] = useState(380);
  const [commissionRate, setCommissionRate] = useState(22);

  // Calculations
  const monthlyGross = ticketSize * monthlyVolume;
  const annualGross = monthlyGross * 12;

  // Assuming 40% of orders currently go through 3rd party apps charging commission
  const thirdPartyOrdersCount = monthlyVolume * 0.4;
  const monthlyCommissionPaid = (thirdPartyOrdersCount * ticketSize) * (commissionRate / 100);
  const annualCommissionSaved = monthlyCommissionPaid * 12;

  // Additional sales from direct re-ordering & 24/7 self booking (~15% boost)
  const annualExtraRevenue = annualGross * 0.15;
  
  // Phone hours saved (~ 2 mins saved per online order/booking)
  const monthlyHoursSaved = Math.round((monthlyVolume * 0.6 * 2) / 60);

  const totalAnnualValue = annualCommissionSaved + annualExtraRevenue;
  const estimatedAppCost = 1950; // estimated build cost in R$
  const estimatedRoiMonths = Math.round((estimatedAppCost / (totalAnnualValue / 12)) * 10) / 10;

  const formatPrice = (price) => {
    if (lang === 'pt') {
      return `R$ ${Math.round(price).toLocaleString('pt-BR')}`;
    }
    return `R$ ${Math.round(price).toLocaleString('en-US')}`;
  };

  const getIndustryLabel = (ind) => {
    if (lang === 'pt') return ind.namePt.split(' ')[0];
    return ind.name.split(' ')[0];
  };

  return (
    <section id="roi-calculator" style={{ padding: '100px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <Calculator size={14} style={{ marginRight: '6px' }} />
            <span>{t.roiBadge}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '700', marginBottom: '18px' }}>
            {t.roiTitle}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
            {t.roiSub}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="demo-grid-layout">
          
          {/* Left Column: Interactive Inputs */}
          <div className="glass-panel" style={{ padding: '36px', borderRadius: '12px', background: 'transparent' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '28px', color: '#fff', fontWeight: '700' }}>{t.roiSectionParams}</h3>
            
            {/* Industry Selector */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t.roiLabelIndustry}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedInd(ind.id);
                      if (ind.id === 'restaurant') { setTicketSize(65); setMonthlyVolume(400); }
                      if (ind.id === 'salon') { setTicketSize(120); setMonthlyVolume(180); }
                      if (ind.id === 'contractor') { setTicketSize(450); setMonthlyVolume(45); }
                      if (ind.id === 'retail') { setTicketSize(80); setMonthlyVolume(250); }
                      if (ind.id === 'fitness') { setTicketSize(100); setMonthlyVolume(150); }
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-line)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      background: selectedInd === ind.id ? 'var(--theme-accent)' : 'transparent',
                      color: '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {getIndustryLabel(ind)}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Size Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.roiLabelTicket}</label>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--theme-accent)' }}>{formatPrice(ticketSize)}</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="1000" 
                step="5"
                value={ticketSize} 
                onChange={e => setTicketSize(Number(e.target.value))} 
              />
            </div>

            {/* Monthly Volume Slider */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.roiLabelVolume}</label>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--theme-accent)' }}>{monthlyVolume}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="1500" 
                step="10"
                value={monthlyVolume} 
                onChange={e => setMonthlyVolume(Number(e.target.value))} 
              />
            </div>

            {/* Commission % Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.roiLabelCommission}</label>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--accent-orange)' }}>{commissionRate}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="35" 
                step="1"
                value={commissionRate} 
                onChange={e => setCommissionRate(Number(e.target.value))} 
              />
            </div>

          </div>

          {/* Right Column: Live Projected Returns - Minimalist Sheet */}
          <div className="glass-panel" style={{ padding: '36px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'transparent', borderColor: 'var(--theme-accent)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--theme-accent)', fontWeight: '800', letterSpacing: '0.08em', marginBottom: '12px' }}>
                {t.roiProjTitle}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                <span style={{ fontSize: '3.6rem', fontWeight: '800', fontFamily: 'monospace', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {formatPrice(totalAnnualValue)}
                </span>
                <span style={{ fontSize: '1rem', color: '#10b981', fontWeight: '700' }}>
                  {t.roiProjSuffix}
                </span>
              </div>

              {/* Breakdown Cards - Minimalist Border lines */}
              <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-line)' }}>
                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <DollarSign size={18} color="var(--accent-orange)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t.roiSavedCommCard}</span>
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: 'monospace', color: '#fff' }}>
                    +{formatPrice(annualCommissionSaved)}
                  </span>
                </div>

                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TrendingUp size={18} color="var(--accent-orange)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t.roiGrowthCard}</span>
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: 'monospace', color: '#fff' }}>
                    +{formatPrice(annualExtraRevenue)}
                  </span>
                </div>

                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={18} color="var(--accent-orange)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t.roiHoursCard}</span>
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: '700', fontFamily: 'monospace', color: '#fff' }}>
                    ~{monthlyHoursSaved} {t.roiHoursUnit.split(' ')[0]} / {lang === 'pt' ? 'mês' : 'mo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{t.roiEstInvestment}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-orange)' }}>
                  {t.roiReturnText.replace('{roi}', estimatedRoiMonths)}
                </div>
              </div>

              <button onClick={onOpenContactModal} className="btn-primary" style={{ padding: '14px 28px', borderRadius: '6px' }}>
                {t.roiEstCta}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
