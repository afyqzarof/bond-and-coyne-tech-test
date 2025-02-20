import Image from 'next/image';
import { Character } from '../types';
import Episodes from './Episodes';
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

  function getEpisodeIds(episodes: string[]) {
    return episodes.slice(0, 3).map((url) => url.split('/').pop() || '');
  }

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70 p-8 backdrop-blur-sm">
      <div className="flex w-full justify-end lg:absolute lg:right-4 lg:top-4">
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

      <article className="z-20 flex flex-1 flex-col gap-6 rounded-2xl bg-white p-4 opacity-100 lg:grid lg:h-fit lg:w-4/6 lg:max-w-3xl lg:flex-none lg:grid-cols-2 lg:gap-12 xl:w-3/6">
        <div className="relative h-3/6 w-full lg:h-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
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
              <Episodes episodeIds={getEpisodeIds(character.episode)} />
            </div>
          </section>
          {/* link to more info page */}
          <a className="hover:bg-blue-600g flex cursor-pointer justify-between justify-self-end rounded-full bg-blue-500 p-4 text-sm font-bold text-white lg:mt-4">
            Find out more about {getFirstName(character.name)}
            <Image
              src="external-link.svg"
              alt="episodes"
              width={100}
              height={100}
              className="w-5"
            />
          </a>
        </div>
      </article>
    </div>
  );
}
