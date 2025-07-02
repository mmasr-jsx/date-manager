import Calendar from '../_components/Calendar';

export const metadata = {
  title: 'Calendario',
};

export default function Page() {
  return (
    <div className="w-full place-self-center px-28 py-24 bg-white">
      <Calendar />
    </div>
  );
}
