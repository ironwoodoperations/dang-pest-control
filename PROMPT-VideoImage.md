Read PESTFLOW-SKILL.md for full project context. Add optional video-on-image capability to all pest pages.

## What we're building
A reusable VideoImage component. It shows a static image by default. If a video URL is configured in admin (page_content.video_url), it shows the image with a small play button below. Clicking play replaces the image with the video. When the video ends OR the user clicks outside, it reverts back to the static image.

---

## Step 1 — Create src/components/VideoImage.tsx

```typescript
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoImageProps {
  src: string;
  alt: string;
  className?: string;
  videoUrl?: string | null;
  videoType?: string | null; // 'youtube' | 'upload'
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function VideoImage({ src, alt, className = '', videoUrl, videoType }: VideoImageProps) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasVideo = !!videoUrl;

  // Click outside → revert to image
  useEffect(() => {
    if (!playing) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPlaying(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [playing]);

  const youtubeId = videoUrl && (videoType === 'youtube' || !videoType)
    ? getYouTubeId(videoUrl)
    : null;

  return (
    <div ref={containerRef} className="relative" style={{ display: 'inline-block', width: '100%' }}>
      {/* Image — always rendered, hidden when playing */}
      <div style={{ display: playing ? 'none' : 'block' }}>
        <img src={src} alt={alt} className={className} />
      </div>

      {/* Video player — shown when playing */}
      {playing && (
        <div className="w-full" style={{ aspectRatio: '16/9' }}>
          {youtubeId ? (
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => {}} // YouTube handles ended event via postMessage — revert handled by click-outside
            />
          ) : (
            <video
              className="w-full h-full rounded-2xl"
              src={videoUrl!}
              autoPlay
              controls
              onEnded={() => setPlaying(false)}
            />
          )}
        </div>
      )}

      {/* Play button — shown below image if video exists and not playing */}
      {hasVideo && !playing && (
        <button
          onClick={() => setPlaying(true)}
          className="flex items-center gap-2 mt-3 mx-auto font-bold text-sm rounded-full px-5 py-2.5 transition-all hover:brightness-110 active:scale-95"
          style={{
            background: 'hsl(28, 100%, 50%)',
            color: 'white',
            display: 'flex',
            width: 'fit-content',
          }}
          aria-label={`Play video for ${alt}`}
        >
          <Play className="w-4 h-4 fill-white" />
          Watch Video
        </button>
      )}
    </div>
  );
}
```

---

## Step 2 — Add intro_video_url to ContentTab admin

In src/components/admin/ContentTab.tsx, the edit dialog already has a video section. We need to clarify labeling so admins understand which video does what:
- Rename the existing video field label from "Page Video (optional)" to "Intro Image Video — shows play button on the pest photo"
- The existing video_url field is what gets used for the image play button

No schema changes needed — page_content.video_url is already the right field.

---

## Step 3 — Wire VideoImage into pest pages

For EVERY file in this list, do the following:
- src/pages/SpiderControl.tsx
- src/pages/MosquitoControl.tsx
- src/pages/AntControl.tsx
- src/pages/WaspHornetControl.tsx
- src/pages/RoachControl.tsx
- src/pages/FleaTickControl.tsx
- src/pages/RodentControl.tsx
- src/pages/ScorpionControl.tsx
- src/pages/BedBugControl.tsx
- src/pages/TermiteControl.tsx
- src/pages/TermiteInspections.tsx
- src/pages/PestControlPage.tsx

In each file:

a) Add these imports at the top:
```typescript
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VideoImage } from '@/components/VideoImage';
```
(Only add imports that aren't already there)

b) Add this hook near the top of the component, using the page's slug:
```typescript
const [pageVideo, setPageVideo] = useState<{ video_url: string | null; video_type: string | null } | null>(null);

useEffect(() => {
  supabase
    .from('page_content')
    .select('video_url, video_type')
    .eq('tenant_id', '1282b822-825b-4713-9dc9-6d14a2094d06')
    .eq('slug', '[PAGE_SLUG_HERE]')  // use the actual slug for each page, e.g. 'spider-control'
    .maybeSingle()
    .then(({ data }) => { if (data) setPageVideo(data); });
}, []);
```

Use these slugs per file:
- SpiderControl.tsx → 'spider-control'
- MosquitoControl.tsx → 'mosquito-control'
- AntControl.tsx → 'ant-control'
- WaspHornetControl.tsx → 'wasp-hornet-control'
- RoachControl.tsx → 'roach-control'
- FleaTickControl.tsx → 'flea-tick-control'
- RodentControl.tsx → 'rodent-control'
- ScorpionControl.tsx → 'scorpion-control'
- BedBugControl.tsx → 'bed-bug-control'
- TermiteControl.tsx → 'termite-control'
- TermiteInspections.tsx → 'termite-inspections'
- PestControlPage.tsx → 'pest-control'

c) In each file, find the intro section image. It will look like one of these patterns:
```jsx
<img src="https://www.dangpestcontrol.com/wp-content/uploads/..." alt="..." className="..." />
```
OR
```jsx
<img src={introImage} alt="..." ... />
```

Replace ONLY the intro section image (the one inside the yellow-bordered photo div in the Intro section) with:
```jsx
<VideoImage
  src="[same src as before]"
  alt="[same alt as before]"
  className="[same className as before]"
  videoUrl={pageVideo?.video_url}
  videoType={pageVideo?.video_type}
/>
```

Do NOT replace hero images, Why Choose Us icons, step icons, or footer images — only the intro section photo.

---

## Step 4 — Wire into LocationPage.tsx

In src/pages/LocationPage.tsx:
- The location page intro image is already loaded dynamically from Supabase location_data
- Add a new column to location_data: ALTER TABLE location_data ADD COLUMN IF NOT EXISTS intro_video_url text;
- In LocationsTab.tsx admin, add a field "Intro Image Video URL (optional)" that saves to intro_video_url
- In LocationPage.tsx, use VideoImage for the intro image, passing intro_video_url from the location data

---

## Step 5 — Commit

After all changes:
git add . && git commit -m "Add VideoImage component — optional video play button on intro images sitewide" && git push

Do not make any other changes. Only make the exact changes listed above.
