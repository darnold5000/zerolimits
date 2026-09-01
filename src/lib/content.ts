export const SITE = {
  name: "Zero Limits Baseball",
  phone: "(765) 341-9070",
  phoneHref: "tel:+17653419070",
  region: "Central Indiana",
  address: {
    venue: "Core Fitness Club",
    street: "149 E. High St.",
    city: "Mooresville",
    state: "IN",
    zip: "46158",
    full: "Core Fitness Club, 149 E. High St., Mooresville, IN 46158",
    mapQuery: "Core Fitness Club, 149 E High St, Mooresville, IN 46158",
  },
  facilityLocations: [
    {
      name: "Zero Limits 1 (ZL1)",
      description:
        "Located in the gravel parking lot behind the gym.",
    },
    {
      name: "Zero Limits 2 (ZL2)",
      description:
        "Located in the same parking lot, closer to the gym. Look for the blue and yellow Core Fitness Club sign.",
    },
  ],
  tagline:
    "Zero Limits Baseball provides year-round indoor facilities where players of all ages and abilities train.",
  facilitiesDescription:
    "Our facilities include full-length hitting and pitching tunnels, open turf training areas, and space for fielding, rotational power, arm care, and more.",
  heroHeadline: "Train Without Limits.",
  heroSubheadline:
    "At Zero Limits, we offer both group and private instruction designed to develop complete, confident, and athletic baseball players.",
  heroRegionLine:
    "Central Indiana's premier indoor baseball training facilities for hitters, pitchers, catchers, and fielders.",
} as const;

export const TRUST_ITEMS = [
  { label: "Year-Round Indoor Facilities", icon: "facility" },
  { label: "Private Lessons", icon: "private" },
  { label: "Group Training", icon: "group" },
  { label: "Youth & High School Players", icon: "players" },
  { label: "Experienced Coaches", icon: "coaches" },
] as const;

export const TRAINING_PILLARS = [
  {
    title: "Hitting",
    description:
      "Our group and private hitting lessons focus on developing a complete, confident hitter. Athletes receive instruction in proper mechanics, balance, timing, bat speed, pitch recognition, approach, and consistent hard contact. Each lesson is designed around the athlete's individual needs, with drills and coaching that help build an efficient, repeatable swing that translates to game performance.",
    image: "/images/training/hitting.jpg",
    imageAlt: "Baseball hitter in follow-through at home plate",
    imagePosition: "center",
    layout: "standard",
  },
  {
    title: "Pitching",
    description:
      "Our group and private pitching lessons focus on developing confident, efficient, and consistent pitchers. Instruction includes proper mechanics, balance, direction, command, velocity development, pitch execution, and game approach. Each athlete receives age-appropriate training based on individual needs, along with arm-care and strengthening exercises designed to support healthy development and improve performance on the mound.",
    image: "/images/training/pitching.jpg",
    imageAlt: "Pitcher delivering a pitch with catcher behind home plate",
    imagePosition: "center 32%",
    layout: "standard",
  },
  {
    title: "Catching",
    description:
      "Our group and private catching lessons focus on developing confident, skilled, and dependable catchers. Instruction includes receiving, blocking, throwing mechanics, footwork, transfers, pitch presentation, game awareness, and leadership. Each lesson uses position-specific and game-like drills to improve quickness, consistency, arm strength, and overall performance behind the plate.",
    image: "/images/training/catching.jpg",
    imageAlt: "Catcher in ready stance behind home plate",
    imagePosition: "center",
    layout: "standard",
  },
  {
    title: "Fielding",
    description:
      "Our group and private fielding lessons focus on developing confident, fundamentally sound defenders. Instruction includes proper footwork, glove work, fielding position, throwing mechanics, transfers, angles, range, and decision-making. Each lesson uses game-like drills and individual coaching to improve consistency, quickness, and overall defensive performance.",
    image: "/images/training/fielding.jpg",
    imageAlt: "Infielder fielding a ground ball",
    imagePosition: "center 42%",
    layout: "standard",
  },
  {
    title: "Sports Performance",
    description:
      "Our sports performance training helps athletes become stronger, faster, more explosive, and better prepared for competition. Training includes strength and conditioning, speed and agility, mobility and flexibility, rotational power, explosive movements, core development, and injury-risk reduction. Each athlete receives age-appropriate coaching focused on proper technique, improved athletic movement, and building strength and power that transfer directly to game performance.",
    image: "/images/training/sports-performance.jpg",
    imageAlt: "Athlete performing sled push strength training",
    layout: "wide",
  },
] as const;

