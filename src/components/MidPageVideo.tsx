import { useState, useRef } from "react";
import { Play } from "lucide-react";

const MidPageVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ border: "5px solid hsl(20, 40%, 12%)" }}
        >
{!isPlaying ? (
  <div
    className="relative w-full cursor-pointer group"
    onClick={handlePlay}
  >
    <div className="relative w-full aspect-video">
      <img
        src="https://www.dangpestcontrol.com/wp-content/uploads/2025/04/dang-pest-homepage.mp4"
        alt="Get Free Pest Control For Life"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <img
        src="https://img.youtube.com/vi/placeholder/maxresdefault.jpg"
        alt="Get Free Pest Control For Life - Dang Pest Control"
        className="w-full h-full object-cover absolute inset-0"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center 
        bg-black/10 group-hover:bg-black/20 transition-colors">
        <div className="w-20 h-20 rounded-full flex items-center 
          justify-center shadow-xl bg-white/30 backdrop-blur-sm">
          <Play className="w-10 h-10 text-white ml-1" />
        </div>
      </div>
    </div>
  </div>
) : (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              controls
              playsInline
              autoPlay
            >
              <source
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/04/dang-pest-homepage.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>
      </div>
    </section>
  );
};

export default MidPageVideo;
