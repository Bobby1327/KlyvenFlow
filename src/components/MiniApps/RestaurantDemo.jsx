import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check, QrCode, Search, Utensils } from 'lucide-react';
import { RESTAURANT_MENU, TRANSLATIONS } from '../../data/showcaseData';

export default function RestaurantDemo({ lang }) {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'reservation' | 'qr'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderType, setOrderType] = useState('pickup'); // 'pickup' | 'delivery'
  
  // Reservation Form State
  const [resDate, setResDate] = useState('2026-08-25');
  const [resTime, setResTime] = useState('19:00');
  const [resGuests, setResGuests] = useState(2);
  const [resConfirmed, setResConfirmed] = useState(false);

  const CATEGORIES = [
    { id: 'All', labelPt: 'Todos', labelEn: 'All' },
    { id: 'Mains', labelPt: 'Pratos Principais', labelEn: 'Mains' },
    { id: 'Appetizers', labelPt: 'Entradas', labelEn: 'Appetizers' },
    { id: 'Drinks', labelPt: 'Bebidas', labelEn: 'Drinks' },
    { id: 'Desserts', labelPt: 'Sobremesas', labelEn: 'Desserts' }
  ];

  const filteredMenu = RESTAURANT_MENU.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const itemName = lang === 'pt' ? item.name : (item.nameEn || item.name);
    const itemDesc = lang === 'pt' ? item.desc : (item.descEn || item.desc);
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          itemDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = orderType === 'delivery' ? 9.90 : 0;
  const tax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrderPlaced(true);
  };

  const handleReserveTable = (e) => {
    e.preventDefault();
    setResConfirmed(true);
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
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Utensils size={18} color="#fff" />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Cantina do Nonno</h4>
            <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              {t.restOpenStatus}
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-line)' }}>
          <button 
            onClick={() => setActiveTab('menu')}
            style={{
              padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
              background: activeTab === 'menu' ? '#f97316' : 'transparent', color: activeTab === 'menu' ? '#fff' : 'var(--text-main)', transition: 'all 0.1s ease'
            }}
          >
            {t.restTabMenu}
          </button>
          <button 
            onClick={() => setActiveTab('reservation')}
            style={{
              padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
              background: activeTab === 'reservation' ? '#f97316' : 'transparent', color: activeTab === 'reservation' ? '#fff' : 'var(--text-main)', transition: 'all 0.1s ease'
            }}
          >
            {t.restTabReserve}
          </button>
          <button 
            onClick={() => setActiveTab('qr')}
            style={{
              padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
              background: activeTab === 'qr' ? '#f97316' : 'transparent', color: activeTab === 'qr' ? '#fff' : 'var(--text-main)', transition: 'all 0.1s ease'
            }}
          >
            {t.restTabQr}
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: DIGITAL MENU */}
      {activeTab === 'menu' && (
        <div style={{ padding: '24px' }}>
          
          {/* Order Placed Success Banner */}
          {isOrderPlaced ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #10b981', maxWidth: '540px', margin: '0 auto' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Check size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: '700' }}>{t.restOrderSuccessTitle}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
                {t.restOrderSuccessSub.replace('{type}', orderType === 'pickup' ? (lang === 'pt' ? 'Retirada' : 'Pickup') : (lang === 'pt' ? 'Entrega' : 'Delivery'))}
              </p>
              <button 
                onClick={() => { setIsOrderPlaced(false); setCart([]); }} 
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '4px' }}
              >
                {t.restOrderAnother}
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }} className="demo-grid-layout">
              
              {/* Left Column: Menu Items */}
              <div>
                {/* Search & Category Filter Bar */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={16} color="#6b7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      placeholder={t.restSearchPlaceholder} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px 10px 38px',
                        color: 'var(--text-main)'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {CATEGORIES.map((cat) => {
                      const isCatSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          style={{
                            padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600',
                            background: isCatSelected ? '#f97316' : 'var(--bg-card-hover)',
                            color: isCatSelected ? '#fff' : 'var(--text-muted)',
                            border: isCatSelected ? '1px solid #f97316' : '1px solid var(--border-line)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {lang === 'pt' ? cat.labelPt : cat.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Items Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {filteredMenu.map(item => {
                    const itemName = lang === 'pt' ? item.name : (item.nameEn || item.name);
                    const itemDesc = lang === 'pt' ? item.desc : (item.descEn || item.desc);
                    return (
                      <div key={item.id} className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '6px', border: '1px solid var(--border-line)' }}>
                        <img 
                          src={item.image} 
                          alt={itemName} 
                          style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} 
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                          <h5 style={{ fontSize: '0.9rem', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>{itemName}</h5>
                          <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'monospace', color: '#f97316' }}>{formatPrice(item.price)}</span>
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flex: 1, marginBottom: '12px', lineHeight: '1.4' }}>{itemDesc}</p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{item.calories}</span>
                          <button
                            onClick={() => addToCart(item)}
                            style={{
                              background: '#f97316', border: 'none', color: '#fff', padding: '6px 12px',
                              borderRadius: '4px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '600',
                              display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                          >
                            <Plus size={12} /> {t.restAddToCart}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Order Cart */}
              <div style={{ background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid var(--border-line)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingCart size={16} color="#f97316" />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>{t.restCartTitle}</span>
                  </div>
                  <span style={{ background: 'var(--bg-card)', border: '1px solid var(--border-line)', color: '#f97316', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700' }}>
                    {t.restCartNoFees}
                  </span>
                </div>

                {/* Pickup / Delivery Toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: 'var(--bg-card)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-line)', marginBottom: '16px' }}>
                  <button 
                    onClick={() => setOrderType('pickup')}
                    style={{
                      padding: '6px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600',
                      background: orderType === 'pickup' ? '#f97316' : 'transparent', color: orderType === 'pickup' ? '#fff' : 'var(--text-main)'
                    }}
                  >
                    {t.restCartPickup}
                  </button>
                  <button 
                    onClick={() => setOrderType('delivery')}
                    style={{
                      padding: '6px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600',
                      background: orderType === 'delivery' ? '#f97316' : 'transparent', color: orderType === 'delivery' ? '#fff' : 'var(--text-main)'
                    }}
                  >
                    {t.restCartDelivery}
                  </button>
                </div>

                {/* Cart Items List */}
                <div style={{ flex: 1, overflowY: 'auto', maxHeight: '240px', marginBottom: '16px' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                      {t.restCartEmpty}
                    </div>
                  ) : (
                    cart.map(item => {
                      const itemName = lang === 'pt' ? item.name : (item.nameEn || item.name);
                      return (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px dashed var(--border-line)' }}>
                          <div style={{ flex: 1, paddingRight: '8px' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-main)' }}>{itemName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#f97316', fontFamily: 'monospace' }}>{formatPrice(item.price * item.qty)}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-card)', borderRadius: '4px', padding: '2px 6px', border: '1px solid var(--border-line)' }}>
                            <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}><Minus size={12} /></button>
                            <span style={{ fontSize: '0.78rem', fontWeight: '700', width: '16px', textAlign: 'center', color: 'var(--text-main)' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}><Plus size={12} /></button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Cart Totals Breakdown */}
                {cart.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t.restSubtotal}</span>
                      <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{formatPrice(cartSubtotal)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t.restDeliveryFee}</span>
                        <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{formatPrice(deliveryFee)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t.restTaxLabel}</span>
                      <span style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{formatPrice(tax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', paddingTop: '8px', borderTop: '1px solid var(--border-line)' }}>
                      <span>{t.restTotal}</span>
                      <span style={{ color: '#f97316', fontFamily: 'monospace' }}>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleCheckout} 
                  disabled={cart.length === 0}
                  className="btn-primary" 
                  style={{
                    width: '100%', justifyContent: 'center', background: cart.length > 0 ? '#f97316' : 'var(--bg-card)',
                    cursor: cart.length > 0 ? 'pointer' : 'not-allowed', padding: '12px', borderRadius: '4px'
                  }}
                >
                  {t.restPlaceOrder}
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: TABLE RESERVATION */}
      {activeTab === 'reservation' && (
        <div style={{ padding: '36px 24px', maxWidth: '520px', margin: '0 auto' }}>
          {resConfirmed ? (
            <div style={{ textAlign: 'center', padding: '24px', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid #10b981' }}>
              <Check size={36} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '700' }}>{t.restReserveSuccessTitle}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.4' }}>
                {t.restReserveSuccessSub.replace('{guests}', resGuests).replace('{date}', resDate).replace('{time}', resTime)}
              </p>
              <button onClick={() => setResConfirmed(false)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '4px' }}>
                {t.restReserveNewBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserveTable} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '1.15rem', margin: 0, textAlign: 'center', fontWeight: '700' }}>{t.restReserveTitle}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'center', margin: 0 }}>{t.restReserveSub}</p>
              
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>{t.restDate}</label>
                <input 
                  type="date" 
                  value={resDate} 
                  onChange={e => setResDate(e.target.value)}
                  style={{ width: '100%' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>{t.restTime}</label>
                  <select 
                    value={resTime} 
                    onChange={e => setResTime(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="17:30">17:30</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: '600' }}>{t.restGuests}</label>
                  <select 
                    value={resGuests} 
                    onChange={e => setResGuests(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value={1}>{t.restGuest1}</option>
                    <option value={2}>{t.restGuest2}</option>
                    <option value={4}>{t.restGuest4}</option>
                    <option value={6}>{t.restGuest6}</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#f97316', marginTop: '8px', borderRadius: '4px' }}>
                {t.restReserveConfirmBtn}
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: QR MENU SIMULATOR */}
      {activeTab === 'qr' && (
        <div style={{ padding: '40px 24px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '20px', background: '#ffffff', borderRadius: '8px', marginBottom: '20px', border: '1px solid var(--border-line)' }}>
            <QrCode size={140} color="#0c0e14" />
          </div>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '700' }}>{t.restQrTitle}</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
            {t.restQrSub}
          </p>
          <div className="badge badge-glow" style={{ background: 'var(--bg-card-hover)', color: '#f97316', borderColor: 'var(--border-line)' }}>
            {t.restQrActive}
          </div>
        </div>
      )}

    </div>
  );
}
