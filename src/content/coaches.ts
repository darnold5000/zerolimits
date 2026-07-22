export type CoachSection = {
  title: string;
  items: string[];
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  intro?: string;
  highlights?: string[];
  sections?: CoachSection[];
  paragraphs?: string[];
};

export const COACHES: Coach[] = [
  {
    id: "derek-devaughan",
    name: "Coach Derek DeVaughan",
    role: "Owner / Instructor",
    image: "/images/coaches/derek-devaughan.jpg",
    imageAlt: "Coach Derek DeVaughan at Zero Limits Baseball",
    highlights: [
      "MHS Varsity Pitching Coach",
      "15+ years coaching experience",
      "Drafted by the Toronto Blue Jays",
      "Played collegiate baseball at Seminole State College, University of Florida, and Southwestern Oklahoma State University",
    ],
    intro:
      "Between his playing days and his time coaching, Derek brings a wealth of knowledge and game experience to each player.",
  },
  {
    id: "eric-mcgaha",
    name: "Coach Eric McGaha",
    role: "Instructor",
    image: "/images/coaches/eric-mcgaha.jpg",
    imageAlt: "Coach Eric McGaha with players at Zero Limits Baseball",
    intro:
      "Coach McGaha brings a wealth of knowledge and a proven track record of success in developing baseball players.",
    highlights: [
      "20+ years coaching experience",
      "85 wins over the last 4 seasons",
      "2022 Mid-State Conference Champions",
      "2022 4A Sectional Champions",
      "3 North/South All-Star selections",
    ],
  },
  {
    id: "michael-mcavene",
    name: "Michael McAvene",
    role: "Pitching Instructor",
    image: "/images/coaches/michael-mcavene.jpg",
    imageAlt: "Michael McAvene pitching",
    intro:
      "A Mooresville native and Roncalli graduate, Michael brings professional pitching experience to every lesson.",
    highlights: [
      "2016 IHSAA 4A State Champion at Roncalli High School",
      "Pitched at Louisville — College World Series (2017, 2019) and All-ACC honors",
      "Chicago Cubs 3rd-round pick (2019); advanced to Double-A with the Tennessee Smokies",
      "Also played with the Evansville Otters and Lancaster Stormers",
      "Specializes in pitching instruction for youth and high school athletes",
    ],
  },
  {
    id: "tim-denny",
    name: "Tim Denny",
    role: "Instructor",
    image: "/images/coaches/tim-denny.jpg",
    imageAlt: "Tim Denny at Zero Limits Baseball",
    intro:
      "Tim combines playing, coaching, and travel-ball experience with a focus on catchers and hitters.",
    highlights: [
      "North Central High School (1989); played at Wabash Valley JC and IUPUI",
      "Independent pro experience with the Newark Buffalos (Frontier League)",
      "Five seasons on staff at Mooresville High School — 2024 Class 4A State Runner-Up",
      "Two sectional titles and three Mid-State Conference championships (2022–2024)",
      "Ten seasons of travel baseball; one year instructing at Zero Limits Baseball",
    ],
  },
  {
    id: "blake-allen",
    name: "Blake Allen",
    role: "Instructor",
    image: "/images/coaches/blake-allen.jpg",
    imageAlt: "Blake Allen coaching at Indiana University",
    highlights: [
      "From St. Louis, Missouri",
      "Graduated from Blackburn College in Illinois",
      "Played football and baseball in college",
      "Master's degree from Indiana State University",
      "25 years as a college coach",
      "Coaching stops include Blackburn College, DePauw University, Franklin College, Vanderbilt University, Western Kentucky University, and Indiana University",
      "Has coached pitchers, infielders, outfielders, catchers, and hitters",
      "Coached 22 MLB big leaguers",
      "Coached more than 80 MLB draft selections",
      "Coached 16 collegiate All-Americans",
    ],
  },
];
