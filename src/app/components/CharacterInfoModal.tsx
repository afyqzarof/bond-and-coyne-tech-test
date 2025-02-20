import Image from 'next/image';
interface CharacterInfoModalProps {
  handleCloseModal: () => void;
}

export default function CharacterInfoModal({
  handleCloseModal,
}: CharacterInfoModalProps) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col bg-black p-8 opacity-70 backdrop-blur-lg">
      <div className="flex justify-end">
        <button
          className="z-20 h-12 w-12 rounded-full bg-white p-4 opacity-100"
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

      <article className="bg-white">
        <p>test</p>
      </article>
    </div>
  );
}
