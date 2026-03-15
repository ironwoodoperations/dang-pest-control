const SEAL_URL = "https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Dang-Seal-of-Approval-Transparent.png";
const SERVICES_ICON_URL = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Services.png";
const EXPERT_ICON_URL = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Expert.png";

const FeatureStrip = () => {
  const textStyle = { color: "hsl(20, 40%, 12%)" };
  const descStyle = { color: "hsl(20, 20%, 40%)" };
  return (
    <section
      className="border-b border-orange-100"
      style={{
        height: "249px",
        padding: "0 15px",
        background: "transparent",
      }}
    >
      <div className="h-full mx-auto max-w-[1400px]">
        <div className="grid grid-cols-3 gap-0 text-center h-full" style={{ height: "249px" }}>
          {/* Column 1: Dang Seal */}
          <div className="flex flex-col items-center justify-center px-4 md:border-r border-orange-100 h-full">
            <img src={SEAL_URL} alt="Dang Seal of Approval" className="w-28 h-28 object-contain mb-4" />
            <h3 className="text-comic text-lg font-semibold mb-2" style={textStyle}>
              Dang Seal of Approval
            </h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={descStyle}>
              If our service doesn't provide the results we say it will, we'll treat it again for free! If still not the desired results, we'll refund your money!
            </p>
          </div>

          {/* Column 2: Super Hero Response Team */}
          <div className="flex flex-col items-center justify-center px-4 md:border-r border-orange-100 h-full">
            <img src={SERVICES_ICON_URL} alt="Super Hero Response Team" className="w-20 h-20 object-contain mb-4" />
            <h3 className="text-comic text-lg font-semibold mb-2" style={textStyle}>
              Super Hero Response Team
            </h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={descStyle}>
              Committed to excellent customer service and communication!
            </p>
          </div>

          {/* Column 3: Certified Expert */}
          <div className="flex flex-col items-center justify-center px-4 h-full">
            <img src={EXPERT_ICON_URL} alt="Certified Expert" className="w-20 h-20 object-contain mb-4" />
            <h3 className="text-comic text-lg font-semibold mb-2" style={textStyle}>
              Certified Expert
            </h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={descStyle}>
              Licensed and insured.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
