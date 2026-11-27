/**
 * Founder & Leadership Profile Data
 *
 * NOTE: The founder biography, qualifications, and leadership philosophy text
 * are strictly owner-supplied for the STRICON About page leadership profile.
 * The experience statements ("16+" and "over 16 years") are restricted to this
 * owner-supplied section and must not appear elsewhere across the website.
 */

export interface FounderHighlight {
  value: string;
  label: string;
}

export interface FounderImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
}

export interface FounderPhilosophy {
  label: string;
  quote: string;
  text: string;
}

export interface FounderProfileData {
  sectionHeading: string;
  subheading: string;
  name: string;
  designation: string;
  image: FounderImageData;
  highlights: FounderHighlight[];
  biography: string[];
  philosophy: FounderPhilosophy;
}

export const founderData: FounderProfileData = {
  sectionHeading: "Leadership Profile",
  subheading: "Meet Our Founder & Managing Director",
  name: "R. Vishnu Murthy",
  designation: "Founder & Managing Director",
  image: {
    src: "/images/founder/r-vishnu-murthy.webp",
    width: 332,
    height: 490,
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoKAA8ABUB8JZgCw7YsZa2tdmAAAP4GngfXg7VJqT9rNOejzoo4r4LAlA0j5HCuNidInJdLl9Y8pIzVaKx7XaBYWtLSWgAA",
    alt: "Portrait of R. Vishnu Murthy, Founder and Managing Director",
  },
  highlights: [
    {
      value: "16+",
      label: "Years of Industry Experience",
    },
    {
      value: "MBA",
      label: "Graduate",
    },
  ],
  biography: [
    "With over 16 years of extensive experience in the Security and Integrated Facility Management industry, R. Vishnu Murthy brings a wealth of industry knowledge, operational expertise and strategic leadership to the organisation.",
    "An MBA graduate, he began his professional journey in the hospitality industry, where he developed a strong foundation in customer service, operational management and people leadership. Over the years, he has successfully managed diverse service operations across multiple sectors, including Healthcare, IT & ITES, Corporate offices and Residential Communities.",
    "His professional journey reflects a strong understanding of operational excellence, client expectations, workforce management and service delivery across diverse business environments.",
  ],
  philosophy: {
    label: "Leadership Philosophy",
    quote: "From Experience to Excellence",
    text: "He is committed to building a professional, reliable and customer-centric organization that delivers consistent service quality, creates lasting value for clients and establishes higher benchmarks in the Security and Integrated Facility Management industry.",
  },
};
