import React from 'react';
import { Rocket, Heart, Mail, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { TRANSLATIONS } from '../data/showcaseData';

export default function Footer({ lang, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-line)',
      padding: '44px 24px 28px 24px',
      color: 'var(--text-muted)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr', gap: '28px', marginBottom: '28px' }} className="demo-grid-layout">
          
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--theme-accent) 0%, #06b6d4 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Rocket size={18} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                Klyven <span style={{ color: 'var(--theme-accent)' }}>Flow</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', maxWidth: '360px' }}>
              {t.footerSub}
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)', fontSize: '0.7rem' }}>⚡ React & Vite</span>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)', fontSize: '0.7rem' }}>📱 PWA Mobile</span>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: 'var(--text-dim)', border: '1px solid var(--border-line)', fontSize: '0.7rem' }}>🔒 SSL & Schema SEO</span>
              <span className="badge" style={{ background: 'var(--bg-card-hover)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '0.7rem', fontWeight: '600' }}>
                🟣 {t.paymentNubankBadge}
              </span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>
              {lang === 'pt' ? 'Soluções' : 'Solutions'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Cardápios & Pedidos' : 'Restaurant Menus & Orders'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Agendamentos 24/7' : 'Salon Appointment Bookings'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Orçamentos de Serviços' : 'Contractor Price Estimators'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Retirada Clique & Retire' : 'Boutique Click & Collect'}</a></li>
              <li><a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'pt' ? 'Reserva de Vagas' : 'Fitness Class Reservations'}</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>
              {lang === 'pt' ? 'Ferramentas' : 'Interactive Tools'}
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li><a href="#roi-calculator" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navRoi}</a></li>
              <li><a href="#comparison" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navComparison}</a></li>
              <li><a href="#package-builder" style={{ color: 'inherit', textDecoration: 'none' }}>{t.navProposal}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info & CTA */}
          <div>
            <h5 style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{lang === 'pt' ? 'Contato Direto' : 'Direct Contact'}</span>
              <span className="live-pulse-dot" />
            </h5>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/5535997745407"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-whatsapp"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'space-between', fontSize: '0.82rem', padding: '7px 14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MessageCircle size={15} />
                  <span>WhatsApp: <strong>(55) 35 99774-5407</strong></span>
                </div>
                <ArrowUpRight size={13} />
              </a>

              {/* Gmail Card */}
              <a
                href="mailto:KlyvenFlow@gmail.com"
                className="contact-pill-email"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'space-between', fontSize: '0.82rem', padding: '7px 14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={15} color="var(--theme-accent)" />
                  <span>E-mail: <strong>KlyvenFlow@gmail.com</strong></span>
                </div>
                <ArrowUpRight size={13} />
              </a>

              {/* Instagram Card */}
              <a
                href="https://instagram.com/KlyvenFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill-instagram"
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'space-between', fontSize: '0.82rem', padding: '7px 14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <InstagramIcon size={15} color="#e1306c" />
                  <span>Instagram: <strong>@KlyvenFlow</strong></span>
                </div>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <button
              onClick={onOpenContactModal}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px 14px' }}
            >
              {t.footerCta}
            </button>
          </div>

        </div>

        <div style={{ paddingTop: '18px', borderTop: '1px solid var(--border-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>&copy; {new Date().getFullYear()} {t.footerCopyright}</span>
            <span>&bull;</span>
            <a href="https://wa.me/5535997745407" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '700' }}>(55) 35 99774-5407</a>
            <span>&bull;</span>
            <a href="mailto:KlyvenFlow@gmail.com" style={{ color: 'var(--theme-accent)', textDecoration: 'none', fontWeight: '700' }}>KlyvenFlow@gmail.com</a>
            <span>&bull;</span>
            <a href="https://instagram.com/KlyvenFlow" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', textDecoration: 'none', fontWeight: '700' }}>@KlyvenFlow</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)' }}>
            <span>{t.footerLove}</span>
            <Heart size={13} color="var(--accent-pink)" fill="var(--accent-pink)" />
          </div>
        </div>

      </div>
    </footer>
  );
}
