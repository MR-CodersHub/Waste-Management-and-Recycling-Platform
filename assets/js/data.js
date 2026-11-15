/**
 * ReCycleHub - Central Data Store & Mock Database
 * Backed by LocalStorage with initial seed data
 */

const RECYCLE_STORAGE_KEY = 'recyclehub_pickup_requests';
const RECYCLE_USER_STORAGE_KEY = 'recyclehub_user_profile';
const RECYCLE_SETTINGS_KEY = 'recyclehub_app_settings';

// Categories Configuration
const WASTE_CATEGORIES = [
  {
    id: 'plastic',
    name: 'Plastics & Polymers',
    shortName: 'Plastic',
    icon: 'fa-solid fa-recycle',
    badgeClass: 'badge-plastic',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    ratePerKg: 0.45,
    co2PerKg: 1.8,
    accepted: ['PET bottles (Type 1)', 'HDPE containers (Type 2)', 'PP food containers (Type 5)', 'Clean cling film (Type 4)'],
    rejected: ['PVC pipes (Type 3)', 'Styrofoam (Type 6)', 'Composite chip bags', 'Medical syringe plastics'],
    instructions: 'Empty, rinse with cold water, remove non-matching bottle caps, and flatten bottles to maximize storage volume.',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    description: 'Transforming consumer bottles and packaging into high-grade post-consumer resin (PCR) flakes and pellets.'
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    shortName: 'Paper',
    icon: 'fa-solid fa-newspaper',
    badgeClass: 'badge-paper',
    color: '#D97706',
    bgColor: '#FEF3C7',
    ratePerKg: 0.30,
    co2PerKg: 1.2,
    accepted: ['Corrugated shipping boxes', 'Office printing paper', 'Magazines & catalogs', 'Paper bags & egg cartons'],
    rejected: ['Greasy pizza boxes', 'Waxed milk cartons', 'Thermal receipt paper', 'Tissue paper & napkins'],
    instructions: 'Flatten all boxes, remove heavy plastic adhesive tape, keep dry, and bundle with biodegradable twine.',
    image: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&w=800&q=80',
    description: 'Hydrapulped and de-inked to produce 100% recycled structural packaging and paper goods.'
  },
  {
    id: 'glass',
    name: 'Glass & Silica',
    shortName: 'Glass',
    icon: 'fa-solid fa-wine-bottle',
    badgeClass: 'badge-glass',
    color: '#0D9488',
    bgColor: '#CCFBF1',
    ratePerKg: 0.35,
    co2PerKg: 0.9,
    accepted: ['Clear, green, and brown beverage bottles', 'Food jars & condiment containers', 'Glass cosmetics containers'],
    rejected: ['Broken window panes', 'Pyrex & borosilicate cookware', 'Lightbulbs & fluorescent tubes', 'Mirrors & ceramic mugs'],
    instructions: 'Rinse out contents thoroughly, remove metal or plastic screw caps, and keep separate from general trash.',
    image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80',
    description: 'Infinitely recyclable cullet melted at energy-efficient lower furnace temperatures with zero quality loss.'
  },
  {
    id: 'metal',
    name: 'Metals & Alloys',
    shortName: 'Metal',
    icon: 'fa-solid fa-cube',
    badgeClass: 'badge-metal',
    color: '#475569',
    bgColor: '#F1F5F9',
    ratePerKg: 0.85,
    co2PerKg: 3.5,
    accepted: ['Aluminum beverage cans', 'Tin food & soup cans', 'Clean aluminum foil', 'Metal bottle caps & lid rings'],
    rejected: ['Pressurized aerosol cans', 'Paint cans with toxic residue', 'Car batteries', 'Radioactive industrial parts'],
    instructions: 'Rinse thoroughly, compress aluminum cans, and keep steel and aluminum separated if possible.',
    image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80',
    description: 'Smelted into high-purity aluminum ingots and steel coils, saving up to 95% of virgin ore mining energy.'
  },
  {
    id: 'ewaste',
    name: 'E-Waste & Electronics',
    shortName: 'E-Waste',
    icon: 'fa-solid fa-microchip',
    badgeClass: 'badge-ewaste',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    ratePerKg: 1.50,
    co2PerKg: 4.8,
    accepted: ['Laptops, desktops & tablets', 'Smartphones & chargers', 'Circuit boards & cables', 'Small home appliances'],
    rejected: ['Freon-loaded refrigerators', 'CRT tube monitors with cracked glass', 'Exploded lithium-ion cells'],
    instructions: 'Perform factory reset and remove data storage if required. Bundle cords neatly; tape over exposed battery terminals.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Responsible mechanical de-manufacturing recovering gold, palladium, copper, and precious rare earth magnets.'
  },
  {
    id: 'organic',
    name: 'Organic & Food Residuals',
    shortName: 'Organic',
    icon: 'fa-solid fa-seedling',
    badgeClass: 'badge-organic',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    ratePerKg: 0.25,
    co2PerKg: 2.1,
    accepted: ['Fruit & vegetable scraps', 'Coffee grounds & tea bags', 'Yard trimmings & fallen leaves', 'Eggshells & bread crusts'],
    rejected: ['Plastic cutlery marked biodegradable', 'Pet waste & cat litter', 'Raw meat & bones (standard tier)', 'Treated lumber'],
    instructions: 'Store in certified compostable bin liners or airtight bio-bins. Keep free of stickers and plastic tags.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    description: 'Aerobic thermal composting producing certified organic bio-fertilizer and anaerobic methane-to-grid energy.'
  },
  {
    id: 'hazardous',
    name: 'Hazardous & Special Waste',
    shortName: 'Hazardous',
    icon: 'fa-solid fa-triangle-exclamation',
    badgeClass: 'badge-hazardous',
    color: '#E11D48',
    bgColor: '#FFE4E6',
    ratePerKg: 2.20,
    co2PerKg: 5.4,
    accepted: ['Lithium & alkaline batteries', 'Fluorescent & UV lamps', 'Solvents, paints & stains', 'Automotive motor oils'],
    rejected: ['Bio-hazard infectious waste', 'Explosives & fireworks', 'Unidentified radioactive isotopes'],
    instructions: 'Store in original leakproof containers with clearly marked labels. Never mix differing chemical compounds.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    description: 'Strict regulatory neutralization, secure chemical reclamation, and certified industrial destruction.'
  }
];

