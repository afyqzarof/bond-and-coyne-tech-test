import { useEffect, useState } from 'react';
import { Episode } from '../types';
interface EpisodesProps {
  episodeIds: string[];
}

export default function Episodes({ episodeIds }: EpisodesProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        'api/episodes?' + getEpisodeQueryParams(episodeIds),
      );

      const data = await response.json();
      setEpisodes(data);
      try {
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setError('Failed to load episodes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [episodeIds]);

  const getEpisodeQueryParams = (ids: string[]) => {
    return new URLSearchParams({
      episodes: ids.join(','),
    }).toString();
  };

  if (loading) {
    return (
      <div className="flex w-3/6 flex-col gap-1">
        <div className="h-3 animate-pulse rounded bg-gray-400"></div>
        <div className="h-3 animate-pulse rounded bg-gray-400"></div>
        <div className="h-3 animate-pulse rounded bg-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <ol className="flex list-decimal flex-col pl-4 text-sm">
      {episodes.map((episode) => {
        return (
          <li key={episode.id}>
            {episode.name} ({episode.episode})
          </li>
        );
      })}
    </ol>
  );
}
