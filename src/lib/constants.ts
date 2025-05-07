import { Role } from '@/types';

export const roles: Role[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Interview for frontend development positions focusing on React, JavaScript, HTML/CSS, and modern web development practices.',
    icon: 'FaReact',
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Interview for backend development positions focusing on server-side languages, databases, API design, and system architecture.',
    icon: 'FaServer',
  },
  {
    id: 'fullstack-developer',
    title: 'Fullstack Developer',
    description: 'Interview for fullstack development positions covering both frontend and backend technologies.',
    icon: 'FaCode',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Interview for data science positions focusing on statistics, machine learning, data analysis, and visualization.',
    icon: 'FaChartBar',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Interview for product management positions focusing on product strategy, user experience, and project management.',
    icon: 'FaTasks',
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Interview for UX design positions focusing on user research, wireframing, prototyping, and user-centered design.',
    icon: 'FaPencilRuler',
  },
];

export const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    image: '/images/testimonial-1.jpg',
    quote: 'This AI mock interviewer helped me prepare for my dream job at a tech company. The feedback was remarkably insightful and I felt much more confident in my real interview.',
  },
  {
    name: 'Sarah Chen',
    role: 'Data Scientist',
    image: '/images/testimonial-2.jpg',
    quote: 'The technical questions were spot on! The AI asked me exactly the types of questions I later encountered in my actual interviews. Highly recommended!',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    image: '/images/testimonial-3.jpg',
    quote: 'The detailed feedback after each answer helped me refine my communication skills and better articulate complex product concepts. Game changer!',
  },
];

export const features = [
  {
    title: 'AI-Powered Questions',
    description: 'Tailored questions based on your selected role and experience level',
    icon: 'FaRobot',
  },
  {
    title: 'Real-time Video Interface',
    description: 'Experience a realistic interview setting with video capabilities',
    icon: 'FaVideo',
  },
  {
    title: 'Detailed Feedback',
    description: 'Receive instant feedback on your answers to improve your interview skills',
    icon: 'FaComments',
  },
  {
    title: 'Voice Recognition',
    description: 'Speak your answers naturally with our speech recognition technology',
    icon: 'FaMicrophone',
  },
];