// Initial Seed Pickup Requests
const INITIAL_PICKUP_REQUESTS = [
  {
    id: 'RCH-89210-2026',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins@ecotech.org',
    customerPhone: '+1 (555) 349-8201',
    address: '742 Evergreen Terrace, Sector 4',
    city: 'San Francisco, CA 94107',
    postalCode: '94107',
    serviceType: 'Residential',
    category: 'plastic',
    categoryName: 'Plastics & Polymers',
    weightKg: 28,
    preferredDate: '2026-11-18',
    preferredTimeSlot: '09:00 AM - 12:00 PM',
    status: 'Scheduled',
    assignedStaff: 'Marcus Vance',
    vehicleId: 'EV-Truck #04',
    amount: 18.50,
    notes: 'Gate code #4412. Boxes stored in driveway adjacent to electric garage.',
    createdAt: '2026-11-13T09:30:00Z',
    updatedAt: '2026-11-14T08:15:00Z',
    ecoPointsEarned: 140,
    co2SavedKg: 50.4
  },
  {
    id: 'RCH-89211-2026',
    customerName: 'Nexus BioLabs Inc.',
    customerEmail: 'facilities@nexusbiolabs.com',
    customerPhone: '+1 (555) 890-1123',
    address: '1200 Innovation Way, Suite 400',
    city: 'San Francisco, CA 94105',
    postalCode: '94105',
    serviceType: 'Commercial',
    category: 'ewaste',
    categoryName: 'E-Waste & Electronics',
    weightKg: 145,
    preferredDate: '2026-11-15',
    preferredTimeSlot: '01:00 PM - 04:00 PM',
    status: 'Assigned',
    assignedStaff: 'Elena Rostova',
    vehicleId: 'Eco-Van #02',
    amount: 145.00,
    notes: 'Loading dock B accessible from rear alley. Hard drive destruction certificate needed.',
    createdAt: '2026-11-13T14:10:00Z',
    updatedAt: '2026-11-14T10:00:00Z',
    ecoPointsEarned: 725,
    co2SavedKg: 696.0
  },
  {
    id: 'RCH-89212-2026',
    customerName: 'Greenwood Artisan Bakery',
    customerEmail: 'orders@greenwoodbakery.io',
    customerPhone: '+1 (555) 762-9904',
    address: '88 Market St, Old Quarter',
    city: 'San Francisco, CA 94102',
    postalCode: '94102',
    serviceType: 'Commercial',
    category: 'organic',
    categoryName: 'Organic & Food Residuals',
    weightKg: 85,
    preferredDate: '2026-11-14',
    preferredTimeSlot: '07:00 AM - 10:00 AM',
    status: 'Collected',
    assignedStaff: 'David Chen',
    vehicleId: 'Compactor E-07',
    amount: 45.00,
    notes: '5 sealed food-grade containers behind service kitchen door.',
    createdAt: '2026-11-12T16:45:00Z',
    updatedAt: '2026-11-14T07:45:00Z',
    ecoPointsEarned: 425,
    co2SavedKg: 178.5
  },
  {
    id: 'RCH-89213-2026',
    customerName: 'Astra Architectural Studio',
    customerEmail: 'studio@astra-arch.com',
    customerPhone: '+1 (555) 601-3829',
    address: '450 Montgomery St, Fl 11',
    city: 'San Francisco, CA 94104',
    postalCode: '94104',
    serviceType: 'Commercial',
    category: 'paper',
    categoryName: 'Paper & Cardboard',
    weightKg: 210,
    preferredDate: '2026-11-13',
    preferredTimeSlot: '02:00 PM - 05:00 PM',
    status: 'Completed',
    assignedStaff: 'Marcus Vance',
    vehicleId: 'EV-Truck #04',
    amount: 68.00,
    notes: 'Architectural blueprints, shred bundles, and corrugated model board packaging.',
    createdAt: '2026-11-10T11:20:00Z',
    updatedAt: '2026-11-13T17:10:00Z',
    ecoPointsEarned: 1050,
    co2SavedKg: 252.0
  },
  {
    id: 'RCH-89214-2026',
    customerName: 'David K. Morrison',
    customerEmail: 'dmorrison@gmail.com',
    customerPhone: '+1 (555) 412-9988',
    address: '3200 Pacific Heights Blvd',
    city: 'San Francisco, CA 94115',
    postalCode: '94115',
    serviceType: 'Residential',
    category: 'glass',
    categoryName: 'Glass & Silica',
    weightKg: 42,
    preferredDate: '2026-11-16',
    preferredTimeSlot: '09:00 AM - 12:00 PM',
    status: 'Pending',
    assignedStaff: 'Unassigned',
    vehicleId: 'TBD',
    amount: 22.00,
    notes: 'Beverage bottles from private charity gala, sorted by color in crates.',
    createdAt: '2026-11-14T08:20:00Z',
    updatedAt: '2026-11-14T08:20:00Z',
    ecoPointsEarned: 210,
    co2SavedKg: 37.8
  },
  {
    id: 'RCH-89215-2026',
    customerName: 'Silicon Foundry Tech Park',
    customerEmail: 'ops@siliconfoundry.co',
    customerPhone: '+1 (555) 912-4433',
    address: '900 Howard Street, Building D',
    city: 'San Francisco, CA 94103',
    postalCode: '94103',
    serviceType: 'Commercial',
    category: 'hazardous',
    categoryName: 'Hazardous & Special Waste',
    weightKg: 65,
    preferredDate: '2026-11-14',
    preferredTimeSlot: '11:00 AM - 02:00 PM',
    status: 'Processing',
    assignedStaff: 'Elena Rostova',
    vehicleId: 'HazMat Pod #01',
    amount: 195.00,
    notes: 'Lithium battery racks and spent chemical solvents with OSHA placards.',
    createdAt: '2026-11-11T13:00:00Z',
    updatedAt: '2026-11-14T11:30:00Z',
    ecoPointsEarned: 650,
    co2SavedKg: 351.0
  }
];

