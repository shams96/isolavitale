// ISOLA VITALE COMPLETE PRODUCT CATALOG
// 3 Collections: Laboratory, Daily, Cellular Chronos
// Updated: January 2026

// ============================================
// LABORATORY COLLECTION - Clinical Formulations
// ============================================

export const LABORATORY_COLLECTION = [
    {
        id: 'cellular-essence',
        slug: 'the-cellular-essence',
        name: 'THE CELLULAR ESSENCE',
        collection: 'laboratory',
        technologies: 'OS-01 SENOMORPHIC + GLP-1 + FERMENTED RENEWAL',
        step: 'Essence',
        truth: 'Revolutionary cellular senescence targeting',
        description: 'Our most revolutionary essence targeting cellular senescence at its source. Featuring our breakthrough OS-01 Senomorphic peptide technology, this transformative treatment eliminates aged cells while our proprietary GLP-1 Protection system enhances cellular energy and defense. Enhanced through precision fermentation for maximum bioavailability.',
        texture: 'Silky, water-light fluid with enhanced absorption',
        usage: 'Apply 2-3 pumps to cleansed skin morning and evening. Gently press into skin using upward motions. Follow with moisturizer. Use consistently for 28 days to see transformative results.',
        imageSrc: '/serum-uniform.png',
        fullPrice: 280,
        refillPrice: 240,
        subscriptionPrice: 224,
        subscriptionSavings: 20,
        benefits: [
            'Targets and eliminates senescent cells for visible age reversal',
            'Provides advanced metabolic protection against environmental stressors',
            'Delivers enhanced ingredient penetration through fermentation technology',
            'Visibly reduces fine lines, wrinkles, and age spots',
            'Improves skin texture, firmness, and luminosity'
        ],
        keyIngredients: [
            { name: 'OS-01 Senomorphic Peptide', benefit: 'Revolutionary technology that specifically targets cellular senescence' },
            { name: 'GLP-1 Protection Complex', benefit: 'Advanced metabolic support for enhanced cellular energy' },
            { name: 'Fermented Botanical Matrix', benefit: 'Enhanced bioavailability botanical complex' },
            { name: 'Hyaluronic Acid Complex', benefit: 'Multi-molecular weight for deep hydration' },
            { name: 'Niacinamide', benefit: 'Barrier strengthening and pore refinement' }
        ],
        clinicalResults: {
            duration: '28 days',
            results: [
                { metric: 'Reduction in visible fine lines', value: '47%' },
                { metric: 'Improvement in skin firmness', value: '38%' },
                { metric: 'Increase in cellular renewal activity', value: '52%' },
                { metric: 'Improvement in overall radiance', value: '41%' }
            ]
        },
        whoItsFor: 'Those seeking our most advanced anti-aging technology. Ideal for mature skin showing signs of cellular damage, loss of firmness, and visible aging.'
    },
    {
        id: 'barrier-cream',
        slug: 'the-barrier-cream',
        name: 'THE BARRIER CREAM',
        collection: 'laboratory',
        technologies: 'DWAT RESTORATION + POSTBIOTIC COMPLEX',
        step: 'Moisturizer',
        truth: 'Deep barrier restoration and microbiome balance',
        description: 'Revolutionary barrier repair technology that rebuilds skin\'s fundamental moisture retention capabilities. Our exclusive DWAT (Deep Water Attraction Technology) works synergistically with our Postbiotic Microbiome Complex to strengthen skin\'s protective barrier and optimize beneficial bacteria balance.',
        texture: 'Rich, restorative cream with lightweight finish',
        usage: 'Apply generously to face and neck morning and evening after cleansing and essence. Can be used alone or under SPF during day. Perfect as final step in evening routine.',
        imageSrc: '/cream.png',
        fullPrice: 220,
        refillPrice: 200,
        subscriptionPrice: 176,
        subscriptionSavings: 20,
        benefits: [
            'Rebuilds and strengthens the skin\'s protective barrier',
            'Provides 24-hour moisture retention and hydration',
            'Balances and optimizes skin microbiome health',
            'Reduces sensitivity and environmental reactivity',
            'Improves skin resilience and long-term health'
        ],
        keyIngredients: [
            { name: 'DWAT Technology', benefit: 'Deep barrier restoration and moisture retention' },
            { name: 'Postbiotic Complex', benefit: 'Microbiome-balancing beneficial bacteria metabolites' },
            { name: 'Ceramide Blend', benefit: 'Barrier-strengthening lipid complex' },
            { name: 'Squalane', benefit: 'Lightweight moisture sealing and protection' },
            { name: 'Panthenol (Pro-Vitamin B5)', benefit: 'Soothing and barrier repair' }
        ],
        clinicalResults: {
            duration: '21 days',
            results: [
                { metric: 'Improvement in barrier function', value: '63%' },
                { metric: 'Increase in moisture retention', value: '72%' },
                { metric: 'Reduction in skin sensitivity', value: '45%' },
                { metric: 'Improvement in microbiome balance', value: '58%' }
            ]
        },
        whoItsFor: 'Those with compromised barriers, sensitive skin, or persistent dryness. Essential for anyone seeking to strengthen skin\'s natural defense system.'
    },
    {
        id: 'shield-spf-50',
        slug: 'the-shield-spf-50',
        name: 'THE SHIELD SPF 50',
        collection: 'laboratory',
        technologies: 'ECTOIN ENVIRONMENTAL + FERMENTED DEFENSE',
        step: 'SPF',
        truth: 'Ultimate environmental protection',
        description: 'Ultimate environmental protection combining broad-spectrum SPF 50 with our Ectoin Environmental Defense technology. This extremophile-derived molecule provides unprecedented protection against pollution, blue light, and oxidative stress while our Fermented Defense Matrix enhances skin resilience.',
        texture: 'Velvet-matte, invisible mineral shield',
        usage: 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating. Use as final step in morning routine.',
        imageSrc: '/hero-cream.png',
        fullPrice: 180,
        refillPrice: 190,
        subscriptionPrice: 144,
        subscriptionSavings: 20,
        benefits: [
            'Provides broad-spectrum SPF 50 protection against UVA/UVB rays',
            'Shields against pollution, blue light, and environmental toxins',
            'Prevents oxidative stress and premature aging',
            'Maintains skin hydration without greasiness',
            'Enhances natural defense mechanisms'
        ],
        keyIngredients: [
            { name: 'Zinc Oxide & Titanium Dioxide', benefit: 'Mineral broad-spectrum protection' },
            { name: 'Ectoin', benefit: 'Extremophile-derived environmental shield technology' },
            { name: 'Fermented Antioxidant Complex', benefit: 'Enhanced protection against free radicals' },
            { name: 'Hyaluronic Acid', benefit: 'Hydration without heaviness' },
            { name: 'Iron Oxides', benefit: 'Blue light protection' }
        ],
        clinicalResults: {
            duration: 'Immediate',
            results: [
                { metric: 'Protection against UVA/UVB rays', value: '98.7%' },
                { metric: 'Reduction in pollution-induced damage', value: '74%' },
                { metric: 'Protection against blue light damage', value: '82%' },
                { metric: 'Non-comedogenic and reef-safe', value: '100%' }
            ]
        },
        whoItsFor: 'Essential for all skin types seeking comprehensive environmental protection. Perfect for urban environments and outdoor activities.'
    },
    {
        id: 'nocturnal-treatment',
        slug: 'the-nocturnal-treatment',
        name: 'THE NOCTURNAL TREATMENT',
        collection: 'laboratory',
        technologies: 'OS-01 + L-ORNITHINE + GLP-1 + FERMENTED RECOVERY',
        step: 'Night Treatment',
        truth: 'Complete overnight cellular renewal',
        description: 'Our most comprehensive overnight renewal treatment featuring the complete Isola Vitale technology matrix. This intensive treatment combines all four breakthrough technologies to maximize cellular repair and regeneration during sleep\'s optimal recovery phase.',
        texture: 'Rich, restorative balm',
        usage: 'Apply generously to clean skin every evening. Allow to absorb completely before pillowcase contact. Begin with every other evening if new to intensive treatments.',
        imageSrc: '/Night Repair Peptide.png',
        fullPrice: 320,
        refillPrice: 240,
        subscriptionPrice: 256,
        subscriptionSavings: 20,
        benefits: [
            'Maximizes overnight cellular repair and regeneration',
            'Targets multiple signs of aging simultaneously',
            'Restores skin volume and density while you sleep',
            'Enhances natural recovery processes',
            'Delivers transformative age reversal results'
        ],
        keyIngredients: [
            { name: 'Complete 4-Technology Matrix', benefit: 'OS-01, GLP-1, L-Ornithine, Fermented Complex' },
            { name: 'Retinyl Palmitate', benefit: 'Gentle vitamin A for cellular renewal' },
            { name: 'Peptide Complex', benefit: 'Collagen-boosting and firming peptides' },
            { name: 'Bakuchiol', benefit: 'Natural retinol alternative for sensitive skin' },
            { name: 'Ceramide Recovery Blend', benefit: 'Overnight barrier restoration' }
        ],
        clinicalResults: {
            duration: '56 days',
            results: [
                { metric: 'Improvement in skin density and volume', value: '54%' },
                { metric: 'Reduction in deep wrinkles', value: '67%' },
                { metric: 'Improvement in overall skin firmness', value: '49%' },
                { metric: 'Enhancement of overnight recovery', value: '73%' }
            ]
        },
        whoItsFor: 'Those seeking maximum anti-aging benefits and cellular renewal. Ideal for mature skin requiring intensive overnight repair.'
    },
    {
        id: 'atmospheric-mist',
        slug: 'the-atmospheric-mist',
        name: 'THE ATMOSPHERIC MIST',
        collection: 'laboratory',
        technologies: 'ECTOIN HYDRATION + FERMENTED MATRIX',
        step: 'Mist',
        truth: 'Instant environmental protection',
        description: 'Luxury hydration mist providing instant environmental protection and cellular hydration. Our Ectoin Hydration technology creates a protective veil while Fermented Matrix delivers immediate and lasting moisture.',
        texture: 'Ultra-fine mist',
        usage: 'Spray 6-8 inches from face with eyes closed. Use throughout day as needed. Perfect over makeup or as part of skincare routine.',
        imageSrc: '/HydraBalance Toner Mist.png',
        fullPrice: 140,
        refillPrice: 85,
        subscriptionPrice: 112,
        subscriptionSavings: 20,
        benefits: [
            'Instant environmental hydration and protection',
            'Creates a weightless breathable shield against pollution',
            'Refreshes and revitalizes skin throughout the day',
            'Sets makeup while providing clinical skin tech',
            'Delivers immediate antioxidant protection'
        ],
        keyIngredients: [
            { name: 'Ectoin Hydration Tech', benefit: 'Extremophile protection against urban stress' },
            { name: 'Fermented Matrix', benefit: 'Bio-available hydration nutrients' },
            { name: 'Mineral Electrolytes', benefit: 'Skin-balancing mineral complex' }
        ],
        clinicalResults: {
            duration: 'Immediate',
            results: [
                { metric: 'Instant hydration boost', value: '82%' },
                { metric: 'Environmental protection', value: 'Verified' },
                { metric: 'Skin cooling effect', value: 'Significant' }
            ]
        },
        whoItsFor: 'Perfect for all skin types, especially those in urban environments or with active lifestyles requiring throughout-the-day protection and hydration.'
    },
    {
        id: 'purification-cleanser',
        slug: 'the-purification-cleanser',
        name: 'THE PURIFICATION CLEANSER',
        collection: 'laboratory',
        technologies: 'POSTBIOTIC MICROBIOME + GENTLE SURFACTANTS',
        step: 'Cleanser',
        truth: 'Microbiome-optimizing purification',
        description: 'Advanced cleansing technology that purifies while preserving and optimizing skin\'s microbiome. Our Postbiotic Microbiome Complex maintains beneficial bacteria while gentle surfactants remove impurities without disruption.',
        texture: 'Refreshing gel',
        usage: 'Massage 1-2 pumps onto damp skin for 30 seconds. Rinse thoroughly with lukewarm water. Use morning and evening as foundation of routine.',
        imageSrc: '/marble.png',
        fullPrice: 120,
        refillPrice: 75,
        subscriptionPrice: 96,
        subscriptionSavings: 20,
        benefits: [
            'Thoroughly cleanses without disrupting skin barrier',
            'Maintains and optimizes beneficial skin microbiome',
            'Removes makeup, sunscreen, and environmental pollutants',
            'Prepares skin for optimal product absorption',
            'Leaves skin balanced, clean, and comfortable'
        ],
        keyIngredients: [
            { name: 'Postbiotic Complex', benefit: 'Microbiome-supporting beneficial metabolites' },
            { name: 'Gentle Glucoside Surfactants', benefit: 'Non-stripping cleansing agents' },
            { name: 'Prebiotics', benefit: 'Nourishment for beneficial skin bacteria' },
            { name: 'Chamomile Extract', benefit: 'Soothing and anti-inflammatory' },
            { name: 'Glycerin', benefit: 'Moisture preservation during cleansing' }
        ],
        clinicalResults: {
            duration: '14 days',
            results: [
                { metric: 'Improved microbiome balance', value: 'Significant' },
                { metric: 'Reduced skin sensitivity', value: 'Notable' },
                { metric: 'Enhanced product absorption', value: 'Improved' },
                { metric: 'Cleaner, refined skin texture', value: 'Visible' }
            ]
        },
        whoItsFor: 'Essential for all skin types, especially sensitive or reactive skin requiring gentle yet effective cleansing.'
    },
    {
        id: 'ocular-complex',
        slug: 'the-ocular-complex',
        name: 'THE OCULAR COMPLEX',
        collection: 'laboratory',
        technologies: 'ALL 5 TECHNOLOGIES + SPECIALIZED EYE PEPTIDES',
        step: 'Eye Treatment',
        truth: 'Complete eye area transformation',
        description: 'Our most comprehensive eye treatment featuring the complete Isola Vitale 5-technology matrix specifically optimized for the delicate eye area. Enhanced with specialized peptides targeting dark circles, puffiness, and expression lines.',
        texture: 'Lightweight, fast-absorbing gel-cream',
        usage: 'Gently pat small amount around eye area using ring finger. Apply morning and evening after essence, before moisturizer.',
        imageSrc: '/aurabio-tech.png',
        fullPrice: 380,
        refillPrice: 165,
        subscriptionPrice: 304,
        subscriptionSavings: 20,
        benefits: [
            'Targets all signs of eye aging with complete technology matrix',
            'Reduces dark circles, puffiness, and fine lines',
            'Firms and tightens the delicate eye area',
            'Protects against environmental damage',
            'Provides intensive hydration without heaviness'
        ],
        keyIngredients: [
            { name: 'Complete 5-Technology Matrix', benefit: 'All breakthrough technologies optimized for eye area' },
            { name: 'Eye-Specific Peptides', benefit: 'Targeting circulation, firmness, and expression lines' },
            { name: 'Caffeine', benefit: 'Reduces puffiness and dark circles' },
            { name: 'Arnica', benefit: 'Anti-inflammatory and circulation enhancing' },
            { name: 'Light-Diffusing Particles', benefit: 'Immediate optical brightening effect' }
        ],
        clinicalResults: {
            duration: '28 days',
            results: [
                { metric: 'Reduction in dark circles', value: '52%' },
                { metric: 'Improvement in under-eye firmness', value: '47%' },
                { metric: 'Reduction in fine lines and crow\'s feet', value: '38%' },
                { metric: 'Improvement in overall eye area appearance', value: '61%' }
            ]
        },
        whoItsFor: 'Those seeking comprehensive eye area treatment with our most advanced technology. Essential for addressing multiple eye concerns simultaneously.'
    }
];

