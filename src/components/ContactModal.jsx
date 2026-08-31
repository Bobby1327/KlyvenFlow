import React, { useState } from 'react';
import { X, MessageCircle, Mail, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/showcaseData';

export default function ContactModal({ lang, isOpen, onClose }) {
  const t = TRANSLATIONS[lang];
  const [copiedType, setCopiedType] = useState(null); // 'phone' | 'email' | null

  if (!isOpen) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        style={{ maxWidth: '520px', width: '100%', padding: '36px 32px', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '18px', right: '18px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
          }}
          title="Fechar"
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--theme-accent) 0%, #10b981 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
          }}>
            <MessageCircle size={28} color="#ffffff" />
          </div>

          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '800' }}>
            {t.contactTitle}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.5', maxWidth: '420px', margin: '0 auto' }}>
            {t.contactSub}
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          
          {/* WhatsApp / Phone Card */}
          <div className="contact-card-box whatsapp-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={20} color="#10b981" />
                <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
                  WhatsApp & Telefone
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#10b981', fontWeight: '700' }}>
                <span className="live-pulse-dot" />
                <span>Online Agora</span>
              </div>
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.02em', fontFamily: 'var(--font-main)' }}>
              (55) 35 99774-5407
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
              <a
                href="https://wa.me/5535997745407"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span>{lang === 'pt' ? 'Conversar no WhatsApp' : 'Open in WhatsApp'}</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={() => handleCopy('+5535997745407', 'phone')}
                className="btn-secondary"
                style={{
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Copiar número"
              >
                {copiedType === 'phone' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copiedType === 'phone' ? (lang === 'pt' ? 'Copiado!' : 'Copied!') : (lang === 'pt' ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Official Gmail Card */}
          <div className="contact-card-box email-box" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={20} color="var(--theme-accent)" />
                <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--theme-accent)', letterSpacing: '0.05em' }}>
                  E-mail Oficial
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: '700' }}>
                {lang === 'pt' ? 'Propostas & Dúvidas' : 'Proposals & Inquiries'}
              </span>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.01em', wordBreak: 'break-all', fontFamily: 'var(--font-main)' }}>
              KlyvenFlow@gmail.com
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
              <a
                href="mailto:KlyvenFlow@gmail.com"
                style={{
                  background: 'var(--theme-accent)',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)'
                }}
              >
                <span>{lang === 'pt' ? 'Enviar E-mail Direto' : 'Send Direct Email'}</span>
                <ArrowUpRight size={16} />
              </a>

              <button
                onClick={() => handleCopy('KlyvenFlow@gmail.com', 'email')}
                className="btn-secondary"
                style={{
                  padding: '10px 14px',
                  fontSize: '0.82rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Copiar e-mail"
              >
                {copiedType === 'email' ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copiedType === 'email' ? (lang === 'pt' ? 'Copiado!' : 'Copied!') : (lang === 'pt' ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div style={{
          textAlign: 'center',
          padding: '12px 16px',
          background: 'var(--bg-card-hover)',
          borderRadius: '8px',
          border: '1px solid var(--border-line)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="var(--accent-orange)" />
          <span>{lang === 'pt' ? 'Atendimento direto de Segunda a Sábado sem intermediários' : 'Direct developer support Monday to Saturday with zero middleman'}</span>
        </div>

      </div>
    </div>
  );
}
