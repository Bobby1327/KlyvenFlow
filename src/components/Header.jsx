import React, { useState } from 'react';
import { Rocket, Palette, Globe, Sun, Moon, Mail, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { TRANSLATIONS } from '../data/showcaseData';

export default function Header({ lang, setLang, isLightMode, onToggleTheme, onOpenThemeModal, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Top Contact & Announcement Bar */}
      <div style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-line)',
        padding: '6px 12px',
        fontSize: '0.8rem',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        overflowX: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', margin: '0 auto' }} className="top-bar-contact-group">
            {/* WhatsApp — always visible */}
            <a
              href="https://wa.me/5535997745407"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill-whatsapp"
              title="WhatsApp: (55) 35 99774-5407"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <span className="live-pulse-dot" />
              <MessageCircle size={14} />
              <span><strong>(55) 35 99774-5407</strong></span>
            </a>

            {/* Email — hidden on mobile via CSS class */}
            <a
              href="mailto:KlyvenFlow@gmail.com"
              className="contact-pill-email top-bar-email-pill"
              title="E-mail: KlyvenFlow@gmail.com"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <Mail size={14} color="var(--theme-accent)" />
              <span><strong>KlyvenFlow@gmail.com</strong></span>
            </a>

            {/* Instagram — hidden on mobile via CSS class */}
            <a
              href="https://instagram.com/KlyvenFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill-instagram top-bar-instagram-pill"
              title="Instagram: @KlyvenFlow"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <InstagramIcon size={14} color="#e1306c" />
              <span><strong>@KlyvenFlow</strong></span>
            </a>
          </div>

          <div className="hide-mobile" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#10b981', fontWeight: '700' }}>● Online</span>
            <span>{lang === 'pt' ? '⚡ Atendimento Direto & Resposta Rápida' : '⚡ Direct Developer Response & Support'}</span>
          </div>
        </div>
      </div>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-dark)',
        borderBottom: '1px solid var(--border-line)',
        padding: '10px 16px',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, var(--theme-accent) 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Rocket size={18} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                Klyven <span style={{ color: 'var(--theme-accent)' }}>Flow</span>
              </div>
              <div className="logo-subtitle" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em', fontWeight: '700' }}>
                {lang === 'pt' ? 'WEB APPS PARA NEGÓCIOS LOCAIS' : 'WEB APPS FOR LOCAL BUSINESS'}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
            <a href="#showcase" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.88rem', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {t.navDemos}
            </a>
            <a href="#roi-calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.88rem', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {t.navRoi}
            </a>
            <a href="#comparison" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.88rem', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {t.navComparison}
            </a>
            <a href="#package-builder" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.88rem', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
              {t.navProposal}
            </a>
          </nav>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="header-controls">
            
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={(e) => onToggleTheme(e)}
              className="btn-secondary"
              style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              title={isLightMode ? (lang === 'pt' ? 'Ativar Modo Escuro' : 'Switch to Dark Mode') : (lang === 'pt' ? 'Ativar Modo Claro' : 'Switch to Light Mode')}
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Language Switcher - Desktop only */}
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="btn-secondary hide-mobile"
              style={{ padding: '8px 10px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe size={14} />
              <span style={{ fontWeight: '800' }}>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>

            {/* Theme Picker - Desktop only */}
            <button 
              onClick={onOpenThemeModal}
              className="btn-secondary hide-mobile"
              title={lang === 'pt' ? 'Mudar tom visual' : 'Change brand colors'}
              style={{ padding: '8px 12px', fontSize: '0.82rem', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Palette size={15} color="var(--theme-accent)" />
              <span>{t.testBrandColors.split(' ')[0]}</span>
            </button>

            {/* Primary CTA */}
            <button 
              onClick={onOpenContactModal}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.85rem', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <MessageCircle size={15} />
              <span className="hide-mobile">{t.bookConsultation}</span>
              <span className="show-mobile-inline" style={{ display: 'none' }}>{lang === 'pt' ? 'Contato' : 'Contact'}</span>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileNavOpen(prev => !prev)}
              className="btn-secondary mobile-menu-toggle"
              style={{
                padding: '8px 10px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
              aria-label="Menu"
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Drawer */}
        {mobileNavOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            borderBottom: '2px solid var(--theme-accent)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
            zIndex: 99,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
              {[
                { href: '#showcase', label: t.navDemos },
                { href: '#roi-calculator', label: t.navRoi },
                { href: '#comparison', label: t.navComparison },
                { href: '#package-builder', label: t.navProposal },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  style={{
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    padding: '12px 10px',
                    borderRadius: '6px',
                    borderBottom: '1px solid var(--border-line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} color="var(--text-dim)" />
                </a>
              ))}
            </div>

            {/* Mobile Utility Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              {/* Language Switch */}
              <button
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <Globe size={15} />
                <span>{lang === 'pt' ? 'English (EN)' : 'Português (PT)'}</span>
              </button>

              {/* Theme Palette */}
              <button
                onClick={() => { setMobileNavOpen(false); onOpenThemeModal(); }}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', justifyContent: 'center' }}
              >
                <Palette size={15} color="var(--theme-accent)" />
                <span>{lang === 'pt' ? 'Cores da Marca' : 'Color Palette'}</span>
              </button>
            </div>

            {/* Big CTA */}
            <button
              onClick={() => { setMobileNavOpen(false); onOpenContactModal(); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', borderRadius: '6px' }}
            >
              <MessageCircle size={18} />
              <span style={{ marginLeft: '8px', fontWeight: '750' }}>{t.bookConsultation}</span>
            </button>
          </div>
        )}
      </header>

      {/* Media query helper styles */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle { display: flex !important; }
          .show-mobile-inline { display: inline !important; }
        }
      `}</style>
    </>
  );
}
