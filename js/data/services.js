/* =========================================
   BRIGHTSMILE DENTAL — SERVICES DATA
   ========================================= */

export const serviceCategories = [
  {
    id: "general",
    label: "General Dentistry",
    icon: "🦷",
    tagline: "Comprehensive care for the whole family",
    description: "Our general dentistry services form the foundation of lifelong oral health. From routine cleanings to complex restorations, we provide thorough, comfortable care for patients of all ages. We emphasize prevention and early detection to keep your smile healthy for decades.",
    benefits: [
      "Comprehensive oral exams & X-rays",
      "Professional cleanings & polishing",
      "Early cavity detection",
      "Personalized prevention plans",
      "Emergency same-day appointments",
      "Dental anxiety support available"
    ],
    services: [
      { name: "Exam & Cleaning", emoji: "🪥", desc: "Thorough exam plus professional cleaning. Recommended every 6 months for optimal health." },
      { name: "Tooth-Colored Fillings", emoji: "🦷", desc: "Composite resin fillings that blend naturally with your tooth. Metal-free options available." },
      { name: "Root Canal Therapy", emoji: "💊", desc: "Comfortable treatment to save an infected tooth and relieve pain. Same-day relief possible." },
      { name: "Extractions", emoji: "⚕️", desc: "Gentle tooth removal when necessary, including wisdom teeth. Sedation options available." },
      { name: "Crowns & Bridges", emoji: "👑", desc: "Custom-crafted restorations to protect damaged teeth or replace missing ones. CEREC same-day crowns available." }
    ]
  },
  {
    id: "cosmetic",
    label: "Cosmetic Dentistry",
    icon: "✨",
    tagline: "Transform your smile, transform your confidence",
    description: "Our cosmetic dentistry services are tailored to your unique smile goals. Whether you want subtle improvements or a complete transformation, Dr. Okafor brings artistry and precision to every case. Each treatment plan begins with a thorough consultation and digital smile preview.",
    benefits: [
      "Personalized smile analysis",
      "Digital smile preview before treatment",
      "Natural-looking results",
      "Minimally invasive techniques",
      "Long-lasting materials",
      "Combined treatment planning"
    ],
    services: [
      { name: "Teeth Whitening", emoji: "⚡", desc: "Professional in-office whitening up to 8 shades brighter in one appointment." },
      { name: "Porcelain Veneers", emoji: "✨", desc: "Ultra-thin porcelain shells that reshape, recolor, and restore your smile permanently." },
      { name: "Dental Bonding", emoji: "🎨", desc: "Tooth-colored composite resin applied to repair chips, gaps, or discoloration — no prep required." },
      { name: "Smile Makeover", emoji: "😁", desc: "Comprehensive transformation combining multiple cosmetic treatments for a complete smile reinvention." },
      { name: "Gum Contouring", emoji: "🔬", desc: "Laser gum reshaping to balance your gum line and reveal more of your beautiful teeth." }
    ]
  },
  {
    id: "orthodontics",
    label: "Orthodontics",
    icon: "📐",
    tagline: "Straight, confident smiles for teens and adults",
    description: "Straightening your teeth does more than improve appearance — it also improves bite function, makes teeth easier to clean, and reduces wear. We offer Invisalign clear aligners and traditional braces with flexible payment plans for teens and adults.",
    benefits: [
      "Free Invisalign consultation",
      "Clear aligners for teens and adults",
      "Accelerated treatment options",
      "Flexible payment plans",
      "In-house orthodontist (Dr. Patel)",
      "Digital treatment preview"
    ],
    services: [
      { name: "Invisalign", emoji: "📐", desc: "Clear, removable aligners that gradually straighten teeth. Virtually invisible and comfortable." },
      { name: "Traditional Braces", emoji: "⚙️", desc: "Metal or ceramic braces for complex alignment cases. Excellent precision and durability." },
      { name: "Retainers", emoji: "🏥", desc: "Custom retainers to maintain your perfect smile after treatment. Essential for long-term results." }
    ]
  },
  {
    id: "implants",
    label: "Dental Implants",
    icon: "🔩",
    tagline: "Permanent solutions for missing teeth",
    description: "Dental implants are the gold standard for replacing missing teeth — they look, feel, and function exactly like natural teeth. Our implant patients consistently report high satisfaction and restored confidence. We offer single implants through full-arch All-on-4 solutions.",
    benefits: [
      "Lifetime solution with proper care",
      "100% natural look and feel",
      "Preserves jawbone density",
      "No need to modify adjacent teeth",
      "All-on-4 full-arch available",
      "Financing from $89/month"
    ],
    services: [
      { name: "Single Tooth Implant", emoji: "🔩", desc: "Replace one missing tooth with a titanium implant and ceramic crown. The permanent solution." },
      { name: "Implant Bridge", emoji: "🌉", desc: "Replace multiple adjacent teeth with implant-supported bridge — no removable dentures." },
      { name: "All-on-4 / Full Arch", emoji: "🦷", desc: "Full upper or lower arch replacement on just four implants. Transform your smile in one day." },
      { name: "Bone Grafting", emoji: "⚕️", desc: "Rebuild bone density in preparation for implant placement when needed." }
    ]
  },
  {
    id: "pediatric",
    label: "Pediatric Dentistry",
    icon: "👶",
    tagline: "Gentle, fun dental care for your little ones",
    description: "Dr. Patel and our pediatric team create positive dental experiences that set kids up for a lifetime of healthy smiles. Our office has a dedicated children's area with kid-friendly décor and a friendly, patient team trained in managing dental anxiety in young patients.",
    benefits: [
      "Board-certified pediatric specialist",
      "Child-friendly office environment",
      "Gentle techniques for anxious kids",
      "Preventive sealants & fluoride",
      "First visit recommended at age 1",
      "Fun rewards program"
    ],
    services: [
      { name: "Children's Exam & Cleaning", emoji: "🌟", desc: "Gentle exam and polishing tailored for kids. We make it fun and positive from the very first visit." },
      { name: "Dental Sealants", emoji: "🛡️", desc: "Protective coating on back teeth that prevents cavities. Quick, painless, and highly effective." },
      { name: "Fluoride Treatment", emoji: "💧", desc: "Professional fluoride application to strengthen enamel and prevent decay in growing teeth." },
      { name: "First Visit Guide", emoji: "👋", desc: "Special welcome visit for toddlers — relaxed, educational, and focused on positive association." }
    ]
  },
  {
    id: "periodontal",
    label: "Gum Care",
    icon: "🌿",
    tagline: "Healthy gums are the foundation of a healthy smile",
    description: "Gum disease affects nearly half of adults over 30 and is a leading cause of tooth loss. Our periodontal team offers comprehensive gum disease treatment, from gentle deep cleanings to advanced gum therapy. Early detection and treatment protect both your oral and overall health.",
    benefits: [
      "Comprehensive periodontal screening",
      "Gentle scaling & root planing",
      "Laser gum therapy available",
      "Linked to systemic health outcomes",
      "Maintenance programs available",
      "Referrals to periodontist if needed"
    ],
    services: [
      { name: "Deep Cleaning (SRP)", emoji: "🌿", desc: "Scaling and root planing removes tartar buildup below the gumline to treat gum disease." },
      { name: "Gum Disease Therapy", emoji: "💊", desc: "Comprehensive periodontal treatment protocol to halt gum disease progression." },
      { name: "Gum Grafting Consultation", emoji: "⚕️", desc: "Assessment and referral for receding gums. Restore gum tissue and protect tooth roots." }
    ]
  },
  {
    id: "emergency",
    label: "Emergency Care",
    icon: "🚨",
    tagline: "Same-day emergency appointments available",
    description: "Dental emergencies don't wait — and neither do we. BrightSmile offers same-day emergency appointments for patients in pain. Call us first thing and we will do everything we can to see you the same day. Our emergency line is available 24/7 for guidance when our offices are closed.",
    benefits: [
      "Same-day emergency appointments",
      "24/7 emergency phone line",
      "Immediate pain relief priority",
      "All emergency types welcome",
      "Accepts walk-ins during hours",
      "Follow-up care included"
    ],
    services: [
      { name: "Severe Toothache", emoji: "😣", desc: "Immediate diagnosis and pain relief for acute dental pain. Call us — we'll see you today." },
      { name: "Broken or Chipped Tooth", emoji: "💔", desc: "Emergency repair for broken teeth from trauma or accidents. Cosmetic and structural restoration." },
      { name: "Lost Crown or Filling", emoji: "👑", desc: "Re-cementation or replacement of crowns and fillings that have fallen out. Fast, comfortable service." },
      { name: "Dental Abscess", emoji: "⚠️", desc: "Urgent treatment for infected teeth or gums. Don't wait — abscesses require immediate care." }
    ]
  }
];
