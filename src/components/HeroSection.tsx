import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import HolidayVideoWrapper from "@/components/HolidayVideoWrapper";

const DEFAULT_VIDEO = "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/dang-pest-homepage.mp4";

interface HeroSectionProps {
  dynamicVideoUrl?: string;
  dynamicVideoType?: string;
  videoStart?: string;
  videoEnd?: string;
}

const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&/]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([^?&/]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = url.match(/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
};

const HeroSection = ({ dynamicVideoUrl, dynamicVideoType, videoStart, videoEnd }: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = dynamicVideoUrl || DEFAULT_VIDEO;
  const isYouTube = dynamicVideoType === "youtube" || extractYouTubeId(videoSrc) !== null;
  const youtubeId = isYouTube ? extractYouTubeId(videoSrc) : null;

  const buildYouTubeParams = () => {
    const params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (videoStart) params.set("start", videoStart);
    if (videoEnd) params.set("end", videoEnd);
    return params.toString();
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (!isYouTube) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 100);
    }
  };

  return (
    <section className="hero-bg text-white relative overflow-hidden" style={{ paddingTop: '40px', paddingBottom: '100px' }}>
      <div className="mx-auto max-w-[1400px] px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left: text content */}
          <div>
            <h1
              className="text-comic italic uppercase"
              style={{
                color: 'hsl(48, 100%, 50%)',
                fontSize: '46px',
                fontWeight: '400',
                lineHeight: '1.05',
                marginBottom: '30px',
              }}
            >
              Super Powered<br />
              Pest Control
            </h1>
            <p style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '32px', color: 'white', maxWidth: '480px' }}
              className="font-body">
              We are a hands-on, personable, relationship-based company. We live, work, worship, and play in the Tyler community. Our innovative pest control practices make us stand out amongst our competitors. Our goal is to be an active part in making our community and the lives of our clients better. We stand by our work and guarantee satisfaction.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center font-bold transition-all duration-200 hover:bg-white hover:text-primary"
              style={{
                border: '2px solid white',
                color: 'white',
                backgroundColor: 'transparent',
                borderRadius: '146px',
                padding: '12px 32px',
                fontSize: '15px',
              }}
            >
              Get Your Quote
            </Link>
          </div>

          {/* Right: video */}
          <HolidayVideoWrapper>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                border: '4px solid hsl(185, 100%, 45%)',
                boxShadow: '0 0 30px hsla(185, 100%, 45%, 0.5)',
                maxWidth: '90%',
                marginLeft: 'auto',
              }}
            >
              {!isPlaying ? (
                <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
                  <img
                    src="https://www.dangpestcontrol.com/wp-content/uploads/2025/06/dang-pest-homepage-img-1.webp"
                    alt="Meet Kirk - Dang Pest Control"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isYouTube && youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?${buildYouTubeParams()}`}
                      title="Meet Kirk - Dang Pest Control"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      playsInline
                      poster="https://www.dangpestcontrol.com/wp-content/uploads/2025/06/dang-pest-homepage-img-1.webp"
                    >
                      <source src={videoSrc} type="video/mp4" />
                    </video>
                  )}
                </>
              )}
            </div>
          </HolidayVideoWrapper>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
