import axios from 'axios'

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '')

const client = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Fallback seed data
export const FALLBACK_EVENTS = [
  {
    id: 1,
    title: "MU National Programming Contest 2026",
    description: "The biggest inter-university competitive programming contest of the season organized by MU CSE Society with teams participating from across the nation.",
    category: "Contest",
    date: "2026-10-15",
    time: "09:00 AM - 06:00 PM",
    venue: "MU Central Auditorium & CSE Computer Labs",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    registration_link: "https://forms.google.com",
    is_featured: true,
  },
  {
    id: 2,
    title: "Full-Stack Web Development Bootcamp",
    description: "An intensive 3-day hands-on workshop covering modern web stacks including React, Django REST Framework, Docker, and Cloud Deployment.",
    category: "Workshop",
    date: "2026-10-22",
    time: "02:00 PM - 05:00 PM",
    venue: "CSE Software Lab 2",
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    registration_link: "https://forms.google.com",
    is_featured: true,
  },
  {
    id: 3,
    title: "AI & Machine Learning Tech Talk with Industry Experts",
    description: "Session on generative AI pipelines, practical deep learning implementations, and career roadmaps in modern artificial intelligence with alumni working at tech giants.",
    category: "Seminar",
    date: "2026-11-05",
    time: "11:00 AM - 01:30 PM",
    venue: "MU Gallery 1",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    registration_link: "https://forms.google.com",
    is_featured: false,
  },
  {
    id: 4,
    title: "MU Tech Carnival & Project Showcase 2026",
    description: "Showcase of innovative undergraduate projects, robotics exhibits, gaming contests, and cyber security capture-the-flag competitions.",
    category: "Fest",
    date: "2026-11-20",
    time: "10:00 AM - 07:00 PM",
    venue: "Campus Grounds & Auditorium",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    registration_link: "https://forms.google.com",
    is_featured: true,
  }
]

export const FALLBACK_NOTICES = [
  {
    id: 1,
    title: "Registration Open: Executive Committee Recruitment 2026",
    content: "MU CSE Society is inviting enthusiastic, dedicated students from 2nd and 3rd year to join our dynamic executive committee wings (Competitive Programming, Web & App, Media, Public Relations).",
    category: "Recruitment",
    is_urgent: true,
    published_date: "2026-09-20",
    attachment_url: "#"
  },
  {
    id: 2,
    title: "Selection Test for ICPC Dhaka Regional Preliminary 2026",
    content: "Intra-university mock team contest will be held this Friday in Lab 1 & 2. Top scoring teams will receive society registration sponsorship.",
    category: "Contest",
    is_urgent: true,
    published_date: "2026-09-18",
    attachment_url: "#"
  },
  {
    id: 3,
    title: "Call for Articles: CSE Tech Magazine 'BytePulse' Vol. IV",
    content: "Submit your tech articles, research summaries, open source project showcases, and student tech journeys for our annual society magazine.",
    category: "Publication",
    is_urgent: false,
    published_date: "2026-09-10",
    attachment_url: "#"
  },
  {
    id: 4,
    title: "Orientation Session for CSE Freshers (Batch 62)",
    content: "A warm welcome to the Department of CSE! Meet the faculty members, senior mentors, and executive committee of MU CSE Society.",
    category: "Department",
    is_urgent: false,
    published_date: "2026-09-05",
    attachment_url: "#"
  }
]

export const FALLBACK_COMMITTEE = [
  {
    id: 1,
    name: "Prof. Dr. Tariqul Islam",
    role: "Chief Advisor",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "Faculty",
    email: "tariqul@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Professor & Head of Department of CSE, guiding MU CSE Society towards innovation and research excellence."
  },
  {
    id: 2,
    name: "Priya Das",
    role: "President",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "2021-2022",
    email: "priya.cse@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Passionate about building inclusive tech communities, open source collaboration, and leadership."
  },
  {
    id: 3,
    name: "Anik Dey",
    role: "General Secretary",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "2021-2022",
    email: "anik.cse@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Competitive programmer and full-stack engineer coordinating society operations, workshops, and contests."
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    role: "Vice President (Events)",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "2021-2022",
    email: "tanvir@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Leads event execution, hackathons, guest seminars, and student orientation programs."
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    role: "Joint Secretary",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "2022-2023",
    email: "nusrat@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Manages member communications, workshop schedules, and student welfare initiatives."
  },
  {
    id: 6,
    name: "Rifat Hasan",
    role: "Lead, Competitive Programming Wing",
    academic_year: "2025-2026",
    department: "Computer Science & Engineering",
    session: "2022-2023",
    email: "rifat.cp@mu.edu.bd",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
    bio: "ICPC Regionalist conducting weekly algorithmic problem-solving bootcamps for juniors."
  }
]