// ============================================
// DAILY COLLECTION - Effortless Luxury
// ============================================

export const DAILY_COLLECTION = [
    {
        id: 'vitality-essence',
        slug: 'the-vitality-essence',
        name: 'THE VITALITY ESSENCE',
        collection: 'daily',
        technologies: 'FERMENTED ENERGY + CELLULAR ACTIVATION',
        step: 'Essence',
        truth: 'Daily cellular vitality boost',
        description: 'Energizing essence that activates cellular vitality while providing luxury daily care. Our Fermented Energy Complex enhances cellular metabolism while Cellular Activation technology promotes natural renewal processes.',
        texture: 'Lightweight, energizing fluid',
        usage: 'Apply 2-3 pumps to cleansed skin morning and evening. Gently pat until absorbed. Follow with moisturizer.',
        imageSrc: '/serum-uniform.png',
        fullPrice: 160,
        refillPrice: 240,
        subscriptionPrice: 128,
        subscriptionSavings: 20,
        whoItsFor: 'Perfect for those seeking daily cellular support without heavy formulations. Ideal for all skin types wanting effortless luxury care.'
    },
    {
        id: 'comfort-cream',
        slug: 'the-comfort-cream',
        name: 'THE COMFORT CREAM',
        collection: 'daily',
        technologies: 'POSTBIOTIC BALANCE + BARRIER SUPPORT',
        step: 'Moisturizer',
        truth: 'All-day comfort and balance',
        description: 'Luxurious daily moisturizer that balances and comforts skin while providing essential barrier support. Lighter than our Laboratory Collection but still featuring advanced technology.',
        texture: 'Lightweight cream, semi-matte finish',
        usage: 'Apply to face and neck morning and evening. Perfect base for makeup.',
        imageSrc: '/cream.png',
        fullPrice: 180,
        refillPrice: 200,
        subscriptionPrice: 144,
        subscriptionSavings: 20,
        whoItsFor: 'Daily luxury care for all skin types. Perfect for those wanting advanced technology in comfortable, wearable formulation.'
    },
    {
        id: 'daylight-spf-30',
        slug: 'the-daylight-spf-30',
        name: 'THE DAYLIGHT SPF 30',
        collection: 'daily',
        technologies: 'ECTOIN PROTECTION + FERMENTED BASE',
        step: 'SPF',
        truth: 'Daily environmental protection',
        description: 'Daily environmental protection with luxury skincare benefits. Lighter than our Laboratory SPF 50 but still featuring Ectoin technology and fermented enhancement.',
        texture: 'Velvet-matte, invisible shield',
        usage: 'Apply generously as final morning step. Reapply as needed.',
        imageSrc: '/hero-cream.png',
        fullPrice: 120,
        refillPrice: 190,
        subscriptionPrice: 96,
        subscriptionSavings: 20,
        whoItsFor: 'Perfect for daily wear and those seeking lighter protection with skincare benefits.'
    },
    {
        id: 'evening-care',
        slug: 'the-evening-care',
        name: 'THE EVENING CARE',
        collection: 'daily',
        technologies: 'L-ORNITHINE + FERMENTED RECOVERY',
        step: 'Night Treatment',
        truth: 'Gentle overnight recovery',
        description: 'Gentle overnight treatment featuring our L-Ornithine technology for cellular recovery without intensity of full Laboratory formulation.',
        texture: 'Rich, restorative balm',
        usage: 'Apply to clean skin every evening as final step.',
        imageSrc: '/Night Repair Peptide.png',
        fullPrice: 140,
        refillPrice: 120,
        subscriptionPrice: 112,
        subscriptionSavings: 20,
        benefits: [
            'Gentle overnight cellular recovery and repair',
            'Restores moisture balance during sleep',
            'Softens fine lines and improves morning radiance',
            'Non-intensive formulation for sensitive skin',
            'Calms and prepares skin for next day defenses'
        ],
        keyIngredients: [
            { name: 'L-Ornithine Recovery Tech', benefit: 'Gentle nocturnal cellular support' },
            { name: 'Fermented Recovery Matrix', benefit: 'Bio-available repair nutrients' },
            { name: 'Melatonin', benefit: 'Topical antioxidant for sleep-cycle repair' }
        ],
        clinicalResults: {
            duration: '28 days',
            results: [
                { metric: 'Improvement in morning skin softness', value: '76%' },
                { metric: 'Reduction in overnight moisture loss', value: '44%' },
                { metric: 'Improvement in skin restfulness', value: '62%' }
            ]
        },
        whoItsFor: 'Those wanting gentle overnight treatment with advanced benefits but comfortable formulation.'
    },
    {
        id: 'preparation-toner',
        slug: 'the-preparation-toner',
        name: 'THE PREPARATION TONER',
        collection: 'daily',
        technologies: 'ECTOIN PREP + FERMENTED ENHANCEMENT',
        step: 'Toner',
        truth: 'Optimal absorption preparation',
        description: 'Preparing toner that optimizes skin for product absorption while providing environmental protection and fermented enhancement.',
        texture: 'Ultra-fine mist',
        usage: 'Apply after cleansing, before essence. Mist or pat onto skin.',
        imageSrc: '/HydraBalance Toner Mist.png',
        fullPrice: 100,
        refillPrice: 85,
        subscriptionPrice: 80,
        subscriptionSavings: 20,
        benefits: [
            'Optimizes skin surface for maximum technology absorption',
            'Provides a proactive environmental shield during prep',
            'Restores pH balance after cleansing',
            'Refines skin texture and minimizes visible pores',
            'Delivers immediate fermented nutrient infusion'
        ],
        keyIngredients: [
            { name: 'Ectoin Prep Matrix', benefit: 'Proactive protection during routine prep' },
            { name: 'Fermented Botanical Catalyst', benefit: 'Enhances subsequent product absorption' },
            { name: 'Witch Hazel Ferment', benefit: 'Pore refinement and clarity' }
        ],
        clinicalResults: {
            duration: 'Immediate',
            results: [
                { metric: 'Improvement in product absorption', value: '45%' },
                { metric: 'Reduction in surface impurities', value: '92%' },
                { metric: 'Hydration readiness score', value: '98%' }
            ]
        },
        whoItsFor: 'Essential preparation step for maximizing routine efficacy. Perfect for all skin types.'
    },
    {
        id: 'gentle-cleanser',
        slug: 'the-gentle-cleanser',
        name: 'THE GENTLE CLEANSER',
        collection: 'daily',
        technologies: 'FERMENTED CLEANSING + MICROBIOME CARE',
        step: 'Cleanser',
        truth: 'Gentle daily purification',
        description: 'Gentle daily cleanser with fermented enhancement and microbiome support for comfortable, effective cleansing.',
        texture: 'Refreshing gel',
        usage: 'Massage onto damp skin, rinse thoroughly. Use morning and evening.',
        imageSrc: '/marble.png',
        fullPrice: 85,
        refillPrice: 65,
        subscriptionPrice: 68,
        subscriptionSavings: 20,
        benefits: [
            'Gentle purification without stripping natural lipids',
            'Supports a healthy and resilient skin microbiome',
            'Removes daily impurities and light makeup',
            'Leaves skin feeling hydrated and refreshed',
            'Prepares skin for optimal technology absorption'
        ],
        keyIngredients: [
            { name: 'Fermented Cleansing Tech', benefit: 'High-efficacy non-stripping purification' },
            { name: 'Microbiome Care Complex', benefit: 'Nourishment for beneficial bacteria' },
            { name: 'Aloe Vera Ferment', benefit: 'Soothing hydration during cleansing' }
        ],
        clinicalResults: {
            duration: '14 days',
            results: [
                { metric: 'Reduction in skin redness', value: '31%' },
                { metric: 'Improvement in skin comfort', value: '92%' },
                { metric: 'Cleanliness without tightness', value: '98%' }
            ]
        },
        whoItsFor: 'Perfect introduction to Isola Vitale. Essential daily cleansing for all skin types.'
    },
    {
        id: 'radiant-eye-gel',
        slug: 'the-radiant-eye-gel',
        name: 'THE RADIANT EYE GEL',
        collection: 'daily',
        technologies: 'L-ORNITHINE + GENTLE FERMENTED MATRIX',
        step: 'Eye Treatment',
        truth: 'Daily eye area care',
        description: 'Gentle yet effective eye treatment with L-Ornithine technology and fermented enhancement for daily eye area care.',
        texture: 'Lightweight, fast-absorbing gel-cream',
        usage: 'Gently pat around eye area morning and evening.',
        imageSrc: '/aurabio-tech.png',
        fullPrice: 200,
        refillPrice: 180,
        subscriptionPrice: 160,
        subscriptionSavings: 20,
        benefits: [
            'Gentle daily lifting and brightening of the eye area',
            'Reduces visible signs of daily fatigue and dehydration',
            'Protects delicate eye skin from environmental damage',
            'Provides all-day hydration without migration',
            'Smooths and preps eye area for makeup application'
        ],
        keyIngredients: [
            { name: 'L-Ornithine Eye Support', benefit: 'Gentle daily recovery for eye contours' },
            { name: 'Gentle Fermented Matrix', benefit: 'Bio-available nutrient delivery' },
            { name: 'Squalane Eye Complex', benefit: 'Weightless moisture lock' }
        ],
        clinicalResults: {
            duration: '21 days',
            results: [
                { metric: 'Reduction in morning puffiness', value: '38%' },
                { metric: 'Improvement in eye radiance', value: '42%' },
                { metric: 'Hydration retention (12h)', value: '85%' }
            ]
        },
        whoItsFor: 'Those seeking daily eye care with advanced benefits in comfortable gel formulation.'
    }
];

