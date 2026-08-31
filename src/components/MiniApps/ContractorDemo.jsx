import React, { useState } from 'react';
import { Wrench, Check, Calculator, MapPin } from 'lucide-react';
import { CONTRACTOR_SERVICES, TRANSLATIONS } from '../../data/showcaseData';

export default function ContractorDemo({ lang }) {
  const t = TRANSLATIONS[lang];
  const [selectedService, setSelectedService] = useState(CONTRACTOR_SERVICES[0]);
  const [urgency, setUrgency] = useState('standard'); // 'emergency', 'standard', 'flexible'
  const [propertyType, setPropertyType] = useState('residential');
  const [zipCode, setZipCode] = useState('04538-080');
  const [isSubmitted, setIsSubmitted] = useState(false);

  let multiplier = 1;
  if (urgency === 'emergency') multiplier = 1.35;
  if (urgency === 'flexible') multiplier = 0.9;
  if (propertyType === 'commercial') multiplier *= 1.25;

  const estimatedMin = Math.round(selectedService.basePrice * multiplier * 0.9);
  const estimatedMax = Math.round(selectedService.basePrice * multiplier * 1.25);

  const handleSubmitEstimate = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getServiceName = (service) => {
    if (lang === 'pt') return service.name;
    return service.nameEn || service.name;
  };

  const formatRange = (min, max) => {
    if (lang === 'pt') {
      return `R$ ${min.toLocaleString('pt-BR')} - R$ ${max.toLocaleString('pt-BR')}`;
    }
    return `R$ ${min.toLocaleString('en-US')} - R$ ${max.toLocaleString('en-US')}`;
  };

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-line)', overflow: 'hidden' }}>
      
      {/* Mini App Top Header Bar */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'var(--bg-card-hover)', 
        borderBottom: '1px solid var(--border-line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wrench size={18} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Marido de Aluguel</h4>
            <span style={{ fontSize: '0.78rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              {t.contractorOpenStatus}
            </span>
          </div>
        </div>

        <a 
          href="tel:5550192834"
          style={{
            background: 'var(--bg-card)', border: '1px solid #ef4444', color: '#ef4444',
            padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '750',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          {t.contractorEmergencyBtn}
        </a>
      </div>

      <div style={{ padding: '24px' }}>
        {isSubmitted ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #3b82f6', maxWidth: '540px', margin: '0 auto' }}>
            <Check size={36} color="#3b82f6" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '700' }}>{t.contractorSuccessTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.5' }}>
              {t.contractorSuccessSub.replace('{range}', formatRange(estimatedMin, estimatedMax)).replace('{zip}', zipCode)}
            </p>
            <button onClick={() => setIsSubmitted(false)} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '4px' }}>
              {t.contractorNewEstimate}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }} className="demo-grid-layout">
            
            {/* Left Column: Estimator Wizard */}
            <form onSubmit={handleSubmitEstimate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.contractorStepService}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {CONTRACTOR_SERVICES.map(service => {
                    const isSelected = selectedService.id === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        style={{
                          padding: '12px',
                          borderRadius: '6px',
                          background: isSelected ? 'var(--theme-accent-light)' : 'var(--bg-card-hover)',
                          border: isSelected ? '2px solid #3b82f6' : '1px solid var(--border-line)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: 'var(--text-main)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Wrench size={16} color="#3b82f6" />
                        <span>{getServiceName(service)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Urgency & Property Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.contractorStepUrgency}
                  </label>
                  <select 
                    value={urgency} 
                    onChange={e => setUrgency(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="emergency">{t.contractorEmergencyUrgency}</option>
                    <option value="standard">{t.contractorStandardUrgency}</option>
                    <option value="flexible">{t.contractorFlexibleUrgency}</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.contractorStepProperty}
                  </label>
                  <select 
                    value={propertyType} 
                    onChange={e => setPropertyType(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="residential">{t.contractorResProp}</option>
                    <option value="apartment">{t.contractorAptProp}</option>
                    <option value="commercial">{t.contractorComProp}</option>
                  </select>
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.contractorStepZip}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <MapPin size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      value={zipCode} 
                      onChange={e => setZipCode(e.target.value)}
                      placeholder="Ex: 01310-100"
                      style={{ width: '100%', paddingLeft: '36px' }} 
                    />
                  </div>
                  <span style={{ padding: '10px 14px', borderRadius: '6px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-line)', color: '#10b981', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {t.contractorCovered}
                  </span>
                </div>
              </div>
            </form>

            {/* Right Column: Live Instant Quote Summary */}
            <div style={{ background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid var(--border-line)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#3b82f6', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Calculator size={18} />
                  <span>{t.contractorEstimateTitle}</span>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-line)', marginBottom: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>{t.contractorEstimateRange}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', fontFamily: 'monospace', margin: '4px 0' }}>
                    {formatRange(estimatedMin, estimatedMax)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>
                    {t.contractorNoFees}
                  </div>
                </div>

                <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '18px', margin: '0 0 20px 0', lineHeight: '1.7' }}>
                  <li>{t.contractorBullet1}</li>
                  <li>{t.contractorBullet2}</li>
                  <li>{t.contractorBullet3}</li>
                </ul>
              </div>

              <button 
                onClick={handleSubmitEstimate} 
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: '#3b82f6', borderRadius: '4px' }}
              >
                {t.contractorCta}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
