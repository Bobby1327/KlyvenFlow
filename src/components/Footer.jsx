import React from 'react';
import { Rocket, Heart, Mail, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/showcaseData';

export default function Footer({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-line)',
      padding: '60px 24px 40px 24px',
      color: 'var(--text-muted)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr', gap: '40px', marginBottom: '48px' }} className="demo-grid-layout">
          
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
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                Klyven <span style={{ color: 'var(--theme-accent)' }}>Flow</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: '360px' }}>
              {t.footerSub}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)' }}>⚡ React & Vite</span>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)' }}>📱 PWA Mobile</span>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)' }}>🔒 SSL & Schema SEO</span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
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
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px' }}>
              {lang === 'pt' ? 'Ferramentas' : 'Interactive Tools'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#roi-calculator" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navRoi}</a></li>
              <li><a href="#comparison" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navComparison}</a></li>
              <li><a href="#package-builder" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navProposal}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info & CTA */}
          <div>
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{lang === 'pt' ? 'Contato Direto' : 'Direct Contact'}</span>
              <span className="live-pulse-dot" />
            </h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/5535997745407"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-whatsapp"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={17} />
                  <span>WhatsApp: <strong>(55) 35 99774-5407</strong></span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              {/* Gmail Card */}
              <a
                href="mailto:KlyvenFlow@gmail.com"
                className="contact-pill-email"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={17} color="var(--theme-accent)" />
                  <span>E-mail: <strong>KlyvenFlow@gmail.com</strong></span>
                </div>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <button
              onClick={onOpenContactModal}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px' }}
            >
              {t.footerCta}
            </button>
          </div>

        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>&copy; {new Date().getFullYear()} {t.footerCopyright}</span>
            <span>&bull;</span>
            <a href="mailto:KlyvenFlow@gmail.com" style={{ color: 'var(--theme-accent)', textDecoration: 'none', fontWeight: '700' }}>KlyvenFlow@gmail.com</a>
            <span>&bull;</span>
            <a href="https://wa.me/5535997745407" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '700' }}>(55) 35 99774-5407</a>
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
