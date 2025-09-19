import { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Ceramic Bowl',
    description: 'A beautiful ceramic bowl crafted using traditional pottery techniques. Perfect for serving salads, fruits, or as a decorative piece. Each bowl is unique with its own character and subtle variations.',
    price: 45.00,
    originalPrice: 60.00,
    images: [
      'https://images.pexels.com/photos/6898825/pexels-photo-6898825.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7218414/pexels-photo-7218414.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6898837/pexels-photo-6898837.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Ceramics',
    artisan: {
      id: 'artisan1',
      name: 'Elena Martinez',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Santa Fe, NM'
    },
    materials: ['Stoneware Clay', 'Lead-free Glaze'],
    dimensions: '8" diameter x 3" height',
    weight: '1.2 lbs',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    tags: ['handmade', 'ceramic', 'bowl', 'kitchen', 'decor']
  },
  {
    id: '2',
    name: 'Artisan Leather Journal',
    description: 'Hand-stitched leather journal with recycled paper pages. Features a rustic design with brass hardware and comes with a leather tie closure.',
    price: 89.00,
    images: [
      'https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029781/pexels-photo-1029781.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Leather Goods',
    artisan: {
      id: 'artisan2',
      name: 'Marcus Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Austin, TX'
    },
    materials: ['Full-grain Leather', 'Recycled Paper', 'Brass Hardware'],
    dimensions: '6" x 8" x 1"',
    weight: '0.8 lbs',
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewCount: 18,
    tags: ['leather', 'journal', 'notebook', 'handcrafted', 'vintage']
  },
  {
    id: '3',
    name: 'Handwoven Wool Throw',
    description: 'Luxurious wool throw blanket handwoven on a traditional loom. Features a geometric pattern inspired by Native American designs.',
    price: 195.00,
    images: [
      'https://images.pexels.com/photos/6031392/pexels-photo-6031392.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6444060/pexels-photo-6444060.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Textiles',
    artisan: {
      id: 'artisan3',
      name: 'Sarah Running Bear',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Flagstaff, AZ'
    },
    materials: ['Merino Wool', 'Natural Dyes'],
    dimensions: '50" x 60"',
    weight: '2.5 lbs',
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewCount: 32,
    tags: ['wool', 'throw', 'blanket', 'geometric', 'native', 'handwoven']
  },
  {
    id: '4',
    name: 'Carved Wooden Sculpture',
    description: 'Abstract wooden sculpture carved from reclaimed oak. Each piece is unique and celebrates the natural grain of the wood.',
    price: 275.00,
    images: [
      'https://images.pexels.com/photos/7937670/pexels-photo-7937670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4992818/pexels-photo-4992818.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Woodwork',
    artisan: {
      id: 'artisan4',
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Portland, OR'
    },
    materials: ['Reclaimed Oak', 'Natural Wood Finish'],
    dimensions: '12" x 8" x 6"',
    weight: '3.2 lbs',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    tags: ['wood', 'sculpture', 'carved', 'abstract', 'reclaimed', 'oak']
  },
  {
    id: '5',
    name: 'Sterling Silver Pendant Necklace',
    description: 'Handcrafted sterling silver pendant featuring intricate filigree work. Chain included. Perfect for special occasions or everyday elegance.',
    price: 135.00,
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457838/pexels-photo-1457838.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Jewelry',
    artisan: {
      id: 'artisan5',
      name: 'Isabella Rodriguez',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Taos, NM'
    },
    materials: ['Sterling Silver', 'Natural Gemstone'],
    dimensions: 'Pendant: 1.5" x 1", Chain: 18"',
    weight: '0.3 oz',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 41,
    tags: ['silver', 'jewelry', 'pendant', 'necklace', 'filigree', 'handcrafted']
  },
  {
    id: '6',
    name: 'Hand-Blown Glass Vase',
    description: 'Elegant hand-blown glass vase with swirling color patterns. Each piece is one-of-a-kind due to the nature of glass blowing.',
    price: 125.00,
    images: [
      'https://images.pexels.com/photos/6207742/pexels-photo-6207742.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6207751/pexels-photo-6207751.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Glass Art',
    artisan: {
      id: 'artisan6',
      name: 'Robert Glass',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      location: 'Venice, CA'
    },
    materials: ['Borosilicate Glass', 'Colored Glass Rods'],
    dimensions: '8" height x 4" diameter',
    weight: '1.5 lbs',
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 22,
    tags: ['glass', 'vase', 'blown', 'colorful', 'unique', 'decorative']
  }
];

export const mockUser: User = {
  id: 'user1',
  email: 'demo@artisanmarket.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'Denver',
    state: 'CO',
    zipCode: '80201',
    country: 'USA'
  },
  isArtisan: false
};

export const categories = [
  'All',
  'Ceramics',
  'Leather Goods',
  'Textiles',
  'Woodwork',
  'Jewelry',
  'Glass Art',
  'Metalwork',
  'Sculpture'
];

export const materials = [
  'Wood',
  'Metal',
  'Ceramic',
  'Glass',
  'Leather',
  'Fabric',
  'Stone',
  'Clay',
  'Silver',
  'Gold'
];