import Calendar from "../_components/Calendar";

export const metadata = {
  title: "Calendario",
};

export default function Page() {
  return (
    <div className="w-5/6 place-self-center px-20 py-12 bg-white">
      <Calendar />
    </div>
  );
}
