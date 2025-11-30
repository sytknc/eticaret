Stripe entegrasyonu (kısa rehber)

1) Hesap oluşturun ve anahtarları alın.
2) `STRIPE_SECRET_KEY` ve `STRIPE_PUBLISHABLE_KEY` değerlerini `.env.local` içine koyun.
3) Server-side ödeme intent oluşturmak için `/pages/api/checkout.ts` gibi bir endpoint oluşturun ve Stripe SDK'yı kullanın.
4) İstemci tarafında Stripe.js ile ödeme formunu gösterin; token/Payment Intent ID ile server'a tamamla isteği gönderin.

Örnek (server):

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' })

// create payment intent
await stripe.paymentIntents.create({ amount, currency: 'try', metadata: {...} })

Daha detaylı yardımcı olmamı isterseniz, örnek endpoint ve checkout bileşeni ekleyebilirim.
