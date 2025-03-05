import Image from "next/image";

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
          ? "w-3/5 h-1/4 place-self-center flex flex-row-reverse shadow-xl bg-background-1 border border-background-1"
          : "w-3/5 h-1/4 place-self-center flex shadow-xl bg-background-1"
      }`}
    >
      <div className="flex-1 items-center px-10 ps-10 pt-5 bg-white">
        <div className="shadow-md bg-background-0 h-1/6 grid place-items-center rounded-full">
          <h2 className="font-bold text-2xl text-background-50">{title}</h2>
        </div>
        <div className="mt-10 ps-2 px-2 font-semibold ">
          <p className="text-lg">{content}</p>
        </div>
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
