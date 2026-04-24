/* ================================================================
   data.js — Aashutosh Kumar Gupta Portfolio
   Single source of truth. Edit here to update entire site.
   ================================================================ */

const PORTFOLIO = {

  /* ── Personal Info ── */
  name:       'Aashutosh Kumar Gupta',
  shortName:  'Aashutosh',
  initials:   'AKG',
  role:       'Software Developer',
  university: 'KIIT University, Bhubaneswar',
  degree:     'B.Tech — Computer Science & Engineering',
  batch:      '2023 – 2027',
  cgpa:       '8.6',
  location:   'Bhubaneswar, Odisha, India',
  email:      'aashutoshg01@gmail.com',
  phone:      '+91 6287177572',
  linkedin:   'https://www.linkedin.com/in/aashutosh-gupta-b6b7453a6',
  github:     'https://github.com/aashutoshg01-ui',
  photo:      'assets/images/profile.jpg',
  resume:     'assets/resume.pdf',

  typingPhrases: [
    'Computer Science Student · Software Developer · AI Enthusiast',
    'Building real-world software, one project at a time.',
    'B.Tech CSE · KIIT University · Batch 2027',
    'Data · Backend · AI/ML · Flutter Developer',
  ],

  /* ── Stats ── */
  stats: [
    { num: '8.6', label: 'CGPA' },
    { num: '2027', label: 'Graduating' },
    { num: '2+', label: 'Projects' },
    { num: '5+', label: 'Technologies' },
  ],

  /* ── About ── */
  about: `I'm <strong>Aashutosh Kumar Gupta</strong>, a disciplined Computer Science student at KIIT University — driven by deep interest in software development, artificial intelligence, and building solutions that address real-world challenges. My approach is hands-on: from AI-powered mobile apps to autonomous robotics, I pursue technical challenges that push my limits.`,

  focusAreas: [
    'Data Structures & Algorithms',
    'Backend Development with Node.js',
    'AI/ML Integration in Applications',
    'Database Design with MySQL & Excel',
    'Production-Ready Portfolio Building',
  ],

  /* ── Skills ── */
  skills: [
    {
      title: 'Languages',
      icon: '⌨️',
      color: '#a78bfa',
      tags: ['C', 'Java', 'Python', 'JavaScript', 'Dart'],
      bars: [
        { label: 'Python', pct: 75 },
        { label: 'Java',   pct: 70 },
        { label: 'C',      pct: 68 },
      ],
    },
    {
      title: 'Web & Mobile',
      icon: '🌐',
      color: '#34d399',
      tags: ['HTML5', 'CSS3', 'Flutter', 'Node.js', 'REST APIs'],
    },
    {
      title: 'Database & Tools',
      icon: '🗄️',
      color: '#60a5fa',
      tags: ['MySQL', 'MS Excel', 'Google Sheets', 'Git', 'GitHub'],
    },
    {
      title: 'Core CS',
      icon: '🧠',
      color: '#f59e0b',
      tags: ['DSA', 'OOP', 'DBMS', 'OS', 'Networking'],
      bars: [
        { label: 'DSA', pct: 72 },
        { label: 'OOP', pct: 80 },
      ],
    },
    {
      title: 'Emerging Tech',
      icon: '🤖',
      color: '#f472b6',
      tags: ['AI / ML', 'Raspberry Pi', 'IoT', 'OpenCV', 'Gemini API'],
    },
    {
      title: 'Data & Analysis',
      icon: '📊',
      color: '#c9a84c',
      tags: ['Data Entry', 'Pivot Tables', 'Data Cleaning', 'Automation', 'Reporting'],
    },
  ],

  /* ── Projects ── */
  projects: [
    {
      id: 'truthlens',
      title: 'TruthLens',
      subtitle: 'AI-Powered Misinformation Detection App',
      shortDesc: 'Intelligent mobile app combating digital misinformation using multi-modal AI.',
      fullDesc: `TruthLens is a cross-platform mobile application designed to address one of the most pressing challenges of the digital age — misinformation. Using Google's Gemini multi-modal AI, the app analyzes news articles, images, and social media posts to provide real-time credibility scores.\n\nThe app features deepfake image detection, trending misinformation tracking, and an intuitive credibility dashboard that helps users make informed decisions about the content they consume and share.`,
      tech: ['Flutter', 'Google Gemini', 'Dart', 'AI/ML', 'REST API', 'NLP'],
      features: [
        'Real-time fake news credibility scoring via NLP',
        'Deepfake image detection using computer vision',
        'Google Gemini API multi-modal integration',
        'Cross-platform Flutter UI with clean UX',
        'Trending misinformation tracker',
        'Share analysis results as image',
      ],
      role: 'Full-Stack Developer — designed architecture, integrated Gemini API, built entire Flutter UI, and implemented AI analysis pipeline.',
      challenges: 'Integrating multi-modal Gemini API responses into a real-time Flutter state machine without latency spikes. Solved using async isolates and response caching.',
      improvements: 'Video deepfake detection, WhatsApp sharing integration, regional language support.',
      github: 'https://github.com/aashutoshg01-ui',
      live: null,
      featured: true,
      mockupType: 'ai',
    },
    {
      id: 'ai-robot',
      title: 'AI Robot',
      subtitle: 'Autonomous Raspberry Pi Robotics System',
      shortDesc: 'Hardware-software robotics combining sensor arrays, camera vision, and autonomous navigation.',
      fullDesc: `The AI Robot project is a full hardware-software robotics system built on Raspberry Pi. Using Python, OpenCV, and multiple sensor arrays, the robot can autonomously navigate its environment, detect and avoid obstacles, and respond to visual cues.\n\nThe system demonstrates practical application of embedded systems programming, computer vision, and real-time sensor fusion — bringing together mechanical, electrical, and software engineering in a single cohesive platform.`,
      tech: ['Raspberry Pi', 'Python', 'OpenCV', 'Sensors', 'IoT', 'GPIO'],
      features: [
        'Autonomous obstacle detection & avoidance',
        'Camera-based visual input processing',
        'Multi-sensor data fusion (ultrasonic + IR)',
        'Python AI decision logic scripts',
        'Real-time video stream',
        'Remote control fallback mode',
      ],
      role: 'Hardware + Software Developer — assembled hardware, wired sensors, wrote all Python control scripts and OpenCV vision pipeline.',
      challenges: 'Synchronizing real-time sensor data with camera frames at low latency on Raspberry Pi\'s limited hardware. Used threading and priority queues to resolve this.',
      improvements: 'ML-based object recognition, voice command interface, ROS integration.',
      github: 'https://github.com/aashutoshg01-ui',
      live: null,
      featured: false,
      mockupType: 'robot',
    },
  ],

  /* ── Certifications ── */
  certifications: [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      issuer: 'Academic / Self-Study',
      date: '2023 – Present',
      skills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'],
      desc: 'Comprehensive study of core CS algorithms and data structures through coursework and competitive problem solving.',
      verify: null,
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Fundamentals',
      issuer: 'Online Coursework',
      date: '2024',
      skills: ['Machine Learning', 'Model Training', 'Gemini API', 'NLP Basics', 'Computer Vision'],
      desc: 'Core ML concepts, model training, and practical AI API integration including Google Gemini multi-modal.',
      verify: null,
    },
    {
      id: 'dbms',
      title: 'Database Management Systems',
      issuer: 'KIIT University',
      date: '2024',
      skills: ['SQL', 'Normalization', 'Indexing', 'Transactions', 'MySQL'],
      desc: 'Relational database design, SQL optimization, normalization theory, and DBMS principles.',
      verify: null,
    },
    {
      id: 'flutter',
      title: 'Flutter Mobile Development',
      issuer: 'Self-Directed Learning',
      date: '2024',
      skills: ['Dart', 'State Management', 'Widgets', 'API Integration', 'Cross-Platform'],
      desc: 'Cross-platform mobile app development with Flutter & Dart — applied directly in TruthLens.',
      verify: null,
    },
    {
      id: 'excel',
      title: 'Advanced MS Excel & Data Tools',
      issuer: 'Self-Study / Academic',
      date: '2023 – 2024',
      skills: ['Pivot Tables', 'Advanced Formulas', 'Data Cleaning', 'Charts', 'Automation'],
      desc: 'Excel dashboards, data cleaning pipelines, pivot analysis, and automation for structured reporting.',
      verify: null,
    },
    {
      id: 'cgpa',
      title: 'Academic Excellence — CGPA 8.6',
      issuer: 'KIIT University',
      date: '2023 – Present',
      skills: ['Consistency', 'Engineering Fundamentals', 'CS Theory', 'Applied Mathematics'],
      desc: 'Consistent academic performance across all CS and engineering coursework.',
      verify: null,
    },
  ],

  /* ── Resume Summary (extracted from PDF) ── */
  resumeSummary: {
    objective: 'Detail-oriented and motivated B.Tech CSE student with expertise in MS Excel, Google Sheets, MySQL, and Data Handling — seeking an entry-level software/data role where I can contribute accuracy, efficiency, and analytical problem-solving skills.',
    highlights: [
      'B.Tech CSE · KIIT University · CGPA 8.6',
      'Strong in Data Entry, Processing, and Automation',
      'Proficient in Python, Java, C, JavaScript',
      'Advanced MS Excel & MySQL skills',
      'AI/ML enthusiast with real project experience',
    ],
    education: [
      { degree: 'B.Tech — Computer Science & Engineering', inst: 'KIIT University', year: '2023 – 2027', grade: 'CGPA: 8.6' },
    ],
    experience: 'Fresher — Actively seeking opportunities in Data Entry, Excel Operations, Software Development, and Junior Technical roles.',
    strengths: ['High accuracy & attention to detail', 'Strong analytical thinking', 'Fast learner & adaptable', 'Excellent data organization', 'Good communication & teamwork'],
  },

};

/* Export for use in script.js */
if (typeof module !== 'undefined') module.exports = PORTFOLIO;
