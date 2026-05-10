import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => setIsFetching(false));
  }, [isFetching]);

  return { sentinelRef, isFetching };
};