import Image from 'next/image';
import bgLogo from '../public/Freya_fachada.png';
import bgsLogo from '../public/logo.png';
import bgs2Logo from '../public/TitleService1.jpg';
import CardService from './_components/CardService';
import Slider from './_components/Slider';

export default function Page() {
  const content =
    'Officia fugiat cillum velit minim incididunt anim amet quis. Non eiusmod exercitation nisi id anim magna excepteur sint ex aliquip sint veniam voluptate. Lorem amet nisi mollit reprehenderit elit ea exercitation consectetur aliquip officia. Voluptate aute deserunt proident sit quis incididunt ut aute dolor est quis.';
  const title = 'Servicios de Peluqueria';

  return (
    <>
      <div className="w-3/5 place-self-center px-20">
        <Image
          src={bgLogo}
          alt="Doggie logo"
          className="object-cover object-top w-full"
          priority
        />
      </div>
      <Slider />

      <CardService
        backgroundImage={bgsLogo}
        title={title}
        content={content}
        reverse={true}
      />
      <CardService
        backgroundImage={bgs2Logo}
        title="Officia fugiat cillum velit minim incididunt anim amet qu."
        content={content}
        reverse={false}
      />
    </>
  );
}