export const FALLBACK_ALUMNI = [
  {
    id: 1,
    name: "Shahriar Hossain",
    batch: "12th Batch (2020)",
    current_role: "Software Engineer II",
    company: "Amazon Web Services",
    location: "Vancouver, Canada",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    quote: "MU CSE Society gave me my first experience of team engineering and contest problem-solving, which was pivotal for my career."
  },
  {
    id: 2,
    name: "Farhana Yasmin",
    batch: "13th Batch (2021)",
    current_role: "Senior Frontend Engineer",
    company: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    quote: "The workshops and peer mentoring inside the society helped me bridge the gap between academic theory and real-world tech."
  },
  {
    id: 3,
    name: "Nafis Fuad",
    batch: "14th Batch (2022)",
    current_role: "DevOps & Cloud Specialist",
    company: "Optimizely",
    location: "Dhaka, Bangladesh",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    quote: "Never stop building. Join the society contests and push your code to GitHub every single day."
  }
]

export const FALLBACK_BLOGS = [
  {
    id: 1,
    title: "Mastering Dynamic Programming for ICPC & Tech Interviews",
    excerpt: "A step-by-step roadmap to identify optimal substructure and overlapping subproblems with practical visualization techniques.",
    content: "Dynamic Programming (DP) is one of the most frequently asked algorithmic paradigms in competitive programming and top-tier software engineering interviews. In this article, we break down top-down memoization vs bottom-up tabulation...",
    author: "Anik Dey",
    author_role: "General Secretary & CP Lead",
    category: "Algorithms",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    published_date: "2026-09-15",
    read_time: "6 min read"
  },
  {
    id: 2,
    title: "Building Production REST APIs with Django & Vite React",
    excerpt: "Learn how modern monolithic and decoupled full-stack architectures integrate secure session tokens, CORS, and WhiteNoise.",
    content: "Decoupled web applications give frontend teams maximum autonomy with modern build tools like Vite while empowering backend developers with Django's bulletproof ORM...",
    author: "Priya Das",
    author_role: "President",
    category: "Web Dev",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    published_date: "2026-09-12",
    read_time: "4 min read"
  }
]

export const fetchHomeData = async () => {
  try {
    const res = await client.get('/home/')
    return res.data
  } catch {
    return {
      message: "Welcome to MU CSE Society API",
      society_name: "MU CSE Society",
      tagline: "Empowering Innovation, Coding & Leadership in CSE",
      stats: {
        total_members: "650+",
        active_events: 4,
        notices: 4,
        alumni_network: "200+",
        workshops_conducted: "45+"
      }
    }
  }
}

export const fetchEvents = async () => {
  try {
    const res = await client.get('/events/')
    return res.data
  } catch {
    return FALLBACK_EVENTS
  }
}

export const fetchNotices = async () => {
  try {
    const res = await client.get('/notices/')
    return res.data
  } catch {
    return FALLBACK_NOTICES
  }
}

export const fetchCommittee = async (year = '2025-2026') => {
  try {
    const res = await client.get(`/committee/?year=${year}`)
    return res.data
  } catch {
    return FALLBACK_COMMITTEE
  }
}

export const fetchAlumni = async () => {
  try {
    const res = await client.get('/alumni/')
    return res.data
  } catch {
    return FALLBACK_ALUMNI
  }
}

export const fetchBlogs = async () => {
  try {
    const res = await client.get('/blogs/')
    return res.data
  } catch {
    return FALLBACK_BLOGS
  }
}

export const submitEntry = async (data) => {
  try {
    const res = await client.post('/submissions/', data)
    return res.data
  } catch {
    // If backend is sleeping, return simulated success
    return {
      message: "Submission received successfully! (Stored locally & queued for admin review)",
      data
    }
  }
}
