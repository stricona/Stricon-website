import { company } from "@/data/company";

export function LocalBusinessJsonLd() {
  const baseUrl = company.contact.website || "https://www.stricon.in";
  const ogImageUrl = `${baseUrl}/opengraph-image`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.registeredOffice.fullAddress
  )}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: company.legalName,
    alternateName: company.brandName,
    url: baseUrl,
    logo: `${baseUrl}/images/logo/emblem.jpg`,
    image: ogImageUrl,
    telephone: company.contact.phoneDisplay,
    email: company.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.registeredOffice.addressLine,
      addressLocality: company.registeredOffice.city,
      addressRegion: company.registeredOffice.state,
      postalCode: company.registeredOffice.pincode,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Hyderabad",
    },
    foundingDate: company.establishedYear.toString(),
    founder: {
      "@type": "Person",
      name: company.founder.name,
      jobTitle: company.founder.role,
    },
    hasMap: mapsSearchUrl,
    parentOrganization: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: company.legalName,
    },
  };

  // sameAs only if socialLinks is not null and has non-empty values
  if (company.socialLinks && Object.values(company.socialLinks).filter(Boolean).length > 0) {
    schema.sameAs = Object.values(company.socialLinks).filter(Boolean);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
