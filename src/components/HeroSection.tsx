import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import HolidayVideoWrapper from "@/components/HolidayVideoWrapper";

const HERO_BG_IMAGE = "https://www.dangpestcontrol.com/wp-content/uploads/2025/06/moblie_banner.webp";
const VIDEO_POSTER_URL = "https://www.dangpestcontrol.com/wp-content/uploads/2025/06/dang-pest-homepage-img-1.webp";

const DEFAULT_VIDEO = "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/dang-pest-homepage.mp4";

interface HeroSectionProps {
  dynamicVideoUrl?: string;
  dynamicVideoType?: string;
  videoStart?: string;
  videoEnd?: string;
}

// Extract YouTube video ID from various YouTube URL formats
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
    <section
      className="overflow-hidden pb-20 text-white"
      style={{
        backgroundImage: `url('${HERO_BG_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar />
      <div
        className="mx-auto max-w-[1400px] px-6 relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-[75vh]"
        style={{ paddingTop: "180px" }}
      >
          <div>
            <h1
              className="text-comic italic text-5xl md:text-7xl leading-[0.85] mb-6"
              style={{ color: "hsl(48, 100%, 50%)" }}
            >
              Super Powered<br />
              Pest Control
            </h1>
            <p className="text-base md:text-lg text-white mb-8 max-w-md">
              We are a hands-on, personable, relationship-based company. We live, work, worship, and play in the Tyler community. Our innovative pest control practices make us stand out amongst our competitors. Our goal is to be an active part in making our community and the lives of our clients better. We stand by our work and guarantee satisfaction.
            </p>
            <Link to="/quote" className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-base border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">
              Get Your Quote
            </Link>
          </div>

          <HolidayVideoWrapper>
            <div
              className="relative rounded-2xl overflow-hidden aspect-video shadow-xl"
              style={{ borderColor: "hsl(185, 100%, 45%)", border: "4px solid" }}
            >
              {!isPlaying ? (
                <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
                  <img
                    src={VIDEO_POSTER_URL}
                    alt="Meet Kirk - Dang Pest Control"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-secondary/80 flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-secondary-foreground ml-1" />
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
                      playsInline
                      poster={VIDEO_POSTER_URL}
                    >
                      <source src={videoSrc} type="video/mp4" />
                    </video>
                  )}
                </>
              )}
            </div>
          </HolidayVideoWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
