import React from 'react';
import { Rocket, Palette, Calendar, Globe, Sun, Moon } from 'lucide-react';
import { TRANSLATIONS } from '../data/showcaseData';

export default function Header({ lang, setLang, isLightMode, onToggleTheme, onOpenThemeModal, onOpenContactModal }) {
  const t = TRANSLATIONS[lang];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-dark)',
      borderBottom: '1px solid var(--border-line)',
      padding: '16px 24px',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, var(--theme-accent) 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Rocket size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.1 }}>
              Klyve <span style={{ color: 'var(--theme-accent)' }}>Flow</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.05em', fontWeight: '700' }}>
              {lang === 'pt' ? 'WEB APPS PARA NEGÓCIOS LOCAIS' : 'WEB APPS FOR LOCAL BUSINESS'}
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <a href="#showcase" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'color 0.2s' }}>
            {t.navDemos}
          </a>
          <a href="#roi-calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'color 0.2s' }}>
            {t.navRoi}
          </a>
          <a href="#comparison" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'color 0.2s' }}>
            {t.navComparison}
          </a>
          <a href="#package-builder" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'color 0.2s' }}>
            {t.navProposal}
          </a>
        </nav>

        {/* CTA & Theme & Language Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={(e) => onToggleTheme(e)}
            className="btn-secondary"
            style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title={isLightMode ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="btn-secondary"
            style={{ padding: '10px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <Globe size={16} />
            <span style={{ fontWeight: '800' }}>{lang === 'pt' ? 'EN' : 'PT'}</span>
          </button>

          <button 
            onClick={onOpenThemeModal}
            className="btn-secondary"
            title="Mudar tom visual"
            style={{ padding: '10px 14px', fontSize: '0.88rem' }}
          >
            <Palette size={18} color="var(--theme-accent)" />
            <span className="hide-mobile" style={{ marginLeft: '4px' }}>{t.testBrandColors.split(' ')[0]}</span>
          </button>

          <button 
            onClick={onOpenContactModal}
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.9rem' }}
          >
            <Calendar size={18} />
            <span>{t.bookConsultation}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
