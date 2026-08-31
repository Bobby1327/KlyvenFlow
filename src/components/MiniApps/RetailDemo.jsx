import React, { useState } from 'react';
import { ShoppingBag, Check, Gift } from 'lucide-react';
import { RETAIL_PRODUCTS, TRANSLATIONS } from '../../data/showcaseData';

export default function RetailDemo({ lang }) {
  const t = TRANSLATIONS[lang];
  const [cartItems, setCartItems] = useState([RETAIL_PRODUCTS[0]]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [pickupTime, setPickupTime] = useState('Today, 4:00 PM');
  const [isOrdered, setIsOrdered] = useState(false);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'VIP10' || promoCode.toUpperCase() === 'LOCAL15') {
      setDiscount(0.15);
    } else {
      alert(lang === 'pt' ? 'Use o cupom "LOCAL15" para economizar 15%!' : 'Try promo code "LOCAL15" for 15% off local pickup!');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const savings = subtotal * discount;
  const total = subtotal - savings;

  const getProductName = (product) => {
    if (lang === 'pt') return product.name;
    return product.nameEn || product.name;
  };

  const getProductStock = (product) => {
    if (lang === 'pt') return product.stock;
    return product.stockEn || product.stock;
  };

  const formatPrice = (price) => {
    if (lang === 'pt') {
      return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }
    return `R$ ${price.toFixed(2)}`;
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
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={18} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Livraria da Vila & Café</h4>
            <span style={{ fontSize: '0.78rem', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <Gift size={14} /> {t.retailOpenStatus}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {isOrdered ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #8b5cf6', maxWidth: '540px', margin: '0 auto' }}>
            <Check size={36} color="#8b5cf6" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '700' }}>{t.retailSuccessTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>
              {t.retailSuccessSub.replace('{id}', 'VT-8810').replace('{time}', pickupTime)}
            </p>
            <button onClick={() => setIsOrdered(false)} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '4px' }}>
              {t.retailReset}
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }} className="demo-grid-layout">
            
            {/* Left: Product Catalog Selection */}
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '14px', fontWeight: '700' }}>{t.retailCatalogTitle}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {RETAIL_PRODUCTS.map(product => {
                  const inCart = cartItems.some(i => i.id === product.id);
                  return (
                    <div key={product.id} className="glass-card" style={{ padding: '12px', border: '1px solid var(--border-line)' }}>
                      <img src={product.image} alt={getProductName(product)} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />
                      <h5 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '0 0 4px 0', fontWeight: '700' }}>{getProductName(product)}</h5>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '800', fontFamily: 'monospace', color: '#8b5cf6' }}>{formatPrice(product.price)}</span>
                        <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '600' }}>{getProductStock(product)}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (!inCart) setCartItems([...cartItems, product]);
                        }}
                        style={{
                          width: '100%', padding: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
                          background: inCart ? 'var(--bg-card-hover)' : '#8b5cf6', color: '#fff', border: inCart ? '1px solid var(--border-line)' : 'none'
                        }}
                      >
                        {inCart ? t.retailAdded : t.retailAdd}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Local Pickup Checkout */}
            <div style={{ background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid var(--border-line)', padding: '20px' }}>
              <h5 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '12px', fontWeight: '700' }}>{t.retailSummaryTitle}</h5>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>{t.retailSlot}</label>
                <select value={pickupTime} onChange={e => setPickupTime(e.target.value)} style={{ width: '100%' }}>
                  <option value={t.retailToday4}>{t.retailToday4}</option>
                  <option value={t.retailToday6}>{t.retailToday6}</option>
                  <option value={t.retailTomorrow11}>{t.retailTomorrow11}</option>
                </select>
              </div>

              {/* Promo code */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                <input 
                  type="text" 
                  placeholder={t.retailPromoPlaceholder} 
                  value={promoCode} 
                  onChange={e => setPromoCode(e.target.value)}
                  style={{ flex: 1 }} 
                />
                <button onClick={applyPromo} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-line)', color: 'var(--text-main)', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>{t.retailPromoBtn}</button>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', borderTop: '1px solid var(--border-line)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                    <span>{t.retailSavings}</span>
                    <span style={{ fontFamily: 'monospace' }}>-{formatPrice(savings)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)', borderTop: '1px solid var(--border-line)', paddingTop: '8px' }}>
                  <span>{t.restTotal}</span>
                  <span style={{ color: '#8b5cf6', fontFamily: 'monospace' }}>{formatPrice(total)}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsOrdered(true)} 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', background: '#8b5cf6', borderRadius: '4px' }}
              >
                {t.retailCta}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