// ============================================
// CELLULAR CHRONOS COLLECTION - Age-Specific
// ============================================

export const CELLULAR_CHRONOS_COLLECTION = [
    {
        id: 'clarity-gel',
        slug: 'the-clarity-gel',
        name: 'THE CLARITY GEL',
        collection: 'chronos',
        ageRange: '13-19',
        technologies: 'FERMENTED PREBIOTIC + GENTLE ACTIVES',
        step: 'Treatment',
        truth: 'Microbiome foundation for young skin',
        description: 'Gentle gel formulation designed specifically for young skin establishing healthy microbiome and preventing future concerns. Fermented prebiotics support beneficial bacteria while gentle actives maintain clarity.',
        texture: 'Lightweight gel',
        usage: 'Apply to clean skin morning and/or evening.',
        imageSrc: '/serum-uniform.png',
        fullPrice: 95,
        refillPrice: 80,
        subscriptionPrice: 76,
        subscriptionSavings: 20,
        benefits: [
            'Establishes a healthy skin microbiome foundation',
            'Gently maintains pore clarity without irritation',
            'Balances oil production and prevents congestion',
            'Strengthens adolescent skin barrier',
            'Lightweight, non-sticky luxury finish'
        ],
        keyIngredients: [
            { name: 'Fermented Prebiotic Matrix', benefit: 'Supports beneficial skin bacteria' },
            { name: 'Gentle Salicylic Ferment', benefit: 'Pore clarity without dryness' },
            { name: 'Niacinamide', benefit: 'Oil balancing and barrier support' }
        ],
        clinicalResults: {
            duration: '14 days',
            results: [
                { metric: 'Reduction in visible congestion', value: '42%' },
                { metric: 'Improvement in skin clarity', value: '55%' },
                { metric: 'Maintainance of healthy pH', value: '100%' }
            ]
        },
        whoItsFor: 'Teenagers establishing skincare routines and preventing future concerns.'
    },
    {
        id: 'prevention-essence',
        slug: 'the-prevention-essence',
        name: 'THE PREVENTION ESSENCE',
        collection: 'chronos',
        ageRange: '20-29',
        technologies: 'POSTBIOTIC DEFENSE + DNA PROTECTION',
        step: 'Essence',
        truth: 'Prevention before damage occurs',
        description: 'Prevention-focused essence with DNA protection technology to prevent cellular damage before it occurs. Postbiotic defense maintains optimal skin health during peak cellular activity years.',
        texture: 'Silky, water-light fluid',
        usage: 'Apply 2-3 pumps to cleansed skin morning and evening.',
        imageSrc: '/serum-uniform.png',
        fullPrice: 130,
        refillPrice: 110,
        subscriptionPrice: 104,
        subscriptionSavings: 20,
        benefits: [
            'Proactive defense against early cellular aging',
            'Shields skin from environmental DNA damage',
            'Maintains peak cellular energy and vitality',
            'Enhances natural luminosity and even tone',
            'Lightweight, breathable luxury formulation'
        ],
        keyIngredients: [
            { name: 'Postbiotic Defense Tech', benefit: 'Strengthens natural skin immunity' },
            { name: 'DNA Protection Complex', benefit: 'Helps prevent early cellular damage' },
            { name: 'Vitamin C Ferment', benefit: 'High-efficacy brightening and protection' }
        ],
        clinicalResults: {
            duration: '30 days',
            results: [
                { metric: 'Increase in antioxidant capacity', value: '68%' },
                { metric: 'Improvement in skin brightness', value: '41%' },
                { metric: 'Protection against early pollutants', value: 'Significant' }
            ]
        },
        whoItsFor: 'Young adults focused on prevention and maintaining skin health during active lifestyle years.'
    },
    {
        id: 'intervention-serum',
        slug: 'the-intervention-serum',
        name: 'THE INTERVENTION SERUM',
        collection: 'chronos',
        ageRange: '30-49',
        technologies: 'OS-01 + GLP-1 + ECTOIN + FERMENTED COMPLEX',
        step: 'Serum',
        truth: 'Targeted intervention at optimal time',
        description: 'Targeted intervention with four breakthrough technologies addressing first signs of aging while maintaining skin vitality. Combines prevention with correction for this crucial decade.',
        texture: 'Silky, water-light fluid',
        usage: 'Apply 2-3 pumps to cleansed skin morning and evening.',
        imageSrc: '/serum-uniform.png',
        fullPrice: 240,
        refillPrice: 200,
        subscriptionPrice: 192,
        subscriptionSavings: 20,
        benefits: [
            'Direct intervention for early signs of cellular senescence',
            'Restores skin volume and density during high-stress decades',
            'Neutralizes environmental stressors before damage manifests',
            'Improves skin elasticity and bounce',
            'Delivers high-potency OS-01 and GLP-1 benefits'
        ],
        keyIngredients: [
            { name: 'OS-01 Senomorphic Peptide', benefit: 'Targeted senescence reversal' },
            { name: 'GLP-1 Protection', benefit: 'Energy optimization for active skin' },
            { name: 'Ectoin Environmental', benefit: 'Daily stress protection' }
        ],
        clinicalResults: {
            duration: '28 days',
            results: [
                { metric: 'Improvement in skin firmness', value: '38%' },
                { metric: 'Reduction in expression line depth', value: '27%' },
                { metric: 'Increase in hydration levels', value: '45%' }
            ]
        },
        whoItsFor: 'Those in their 30s-40s addressing first signs of aging while maintaining skin vitality.'
    },
    {
        id: 'restoration-cream',
        slug: 'the-restoration-cream',
        name: 'THE RESTORATION CREAM',
        collection: 'chronos',
        ageRange: '50+',
        technologies: 'ALL 5 TECHNOLOGIES + COMPLETE RENEWAL MATRIX',
        step: 'Cream',
        truth: 'Complete cellular restoration',
        description: 'Complete restoration featuring all five Isola Vitale technologies for comprehensive cellular renewal and age reversal. Maximum technology concentration for mature skin requiring intensive restoration.',
        texture: 'Rich, restorative cream',
        usage: 'Apply generously to face and neck morning and evening.',
        imageSrc: '/cream.png',
        fullPrice: 290,
        refillPrice: 240,
        subscriptionPrice: 232,
        subscriptionSavings: 20,
        benefits: [
            'Deep restoration of cellular density and structure',
            'Comprehensive reversal of multiple visible signs of aging',
            'Intensive barrier replenishment for mature skin',
            'Restores youthful radiance and even skin tone',
            'Maximum concentration of Isola Vitale technologies'
        ],
        keyIngredients: [
            { name: 'Complete 5-Tech Matrix', benefit: 'Maximum anti-aging potential' },
            { name: 'DWAT Restoration', benefit: 'Deep hydration for mature barriers' },
            { name: 'Fermented Recovery', benefit: 'Optimized nutrient delivery' }
        ],
        clinicalResults: {
            duration: '56 days',
            results: [
                { metric: 'Improvement in skin density', value: '54%' },
                { metric: 'Reduction in deep-set wrinkles', value: '41%' },
                { metric: 'Improvement in skin elasticity', value: '39%' }
            ]
        },
        whoItsFor: 'Mature skin requiring comprehensive restoration and age reversal with maximum technology benefits.'
    }
];

