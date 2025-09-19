import { Users, Heart, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Handcrafted studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/90 via-stone-50/85 to-stone-50" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-800">Our Story</h1>
          <p className="mt-4 text-lg text-stone-600">
            We connect discerning buyers with independent artisans around the world, celebrating slow craft
            and the soulful value of human-made goods.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">Craft, Community, and Fairness</h2>
            <p className="mt-4 text-stone-600">
              ArtisanMarket was founded with a simple belief: the best objects carry stories. We help makers
              earn fairly, and help you discover work that lasts beyond trends.
            </p>
            <ul className="mt-6 space-y-3 text-stone-700">
              <li className="flex items-start gap-3"><Heart className="h-5 w-5 text-amber-700 mt-0.5" /> Fair payment and ethical sourcing</li>
              <li className="flex items-start gap-3"><Shield className="h-5 w-5 text-amber-700 mt-0.5" /> Quality-first curation</li>
              <li className="flex items-start gap-3"><Globe className="h-5 w-5 text-amber-700 mt-0.5" /> Global community of independent makers</li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/269255/pexels-photo-269255.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Artisans at work"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-amber-700 text-white px-4 py-2 rounded-full shadow">Est. 2025</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Artisans', value: '2.5k+' },
              { icon: Heart, label: 'Items Loved', value: '50k+' },
              { icon: Shield, label: 'Curated Pieces', value: '5k+' },
              { icon: Globe, label: 'Countries', value: '40+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-xl border border-stone-200 p-6 text-center shadow-sm">
                <Icon className="mx-auto h-6 w-6 text-amber-700" />
                <div className="mt-3 text-2xl font-bold text-stone-800">{value}</div>
                <div className="text-sm text-stone-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


