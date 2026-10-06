import { useState } from 'react';
import ProjectCard, { type ProjectData } from './ProjectCard';

type Filter = 'All' | ProjectData['kind'];
const FILTERS: Filter[] = ['All', 'Case study', 'Prototype'];

export default function ProjectGrid({ projects }: { projects: ProjectData[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? projects : projects.filter((p) => p.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`cursor-pointer rounded-full border border-ink px-4 py-1 text-sm font-medium transition-colors ${
              filter === f ? 'bg-ink text-bg' : 'bg-transparent text-ink hover:bg-ink/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      {visible.length === 0 && <p className="text-muted">Nothing here yet.</p>}
    </div>
  );
}
