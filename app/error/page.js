export const metadata = {
  title: 'Error',
};

export default async function Page({ message }) {
  return (
    <div className="w-5/6 place-self-center px-20">
      <Error mascotasList={mascotasDTO} />
    </div>
  );
}