// ============================================
// COMBINED PRODUCTS ARRAY
// ============================================

export const PRODUCTS = [
    ...LABORATORY_COLLECTION,
    ...DAILY_COLLECTION,
    ...CELLULAR_CHRONOS_COLLECTION
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProductBySlug(slug) {
    return PRODUCTS.find(p => p.slug === slug);
}

export function getRelatedProducts(currentSlug) {
    return PRODUCTS.filter(p => p.slug !== currentSlug).slice(0, 3);
}

export function getProductsByCollection(collection) {
    return PRODUCTS.filter(p => p.collection === collection);
}

export function getProductsByAgeRange(ageRange) {
    return CELLULAR_CHRONOS_COLLECTION.filter(p => p.ageRange === ageRange);
}

export function getAllCollections() {
    return [
        {
            id: 'laboratory',
            name: 'Laboratory Collection',
            description: 'Advanced Clinical Formulations',
            products: LABORATORY_COLLECTION
        },
        {
            id: 'daily',
            name: 'Daily Collection',
            description: 'Effortless Luxury Skincare',
            products: DAILY_COLLECTION
        },
        {
            id: 'chronos',
            name: 'Cellular Chronos Collection',
            description: 'Age-Specific Precision Skincare',
            products: CELLULAR_CHRONOS_COLLECTION
        }
    ];
}
