/**
 * ReCycleHub - Blog Details Renderer
 * Renders the selected article (via ?post=slug) inside blog-details.html
 */

const BLOG_DETAIL_ARTICLES = [
  {
    slug: 'ai-optical-sorting-mrf',
    category: 'Technology & AI',
    date: 'November 10, 2026',
    readTime: '6 min read',
    title: 'The Next Generation of AI-Driven Optical Material Sorting in Modern MRFs',
    heroTitle: 'The Next Generation of AI-Driven',
    heroAccent: 'Optical Sorting in Modern MRFs',
    excerpt: 'How hyperspectral imaging combined with high-speed pneumatic ejectors achieves 99.4% sorting purity across complex composite post-consumer packaging.',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Automated optical sorting robotics in a materials recovery plant',
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Recycling conveyor belt carrying sorted materials inside an MRF',
    coverCaption: 'A near-infrared optical sorter separating post-consumer polymers at a ReCycleHub material recovery facility.',
    author: {
      name: 'Dr. Evelyn Sterling',
      role: 'Chief Technology Officer & Head of Robotics',
      bio: 'Dr. Sterling holds a Ph.D. in Mechanical Engineering from Stanford University. She has published over 30 peer-reviewed papers on industrial autonomous perception and computer vision for circular material lifecycles.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Hyperspectral Leap:</strong> Modern optical sorters using 900&ndash;1700nm wavelengths differentiate high-density polyethylene (HDPE) from polypropylene (PP) at 4.2 metres per second conveyor speeds.',
      '<strong>Pneumatic Micro-Ejectors:</strong> 128 air nozzles operate with 4-millisecond trigger responses, segregating target polymers with 99.4% post-consumer purity.',
      '<strong>Economic Yield:</strong> Purity above 99% unlocks food-grade bottle-to-bottle pellet certification, doubling virgin resin replacement value.'
    ],
    sections: [
      {
        heading: 'The Physics of Hyperspectral Polymer Classification',
        paragraphs: [
          'For decades, municipal recycling programs suffered from an endemic bottleneck: <em>the manual sorting line</em>. While human sorters possess remarkable situational intuition, human reaction times are fundamentally incompatible with municipal waste streams generated at 30 to 50 metric tons per hour.',
          'Every common polymer possesses a distinct molecular absorption spectrum under near-infrared illumination. When an infrared LED array flashes over an unwashed PET bottle or HDPE detergent container, the light reflected into the InGaAs line-scan camera registers unmistakable carbon&ndash;hydrogen harmonic vibration dips.'
        ],
        quote: 'High-grade sorting is no longer a waste management issue; it is the raw material procurement tier for modern green manufacturing.',
        table: {
          headers: ['Polymer Type', 'Characteristic Absorption Band', 'Optical Accuracy', 'End-Use Circular Stream'],
          rows: [
            ['<strong>PET (Type 1)</strong>', '1,660 nm (Ester carbonyl overtone)', '<span class="badge badge-emerald">99.7%</span>', 'Bottle-to-bottle food grade flake'],
            ['<strong>HDPE (Type 2)</strong>', '1,215 nm &amp; 1,730 nm (Methylene stretch)', '<span class="badge badge-emerald">99.2%</span>', 'Corrugated drainage pipes &amp; bottles'],
            ['<strong>PP (Type 5)</strong>', '1,195 nm (Methyl asymmetric peak)', '<span class="badge badge-emerald">98.9%</span>', 'Automotive battery casings &amp; totes']
          ]
        }
      },
      {
        heading: 'Overcoming the &ldquo;Black Plastic&rdquo; Conundrum',
        paragraphs: [
          'Historically, carbon black colorants absorbed the entire visible and infrared light spectrum, rendering black meat trays and take-out lids invisible to optical sensors. ReCycleHub has deployed mid-wave infrared (MWIR) Raman scatter cameras that analyse molecular surface lattice vibrations instead of reflected colour.',
          'In municipal trials, those sensors identified and segregated black polypropylene at better than 97% capture efficiency. That single change redirected thousands of tonnes of packaging away from landfill and into automotive and construction compounds.'
        ]
      },
      {
        heading: 'The Economics of Precision Recovery',
        paragraphs: [
          'Purity is not a vanity metric. Once a PET stream clears 99%, it qualifies for food-grade bottle-to-bottle pellet certification, which roughly doubles its value against mixed-colour flake. The optical sorter pays for itself through resin uplift long before disposal savings are counted.',
          'The next frontier is dynamic recipe control: sorters that retune their target polymer set mid-shift as commodity prices move.'
        ],
        list: [
          'Bale purity above 99% unlocks food-grade end markets.',
          'Lower contamination reduces downstream wash-water and energy demand.',
          'Stable, certified output supports long-term offtake contracts.',
          'Real-time assay data feeds directly into Scope 3 reporting.'
        ]
      }
    ],
    tags: ['Optical Sorting', 'Hyperspectral Imaging', 'MRF Automation', 'Circular Plastics'],
    related: ['machine-vision-mrf-economics', 'digital-twins-recycling-flow', 'net-zero-circular-supply-chains'],
    comments: [
      { name: 'Marcus Vance', time: '2 days ago', text: 'The NIR sorting has made a massive difference in route efficiency. Our truck unloads are verified in minutes at Hub 04.' },
      { name: 'Dr. Clara Sorensen', time: 'Yesterday', text: 'Fascinating read on the MWIR Raman scatter sensors! We are testing similar optics to detect microplastics in municipal compost batches.' }
    ]
  },
  {
    slug: 'machine-vision-mrf-economics',
    category: 'Technology & AI',
    date: 'November 14, 2026',
    readTime: '6 min read',
    title: 'Machine Vision Is Rewriting the Economics of MRF Sorting',
    heroTitle: 'Machine Vision Is Rewriting the',
    heroAccent: 'Economics of MRF Sorting',
    excerpt: 'Inside the low-latency vision models that spot composite contamination and divert it to the right bale, at speed.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Engineer working beside a robotic arm in a technology lab',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Engineer configuring vision hardware beside a sorting conveyor',
    coverCaption: 'Vision models are trained on the real contamination found on municipal lines, not on pristine laboratory samples.',
    author: {
      name: 'Dr. Evelyn Sterling',
      role: 'Chief Technology Officer & Head of Robotics',
      bio: 'Dr. Sterling holds a Ph.D. in Mechanical Engineering from Stanford University. She has published over 30 peer-reviewed papers on industrial autonomous perception and computer vision for circular material lifecycles.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Latency Budget:</strong> Inference must complete in under 10 milliseconds so the ejector command stays aligned with an object moving at four metres per second.',
      '<strong>Contamination First:</strong> The highest-value models detect sleeves, cap rings, and composite film before they poison a premium bale.',
      '<strong>Measured Rollout:</strong> Model changes are staged against live bale assays, not curated pilot streams.'
    ],
    sections: [
      {
        heading: 'Low Latency Is the Whole Game',
        paragraphs: [
          'A vision model that takes 80 milliseconds to decide is already too late on a belt moving at four metres per second. Modern MRF vision stacks push inference below 10 milliseconds by combining frame-level detection with lightweight segmentation models running on edge accelerators.',
          'That budget covers capture, inference, and the actuator command. ReCycleHub&rsquo;s current line holds end-to-end latency at 8.4 milliseconds, which keeps the air nozzle aligned with the target object even at peak throughput.'
        ]
      },
      {
        heading: 'The Hard Part Is Contamination, Not Recognition',
        paragraphs: [
          'Recognising a bottle is solved. Recognising that a bottle still carries a sleeve, a cap ring, or a layer of composite film is where machine vision earns its keep. Contaminated items must be diverted to a lower-value stream before they contaminate a premium bale.',
          'By training on labelled contamination events rather than pristine samples, the classifier learns the visual signatures of real-world packaging: crushed, soiled, and partially obscured.'
        ],
        list: [
          'Sleeve and cap-ring detection at line speed.',
          'Composite film segmentation on mixed packaging.',
          'Loose-battery and aerosol flags for safety diversion.'
        ]
      },
      {
        heading: 'From Pilot Line to Plant-Wide Rollout',
        paragraphs: [
          'Pilot lines typically report strong numbers because the input stream is curated. The real test is a municipal stream on a wet Monday morning. Rollout plans therefore stage model updates against live bale assays rather than laboratory fixtures.',
          'Operators get a simple guardrail: any model change must improve measured purity without reducing recovery by more than half a percentage point. That discipline keeps the economics honest.'
        ],
        quote: 'A model is only as good as the bale assay that follows it.'
      }
    ],
    tags: ['Machine Vision', 'Contamination Control', 'Edge AI', 'MRF Operations'],
    related: ['ai-optical-sorting-mrf', 'digital-twins-recycling-flow', 'recycled-content-procurement']
  },
  {
    slug: 'net-zero-circular-supply-chains',
    category: 'Circular Economy',
    date: 'November 05, 2026',
    readTime: '8 min read',
    title: 'Closing the Loop: Achieving Net-Zero Supply Chains',
    heroTitle: 'Closing the Loop: Achieving',
    heroAccent: 'Net-Zero Supply Chains',
    excerpt: 'A practical blueprint for moving enterprise supply chains from linear disposal to verifiable zero-waste models.',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Young seedling growing in dark soil',
    coverImage: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Blue recycling bin marked with a white recycling symbol',
    coverCaption: 'Net-zero supply chains begin with a material map and end with auditable recovery outcomes.',
    author: {
      name: 'Julian Mercer',
      role: 'Chief Sustainability Officer',
      bio: 'Julian leads ReCycleHub&rsquo;s enterprise circularity practice. He has spent 15 years designing reverse logistics and zero-waste-to-landfill programmes for manufacturers and retailers.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Material Map First:</strong> Every circular transition begins with knowing what leaves each site, in what volume, and where it currently goes.',
      '<strong>Backhaul Advantage:</strong> Reusing existing delivery corridors for recovery cuts both collection emissions and per-tonne cost.',
      '<strong>Verification Layer:</strong> Chain-of-custody and bale-assay records turn a circular claim into an auditable Scope 3 entry.'
    ],
    sections: [
      {
        heading: 'Mapping the Linear-to-Circular Transition',
        paragraphs: [
          'Most enterprise supply chains are still designed around a single direction: source, manufacture, distribute, discard. A net-zero chain reverses that logic, treating every output as a feedstock with a known destination.',
          'The transition starts with a material map: what leaves each site, in what volume, and where it currently goes. ReCycleHub completes that audit in two weeks using weighbridge data, procurement records, and waste transfer notes.'
        ]
      },
      {
        heading: 'Reverse Logistics That Pay for Themselves',
        paragraphs: [
          'Backhauling is the quiet hero of circular logistics. A truck that delivers packaging can return with baled film or pallets instead of driving empty. Route optimisation cuts both emissions and per-tonne collection cost.',
          'The same principle applies to depot siting: recovery points should sit inside existing delivery corridors, not at the end of a dedicated waste run.'
        ],
        list: [
          'Backhauls matched to established delivery routes.',
          'Consolidated depots inside delivery corridors.',
          'Deposit-return loops for high-value packaging.',
          'Real-time fill-level routing for collection fleets.'
        ]
      },
      {
        heading: 'Verification Is the Missing Layer',
        paragraphs: [
          'A circular claim is only as strong as its evidence. Chain-of-custody records, bale assays, and third-party audits turn a sustainability story into an auditable Scope 3 entry.',
          'Boards increasingly ask for landfill diversion rates that survive an assurance review. That means mass-balance documentation, not a headline percentage.'
        ],
        quote: 'A circular economy without verification is just a press release with better typography.'
      }
    ],
    tags: ['Net Zero', 'Scope 3', 'Reverse Logistics', 'Zero Waste'],
    related: ['recycled-content-procurement', 'reuse-packaging-blue-bin', 'second-life-ev-batteries']
  },
  {
    slug: 'digital-twins-recycling-flow',
    category: 'Technology & AI',
    date: 'November 02, 2026',
    readTime: '7 min read',
    title: 'Digital Twins: Simulating a City’s Entire Recycling Flow',
    heroTitle: 'Digital Twins: Simulating a',
    heroAccent: 'City’s Entire Recycling Flow',
    excerpt: 'How planners model real-time material flows to site depots, predict contamination spikes, and cut collection miles.',
    heroImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Modern city architecture viewed from below',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Aerial view of a dense city skyline',
    coverCaption: 'Digital twins combine fleet telemetry, depot inventories, and material assays into one continuously updated model.',
    author: {
      name: 'Priya Raman',
      role: 'Urban Systems Data Lead',
      bio: 'Priya builds simulation models for municipal material flows. Her work focuses on translating messy operational data into planning decisions that reduce cost and emissions across collection networks.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Living Model:</strong> A useful twin is fed by daily telemetry, weighbridge records, depot inventories, and material assays rather than a one-off survey.',
      '<strong>Contamination Forecasting:</strong> Calendar, weather, and route changes predict contamination spikes before bales are downgraded.',
      '<strong>Depot Siting:</strong> Ten thousand simulated scenarios can reveal where a depot removes the most collection miles.'
    ],
    sections: [
      {
        heading: 'A Living Model of the City',
        paragraphs: [
          'A digital twin of a city&rsquo;s waste system is not a static 3D picture. It is a continuously updated model fed by collection telemetry, weighbridge data, depot inventories, and material assays.',
          'ReCycleHub&rsquo;s model ingests half a million event records a day, then simulates how material moves through every truck, transfer station, and MRF line in the network.'
        ]
      },
      {
        heading: 'Predicting Contamination Before It Peaks',
        paragraphs: [
          'Contamination is seasonal, geographic, and behavioural. A holiday weekend produces a spike in greasy packaging; a new multi-unit development changes the composition of an entire collection route.',
          'By correlating historical contamination with weather, calendar, and route changes, planners can pre-position extra sorting capacity or adjust collection frequency before bales are downgraded.'
        ]
      },
      {
        heading: 'Siting Depots with Simulation',
        paragraphs: [
          'Depot location is usually a property decision. In a simulated network it becomes a mathematical one: run thousands of scenarios and see which sites minimise collection miles without starving a MRF line.',
          'The savings compound. A depot two miles closer to its service area can remove tens of thousands of kilometres from the fleet each year, and every avoided kilometre is avoided emissions.'
        ],
        quote: 'The best time to test a depot decision is before the concrete is poured.'
      }
    ],
    tags: ['Digital Twins', 'Urban Planning', 'Data Modelling', 'Fleet Optimisation'],
    related: ['machine-vision-mrf-economics', 'ai-optical-sorting-mrf', 'net-zero-circular-supply-chains']
  },
  {
    slug: 'lithium-battery-hydrometallurgy',
    category: 'E-Waste & Batteries',
    date: 'October 28, 2026',
    readTime: '5 min read',
    title: 'Hydrometallurgical Breakthroughs in Lithium Battery Recovery',
    heroTitle: 'Hydrometallurgical Breakthroughs',
    heroAccent: 'in Lithium Battery Recovery',
    excerpt: 'Recovering battery-grade nickel, cobalt, and lithium from mobility cells with 80% less energy than virgin mining.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Circuit boards and electronic components',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Electric vehicle charging cable connected to a car',
    coverCaption: 'Retired mobility packs are a concentrated source of nickel, cobalt, and lithium for new cell manufacturing.',
    author: {
      name: 'Mateo Alvarez',
      role: 'Battery Recycling Chemist',
      bio: 'Mateo specialises in hydrometallurgical recovery of critical battery metals. He has designed pilot and production-scale leaching, solvent extraction, and crystallisation processes for lithium-ion feedstock.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Lithium Recovery:</strong> Hydrometallurgical routes reclaim lithium that pyrometallurgy typically loses to slag.',
      '<strong>Lower Energy:</strong> Aqueous processing operates well below smelting temperatures, cutting energy demand per recovered tonne.',
      '<strong>Battery-Grade Output:</strong> Separated salts can return directly to cell manufacturing, shortening the supply chain.'
    ],
    sections: [
      {
        heading: 'The Limits of High-Temperature Recycling',
        paragraphs: [
          'Pyrometallurgical recovery is robust, but it is blunt. Smelting consumes large amounts of energy and tends to recover nickel and cobalt while leaving lithium in slag where it is difficult and expensive to reclaim.',
          'As lithium demand outpaces supply, leaving the lightest and most valuable fraction in a slag heap no longer makes economic sense.'
        ]
      },
      {
        heading: 'Hydrometallurgy at Industrial Scale',
        paragraphs: [
          'Hydrometallurgical routes dissolve shredded cell material in carefully staged acid and solvent baths, then precipitate battery-grade salts one fraction at a time. The process operates at far lower temperatures than smelting and recovers lithium, nickel, cobalt, and manganese separately.',
          'ReCycleHub&rsquo;s pilot line reports recovery above 96% for nickel and cobalt, 93% for lithium, and a 40% reduction in water intensity compared with first-generation plants.'
        ],
        list: [
          'Mechanical pre-treatment to remove casings and foils.',
          'Selective leaching of cathode metals.',
          'Solvent extraction and crystallisation of battery salts.',
          'Closed-loop water treatment and reagent recovery.'
        ]
      },
      {
        heading: 'Closing the Mobility Battery Loop',
        paragraphs: [
          'The strongest business case is not scrap recovery alone. It is a loop in which retired mobility packs return to cell manufacturing as certified feedstock, insulating buyers from virgin-metal volatility.',
          'That requires chemistry-level traceability from the vehicle to the recovered salt. Batch-level material passports are becoming the default requirement for automotive offtake.'
        ],
        quote: 'The battery supply chain of 2030 will be won by whoever can certify recovered metal, not just refine it.'
      }
    ],
    tags: ['Lithium Batteries', 'Hydrometallurgy', 'Critical Minerals', 'E-Waste'],
    related: ['second-life-ev-batteries', 'net-zero-circular-supply-chains', 'ai-optical-sorting-mrf']
  },
  {
    slug: 'reuse-packaging-blue-bin',
    category: 'Circular Economy',
    date: 'October 24, 2026',
    readTime: '6 min read',
    title: 'Beyond the Blue Bin: Designing Reuse Into Packaging',
    heroTitle: 'Beyond the Blue Bin: Designing',
    heroAccent: 'Reuse Into Packaging',
    excerpt: 'From deposit-return pilots to reverse logistics, here is how brands make reusable packaging work at national scale.',
    heroImage: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Blue recycling bin with a white recycling symbol',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Fresh produce displayed in a grocery market',
    coverCaption: 'Reuse systems succeed when return infrastructure sits inside everyday retail journeys.',
    author: {
      name: 'Nadia Rahman',
      role: 'Packaging Circularity Lead',
      bio: 'Nadia advises brands and retailers on reusable packaging systems, deposit-return design, and the reverse logistics required to make reuse work beyond the pilot stage.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>System, Not Container:</strong> Reuse succeeds or fails on the reverse network behind the package.',
      '<strong>Dense Returns:</strong> Small deposits and everyday retail drop-off points drive return rates above 85%.',
      '<strong>Fourth-Use Design:</strong> Packages must survive repeated washing, stacking, and re-labelling without quality loss.'
    ],
    sections: [
      {
        heading: 'Why Recycling Alone Cannot Close the Loop',
        paragraphs: [
          'Recycling recovers material, but it does not reduce the number of single-use units entering circulation. Reuse changes the unit economics: one well-designed container can displace dozens of disposable equivalents over its life.',
          'The obstacle is rarely the container. It is the reverse network behind it: collection points, washing standards, deposit handling, and tracking.'
        ]
      },
      {
        heading: 'Deposit-Return Systems That Work',
        paragraphs: [
          'The best-performing deposit systems share three traits: a small, uniform deposit; dense return infrastructure in everyday retail locations; and instant, frictionless refunds.',
          'When those conditions hold, return rates above 85% are achievable. When any one is missing, the system drifts back toward recycling at best.'
        ],
        quote: 'Reuse does not fail because containers are hard to design. It fails because return logistics are treated as an afterthought.'
      },
      {
        heading: 'Designing for the Fourth Use',
        paragraphs: [
          'A reusable package must survive washing, stacking, and branding refresh cycles without losing its seal or its shelf presence. That means designing for the fourth use, not the first.',
          'Material choice, label adhesion, and closure durability all need to be tested together. A container that cannot be re-labelled cheaply is a container that will be retired early.'
        ],
        list: [
          'Closure durability across repeated wash cycles.',
          'Label systems that support clean re-branding.',
          'Nesting and stacking profiles for efficient transport.',
          'Trackable identifiers for deposit and return handling.'
        ]
      }
    ],
    tags: ['Reusable Packaging', 'Deposit Return', 'Reverse Logistics', 'Circular Design'],
    related: ['restaurant-food-waste-biogas', 'net-zero-circular-supply-chains', 'micro-composting-high-density']
  },
  {
    slug: 'micro-composting-high-density',
    category: 'Urban Composting',
    date: 'October 19, 2026',
    readTime: '7 min read',
    title: 'Decentralized Micro-Composting in High-Density Cities',
    heroTitle: 'Decentralized Micro-Composting',
    heroAccent: 'in High-Density Cities',
    excerpt: 'How localized commercial vermicomposting cuts landfill methane while supplying nutrients to rooftop farms.',
    heroImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Dark compost, a scoop, and young seedlings in a garden',
    coverImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Organic food scraps being prepared for composting',
    coverCaption: 'Neighbourhood-scale composting keeps organic material close to where it is generated and consumed.',
    author: {
      name: 'Clara Sorensen',
      role: 'Soil Microbiologist',
      bio: 'Clara designs and operates decentralised composting systems for dense urban environments. Her research focuses on microbial process control, odour management, and compost quality certification.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Methane Avoidance:</strong> Diverting food scraps from landfill prevents anaerobic methane generation.',
      '<strong>Local Processing:</strong> Micro-sites inside neighbourhoods remove collection miles from the organic stream.',
      '<strong>Local Offtake:</strong> Castings sold to rooftop farms and landscapers close the nutrient loop nearby.'
    ],
    sections: [
      {
        heading: 'The Methane Problem in Urban Food Waste',
        paragraphs: [
          'When food scraps are buried in landfill, they decompose without oxygen and release methane, a greenhouse gas with far more short-term warming power than carbon dioxide. Cities that treat organics as a disposal problem are effectively subsidising emissions.',
          'The alternative is not always a distant industrial facility. In dense neighbourhoods, small-scale composting can capture that carbon close to where the food is generated.'
        ]
      },
      {
        heading: 'Vermicomposting at Neighborhood Scale',
        paragraphs: [
          'Commercial vermicomposting uses controlled worm beds to convert pre-consumer food scraps and landscaping trimmings into castings within weeks. A well-run micro-site can process two to five tonnes per week while staying indoors and odour-controlled.',
          'ReCycleHub&rsquo;s micro-sites are sited inside commercial buildings, markets, and school complexes. Feedstock travels floors or blocks rather than across the city, which removes collection miles from the equation.'
        ],
        list: [
          'Indoor, climate-controlled worm beds.',
          'Pre-consumer feedstock from markets and kitchens.',
          'Odour management through carbon balancing.',
          'On-site castings screening and bagging.'
        ]
      },
      {
        heading: 'From Compost to Rooftop Farm',
        paragraphs: [
          'The output matters as much as the input. Certified castings and compost blends are sold back to rooftop farms, urban gardens, and landscapers, closing a local nutrient loop.',
          'That local offtake makes the economics resilient: the same neighbourhood that produces the waste also consumes the fertiliser.'
        ],
        quote: 'The shortest distance between a food scrap and a new harvest is a neighbourhood compost site.'
      }
    ],
    tags: ['Urban Composting', 'Vermicomposting', 'Food Waste', 'Urban Farming'],
    related: ['restaurant-food-waste-biogas', 'reuse-packaging-blue-bin', 'net-zero-circular-supply-chains']
  },
  {
    slug: 'recycled-content-procurement',
    category: 'Circular Economy',
    date: 'October 15, 2026',
    readTime: '5 min read',
    title: 'Why Recycled Content Procurement Is Becoming a Board-Level Metric',
    heroTitle: 'Why Recycled Content Procurement',
    heroAccent: 'Is a Board-Level Metric',
    excerpt: 'Procurement teams are tying PCR resin contracts to Scope 3 reporting, supplier resilience, and product footprints.',
    heroImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Procurement team collaborating in a modern office',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Business team reviewing documents and charts at a table',
    coverCaption: 'Recycled content now sits at the intersection of cost, compliance, and supply resilience.',
    author: {
      name: 'Marcus Chen',
      role: 'Procurement & ESG Advisor',
      bio: 'Marcus advises manufacturers on recycled-content sourcing, supplier assurance, and Scope 3 reporting. He previously led sustainable procurement programmes for a global packaging group.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Board Visibility:</strong> Recycled content now reports alongside emissions, cost, and supply risk.',
      '<strong>Contract Rigour:</strong> Strong PCR agreements define feedstock origin, assay frequency, and tolerance bands.',
      '<strong>Audit Ready:</strong> Verified recovery outcomes are replacing nominal recycled percentages.'
    ],
    sections: [
      {
        heading: 'From Cost Line to Strategic Metric',
        paragraphs: [
          'Recycled content was once a procurement tactic for shaving cost. Today it appears on board dashboards because it sits at the intersection of Scope 3 reporting, supply resilience, and product-level environmental claims.',
          'Buyers who lock in certified PCR resin are buying more than material; they are buying auditable emissions reductions and a hedge against virgin-price volatility.'
        ]
      },
      {
        heading: 'What a Good PCR Contract Looks Like',
        paragraphs: [
          'A serious recycled-content contract specifies feedstock source, contamination tolerances, assay frequency, and chain-of-custody documentation. It also defines what happens when a batch misses spec.',
          'The strongest agreements tie volumes to verified recovery outcomes rather than nominal percentages, which makes the circular claim defensible at audit time.'
        ],
        list: [
          'Defined feedstock origin and processing route.',
          'Bale assay frequency and tolerance bands.',
          'Chain-of-custody documentation requirements.',
          'Volume commitments tied to verified recovery.'
        ]
      },
      {
        heading: 'Reporting Without Greenwashing',
        paragraphs: [
          'Regulators are moving from voluntary disclosure toward mandatory assurance. A recycled-content number that cannot be traced to a supplier, batch, and processing date will not survive that shift.',
          'Procurement teams that build documentation into the contract today will spend far less time reconstructing evidence later.'
        ],
        quote: 'The most expensive recycled-content claim is the one you cannot prove.'
      }
    ],
    tags: ['PCR Procurement', 'Scope 3', 'ESG Reporting', 'Supply Resilience'],
    related: ['net-zero-circular-supply-chains', 'reuse-packaging-blue-bin', 'machine-vision-mrf-economics']
  },
  {
    slug: 'second-life-ev-batteries',
    category: 'E-Waste & Batteries',
    date: 'October 09, 2026',
    readTime: '7 min read',
    title: 'Second-Life EV Batteries Are Powering the Circular Grid',
    heroTitle: 'Second-Life EV Batteries',
    heroAccent: 'Powering the Circular Grid',
    excerpt: 'Retired mobility packs are graded, rebuilt, and redeployed as commercial storage, delivering value without new mining.',
    heroImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Electric vehicle charging connector plugged into a car',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'Electric vehicle connected to a charging station',
    coverCaption: 'Retired mobility packs retain most of their capacity for stationary storage applications.',
    author: {
      name: 'Aisha Bello',
      role: 'Energy Storage Engineer',
      bio: 'Aisha engineers second-life battery systems for commercial and grid applications. Her work covers pack grading, module matching, thermal design, and safety certification.',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Grading First:</strong> State-of-health measurement decides whether a pack is rebuilt or routed to material recovery.',
      '<strong>Shared Embodied Carbon:</strong> Second life spreads manufacturing emissions across two useful service lives.',
      '<strong>Growing Feedstock:</strong> First-generation EV packs are retiring in volumes that exceed current rebuild capacity.'
    ],
    sections: [
      {
        heading: 'Grading Retired Mobility Packs',
        paragraphs: [
          'An electric vehicle battery that no longer meets range requirements still retains most of its capacity for stationary storage. The first step in second life is grading: measuring state of health, checking cell balance, and inspecting for mechanical damage.',
          'Packs that fail grading are routed to hydrometallurgical recovery. Packs that pass enter a rebuild process with a documented health record.'
        ]
      },
      {
        heading: 'Rebuilding Battery Energy Storage',
        paragraphs: [
          'Second-life modules are reconfigured into stationary racks with new thermal management, new battery management electronics, and application-specific safety limits.',
          'Because the cells are already manufactured, embodied carbon is effectively shared across two service lives. That is what makes second-life storage attractive for commercial peak-shaving and backup applications.'
        ],
        list: [
          'Health and safety grading of retired packs.',
          'Module-level reconfiguration and matching.',
          'New thermal and battery management systems.',
          'Certified performance and warranty testing.'
        ]
      },
      {
        heading: 'The Economics of Second Life',
        paragraphs: [
          'Second-life storage competes with new lithium systems on upfront price and with diesel generators on operating emissions. Its sweet spot is medium-duration, high-cycle applications where weight and volume are not critical.',
          'As first-generation mobility packs reach retirement in volume, feedstock supply will grow faster than specialised rebuild capacity, a gap that certified operators are well placed to fill.'
        ],
        quote: 'A battery is too valuable to be used only once.'
      }
    ],
    tags: ['Second Life', 'EV Batteries', 'Energy Storage', 'Circular Grid'],
    related: ['lithium-battery-hydrometallurgy', 'net-zero-circular-supply-chains', 'recycled-content-procurement']
  },
  {
    slug: 'restaurant-food-waste-biogas',
    category: 'Urban Composting',
    date: 'October 03, 2026',
    readTime: '6 min read',
    title: 'Turning Restaurant Food Waste into Biogas and Liquid Fertiliser',
    heroTitle: 'Turning Restaurant Food Waste',
    heroAccent: 'into Biogas & Fertiliser',
    excerpt: 'A practical look at anaerobic digestion systems that turn kitchen waste into biogas, power, and liquid fertiliser.',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=85',
    heroAlt: 'Fresh produce displayed in a grocery market',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80',
    coverAlt: 'A table of fresh food ingredients and prepared dishes',
    coverCaption: 'Source-separated kitchen waste is the critical upstream control for reliable biogas production.',
    author: {
      name: 'Daniel Okafor',
      role: 'Bioenergy Operations Lead',
      bio: 'Daniel operates anaerobic digestion and bioenergy facilities for commercial food waste. He focuses on feedstock quality, process stability, and digestate reuse.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80'
    },
    takeaways: [
      '<strong>Ideal Feedstock:</strong> Restaurant food waste is wet, dense, and consistent, making it well suited to anaerobic digestion.',
      '<strong>Revenue Stack:</strong> Avoided disposal fees, energy savings, and renewable gas certificates combine to improve payback.',
      '<strong>Nutrient Loop:</strong> Digestate returns to urban farms and landscaping as liquid fertiliser and soil conditioner.'
    ],
    sections: [
      {
        heading: 'Anaerobic Digestion Behind the Kitchen Door',
        paragraphs: [
          'Restaurant food waste is wet, dense, and consistent, ideal feedstock for anaerobic digestion. A sealed digester converts it into biogas and a nutrient-rich digestate without the odour and pests of open composting.',
          'For a mid-sized restaurant, an on-site or shared neighbourhood digester can divert several tonnes of waste per month while producing energy used on the premises.'
        ]
      },
      {
        heading: 'Turning Biogas into Revenue',
        paragraphs: [
          'Biogas is roughly 60% methane. After scrubbing, it can fuel a combined heat and power unit, feed a boiler, or be upgraded to biomethane. The revenue stack combines avoided disposal fees, energy savings, and, in some markets, renewable gas certificates.',
          'The key operational discipline is feedstock consistency: too much oil or too much acid shifts the microbial balance and stalls gas production.'
        ],
        list: [
          'Feedstock sorting and maceration.',
          'Sealed anaerobic digestion.',
          'Gas scrubbing and combined heat and power.',
          'Digestate dewatering and storage.'
        ]
      },
      {
        heading: 'Liquid Fertiliser and the Closed Loop',
        paragraphs: [
          'The liquid fraction of digestate is a nitrogen-rich fertiliser that can be applied to urban farms and landscaping. The solid fraction becomes a soil conditioner.',
          'Together they close the loop from kitchen to soil, provided contamination is kept out of the input stream. That makes source separation the single most important upstream control.'
        ],
        quote: 'Biogas starts with a bin, not a digester.'
      }
    ],
    tags: ['Biogas', 'Anaerobic Digestion', 'Food Waste', 'Liquid Fertiliser'],
    related: ['micro-composting-high-density', 'reuse-packaging-blue-bin', 'net-zero-circular-supply-chains']
  }
];

