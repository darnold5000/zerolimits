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
    "Zero Limits Baseball is a year-round indoor facility where players of all ages and abilities train.",
  facilityDescription:
    "The facility includes a full-length hitting and pitching tunnel. We can also accommodate open-area fielding, rotational power, arm care, and more.",
  heroHeadline: "Train Without Limits.",
  heroSubheadline:
    "Private instruction, hitting, pitching, catching and player development for athletes of every level.",
  heroRegionLine:
    "Central Indiana's premier indoor baseball training facility for hitters, pitchers, catchers, and fielders.",
} as const;

export const TRUST_ITEMS = [
  { label: "Year-Round Indoor Facility", icon: "facility" },
  { label: "Private Lessons", icon: "private" },
  { label: "Group Training", icon: "group" },
  { label: "Youth & High School Players", icon: "players" },
  { label: "Experienced Coaches", icon: "coaches" },
] as const;

export const TRAINING_PILLARS = [
  {
    title: "Hitting",
    description: "Private and group instruction.",
    icon: "hitting",
  },
  {
    title: "Pitching",
    description: "Mechanics and velocity development.",
    icon: "pitching",
  },
  {
    title: "Catching",
    description: "Receiving, blocking and throwing.",
    icon: "catching",
  },
  {
    title: "Fielding",
    description: "Defensive development and agility.",
    icon: "fielding",
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
    id: "private-1hr",
    category: "Private Lessons",
    title: "1 Hour",
    price: 65,
    note: "After 1 hr, each additional 1/2 hr is $20 if done on same day",
    lessonKey: "privateLesson" as const,
  },
  {
    id: "private-30min",
    category: "Private Lessons",
    title: "1/2 Hour",
    price: 45,
    note: "After 1 hr, each additional 1/2 hr is $20 if done on same day",
    lessonKey: "privateLesson" as const,
  },
  {
    id: "group-1hr",
    category: "Group Lessons",
    title: "1 Hour",
    price: 40,
    note: "After 1 hr, each additional 1/2 hr is $20 if done on same day",
    lessonKey: "groupLesson" as const,
  },
  {
    id: "group-30min",
    category: "Group Lessons",
    title: "1/2 Hour",
    price: 30,
    note: "After 1 hr, each additional 1/2 hr is $20 if done on same day",
    lessonKey: "groupLesson" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I've had my boys working with Derek and the Zero Limits coaches for a couple years now. Very knowledgeable and reasonably priced — we have the ability to work out on a regular regimen and not break the bank. Highly recommend for both pitching and hitting.",
    author: "Dylan Jahnke",
  },
  {
    quote:
      "Derek and all the staff at Zero Limits Baseball are the best around. The improvement we have seen in my son in both hitting and pitching are amazing. They really take the time and care about the boys. I would recommend them to anyone!",
    author: "Kristy Burns Prosser",
  },
  {
    quote:
      "My son has been working with Derek for a year and has made great progress with pitching and hitting. We couldn't be happier with all he has learned. All of the staff — Coach Eric and Coach Michael — have been wonderful, helpful, and care about my son.",
    author: "Erin Johnson Shimp",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#our-coaches", label: "Our Coaches" },
  { href: "/schedule-training", label: "Schedule Training" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
] as const;
