import dangSeal from "@/assets/dang-seal.png";
import servicesIcon from "@/assets/services-icon.png";
import expertIcon from "@/assets/expert-icon.png";

const FeatureStrip = () => {
  return (
    <section className="feature-strip py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        {/* Guarantee Seal */}
        <div className="flex flex-col items-center gap-4">
          <img src={dangSeal} alt="100% Super-Powered Guarantee" className="w-28 h-28 object-contain animate-float" />
          <p className="text-sm opacity-90">
            If our service doesn't provide the results we say it will, we'll treat it again for free! If still not the desired results, we'll refund your money!
          </p>
        </div>

        {/* Super Hero Response Team */}
        <div className="flex flex-col items-center gap-4">
          <img src={servicesIcon} alt="Super Hero Response Team" className="w-12 h-12 object-contain" />
          <div>
            <h3 className="text-comic text-lg mb-1">Super Hero Response Team!</h3>
            <p className="text-sm opacity-90">Committed to Excellent Customer Service & Communication!</p>
          </div>
        </div>

        {/* Certified Expert */}
        <div className="flex flex-col items-center gap-4">
          <img src={expertIcon} alt="Certified Expert" className="w-12 h-12 object-contain" />
          <div>
            <h3 className="text-comic text-lg mb-1">Certified Expert</h3>
            <p className="text-sm opacity-90">Licensed & Insured.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
