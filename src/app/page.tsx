'use client';

import { useEffect, useState } from 'react';
import { Character } from './types';
import { CharacterCard } from './components/CharacterCard';
import CharacterInfoModal from './components/CharacterInfoModal';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [showInfoModel, setShowInfoModel] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/api/characters');
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError('Failed to load characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleMoreInfo = (character: Character) => {
    setSelectedCharacter(character);

    // setShowInfoModel(true);
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'unset';
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading characters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      {selectedCharacter && (
        <CharacterInfoModal
          handleCloseModal={handleCloseModal}
          character={selectedCharacter}
        />
      )}
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Rick and Morty Characters
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onMoreInfo={handleMoreInfo}
            />
          ))}
        </div>
      </div>
    </>
  );
}
