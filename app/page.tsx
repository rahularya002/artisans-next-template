'use client'
import React from 'react';
import  Link  from 'next/link';
import { ArrowRight, Users, Shield, Truck, Sparkles } from 'lucide-react';
import { mockProducts } from '@/utils/mockData';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/common/Button';

export default function HomePage() {
  const featuredProducts = mockProducts.filter(product => product.featured).slice(0, 4);
  const scrollerProducts = [...featuredProducts, ...featuredProducts, ...featuredProducts];
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const scrollByAmount = 320;
  const scrollLeft = () => scrollerRef.current?.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  const scrollRight = () => scrollerRef.current?.scrollBy({ left: scrollByAmount, behavior: 'smooth' });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Light topper to ensure transparent header stays bright */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-[1]" />
        {/* Full background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
            alt="Artisan workshop background"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              const fallback = 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop';
              if (img.src !== fallback) {
                img.src = fallback;
              }
            }}
            className="h-full w-full object-cover"
          />
          {/* Subtle amber/stone overlay to preserve brand colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/85 via-stone-50/70 to-stone-100/85" />
        </div>
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '22px 22px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-10 items-center justify-items-center">
            {/* Left: copy */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-3 py-1 text-sm text-amber-800 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4 text-amber-600" /> New: Fall Artisan Collection
              </span>
              <h1 className="mt-5 text-4xl lg:text-6xl font-bold leading-tight text-stone-800">
                Discover Rare, Human-made
                <span className="block bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">Treasures That Tell Stories</span>
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-stone-600 leading-relaxed">
                Shop one-of-a-kind works directly from independent makers. Every piece carries the touch,
                time, and soul of its creator.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center justify-center">
                  <Link href="/Products" className="flex items-center">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="backdrop-blur">
                  <Link href="/artisans">Meet Our Artisans</Link>
                </Button>
              </div>

              {/* Social proof */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex -space-x-2">
                  <img className="h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=80&auto=format&fit=crop" alt="Maker avatar" onError={(e)=>{const img=e.currentTarget as HTMLImageElement;const fb='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop';if(img.src!==fb){img.src=fb;}}} />
                  <img className="h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=80&auto=format&fit=crop" alt="Maker avatar" onError={(e)=>{const img=e.currentTarget as HTMLImageElement;const fb='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop';if(img.src!==fb){img.src=fb;}}} />
                  <img className="h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=80&auto=format&fit=crop" alt="Maker avatar" onError={(e)=>{const img=e.currentTarget as HTMLImageElement;const fb='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop';if(img.src!==fb){img.src=fb;}}} />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-stone-800">Trusted by 2,500+ makers</p>
                  <p className="text-stone-500">and thousands of happy collectors</p>
                </div>
              </div>

              {/* Category pill cloud */}
              <div className="mt-8 hidden md:flex flex-wrap gap-3 max-w-xl mx-auto justify-center">
                {['Ceramics','Jewelry','Textiles','Leather','Woodwork','Prints','Home Decor','Wearables'].map((c) => (
                  <span key={c} className="select-none rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-xs text-stone-700 shadow-sm hover:-translate-y-0.5 hover:shadow transition">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curved divider */}
        <svg className="absolute bottom-0 left-0 right-0 -mb-px h-12 w-full text-white" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path className="fill-white" d="M0,64L60,69.3C120,75,240,85,360,69.3C480,53,600,11,720,10.7C840,11,960,53,1080,69.3C1200,85,1320,75,1380,69.3L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" />
        </svg>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Why Choose ArtisanMarket?</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We connect you directly with talented artisans, ensuring authentic, high-quality handmade products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Users className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Direct from Artisans</h3>
              <p className="text-stone-600">
                Support independent creators and get authentic handmade items directly from the makers
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Shield className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Quality Guaranteed</h3>
              <p className="text-stone-600">
                Every item is carefully curated and backed by our quality promise
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Truck className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Fast & Secure Shipping</h3>
              <p className="text-stone-600">
                Safe packaging and reliable delivery to bring your treasures home
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-20">
        {/* soft pattern background */}
        <div className="absolute inset-0 -z-10 bg-stone-50">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 text-sm text-amber-800">
              Curated Picks
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-stone-800">Featured Handcrafts</h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              Discover limited runs, editor’s picks, and community favorites from independent makers
            </p>
          </div>

          {/* Category chips */}
          <div className="-mx-4 sm:mx-0 mb-8">
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 sm:px-0">
              {['All','Ceramics','Jewelry','Textiles','Leather','Woodwork','Home Decor','Wearables','Prints'].map((c, i) => (
                <button
                  key={c}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                    i === 0 ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight + grid wrapper */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-6 -top-6 h-40 bg-gradient-to-b from-amber-200/30 to-transparent blur-2xl" />
          <div className="relative rounded-3xl border border-stone-200 bg-white/80 backdrop-blur p-4 sm:p-6 shadow-sm">
              {/* Horizontal scroller */}
              <div className="relative">
                {/* Edge fades */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white/90 to-transparent rounded-l-3xl" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white/90 to-transparent rounded-r-3xl" />
                {/* Scroller */}
                <div ref={scrollerRef} className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 py-2">
                  {scrollerProducts.map((p, i) => (
                    <div key={`${p.id}-${i}`} className="snap-start shrink-0 w-64">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
                {/* Controls */}
                <div className="pointer-events-none absolute inset-y-0 left-2 right-2 flex items-center justify-between">
                  <button onClick={scrollLeft} className="pointer-events-auto hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border text-stone-700 hover:bg-stone-50" aria-label="Scroll left">
                    <span className="sr-only">Scroll left</span>
                    ‹
                  </button>
                  <button onClick={scrollRight} className="pointer-events-auto hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border text-stone-700 hover:bg-stone-50" aria-label="Scroll right">
                    <span className="sr-only">Scroll right</span>
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg">
              <Link href="/Products" className="flex items-center justify-center">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-xl text-amber-100 mb-8">
            Get updates on new artisan collections and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 outline-none"
            />
            <Button 
              className="bg-amber-800 text-white border-1 border-white px-6 rounded-l-none"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-amber-200 text-sm mt-4">
            No spam, just beautiful handcrafted updates
          </p>
        </div>
      </section>
    </div>
  );
};