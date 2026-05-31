import { ImageResponse } from "next/og";

export const alt = "Codzilla School — онлайн школа программирования для детей";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          color: "#586EDF",
          padding: "72px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            color: "#00AAFF",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 28,
          }}
        >
          CODZILLA SCHOOL
        </div>
        <div
          style={{
            maxWidth: 880,
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.08,
          }}
        >
          Онлайн школа программирования для детей
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 32,
            color: "#767676",
          }}
        >
          Курсы, практика и поддержка наставников
        </div>
      </div>
    ),
    size,
  );
}

