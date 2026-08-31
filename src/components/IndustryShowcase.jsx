import React from 'react';
import { Utensils, Scissors, Wrench, ShoppingBag, Dumbbell, Sparkles } from 'lucide-react';
import { INDUSTRIES, TRANSLATIONS } from '../data/showcaseData';
import RestaurantDemo from './MiniApps/RestaurantDemo';
import SalonDemo from './MiniApps/SalonDemo';
import ContractorDemo from './MiniApps/ContractorDemo';
import RetailDemo from './MiniApps/RetailDemo';
import FitnessDemo from './MiniApps/FitnessDemo';

export default function IndustryShowcase({ lang, activeIndustry, onSelectIndustry }) {
  const t = TRANSLATIONS[lang];
  const currentInd = INDUSTRIES.find(i => i.id === activeIndustry) || INDUSTRIES[0];

  const getSimulatedUrl = () => {
    switch (activeIndustry) {
      case 'restaurant': return 'https://www.cantinadononno.com.br';
      case 'salon': return 'https://www.studioliviacosta.com.br';
      case 'contractor': return 'https://www.maridodealuguel.com.br';
      case 'retail': return 'https://www.livrariadavila.com.br';
      case 'fitness': return 'https://www.corpoemente.com.br';
      default: return 'https://www.localcraft.app';
    }
  };

  const renderMiniApp = () => {
    switch (activeIndustry) {
      case 'restaurant': return <RestaurantDemo lang={lang} />;
      case 'salon': return <SalonDemo lang={lang} />;
      case 'contractor': return <ContractorDemo lang={lang} />;
      case 'retail': return <RetailDemo lang={lang} />;
      case 'fitness': return <FitnessDemo lang={lang} />;
      default: return <RestaurantDemo lang={lang} />;
    }
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

  const getIndustryLabel = (ind) => {
    if (lang === 'pt') return ind.namePt;
    return ind.name;
  };

  const getTagline = (ind) => {
    if (lang === 'pt') return ind.taglinePt;
    return ind.tagline;
  };

  const getStatLabel = (key) => {
    if (lang === 'pt') {
      if (key === 'commissionSaved') return 'Comissão Salva';
      if (key === 'avgOrderIncrease') return 'Aumento de Pedidos';
      if (key === 'phoneCallsReduced') return 'Chamadas Reduzidas';
      if (key === 'noShowsReduced') return 'Faltas Reduzidas';
      if (key === 'recurringClients') return 'Clientes Recorrentes';
      if (key === 'leadCaptureBoost') return 'Mais Contatos';
      if (key === 'quoteTimeSaved') return 'Tempo Salvo';
      if (key === 'highValueJobs') return 'Serviços Premium';
      if (key === 'repeatPurchases') return 'Compras Recorrentes';
      if (key === 'localPickupGrowth') return 'Retirada Local';
      if (key === 'footTraffic') return 'Movimento Físico';
      if (key === 'trialConversions') return 'Conversão Exper.';
      if (key === 'classCapacity') return 'Capacidade Aulas';
      if (key === 'churnReduction') return 'Churn Reduzido';
    }
    return key.replace(/([A-Z])/g, ' $1');
  };

  return (
    <section id="showcase" style={{ padding: '100px 24px', borderBottom: '1px solid var(--border-line)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-glow" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} />
            <span>{t.showcaseBadge}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: '700', marginBottom: '18px' }}>
            {t.showcaseTitlePart1} <span style={{ color: currentInd.accentColor }}>{t.showcaseTitlePart2}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
            {t.showcaseSub}
          </p>
        </div>

        {/* Industry Tab Buttons Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {INDUSTRIES.map((ind) => {
            const Icon = getIcon(ind.icon);
            const isActive = ind.id === activeIndustry;
            return (
              <button
                key={ind.id}
                onClick={() => onSelectIndustry(ind.id)}
                style={{
                  padding: '14px 24px',
                  borderRadius: '6px',
                  border: isActive ? `2px solid ${ind.accentColor}` : '1px solid var(--border-line)',
                  background: isActive ? 'var(--bg-card-hover)' : 'transparent',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={ind.accentColor} />
                <span>{getIndustryLabel(ind)}</span>
              </button>
            );
          })}
        </div>

        {/* Industry Highlight Banner */}
        <div className="glass-panel" style={{ padding: '28px 36px', marginBottom: '32px', borderLeft: `4px solid ${currentInd.accentColor}`, background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: currentInd.accentColor, fontWeight: '800', letterSpacing: '0.05em', marginBottom: '6px' }}>
                {t.keyProblemSolved} {getIndustryLabel(currentInd)}
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '4px', fontWeight: '700' }}>{getTagline(currentInd)}</h3>
            </div>

            {/* Quick Stat Pill */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {Object.entries(currentInd.stats).map(([key, val]) => (
                <div key={key} style={{ background: 'var(--bg-card-hover)', padding: '10px 18px', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--border-line)' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: currentInd.accentColor, fontFamily: 'monospace' }}>{val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{getStatLabel(key)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Thick line separator separating the demo area at the top */}
        <div className="thick-separator" />

        {/* Browser Device Mockup wrapper to fully separate the simulated app */}
        <div className="browser-device-frame">
          <div className="browser-device-header">
            <div className="browser-device-dots">
              <span className="browser-device-dot" style={{ backgroundColor: '#ef4444' }} />
              <span className="browser-device-dot" style={{ backgroundColor: '#fbbf24' }} />
              <span className="browser-device-dot" style={{ backgroundColor: '#34d399' }} />
            </div>

            <div className="browser-device-address-bar">
              <span>🔒</span>
              <span>{getSimulatedUrl()}</span>
            </div>

            <div className="browser-device-status-indicator">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span>{lang === 'pt' ? 'PROTÓTIPO ATIVO' : 'LIVE DEMO'}</span>
            </div>
          </div>

          <div className="browser-device-body">
            {renderMiniApp()}
          </div>
        </div>

        {/* Thick line separator separating the demo area at the bottom */}
        <div className="thick-separator" />

      </div>
    </section>
  );
}