// Drivers and Fleet Data
const FLEET_STAFF = [
  { id: 'stf-1', name: 'Marcus Vance', role: 'Senior Heavy Route Driver', vehicle: 'EV-Truck #04', capacity: '5,000 kg', rating: 4.9, activeTrips: 4 },
  { id: 'stf-2', name: 'Elena Rostova', role: 'E-Waste & HazMat Specialist', vehicle: 'Eco-Van #02', capacity: '2,200 kg', rating: 5.0, activeTrips: 2 },
  { id: 'stf-3', name: 'David Chen', role: 'Commercial Organic Operator', vehicle: 'Compactor E-07', capacity: '7,500 kg', rating: 4.8, activeTrips: 5 },
  { id: 'stf-4', name: 'Aaliyah Patel', role: 'Urban Micro-Logistics Specialist', vehicle: 'Cargo Trike #01', capacity: '600 kg', rating: 4.95, activeTrips: 3 }
];

// Blog Posts Data
const BLOG_POSTS = [
  {
    id: 'ai-driven-optical-sorting',
    title: 'The Next Generation of AI-Driven Optical Material Sorting in Modern MRFs',
    slug: 'ai-driven-optical-sorting',
    category: 'Technology & AI',
    date: 'November 10, 2026',
    author: 'Dr. Evelyn Sterling, Head of Material Robotics',
    readTime: '6 min read',
    excerpt: 'How hyperspectral imaging combined with high-speed pneumatic ejectors achieves 99.4% sorting purity across complex composite plastics.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'closed-loop-circular-economy-2026',
    title: 'Closing the Loop: Achieving Net-Zero Supply Chains with Circular Waste Logistics',
    slug: 'closed-loop-circular-economy-2026',
    category: 'Circular Economy',
    date: 'November 05, 2026',
    author: 'Julian Mercer, Chief Sustainability Officer',
    readTime: '8 min read',
    excerpt: 'A comprehensive blueprint for enterprise organizations transitioning from traditional linear disposal to verifiable zero-waste-to-landfill models.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'lithium-battery-recycling-frontier',
    title: 'Hydrometallurgical Breakthroughs in Urban Lithium & Rare Earth Element Recovery',
    slug: 'lithium-battery-recycling-frontier',
    category: 'E-Waste & Energy',
    date: 'October 28, 2026',
    author: 'Mateo Alvarez, Battery Recycling Chemist',
    readTime: '5 min read',
    excerpt: 'Extracting battery-grade nickel, cobalt, and lithium carbonate from decommissioned electric mobility cells with 80% less energy than mining.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    id: 'urban-organic-composting-decentralized',
    title: 'Decentralized Micro-Composting: Converting Metropolises from Waste Generators to Food Bowls',
    slug: 'urban-organic-composting-decentralized',
    category: 'Urban Organics',
    date: 'October 19, 2026',
    author: 'Clara Sorensen, Soil Microbiologist',
    readTime: '7 min read',
    excerpt: 'How localized commercial vermicomposting and bio-digesters eliminate methane emissions from landfill food dumps while revitalizing urban farms.',
    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    featured: false
  }
];

