import Image from 'next/image';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onMoreInfo: (character: Character) => void;
}

export const CharacterCard = ({
  character,
  onMoreInfo,
}: CharacterCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        <p className="text-gray-600 mb-2">Status: {character.status}</p>
        <p className="text-gray-600 mb-4">Species: {character.species}</p>
        <button
          onClick={() => onMoreInfo(character)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          More Info
        </button>
      </div>
    </div>
  );
};
