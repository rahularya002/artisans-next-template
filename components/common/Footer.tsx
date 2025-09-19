import React from 'react';
import Link from 'next/link';
import { Palette, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-700 p-2 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ArtisanMarket</span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Connecting artisans with art lovers worldwide. Discover unique, handcrafted treasures from talented makers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/Products" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                All Products
              </Link>
              <Link href="/categories" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Categories
              </Link>
              <Link href="/artisans" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Featured Artisans
              </Link>
              <Link href="/About" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/Contact" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/shipping" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Returns
              </Link>
              <Link href="/privacy" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-stone-300 hover:text-amber-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-stone-300">
                <Mail className="h-4 w-4" />
                <span>hello@artisanmarket.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-stone-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-stone-300">
                <MapPin className="h-4 w-4" />
                <span>123 Artisan Way<br />Santa Fe, NM 87501</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8 text-center">
          <p className="text-stone-400 text-sm">
            © 2024 ArtisanMarket. All rights reserved. Made with ❤️ for artisans worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};