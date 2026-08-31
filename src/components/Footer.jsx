import React from 'react';
import { Rocket, Heart } from 'lucide-react';
import { TRANSLATIONS } from '../data/showcaseData';

export default function Footer({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer style={{
      background: 'rgba(9, 13, 22, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 24px 40px 24px',
      color: 'var(--text-muted)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '48px' }} className="demo-grid-layout">
          
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--theme-accent) 0%, #06b6d4 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Rocket size={20} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', color: '#ffffff' }}>
                Klyven <span style={{ color: 'var(--theme-accent)' }}>Flow</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: '360px' }}>
              {t.footerSub}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>⚡ React & Vite</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>📱 PWA Mobile</span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>🔒 SSL & Schema SEO</span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h5 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
              {lang === 'pt' ? 'Soluções' : 'Solutions'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Cardápios & Pedidos' : 'Restaurant Menus & Orders'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Agendamentos 24/7' : 'Salon Appointment Bookings'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Orçamentos de Serviços' : 'Contractor Price Estimators'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Retirada Clique & Retire' : 'Boutique Click & Collect'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Reserva de Vagas' : 'Fitness Class Reservations'}</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <h5 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
              {lang === 'pt' ? 'Ferramentas' : 'Interactive Tools'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#roi-calculator" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navRoi}</a></li>
              <li><a href="#comparison" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navComparison}</a></li>
              <li><a href="#package-builder" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navProposal}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact CTA */}
          <div>
            <h5 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
              {lang === 'pt' ? 'Iniciar Projeto' : 'Get Started'}
            </h5>
            <p style={{ fontSize: '0.88rem', marginBottom: '16px' }}>{t.footerReadyToLaunch}</p>
            <button onClick={onOpenContactModal} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
              {t.footerCta}
            </button>
          </div>

        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem' }}>
          <div>
            &copy; {new Date().getFullYear()} {t.footerCopyright}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)' }}>
            <span>{t.footerLove}</span>
            <Heart size={14} color="var(--accent-pink)" fill="var(--accent-pink)" />
          </div>
        </div>

      </div>
    </footer>
  );
}
