// DRAFT: have a qualified lawyer review before launch.

import { company } from "./company";

export interface LegalConfig {
  lastUpdated: string;
  retentionPeriod: string | null;
  governingLaw: string | null;
}

export const legalConfig: LegalConfig = {
  lastUpdated: "24 November 2026",
  retentionPeriod: null,
  governingLaw: null,
};

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  list?: string[];
}

export const privacyPolicySections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: [
      `${company.legalName} ("STRICON", "we", "us", or "our") operates this website.`,
      `Registered office: ${company.registeredOffice.fullAddress}.`,
      `Email: ${company.contact.email} | Phone: ${company.contact.phoneDisplay}.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      "We collect information that you choose to submit through the forms on our website:",
    ],
    list: [
      "Contact form: full name, company name (optional), phone number, email address, service of interest, location / area, manpower required (optional), and your message.",
      "Careers form: full name, phone number, email address (optional), area of interest, experience level, current location / city, highest qualification / education (optional), brief note / message (optional), and an optional resume document when resume upload is active.",
      "We do not ask for government identity numbers (such as Aadhaar or PAN), date of birth, photographs, or bank details through these website forms.",
      "Technical information: your IP address is used briefly in volatile memory for spam protection (rate limiting) and may appear in standard hosting provider access logs.",
      "Browser storage: this website stores your light/dark theme preference locally in your browser. No advertising cookies or third-party marketing tracking cookies are used by this website.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "3. How We Use Information",
    content: ["We use the information collected exclusively for the following purposes:"],
    list: [
      "To respond to your service enquiries and provide requested information.",
      "To review job applications and contact applicants regarding employment opportunities.",
      "To maintain website security and prevent spam or automated abuse.",
    ],
  },
  {
    id: "who-receives-it",
    title: "4. Who Receives Information",
    content: [
      "Information submitted through our website is received by authorized STRICON personnel who handle client relations and recruitment.",
      "We also work with technical service providers that assist in delivering communications and storing form submissions (for example, transactional email services and spreadsheet tools). These providers process data solely on our instructions.",
      "We do not sell, rent, or trade your personal information to third parties.",
    ],
  },
  {
    id: "resumes",
    title: "5. Resume Submissions",
    content: [
      "When you choose to upload a resume through our careers application form, the file is validated in memory and forwarded directly to STRICON recruitment staff via email.",
      "Resumes are not stored on our website hosting server or in public directories.",
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: [
      legalConfig.retentionPeriod
        ? `We retain enquiry and application details for ${legalConfig.retentionPeriod}, or as long as needed to handle your enquiry or application.`
        : "We retain enquiry and application details as long as needed to handle your enquiry or application.",
    ],
  },
  {
    id: "your-choices",
    title: "7. Your Choices",
    content: [
      `You may contact us at any time at ${company.contact.email} to request access to, correction of, or deletion of personal information you previously submitted through our website.`,
    ],
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated revision date.",
    ],
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: [
      `If you have questions about this Privacy Policy, please contact us at:`,
      `Email: ${company.contact.email}`,
      `Phone: ${company.contact.phoneDisplay}`,
      `Registered Office: ${company.registeredOffice.fullAddress}`,
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "use-of-website",
    title: "1. Use of This Website",
    content: [
      "This website is provided for general informational purposes concerning STRICON and our facility management and security services.",
      "Information on this website is subject to change without prior notice.",
    ],
  },
  {
    id: "information-accuracy",
    title: "2. Information Accuracy",
    content: [
      "The website describes our services in general terms. Specific service scopes, personnel requirements, deployment locations, pricing, and operating procedures are confirmed directly with each client in formal written agreements.",
    ],
  },
  {
    id: "client-names-logos",
    title: "3. Client Names and Logos",
    content: [
      "Client names and logos displayed on this website belong to their respective trademark holders.",
      "They are displayed to truthfully indicate premises and corporate facilities where STRICON personnel are deployed or have provided services.",
    ],
  },
  {
    id: "intellectual-property",
    title: "4. Our Content and Logos",
    content: [
      `All original text, layout, branding materials, and logos created for STRICON belong to ${company.legalName}.`,
      "You may not copy, reproduce, distribute, or create derivative works from website materials without our prior written consent.",
    ],
  },
  {
    id: "third-party-links",
    title: "5. Links to Other Websites",
    content: [
      "This website may include links to third-party services and platforms (such as WhatsApp). We do not control and are not responsible for the availability, content, or practices of external services.",
    ],
  },
  {
    id: "limitation",
    title: "6. Limitation of Availability",
    content: [
      'This website is provided on an "as is" and "as available" basis without warranties of uninterrupted operation or freedom from technical errors.',
    ],
  },
  ...(legalConfig.governingLaw
    ? [
        {
          id: "governing-law",
          title: "7. Governing Law",
          content: [legalConfig.governingLaw],
        },
      ]
    : []),
  {
    id: "contact",
    title: `${legalConfig.governingLaw ? "8" : "7"}. Contact Details`,
    content: [
      `For any questions regarding these Terms and Conditions, please contact:`,
      `${company.legalName}`,
      `Email: ${company.contact.email}`,
      `Phone: ${company.contact.phoneDisplay}`,
      `Registered Office: ${company.registeredOffice.fullAddress}`,
    ],
  },
];
