import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { themeColors } from "@/config/theme";

export const alt = "STRICON People & Security Services";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const emblemPath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo",
    "emblem.jpg"
  );
  const emblemBuffer = fs.readFileSync(emblemPath);
  const emblemDataUri = `data:image/jpeg;base64,${emblemBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: themeColors.light.primary,
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: themeColors.light.accentGold,
          }}
        />

        {/* Left Column: Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "680px",
            gap: "20px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              padding: "8px 18px",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              alignSelf: "flex-start",
            }}
          >
            PSARA Licensed &bull; Hyderabad
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            STRICON People &amp; Security Services
          </div>

          {/* Subheading */}
          <div
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: themeColors.light.accentGold,
              lineHeight: 1.3,
            }}
          >
            Facility Management &amp; Security Services, Hyderabad
          </div>
        </div>

        {/* Right Column: White rounded card containing original emblem */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "300px",
            backgroundColor: themeColors.light.surface,
            borderRadius: "32px",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            border: `3px solid ${themeColors.light.border}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={emblemDataUri}
            alt="STRICON Emblem"
            width={240}
            height={240}
            style={{
              objectFit: "contain",
              width: "240px",
              height: "240px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
