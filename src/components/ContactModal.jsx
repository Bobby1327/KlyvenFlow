import React, { useState } from 'react';
import { X, MessageCircle, Mail, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { TRANSLATIONS } from '../data/showcaseData';

export default function ContactModal({ lang, isOpen, onClose }) {
  const t = TRANSLATIONS[lang];
  const [copiedType, setCopiedType] = useState(null); // 'phone' | 'email' | 'instagram' | null

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
        style={{ maxWidth: '540px', width: '100%', padding: '32px 28px', position: 'relative', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '18px', right: '18px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
          }}
          title={t.closeBtn}
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--theme-accent) 0%, #10b981 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
          }}>
            <MessageCircle size={26} color="#ffffff" />
          </div>

          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>
            {t.contactTitle}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4', maxWidth: '420px', margin: '0 auto' }}>
            {t.contactSub}
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          
          {/* WhatsApp / Phone Card */}
          <div className="contact-card-box whatsapp-box" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} color="#10b981" />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.05em' }}>
                  {t.whatsappAndPhone}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#10b981', fontWeight: '700' }}>
                <span className="live-pulse-dot" />
                <span>{t.onlineNow}</span>
              </div>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', letterSpacing: '0.02em', fontFamily: 'var(--font-main)' }}>
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
                  padding: '10px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span>{t.openInWhatsApp}</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                onClick={() => handleCopy('+5535997745407', 'phone')}
                className="btn-secondary"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title={lang === 'pt' ? 'Copiar número' : 'Copy number'}
              >
                {copiedType === 'phone' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                <span>{copiedType === 'phone' ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Official Gmail Card */}
          <div className="contact-card-box email-box" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} color="var(--theme-accent)" />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--theme-accent)', letterSpacing: '0.05em' }}>
                  {t.officialEmail}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: '700' }}>
                {lang === 'pt' ? 'Propostas & Dúvidas' : 'Proposals & Inquiries'}
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', letterSpacing: '0.01em', wordBreak: 'break-all', fontFamily: 'var(--font-main)' }}>
              KlyvenFlow@gmail.com
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
              <a
                href="mailto:KlyvenFlow@gmail.com"
                style={{
                  background: 'var(--theme-accent)',
                  color: '#ffffff',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)'
                }}
              >
                <span>{t.sendDirectEmail}</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                onClick={() => handleCopy('KlyvenFlow@gmail.com', 'email')}
                className="btn-secondary"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title={lang === 'pt' ? 'Copiar e-mail' : 'Copy email'}
              >
                {copiedType === 'email' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                <span>{copiedType === 'email' ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>
          </div>

          {/* Official Instagram Card */}
          <div className="contact-card-box instagram-box" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InstagramIcon size={18} color="#e1306c" />
                <span style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: '#e1306c', letterSpacing: '0.05em' }}>
                  {t.officialInstagram}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: '700' }}>
                {t.instagramSub}
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', letterSpacing: '0.01em', fontFamily: 'var(--font-main)' }}>
              @KlyvenFlow
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
              <a
                href="https://instagram.com/KlyvenFlow"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                  color: '#ffffff',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(225, 48, 108, 0.3)'
                }}
              >
                <span>{t.openInInstagram}</span>
                <ArrowUpRight size={15} />
              </a>

              <button
                onClick={() => handleCopy('KlyvenFlow', 'instagram')}
                className="btn-secondary"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title={lang === 'pt' ? 'Copiar Instagram' : 'Copy Instagram'}
              >
                {copiedType === 'instagram' ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                <span>{copiedType === 'instagram' ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Payment & Developer Guarantee Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{
            textAlign: 'center',
            padding: '10px 14px',
            background: 'var(--bg-card-hover)',
            borderRadius: '8px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            fontSize: '0.78rem',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>🟣</span>
            <span><strong>{t.paymentNubankOnly}</strong></span>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '10px 14px',
            background: 'var(--bg-card-hover)',
            borderRadius: '8px',
            border: '1px solid var(--border-line)',
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Sparkles size={13} color="var(--accent-orange)" />
            <span>{lang === 'pt' ? 'Atendimento direto de Segunda a Sábado sem intermediários' : 'Direct developer support Monday to Saturday with zero middleman'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