const BLOG_DEFAULT_COMMENTS = [
  { name: 'Priya Nair', time: '2 days ago', text: 'The practical detail in this piece is excellent. We are testing a similar approach on our commercial routes and the operational notes are genuinely useful.' },
  { name: 'Tom Becker', time: 'Yesterday', text: 'Shared this with our facilities team. The section on verification is the part most vendors skip.' }
];

const BLOG_CATEGORY_ICONS = {
  'Technology & AI': 'fa-solid fa-microchip',
  'Circular Economy': 'fa-solid fa-arrows-spin',
  'E-Waste & Batteries': 'fa-solid fa-battery-half',
  'Urban Composting': 'fa-solid fa-seedling'
};

let activeArticle = null;
let activeCommentCount = 0;

function getArticleInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

function getBlogArticleBySlug(slug) {
  return BLOG_DETAIL_ARTICLES.find(article => article.slug === slug) || null;
}

function renderBlogArticle(article) {
  activeArticle = article;

  const url = new URL(window.location.href);
  url.searchParams.set('post', article.slug);

  try {
    window.history.replaceState({}, '', url.toString());
  } catch (error) {
    /* Fall back to the original URL when history is unavailable. */
  }

  document.title = `${article.title} – ReCycleHub Insights`;

  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', article.excerpt);

  const heroImage = document.getElementById('articleHeroImage');
  if (heroImage) {
    heroImage.src = article.heroImage;
    heroImage.alt = article.heroAlt || article.title;
  }

  const heroIcon = document.getElementById('articleHeroIcon');
  if (heroIcon) heroIcon.className = BLOG_CATEGORY_ICONS[article.category] || 'fa-solid fa-newspaper';

  const heroBadge = document.getElementById('articleHeroBadge');
  if (heroBadge) heroBadge.textContent = `${article.category} • ${article.readTime}`;

  const heroTitle = document.getElementById('articleHeroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = `${article.heroTitle}<br><span class="page-hero-accent">${article.heroAccent}</span>`;
  }

  const heroDesc = document.getElementById('articleHeroDesc');
  if (heroDesc) heroDesc.textContent = article.excerpt;

  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  if (breadcrumbCategory) breadcrumbCategory.textContent = article.category;

  const breadcrumbTitle = document.getElementById('breadcrumbTitle');
  if (breadcrumbTitle) breadcrumbTitle.textContent = article.title;

  const coverImage = document.getElementById('articleCoverImage');
  if (coverImage) {
    coverImage.src = article.heroImage;
    coverImage.alt = article.heroAlt || article.title;
  }

  const coverCaption = document.getElementById('articleCoverCaption');
  if (coverCaption) coverCaption.textContent = article.heroAlt || article.title;

  const bylineAvatar = document.getElementById('articleBylineAvatar');
  if (bylineAvatar) {
    bylineAvatar.src = article.author.avatar;
    bylineAvatar.alt = article.author.name;
  }

  const bylineName = document.getElementById('articleBylineName');
  if (bylineName) bylineName.textContent = article.author.name;

  const bylineRole = document.getElementById('articleBylineRole');
  if (bylineRole) bylineRole.textContent = article.author.role;

  const bylineDate = document.getElementById('articleBylineDate');
  if (bylineDate) bylineDate.textContent = article.date;

  const bylineRead = document.getElementById('articleBylineRead');
  if (bylineRead) bylineRead.textContent = article.readTime;

  const bylineCategory = document.getElementById('articleBylineCategory');
  if (bylineCategory) bylineCategory.textContent = article.category;

  const lead = document.getElementById('articleLead');
  if (lead) lead.textContent = article.excerpt;

  const takeaways = document.getElementById('articleTakeawaysList');
  if (takeaways) {
    takeaways.innerHTML = article.takeaways
      .map(item => `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>${item}</span></li>`)
      .join('');
  }

  renderArticleBody(article);
  renderArticleToc(article);
  renderArticleTags(article);
  renderAuthorCard(article);
  renderRelatedArticles(article);
  renderSidebarArticles(article);
  renderArticleComments(article);
  renderShareLinks(article, url.toString());

  const shareCopyBtn = document.getElementById('shareCopyBtn');
  if (shareCopyBtn) shareCopyBtn.addEventListener('click', copyArticleLink);
}

