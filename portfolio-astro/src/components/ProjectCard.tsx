import { useRef } from 'react';

export interface ProjectData {
  id: string;
  title: string;
  kind: 'Case study' | 'Prototype';
  org: string;
  summary: string;
  outcome?: string;
  thumbnail?: string;
  video?: string;
  href: string;
  external: boolean;
}

const FALLBACKS = ['bg-card', 'bg-rust', 'bg-forest'];

function motionAllowed() {
  if (typeof window === 'undefined') return false;
  if (document.documentElement.classList.contains('no-motion')) return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { title, kind, org, summary, outcome, thumbnail, video, href, external } = project;

  const play = () => {
    if (!video || !motionAllowed()) return;
    videoRef.current?.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-black/10 bg-bg text-ink no-underline transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,.12)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {/* media area */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${FALLBACKS[index % FALLBACKS.length]}`}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-serif text-6xl font-bold text-bg/80"
          >
            {title.replace(/[^A-Za-z0-9]/, '').charAt(0).toUpperCase() || '·'}
          </span>
        )}
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-0.5 text-xs font-semibold text-ink">
          {kind}
        </span>
      </div>

      {/* text area */}
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-xs font-semibold uppercase tracking-[.12em] text-accent">{org}</span>
        <h3 className="!m-0 font-serif text-xl leading-tight">
          {title}
          {external && <span aria-hidden="true"> ↗</span>}
        </h3>
        <p className="m-0 text-[.95rem] text-muted">{summary}</p>
        {outcome && (
          <p className="mt-2 border-t border-black/10 pt-2 text-[.9rem] font-medium text-ink">
            {outcome}
          </p>
        )}
      </div>
    </a>
  );
}
