import React from 'react';
import { X, Check, Palette } from 'lucide-react';

const COLOR_PALETTES = [
  { name: 'Indigo Electric', primary: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)', tag: 'Tech & Modern', tagPt: 'Tecnológico & Moderno' },
  { name: 'Sunset Restaurant', primary: '#f97316', glow: 'rgba(249, 115, 22, 0.25)', tag: 'Dining & Cafes', tagPt: 'Alimentação & Cafés' },
  { name: 'Salon Glamour Pink', primary: '#ec4899', glow: 'rgba(236, 72, 153, 0.25)', tag: 'Beauty & Spas', tagPt: 'Beleza, Salões & Spas' },
  { name: 'Contractor Cobalt', primary: '#3b82f6', glow: 'rgba(59, 130, 246, 0.25)', tag: 'Trades & Services', tagPt: 'Serviços & Reparos' },
  { name: 'Emerald Organic', primary: '#10b981', glow: 'rgba(16, 185, 129, 0.25)', tag: 'Wellness & Gyms', tagPt: 'Bem-estar & Academias' },
  { name: 'Luxury Gold & Amber', primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.25)', tag: 'Boutiques & High-End', tagPt: 'Boutiques & Premium' },
];

export default function ThemeCustomizerModal({ lang, isOpen, onClose, currentTheme, onSelectTheme }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        style={{ maxWidth: '540px', width: '100%', padding: '32px', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Palette size={28} color="var(--theme-accent)" />
          <h3 style={{ fontSize: '1.5rem' }}>
            {lang === 'pt' ? 'Paleta de Cores da Marca' : 'Brand Theme Previewer'}
          </h3>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px' }}>
          {lang === 'pt' 
            ? 'Escolha um esquema de cor abaixo para ver como nossos modelos de web app se adaptam à identidade visual do seu negócio.' 
            : 'Select a color palette below to test how our web app templates adapt seamlessly to match your local business\'s brand identity.'
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {COLOR_PALETTES.map((palette) => {
            const isSelected = currentTheme.primary === palette.primary;
            return (
              <div
                key={palette.name}
                onClick={() => onSelectTheme(palette)}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                  border: isSelected ? `2px solid ${palette.primary}` : '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: palette.primary, boxShadow: `0 0 10px ${palette.primary}` }} />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{palette.name}</span>
                  </div>
                  {isSelected && <Check size={18} color={palette.primary} />}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {lang === 'pt' ? palette.tagPt : palette.tag}
                </span>
              </div>
            );
          })}
        </div>

        <button 
          className="btn-primary" 
          onClick={onClose}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {lang === 'pt' ? 'Aplicar & Visualizar' : 'Apply & Preview Showcase'}
        </button>
      </div>
    </div>
  );
}
