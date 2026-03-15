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
              <img
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/04/dang-pest-homepage.mp4"
                alt="Get Free Pest Control For Life"
                className="w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                className="w-full aspect-video flex items-center justify-center"
                style={{ background: "hsl(28, 100%, 50%)" }}
              >
                <div className="text-center text-white">
                  <div
                    className="w-20 h-20 rounded-full flex items-center 
                    justify-center mx-auto mb-4 shadow-lg"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p
                    className="text-comic text-2xl md:text-3xl italic"
                    style={{ color: "hsl(48, 100%, 50%)" }}
                  >
                    Get Free Pest Control For Life!
                  </p>
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
