import { useHolidayMode } from "@/hooks/useHolidayMode";
import { Link } from "react-router-dom";

const HolidayBanner = () => {
  const { enabled, greeting, activeTheme } = useHolidayMode();

  if (!enabled || !activeTheme) return null;

  const displayText = greeting || `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!`;

  return (
    <div
      className="w-full relative z-[60] overflow-hidden"
      style={{ background: activeTheme.bannerBg }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${activeTheme.dotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: "16px 16px",
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <span style={{ fontSize: "20px" }}>{activeTheme.emoji}</span>
          <span
            style={{
              fontFamily: '"Bangers", cursive',
              fontSize: "clamp(16px, 2.5vw, 22px)",
              letterSpacing: "0.05em",
              color: activeTheme.textColor,
              lineHeight: 1.1,
            }}
          >
            {displayText}
          </span>
        </div>
        <Link
          to="/quote"
          style={{
            background: activeTheme.ctaBg,
            color: activeTheme.ctaText,
            fontFamily: '"Open Sans", sans-serif',
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Get a Free Quote →
        </Link>
      </div>
    </div>
  );
};

export default HolidayBanner;
