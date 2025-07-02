import Image from 'next/image';

export default function CardService({
  backgroundImage,
  title,
  content,
  reverse,
}) {
  return (
    <div
      className={`${
        reverse
          ? 'w-4/5 h-1/5 place-self-center flex flex-row-reverse shadow-xl'
          : 'w-4/5 h-1/5 place-self-center flex shadow-xl'
      }`}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-10 ps-10 pt-5 bg-detail-50">
        <div className="flex items-center justify-center bg-background-0 w-2/3 rounded-full mb-16">
          <h2 className="font-bold text-4xl text-center text-detail-0 m-4">
            {title}
          </h2>
        </div>
        <p className="text-xl text-white text-center">{content}</p>
      </div>
      <div className="flex-1 h-full">
        <Image
          src={backgroundImage}
          alt="Doggie logo"
          className="object-cover w-full h-full object-top"
          priority
        />
      </div>
    </div>
  );
}
