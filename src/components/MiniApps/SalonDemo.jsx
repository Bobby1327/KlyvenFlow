import React, { useState } from 'react';
import { Scissors, Clock, Star, Check, Sparkles } from 'lucide-react';
import { SALON_SERVICES, SALON_STYLISTS, TRANSLATIONS } from '../../data/showcaseData';

export default function SalonDemo({ lang }) {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState(1); // 1: Service, 2: Stylist, 3: DateTime, 4: Confirmed
  const [selectedService, setSelectedService] = useState(SALON_SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState(SALON_STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-26');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  const timeSlots = ['09:00', '11:00', '13:30', '15:00', '16:30', '18:00'];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const getServiceName = (service) => {
    if (lang === 'pt') return service.name;
    return service.nameEn || service.name;
  };

  const getServiceDesc = (service) => {
    if (lang === 'pt') return service.desc;
    return service.descEn || service.desc;
  };

  const getStylistRole = (stylist) => {
    if (lang === 'pt') return stylist.rolePt || stylist.role;
    return stylist.role;
  };

  const formatPrice = (price) => {
    if (lang === 'pt') {
      return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
    return `$${price.toFixed(2)}`;
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
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={18} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Studio Lívia Costa</h4>
            <span style={{ fontSize: '0.78rem', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <Sparkles size={12} />
              {t.salonOpenStatus}
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ color: step >= 1 ? '#ec4899' : 'var(--text-dim)', fontWeight: '700' }}>{t.salonStepService}</span> &rarr;
          <span style={{ color: step >= 2 ? '#ec4899' : 'var(--text-dim)', fontWeight: '700' }}>{t.salonStepStylist}</span> &rarr;
          <span style={{ color: step >= 3 ? '#ec4899' : 'var(--text-dim)', fontWeight: '700' }}>{t.salonStepTime}</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>{t.salonChooseService}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{t.salonChooseServiceSub}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {SALON_SERVICES.map(service => {
                const isSelected = selectedService.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--theme-accent-light)' : 'var(--bg-card-hover)',
                      border: isSelected ? '2px solid #ec4899' : '1px solid var(--border-line)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{getServiceName(service)}</h5>
                        <span style={{ fontWeight: '800', color: '#ec4899' }}>{formatPrice(service.price)}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{getServiceDesc(service)}</p>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {service.duration}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} className="btn-primary" style={{ background: '#ec4899', borderRadius: '4px' }}>
                {t.salonNextStylist}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT STYLIST */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)' }}>{t.salonChooseStylist}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{t.salonChooseStylistSub}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {SALON_STYLISTS.map(stylist => {
                const isSelected = selectedStylist.id === stylist.id;
                return (
                  <div
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--theme-accent-light)' : 'var(--bg-card-hover)',
                      border: isSelected ? '2px solid #ec4899' : '1px solid var(--border-line)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <img 
                      src={stylist.avatar} 
                      alt={stylist.name} 
                      style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '2px solid #ec4899' }} 
                    />
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{stylist.name}</h5>
                    <div style={{ fontSize: '0.78rem', color: '#ec4899', fontWeight: '600', marginBottom: '8px' }}>{getStylistRole(stylist)}</div>
                    <div style={{ fontSize: '0.78rem', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Star size={14} fill="#f59e0b" />
                      <span>{stylist.rating} ({stylist.reviews} {lang === 'pt' ? 'avaliações' : 'reviews'})</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} className="btn-secondary" style={{ borderRadius: '4px' }}>
                {t.salonBack}
              </button>
              <button onClick={() => setStep(3)} className="btn-primary" style={{ background: '#ec4899', borderRadius: '4px' }}>
                {t.salonNextTime}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PICK DATE & TIME */}
        {step === 3 && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-main)', textAlign: 'center' }}>{t.salonChooseTime}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
              {t.salonChooseTimeSub.replace('{service}', getServiceName(selectedService)).replace('{stylist}', selectedStylist.name)}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: '600' }}>{t.salonSelectDate}</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{ width: '100%' }} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>{t.salonSelectTime}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-line)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: selectedTime === time ? '#ec4899' : 'var(--bg-card-hover)',
                      color: '#fff'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card-hover)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-line)', marginBottom: '20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)', fontWeight: '700', marginBottom: '4px' }}>
                <span>{t.salonServiceTotal}</span>
                <span>{formatPrice(selectedService.price)}</span>
              </div>
              <div>{t.salonDepositNote}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} className="btn-secondary" style={{ borderRadius: '4px' }}>
                {t.salonBack}
              </button>
              <button onClick={handleBookAppointment} className="btn-primary" style={{ background: '#ec4899', borderRadius: '4px' }}>
                {t.salonConfirmBooking}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMED */}
        {step === 4 && (
          <div style={{ padding: '30px 20px', textAlign: 'center', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #ec4899', maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ec4899', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Check size={28} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '700' }}>{t.salonSuccessTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.5' }}>
              {t.salonSuccessSub.replace('{service}', getServiceName(selectedService)).replace('{stylist}', selectedStylist.name).replace('{date}', selectedDate).replace('{time}', selectedTime)}
            </p>
            <button onClick={() => setStep(1)} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '4px' }}>
              {t.salonNewBooking}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
