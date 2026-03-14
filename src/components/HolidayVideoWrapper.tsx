import { useHolidayMode } from "@/hooks/useHolidayMode";

interface HolidayWrapperProps {
  children: React.ReactNode;
}

const HolidayVideoWrapper = ({ children }: HolidayWrapperProps) => {
  const { enabled, activeTheme } = useHolidayMode();

  if (!enabled || !activeTheme) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Decorative corner accents */}
      <div
        className="absolute -inset-2 rounded-2xl pointer-events-none z-10"
        style={{
          border: `3px solid ${activeTheme.borderColor}`,
          boxShadow: `0 0 20px ${activeTheme.borderColor}40`,
        }}
      />
      {/* Holiday emoji corners */}
      <span className="absolute -top-4 -left-4 text-2xl z-20">{activeTheme.emoji}</span>
      <span className="absolute -top-4 -right-4 text-2xl z-20">{activeTheme.emoji}</span>
      <span className="absolute -bottom-4 -left-4 text-2xl z-20">{activeTheme.emoji}</span>
      <span className="absolute -bottom-4 -right-4 text-2xl z-20">{activeTheme.emoji}</span>
      {children}
    </div>
  );
};

export default HolidayVideoWrapper;