function renderArticleBody(article) {
  const body = document.getElementById('articleBody');
  if (!body) return;

  body.innerHTML = article.sections.map((section, index) => {
    const sectionId = `article-section-${index + 1}`;
    let html = `<section class="blog-detail-chapter" aria-labelledby="${sectionId}">`;
    html += `<h2 id="${sectionId}">${section.heading}</h2>`;

    (section.paragraphs || []).forEach(paragraph => {
      html += `<p>${paragraph}</p>`;
    });

    if (section.list && section.list.length) {
      html += `<ul class="blog-detail-list">${section.list.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    if (section.quote) {
      html += `<blockquote class="blog-detail-quote"><i class="fa-solid fa-quote-left" aria-hidden="true"></i><p>${section.quote}</p></blockquote>`;
    }

    if (section.table) {
      const headers = section.table.headers.map(header => `<th scope="col">${header}</th>`).join('');
      const rows = section.table.rows
        .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
        .join('');
      html += `
        <div class="blog-detail-table-wrap">
          <table class="blog-detail-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    html += '</section>';
    return html;
  }).join('');
}

function renderArticleToc(article) {
  const toc = document.getElementById('articleToc');
  if (!toc) return;

  toc.innerHTML = article.sections
    .map((section, index) => `<li><a href="#article-section-${index + 1}">${section.heading}</a></li>`)
    .join('');
}

function renderArticleTags(article) {
  const tags = document.getElementById('articleTags');
  if (!tags) return;

  tags.innerHTML = (article.tags || [])
    .map(tag => `<span class="blog-detail-tag">${tag}</span>`)
    .join('');
}

function renderAuthorCard(article) {
  const card = document.getElementById('articleAuthorCard');
  if (!card) return;

  card.innerHTML = `
    <img src="${article.author.avatar}" alt="${article.author.name}" loading="lazy">
    <div class="blog-detail-author-copy">
      <span class="badge badge-forest">Principal Author</span>
      <h3>${article.author.name}</h3>
      <div class="blog-detail-author-title">${article.author.role}</div>
      <p>${article.author.bio}</p>
    </div>`;
}

function renderRelatedArticles(article) {
  const grid = document.getElementById('relatedArticlesGrid');
  if (!grid) return;

  const related = (article.related || [])
    .map(getBlogArticleBySlug)
    .filter(Boolean)
    .slice(0, 3);

  grid.innerHTML = related.map((item, index) => `
    <article class="card card-hover blog-detail-related-card reveal${index ? ` reveal-delay-${index}` : ''}">
      <a href="blog-details.html?post=${item.slug}" class="blog-detail-related-media" aria-label="Read ${item.title}">
        <img src="${item.heroImage}" alt="${item.heroAlt || item.title}" loading="lazy">
      </a>
      <div class="blog-detail-related-content">
        <div class="blog-detail-related-meta">
          <span class="blog-category-pill">${item.category}</span>
          <span>${item.readTime}</span>
        </div>
        <h4><a href="blog-details.html?post=${item.slug}">${item.title}</a></h4>
        <p>${item.excerpt}</p>
        <a href="blog-details.html?post=${item.slug}" class="blog-card-link">Read Story <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </article>`).join('');
}

function renderSidebarArticles(article) {
  const list = document.getElementById('sidebarArticleList');
  if (!list) return;

  const related = (article.related || [])
    .map(getBlogArticleBySlug)
    .filter(Boolean)
    .slice(0, 3);

  list.innerHTML = related.map(item => `
    <a class="blog-detail-mini-post" href="blog-details.html?post=${item.slug}">
      <img src="${item.heroImage}" alt="${item.heroAlt || item.title}" loading="lazy">
      <span>
        <strong>${item.title}</strong>
        <small>${item.date} • ${item.readTime}</small>
      </span>
    </a>`).join('');
}

function renderArticleComments(article) {
  const list = document.getElementById('commentsList');
  if (!list) return;

  const comments = article.comments && article.comments.length ? article.comments : BLOG_DEFAULT_COMMENTS;
  activeCommentCount = comments.length;

  list.innerHTML = comments.map(comment => `
    <div class="blog-comment">
      <div class="blog-comment-avatar" aria-hidden="true">${getArticleInitials(comment.name)}</div>
      <div class="blog-comment-body">
        <div class="blog-comment-head">
          <strong>${comment.name}</strong>
          <span>${comment.time}</span>
        </div>
        <p>${comment.text}</p>
      </div>
    </div>`).join('');

  updateCommentCount();
}

function updateCommentCount() {
  const badge = document.getElementById('commentCountBadge');
  if (badge) {
    badge.textContent = `${activeCommentCount} ${activeCommentCount === 1 ? 'Comment' : 'Comments'}`;
  }
}

function renderShareLinks(article, pageUrl) {
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(pageUrl);

  const twitter = document.getElementById('shareTwitter');
  if (twitter) twitter.href = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const linkedin = document.getElementById('shareLinkedIn');
  if (linkedin) linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const facebook = document.getElementById('shareFacebook');
  if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

function copyArticleLink() {
  const url = window.location.href;

  const done = () => showToast('Link Copied', 'Article link copied to your clipboard.', 'success');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(done).catch(() => legacyCopy(url, done));
  } else {
    legacyCopy(url, done);
  }
}

function legacyCopy(text, done) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    done();
  } catch (error) {
    showToast('Copy Failed', 'Please copy the article URL from your browser.', 'error');
  }
  document.body.removeChild(textarea);
}

