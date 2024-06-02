export default function Pizza({ pizza }) {
  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza img" width={110} height={110} />
      <h1>{pizza.name}</h1>
      <p>{pizza.ingredients}</p>
    </div>
  );
}
