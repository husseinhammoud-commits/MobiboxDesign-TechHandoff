/**
 * useInfiniteScroll — paginated rendering with cascade-load behavior.
 *
 * The grid renders `batchSize` items at a time. When the user scrolls the
 * sentinel into view, the next batch loads after `loadDelayMs` (so the
 * skeleton has time to animate). On tall displays where the initial batch
 * fits in the viewport without overflow, the hook cascade-loads further
 * batches until the page is tall enough to require scrolling — this avoids
 * the "stuck at 18 cards" issue that vanilla IntersectionObserver produces
 * on wide monitors.
 *
 * Returns:
 *   visibleItems  — the currently-rendered slice of the source array
 *   sentinelRef   — attach to a sentinel element placed AFTER the grid
 *   isLoading     — true while a batch is animating in (drive skeletons)
 *   reachedEnd    — true once all items are visible
 *
 * Usage:
 *   const { visibleItems, sentinelRef, isLoading, reachedEnd } = useInfiniteScroll(allServices);
 *   return (
 *     <>
 *       <div className="grid">{visibleItems.map(renderCard)}</div>
 *       {isLoading && <Skeletons count={9} />}
 *       <div ref={sentinelRef} />
 *       {reachedEnd && <EndOfList />}
 *     </>
 *   );
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseInfiniteScrollOptions {
  /** How many items to render per batch. Default 9. */
  batchSize?:   number;
  /** ms before the next batch swaps in (skeleton dwell time). Default 600. */
  loadDelayMs?: number;
  /** Extra pixels below the viewport where the sentinel still counts as visible. Default 300. */
  rootMargin?:  number;
}

export function useInfiniteScroll<T>(allItems: T[], options: UseInfiniteScrollOptions = {}) {
  const { batchSize = 9, loadDelayMs = 600, rootMargin = 300 } = options;

  const [visibleCount, setVisibleCount] = useState(Math.min(batchSize, allItems.length));
  const [isLoading, setIsLoading]       = useState(false);
  const sentinelRef                     = useRef<HTMLDivElement | null>(null);
  const isLoadingRef                    = useRef(false);

  const loadNext = useCallback(() => {
    if (isLoadingRef.current) return;
    if (visibleCount >= allItems.length) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    window.setTimeout(() => {
      setVisibleCount((prev) => {
        const next = Math.min(prev + batchSize, allItems.length);
        return next;
      });
      isLoadingRef.current = false;
      setIsLoading(false);
    }, loadDelayMs);
  }, [allItems.length, batchSize, loadDelayMs, visibleCount]);

  // IntersectionObserver — drives loading when the user scrolls
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    if (visibleCount >= allItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) loadNext();
        }
      },
      { rootMargin: `${rootMargin}px` }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [allItems.length, loadNext, rootMargin, visibleCount]);

  // Cascade-load — after each batch, if the sentinel is still within range
  // (i.e., the page isn't tall enough to require scrolling), trigger the next batch.
  useEffect(() => {
    if (isLoadingRef.current) return;
    if (visibleCount >= allItems.length) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    // Defer one frame so the just-added cards have laid out
    const id = requestAnimationFrame(() => {
      const top = sentinel.getBoundingClientRect().top;
      if (top < window.innerHeight + rootMargin) loadNext();
    });
    return () => cancelAnimationFrame(id);
  }, [visibleCount, allItems.length, loadNext, rootMargin]);

  // Reset when the source array changes (e.g., filter applied)
  useEffect(() => {
    setVisibleCount(Math.min(batchSize, allItems.length));
    isLoadingRef.current = false;
    setIsLoading(false);
  }, [allItems, batchSize]);

  return {
    visibleItems: allItems.slice(0, visibleCount),
    sentinelRef,
    isLoading,
    reachedEnd:   visibleCount >= allItems.length,
    loadedCount:  visibleCount,
    totalCount:   allItems.length,
  };
}
