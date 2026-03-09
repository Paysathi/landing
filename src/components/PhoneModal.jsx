import { useState, useRef, useEffect } from 'react';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';

const PROD_PROJECT_REF = 'cuwdhditjhocntmxdqiz';
const BOOKING_FUNCTION_URL =
  `https://${PROD_PROJECT_REF}.supabase.co/functions/v1/paysaathi-booking`;
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1d2RoZGl0amhvY250bXhkcWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTc4NzQsImV4cCI6MjA3MTk3Mzg3NH0.LWsuvqLWGqW4LbX0qzyEmd2AeuzgZUuKndfJQCcPt-Y';
const MEETING_URL = 'https://calendar.notion.so/meet/ronakmalu/takkada';

function PhoneModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success' | 'error'
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay so the modal animation completes
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    if (!isOpen) {
      setPhone('');
      setError('');
      setLoading(false);
      setStatus('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handlePhoneChange = (e) => {
    // Strip non-numeric chars
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (error) setError('');
    if (status) setStatus('');
  };

  const validate = () => {
    if (!phone) {
      setError('Please enter your phone number');
      return false;
    }
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      // Store locally
      localStorage.setItem('takkada_demo_phone', phone);
      localStorage.setItem('takkada_demo_timestamp', new Date().toISOString());

      // Send to backend
      const payload = {
        phone: '+91' + phone,
        source: 'landing_page',
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      await fetch(BOOKING_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(payload),
      });

      // Redirect regardless of response
      setStatus('success');
      window.open(MEETING_URL, '_blank');

      // Close modal after brief pause
      setTimeout(() => onClose(), 800);
    } catch {
      // Still redirect even if API fails
      window.open(MEETING_URL, '_blank');
      setTimeout(() => onClose(), 800);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="phone-modal-overlay" onClick={onClose}>
      <div className="phone-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="phone-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="phone-modal-header">
          <div className="phone-modal-icon">
            <Phone size={24} />
          </div>
          <h3>Book a Demo</h3>
          <p>Enter your phone number and we&apos;ll set up a personalized walkthrough.</p>
        </div>

        <div className="phone-modal-body">
          <label className="phone-label" htmlFor="phone-input">Phone Number</label>
          <div className={`phone-input-wrapper ${error ? 'phone-input-error' : ''}`}>
            <span className="phone-country-code">+91</span>
            <input
              ref={inputRef}
              id="phone-input"
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              maxLength={10}
              autoComplete="tel-national"
            />
          </div>
          {error && <p className="phone-error">{error}</p>}
          {status === 'success' && (
            <p className="phone-success">Redirecting to calendar...</p>
          )}
        </div>

        <div className="phone-modal-footer">
          <button
            type="button"
            className="phone-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={18} className="spin" /> Submitting...</>
            ) : (
              <>Continue to Book <ArrowRight size={18} /></>
            )}
          </button>
          <button type="button" className="phone-btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhoneModal;
