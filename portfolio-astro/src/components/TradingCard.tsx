import { useEffect, useRef } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

interface Props {
  image: string;
  alt: string;
}

const NUDGE = 24; // px per arrow-key press
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
// true when the visitor paused motion (or their OS asks for reduced motion)
const calm = () => document.documentElement.classList.contains('no-motion');

export default function TradingCard({ image, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const bounds = useRef({ minX: -9999, maxX: 9999, minY: -9999, maxY: 9999 });
  const settle = useRef<number | undefined>(undefined);
  const drag = useRef<{
    id: number;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    lx: number;
    lt: number;
  } | null>(null);

  const place = (x: number, y: number) => {
    const b = bounds.current;
    pos.current = { x: clamp(x, b.minX, b.maxX), y: clamp(y, b.minY, b.maxY) };
    const wrap = wrapRef.current;
    if (wrap) wrap.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
  };

  // Where may the card go? Anywhere in the hero, and never off the sides of the screen or under the nav.
  const computeBounds = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const homeLeft = r.left - pos.current.x;
    const homeTop = r.top - pos.current.y;
    const hero = wrap.closest('.hero') as HTMLElement | null;
    const hr = hero ? hero.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
    const vw = document.documentElement.clientWidth;
    const pad = 8;
    const minX = pad - homeLeft;
    const minY = Math.max(hr.top + pad, 64) - homeTop; // 64 = fixed nav
    bounds.current = {
      minX,
      maxX: Math.max(minX, vw - pad - r.width - homeLeft),
      minY,
      maxY: Math.max(minY, hr.bottom - pad - r.height - homeTop),
    };
  };

  const tilt = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const r = wrap.getBoundingClientRect();
    const px = clamp((clientX - r.left) / r.width, 0, 1);
    const py = clamp((clientY - r.top) / r.height, 0, 1);
    card.style.setProperty('--ry', `${((px - 0.5) * 18).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${((0.5 - py) * 18).toFixed(2)}deg`);
    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    ['--rx', '--ry', '--rz', '--mx', '--my'].forEach((p) => card.style.removeProperty(p));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const wrap = e.currentTarget;
    wrap.setPointerCapture(e.pointerId);
    computeBounds();
    drag.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: pos.current.x,
      oy: pos.current.y,
      lx: e.clientX,
      lt: e.timeStamp,
    };
    wrap.classList.add('is-dragging');
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d && d.id === e.pointerId) {
      place(d.ox + e.clientX - d.sx, d.oy + e.clientY - d.sy);
      if (!calm()) {
        // lean into the direction of travel, ease back upright when the pointer stops
        const dt = Math.max(1, e.timeStamp - d.lt);
        const vx = (e.clientX - d.lx) / dt;
        cardRef.current?.style.setProperty('--rz', `${clamp(vx * 6, -10, 10).toFixed(2)}deg`);
        d.lx = e.clientX;
        d.lt = e.timeStamp;
        tilt(e.clientX, e.clientY);
        window.clearTimeout(settle.current);
        settle.current = window.setTimeout(
          () => cardRef.current?.style.setProperty('--rz', '0deg'),
          90,
        );
      }
    } else if (e.pointerType === 'mouse' && !calm()) {
      tilt(e.clientX, e.clientY);
    }
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    e.currentTarget.classList.remove('is-dragging');
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    window.clearTimeout(settle.current);
    cardRef.current?.style.removeProperty('--rz');
  };

  const onPointerLeave = () => {
    if (!drag.current) resetTilt();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? NUDGE * 3 : NUDGE;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (moves[e.key]) {
      e.preventDefault();
      computeBounds();
      place(pos.current.x + moves[e.key][0], pos.current.y + moves[e.key][1]);
    } else if (e.key === 'Escape' || e.key === 'Home') {
      e.preventDefault();
      computeBounds();
      place(0, 0);
    }
  };

  // keep the card on screen if the window is resized or the layout switches
  useEffect(() => {
    const onResize = () => {
      computeBounds();
      place(pos.current.x, pos.current.y);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(settle.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="tc-wrap"
      role="group"
      aria-roledescription="draggable card"
      aria-label="Germaine's trading card. Drag it anywhere in this section, or focus it and use the arrow keys. Escape puts it back."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
    >
      <div ref={cardRef} className="tc">
        <div className="tc-face">
          <div className="tc-name">
            <span className="tc-title">Germaine Chin</span>
            <span className="tc-pips" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="tc-art">
            <img src={image} alt={alt} width={800} height={1053} draggable={false} />
          </div>

          <div className="tc-type">
            <span>Creature — Product Manager</span>
            <span className="tc-gem" aria-hidden="true" />
          </div>

          <div className="tc-text">
            <p>
              <b>Cognitive Science</b> — Fits products to how people think.
            </p>
            <p>
              <b>Regulated Markets</b> — Ships within MAS and AML/CFT rules.
            </p>
            <p className="tc-flavor">“Controlled chaos, by design.”</p>
          </div>

          <div className="tc-foot">Illus. Germaine Chin · 001/001</div>
          <div className="tc-pt" title="Enneagram 7">
            7/7
          </div>
        </div>
        <div className="tc-shine" aria-hidden="true" />
      </div>
    </div>
  );
}
