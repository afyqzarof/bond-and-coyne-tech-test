import Image from 'next/image';
import { Character } from '../types';
interface CharacterInfoModalProps {
  handleCloseModal: () => void;
  character: Character;
}

export default function CharacterInfoModal({
  handleCloseModal,
  character,
}: CharacterInfoModalProps) {
  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  function generateAbout(character: Character) {
    const { name, species, gender, status, origin, location } = character;

    let aboutText = `${name} is a ${status.toLowerCase()} ${species.toLowerCase()} ${
      gender ? `who identifies as ${gender.toLowerCase()}` : ''
    }.`;

    if (origin?.name && origin.name !== 'unknown') {
      aboutText += ` They originated from ${origin.name}.`;
    }

    if (location?.name && location.name !== origin?.name) {
      aboutText += ` Currently, they are located in ${location.name}.`;
    }

    aboutText += ` They have appeared in ${character.episode.length} episode${
      character.episode.length !== 1 ? 's' : ''
    }.`;

    return aboutText;
  }

  return (
    <div className="fixed inset-0 z-10 flex flex-col gap-4 bg-black/70 p-8 backdrop-blur-sm">
      <div className="flex justify-end">
        <button
          className="z-20 h-12 w-12 cursor-pointer rounded-full bg-white p-4 opacity-100"
          onClick={handleCloseModal}
        >
          <Image
            src="cross.svg"
            alt="cross"
            className="z-20 object-cover"
            width={100}
            height={100}
          />
        </button>
      </div>

      <article className="z-20 flex flex-1 flex-col gap-6 rounded-2xl bg-white p-4 opacity-100">
        <div className="relative h-3/6 w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <section className="flex flex-col gap-4">
          <h3 className="mb-0 border-b border-black/10 pb-2 text-2xl font-bold">
            {character.name}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Image
                src="info.svg"
                alt="info"
                width={100}
                height={100}
                className="w-5"
              />
              <h4 className="text-sm font-bold">
                About {getFirstName(character.name)}
              </h4>
            </div>
            <p className="text-sm">{generateAbout(character)}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Image
                src="episodes.svg"
                alt="episodes"
                width={100}
                height={100}
                className="w-5"
              />
              <h4 className="text-sm font-bold">Episodes</h4>
            </div>
            <ol className="flex list-decimal flex-col pl-4 text-sm">
              <li>Episode 1 - Title</li>
              <li>Episode 1 - Title</li>
              <li>Episode 1 - Title</li>
            </ol>
          </div>
        </section>
        <button className="justify-self-end rounded-full bg-blue-500 py-4 text-sm font-bold text-white hover:bg-blue-600">
          Find out more about Rick
        </button>
      </article>
    </div>
  );
}