export const FACILITY_RENTAL = [
  {
    id: "zl1",
    name: "Zero Limits 1 (ZL1)",
    shortName: "ZL1",
    pricePerHour: 60,
    building: "Small building",
  },
  {
    id: "zl2",
    name: "Zero Limits 2 (ZL2)",
    shortName: "ZL2",
    pricePerHour: 100,
    building: "Large building",
  },
] as const;

export const FACILITIES = [
  {
    id: "zl2",
    name: "ZL2",
    features: [
      {
        stat: "3",
        title: "Full-Length Pitching Tunnels",
        description:
          "Premium mounds and dedicated space for instruction and game-like training.",
      },
      {
        stat: "3",
        title: "Full-Length Hitting Tunnels",
        description:
          "Spacious batting tunnels with pitching machines for individual and group training.",
      },
      {
        stat: "Full-Size",
        title: "Turf Infield",
        description:
          "Built for defensive drills, team practices, and live game situations year-round.",
      },
    ],
    images: [
      {
        src: "/images/facility/tunnels-wide.jpg",
        alt: "Multiple full-length training tunnels at Zero Limits Baseball ZL2",
      },
      {
        src: "/images/facility/zl2-overview.jpg",
        alt: "Overview of the ZL2 indoor training facility",
      },
    ],
    imageLayout: "wide",
  },
  {
    id: "zl1",
    name: "ZL1",
    features: [
      {
        stat: "1",
        title: "Full-Length Pitching & Hitting Tunnel",
        description: null,
      },
      {
        stat: "1",
        title: "Full-Length Plyo Wall",
        description: "For arm care, rotational power, etc.",
      },
      {
        stat: "Open Turf",
        title: "Training Area",
        description: "For fielding, throwing, sports performance, etc.",
      },
    ],
    images: [
      {
        src: "/images/facility/zl1-group-training.jpg",
        alt: "Group training session at Zero Limits Baseball ZL1",
        imagePosition: "72% center",
      },
      {
        src: "/images/facility/zl1-pitching.jpg",
        alt: "Pitching instruction at Zero Limits Baseball ZL1",
      },
      {
        src: "/images/facility/zl1-hitting.jpg",
        alt: "Hitting practice in the ZL1 training tunnel",
      },
    ],
    imageLayout: "portrait",
  },
] as const;

export const WHY_CHOOSE = [
  "Year-round indoor training",
  "Private instruction",
  "Small group lessons",
  "Experienced coaches",
  "Affordable pricing",
  "Convenient online scheduling",
] as const;

export const COACHES = [
  { name: "Coach Derek DeVaughan", role: "Owner / Instructor" },
  { name: "Coach Eric McGaha", role: "Instructor" },
  { name: "Michael McAvene", role: "Pitching Instructor" },
  { name: "Tim Denny", role: "Instructor" },
  { name: "Blake Allen", role: "Instructor" },
] as const;

export const PRICING = [
  {
    id: "private",
    category: "1:1 Training",
    rates: [
      { duration: "30 Min", price: 50 },
      { duration: "60 Min", price: 75 },
      { duration: "90 Min", price: 125 },
    ],
    lessonKey: "privateLesson" as const,
  },
  {
    id: "group",
    category: "Group Training",
    rates: [
      { duration: "30 Min", price: 25 },
      { duration: "60 Min", price: 50 },
      { duration: "90 Min", price: 75 },
    ],
    lessonKey: "groupLesson" as const,
  },
] as const;

export const PRICING_NOTE =
  "20% off when siblings attend during the same week.";

export const TESTIMONIALS = [
  {
    quote:
      "I've had my boys working with Derek and the Zero Limits coaches for a couple years now. Very knowledgeable and reasonably priced — we have the ability to work out on a regular regimen and not break the bank. Highly recommend for both pitching and hitting.",
    author: "Dylan Jahnke",
  },
  {
    quote:
      "My son has been working with Derek for a year and has made great progress with pitching and hitting. We couldn't be happier with all he has learned. All of the staff — Coach Eric and Coach Michael — have been wonderful, helpful, and care about my son.",
    author: "Erin Johnson Shimp",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-facilities", label: "Our Facilities" },
  { href: "/our-coaches", label: "Our Coaches" },
  { href: "/contact", label: "Contact Us" },
] as const;
