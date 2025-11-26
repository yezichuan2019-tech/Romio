import React, { useEffect, useRef, useState } from 'react';
import { Lock, X, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  onComplete: () => void;
  onCancel: () => void;
  price: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onComplete, onCancel, price }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const paypalRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    let intervalId: any;

    const renderPayPalButtons = () => {
      // If the container isn't ready or we've already successfully rendered, stop.
      if (!paypalRef.current || initialized.current) return;

      // If SDK isn't loaded yet, keep waiting (the interval will call this again)
      if (!window.paypal) return;

      try {
        // Clear any potential debris from double-renders (Strict Mode)
        paypalRef.current.innerHTML = "";

        const Buttons = window.paypal.Buttons;

        if (!Buttons) {
            throw new Error("PayPal Buttons not available");
        }

        Buttons({
          style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'pay'
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                description: "DestinyMatch Zi Wei Dou Shu Report",
                amount: {
                  currency_code: "USD", // Explicitly required by some SDK versions
                  value: price.toFixed(2)
                }
              }]
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              console.log("Payment successful:", details);
              onComplete();
            } catch (err) {
              console.error("Capture Error:", err);
              setError("Payment capture failed. Please try again.");
            }
          },
          onError: (err: any) => {
            console.error("PayPal Error:", err);
            // Filter out 'popup closed' errors which aren't critical
            if (typeof err === 'object' && JSON.stringify(err).includes("closed")) return;
            setError("An error occurred with PayPal. Please try again.");
          }
        }).render(paypalRef.current)
          .then(() => {
             setIsLoading(false);
          })
          .catch((err: any) => {
             console.error("Render Error:", err);
             // If render fails, we might need to retry or show error
             // Often caused by container not being ready, but we checked paypalRef.current
          });
        
        initialized.current = true;
        if (intervalId) clearInterval(intervalId);

      } catch (err) {
        console.error("Failed to initiate PayPal buttons", err);
        // Do not set global error yet, might just be a temporary glitch
      }
    };

    // Check periodically if PayPal SDK is ready
    intervalId = setInterval(() => {
       renderPayPalButtons();
    }, 500);

    // Attempt immediately
    renderPayPalButtons();

    return () => {
      if (intervalId) clearInterval(intervalId);
      // Optional: Cleanup if needed, but usually removing the DOM node is enough
      if (paypalRef.current) {
          paypalRef.current.innerHTML = "";
      }
      initialized.current = false;
    };
  }, [price, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>
      
      <div className="relative w-full max-w-md bg-mystic-900 border border-gold-400/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-mystic-800 to-mystic-700 p-6 border-b border-white/5">
          <button onClick={onCancel} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-serif text-2xl text-white mb-1">Unlock Destiny Report</h3>
          <p className="text-white/60 text-sm">Secure payment for immediate access</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white/80">Total Price</span>
            <span className="text-3xl font-serif font-bold text-gold-400">${price.toFixed(2)}</span>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
            <h4 className="text-white text-sm font-bold mb-2">Order Summary</h4>
            <p className="text-white/60 text-xs">
              1x Comprehensive Compatibility Analysis based on Zi Wei Dou Shu and Master Ni Haixia's methodology.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Loading State for SDK */}
          {isLoading && !error && (
             <div className="flex items-center justify-center py-8 text-white/40 gap-2">
                 <Loader2 className="w-5 h-5 animate-spin" />
                 <span className="text-sm">Connecting to secure server...</span>
             </div>
          )}

          {/* PayPal Container */}
          <div className={`w-full relative z-0 ${isLoading ? 'hidden' : 'block'}`}>
             <div ref={paypalRef} id="paypal-button-container" className="min-h-[150px]"></div>
          </div>

          {/* Secure Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-white/30">
            <Lock className="w-3 h-3" />
            <span>Payments processed securely by PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;