function addComment() {
  const author = document.getElementById('commentAuthor').value.trim();
  const email = document.getElementById('commentEmail').value.trim();
  const text = document.getElementById('commentText').value.trim();

  if (!author || !email || !text) {
    showToast('Missing Details', 'Please complete your name, email, and comment.', 'warning');
    return;
  }

  const list = document.getElementById('commentsList');
  const comment = document.createElement('div');
  comment.className = 'blog-comment is-new';
  comment.innerHTML = `
    <div class="blog-comment-avatar" aria-hidden="true">${getArticleInitials(author)}</div>
    <div class="blog-comment-body">
      <div class="blog-comment-head">
        <strong>${escapeHtml(author)}</strong>
        <span class="badge badge-emerald">Just Now</span>
      </div>
      <p>${escapeHtml(text)}</p>
    </div>`;

  list.prepend(comment);
  document.getElementById('commentForm').reset();

  activeCommentCount += 1;
  updateCommentCount();
  showToast('Comment Posted', 'Your technical inquiry has been submitted.', 'success');
}

function initBlogDetails() {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('post') || params.get('slug') || params.get('id');
  const article = getBlogArticleBySlug(requestedSlug) || BLOG_DETAIL_ARTICLES[0];
  renderBlogArticle(article);
}

window.copyArticleLink = copyArticleLink;
window.addComment = addComment;
window.getBlogArticleBySlug = getBlogArticleBySlug;

initBlogDetails();
