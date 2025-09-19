'use client'
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-stone-800">Get in Touch</h1>
          <p className="mt-3 text-stone-600">We’d love to hear from you. Questions, collaborations, or support—reach out.</p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-700 mt-1" />
              <div>
                <div className="font-semibold text-stone-800">Email</div>
                <a href="mailto:support@artisanmarket.test" className="text-stone-600 hover:text-amber-700">support@artisanmarket.test</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-amber-700 mt-1" />
              <div>
                <div className="font-semibold text-stone-800">Phone</div>
                <a href="tel:+1234567890" className="text-stone-600 hover:text-amber-700">+1 (234) 567-890</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-700 mt-1" />
              <div>
                <div className="font-semibold text-stone-800">Studio</div>
                <p className="text-stone-600">123 Maker Lane, Craft City, CA</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="max-w-xl ml-auto">
            <form className="space-y-4 bg-white border border-stone-200 rounded-xl p-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input type="text" placeholder="Your name" className="w-full rounded-lg border-1 border-stone-300 bg-white px-4 py-3 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full rounded-lg border-stone-300 bg-white px-4 py-3 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <textarea rows={6} placeholder="How can we help?" className="w-full rounded-lg border-stone-300 bg-white px-4 py-3 placeholder-stone-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div className="flex justify-end">
                <Button className="flex items-center"><Send className="h-4 w-4 mr-2" /> Send message</Button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


