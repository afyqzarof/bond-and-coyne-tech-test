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
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">{character.name}</h2>
        <p className="mb-2 text-gray-600">Status: {character.status}</p>
        <p className="mb-4 text-gray-600">Species: {character.species}</p>
        <button
          onClick={() => onMoreInfo(character)}
          className="w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          More Info
        </button>
      </div>
    </div>
  );
};
