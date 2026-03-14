import { useHolidayMode } from "@/hooks/useHolidayMode";

const HolidayBanner = () => {
  const { enabled, greeting, activeTheme } = useHolidayMode();

  if (!enabled || !activeTheme) return null;

  const displayText = greeting || `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!`;

  return (
    <div
      className="w-full text-center py-2 px-4 text-sm font-body font-semibold text-white relative z-[60]"
      style={{ background: activeTheme.bannerBg }}
    >
      {displayText}
    </div>
  );
};

export default HolidayBanner;
