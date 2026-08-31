import React, { useState } from 'react';
import { X, Calendar, Check, Rocket, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/showcaseData';

export default function ContactModal({ lang, isOpen, onClose }) {
  const t = TRANSLATIONS[lang];
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Restaurant / Cafe');
  const [timeframe, setTimeframe] = useState('ASAP (< 2 weeks)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        style={{ maxWidth: '580px', width: '100%', padding: '36px', position: 'relative' }}
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

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Check size={36} />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '12px' }}>{t.contactSuccessTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '24px' }}>
              {t.contactSuccessSub.replace('{ownerName}', ownerName || 'Maria').replace('{businessName}', businessName || 'Bistro')}
            </p>

            <div style={{ background: 'var(--bg-card-hover)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-line)', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                {lang === 'pt' ? 'Precisa de resposta urgente? Chame direto:' : 'Need immediate assistance? Message directly:'}
              </div>
              <a
                href="https://wa.me/5535997745407"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '750',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp: (55) 35 99774-5407</span>
              </a>
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {t.contactSuccessBtn}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Calendar size={28} color="var(--theme-accent)" />
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: 0 }}>{t.contactTitle}</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
              {t.contactSub}
            </p>

            {/* Standout Direct Contact Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }} className="demo-grid-layout">
              <div className="contact-card-box whatsapp-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={18} color="#10b981" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.04em' }}>WhatsApp</span>
                  </div>
                  <span className="live-pulse-dot" title="Online Agora" />
                </div>
                <a
                  href="https://wa.me/5535997745407"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  (55) 35 99774-5407
                </a>
                <a
                  href="https://wa.me/5535997745407"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>{lang === 'pt' ? 'Falar no WhatsApp' : 'Open WhatsApp'}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

              <div className="contact-card-box email-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Mail size={18} color="var(--theme-accent)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--theme-accent)', letterSpacing: '0.04em' }}>E-mail</span>
                </div>
                <a
                  href="mailto:KlyvenFlow@gmail.com"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '8px',
                    wordBreak: 'break-all'
                  }}
                >
                  KlyvenFlow@gmail.com
                </a>
                <a
                  href="mailto:KlyvenFlow@gmail.com"
                  style={{
                    background: 'var(--theme-accent)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <span>{lang === 'pt' ? 'Enviar E-mail' : 'Send Email'}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ height: '1px', flex: 1, background: 'var(--border-line)' }} />
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: '700', letterSpacing: '0.05em' }}>
                {lang === 'pt' ? 'Ou envie os dados do seu negócio' : 'Or fill your project details'}
              </span>
              <div style={{ height: '1px', flex: 1, background: 'var(--border-line)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="demo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelName}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={t.contactPlaceholderName} 
                    value={ownerName} 
                    onChange={e => setOwnerName(e.target.value)}
                    style={{ width: '100%' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelBusiness}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder={t.contactPlaceholderBusiness} 
                    value={businessName} 
                    onChange={e => setBusinessName(e.target.value)}
                    style={{ width: '100%' }} 
                  />
                </div>
              </div>

              <div className="demo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelEmail}</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="exemplo@empresa.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelPhone}</label>
                  <input 
                    type="tel" 
                    placeholder="(11) 99999-9999" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    style={{ width: '100%' }} 
                  />
                </div>
              </div>

              <div className="demo-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelIndustry}</label>
                  <select 
                    value={industry} 
                    onChange={e => setIndustry(e.target.value)}
                    style={{ width: '100%' }} 
                  >
                    <option value="Restaurant">{lang === 'pt' ? 'Restaurante / Café' : 'Restaurant / Cafe'}</option>
                    <option value="Salon">{lang === 'pt' ? 'Salão / Estética' : 'Salon / Spa / Barber'}</option>
                    <option value="Contractor">{lang === 'pt' ? 'Encanador / Climatização' : 'Contractor / Home Services'}</option>
                    <option value="Retail">{lang === 'pt' ? 'Loja Física / Varejo' : 'Boutique Retail'}</option>
                    <option value="Gym">{lang === 'pt' ? 'Gym / Studio Fitness' : 'Gym / Fitness Studio'}</option>
                    <option value="Other">{lang === 'pt' ? 'Outro Negócio Local' : 'Other Local Business'}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{t.contactLabelTimeframe}</label>
                  <select 
                    value={timeframe} 
                    onChange={e => setTimeframe(e.target.value)}
                    style={{ width: '100%' }} 
                  >
                    <option value="ASAP">{t.contactTimeframeASAP}</option>
                    <option value="Month">{t.contactTimeframeMonth}</option>
                    <option value="Explore">{t.contactTimeframeExplore}</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '14px' }}>
                <Rocket size={18} /> {t.contactCta}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
