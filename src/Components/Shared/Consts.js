import serviceImage from "@/assets//Images/servicesImage.png"
import consultationLogo from "@/assets/Logos/consultationLogo.webp"
import mentalHealthLogo from "@/assets/Logos/mentalHealthLogo.png"
import specializedServicesLogo from "@/assets/Logos/specializedServicesLogo.png"


export const links = ['Home', 'Services', 'About', 'Contact'];

export const cardNums = [
  {
    num: '24/7',
    text: 'Availability',
  },
  {
    num: '0 seconds',
    text: 'Waiting time',
  },
  {
    num: '0$',
    text: 'Free of charge',
  },
  {
    num: 'Reliability',
    text: 'Advanced AI Accurate Analysis',
  },
];


export const ServicesData = [
  {
    img: consultationLogo,
    title: 'General Consultation',
    id: 'generalconsultation',
    heading: 'General Consultation',
    texts: [
      'Access medical advice any time of the day.',
      'Enter symptoms and get an initial assessment.',
      'Ask general health-related questions and receive answers.',

    ],
  },
  {
    img: mentalHealthLogo,
    title: 'Mental Health Support',
    id: 'mentalhealthsupport',
    heading: 'Mental Health Support',
    texts: [
      'Conduct self-assessments for mental well-being.',
      'Access resources and support for mental health.',
      'Get immediate assistance during mental health crises.',

    ],
  },
  {
    img: specializedServicesLogo,
    title: 'Specialized Services',
    id: 'specializedservices',
    heading: 'Specialized Services',
    texts: [
      'Get second opinions on diagnoses and treatment plans.',
      'Receive referrals to specialists based on health conditions.',
      'Explore alternative and complementary medicine options.',

    ],
  },
  // {
  //   img: "https://www.clinicbyclevelandclinic.com/wp-content/uploads/2022/05/For-Patients.png",
  //   title: 'Specialized Services',
  //   id: 'specializedservices',
  //   heading: 'Specialized Services',
  //   texts: [
  //     'Get second opinions on diagnoses and treatment plans.',
  //     'Receive referrals to specialists based on health conditions.',
  //     'Explore alternative and complementary medicine options.',

  //   ],
  // },
];

export const InformationBannerData = {
  heading: 'We Are Always Here To Ensure Best Medical Consulting',
  texts: [
    'Easy and simple chatting',
    '24/7 Service',
    'Suitable for everyone',
    'Accurate Analysis',
  ],
  img: serviceImage,
};