// Initial User Profile
const INITIAL_USER = {
  name: 'Sarah Jenkins',
  email: 's.jenkins@ecotech.org',
  phone: '+1 (555) 349-8201',
  membershipTier: 'EcoGuardian Platinum',
  joinedDate: 'March 2025',
  totalRecycledKg: 840,
  co2SavedKg: 1512.0,
  treesPreserved: 36,
  ecoRewardPoints: 4200,
  defaultAddress: '742 Evergreen Terrace, Sector 4, San Francisco, CA 94107',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
};

// Data Store API
const ReCycleStore = {
  // Initialize LocalStorage with default data if empty
  init() {
    if (!localStorage.getItem(RECYCLE_STORAGE_KEY)) {
      localStorage.setItem(RECYCLE_STORAGE_KEY, JSON.stringify(INITIAL_PICKUP_REQUESTS));
    }
    if (!localStorage.getItem(RECYCLE_USER_STORAGE_KEY)) {
      localStorage.setItem(RECYCLE_USER_STORAGE_KEY, JSON.stringify(INITIAL_USER));
    }
  },

  // Pickups
  getPickups() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(RECYCLE_STORAGE_KEY)) || INITIAL_PICKUP_REQUESTS;
    } catch (e) {
      return INITIAL_PICKUP_REQUESTS;
    }
  },

  getPickupById(id) {
    const list = this.getPickups();
    return list.find(item => item.id.toUpperCase() === id.trim().toUpperCase());
  },

  savePickup(pickup) {
    const list = this.getPickups();
    // Prepend new pickup so it appears first
    list.unshift(pickup);
    localStorage.setItem(RECYCLE_STORAGE_KEY, JSON.stringify(list));
    
    // Update user stats
    const user = this.getUser();
    user.totalRecycledKg += (Number(pickup.weightKg) || 10);
    user.co2SavedKg += Math.round((Number(pickup.weightKg) || 10) * 1.8 * 10) / 10;
    user.ecoRewardPoints += (pickup.ecoPointsEarned || 100);
    localStorage.setItem(RECYCLE_USER_STORAGE_KEY, JSON.stringify(user));

    return pickup;
  },

  updatePickupStatus(id, newStatus, staffName, vehicleId) {
    const list = this.getPickups();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index].status = newStatus;
      if (staffName) list[index].assignedStaff = staffName;
      if (vehicleId) list[index].vehicleId = vehicleId;
      list[index].updatedAt = new Date().toISOString();
      localStorage.setItem(RECYCLE_STORAGE_KEY, JSON.stringify(list));
      return list[index];
    }
    return null;
  },

  deletePickup(id) {
    const list = this.getPickups().filter(item => item.id !== id);
    localStorage.setItem(RECYCLE_STORAGE_KEY, JSON.stringify(list));
    return true;
  },

  // User
  getUser() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(RECYCLE_USER_STORAGE_KEY)) || INITIAL_USER;
    } catch (e) {
      return INITIAL_USER;
    }
  },

  saveUser(updatedUser) {
    localStorage.setItem(RECYCLE_USER_STORAGE_KEY, JSON.stringify(updatedUser));
  },

  // Categories helper
  getCategories() {
    return WASTE_CATEGORIES;
  },

  getCategoryById(id) {
    return WASTE_CATEGORIES.find(c => c.id === id) || WASTE_CATEGORIES[0];
  },

  // Fleet Staff
  getFleet() {
    return FLEET_STAFF;
  },

  // Blog
  getBlogPosts() {
    return BLOG_POSTS;
  },

  // Reference ID Generator
  generateReferenceId() {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    return `RCH-${randomDigits}-${year}`;
  }
};

// Auto-run init
ReCycleStore.init();

// Export globally
window.ReCycleStore = ReCycleStore;
window.WASTE_CATEGORIES = WASTE_CATEGORIES;

