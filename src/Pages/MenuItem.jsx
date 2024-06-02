import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../helpers/helpers";
import {
  addItem,
  deleteItem,
  increaseItem,
  decreaseItem,
} from "../slices/cartSlice";
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((store) => store.cart.cart);
  const isInCart = cart.find((item) => item.pizzaId === id);
  const item = cart.find((item) => item.pizzaId === id);
  const itemQuantity = item?.quantity;
  // const quantity = item.itemQuantity;

  function handleAddToCart() {
    const item = {
      pizzaId: id,
      name,
      unitPrice,
      ingredients,
      imageUrl,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(item));
  }
  function handleIncreaseQuantity(id) {
    dispatch(increaseItem(id));
  }
  function handleDecreaseItem(id) {
    dispatch(decreaseItem(id));
  }
  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  // function handleRemoveFromCart(id) {
  //   dispatch(deleteItem(id));
  // }

  return (
    <div className="sm:px-[1rem]   flex  justify-between items-center lg:px-[200px]  py-2 max-sm:px-[5px]">
      <li className={`list-none flex ${soldOut ? "grayscale" : ""}`}>
        <img src={imageUrl} alt={name} width={85} height={85} />
        <div className="flex flex-col justify-start items-start pl-4">
          <p className="font-bold tracking-[2px] text-stone-600 font-mono">
            {name}
          </p>
          <p className="text-stone-500  font-mono text-sm capitalize max-sm:w-[150px]">
            {ingredients.join(", ")}
          </p>
          <div className="pt-4 text-stone-600 font-mono text-sm">
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          </div>
        </div>
      </li>
      {isInCart ? (
        <div className="max-sm:gap-2 flex gap-4 justify-end items-center  w-full">
          <button
            className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-2 py-2 w-9 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold  rounded-full   bg-yellow-400   text-slate-800"
            onClick={() => handleDecreaseItem(id)}
          >
            -
          </button>
          <span className="text-stone-700 font-mono text-sm">
            {itemQuantity}
          </span>
          <button
            className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-2 py-2 w-9 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold rounded-full   bg-yellow-400   text-slate-800"
            onClick={() => handleIncreaseQuantity(id)}
          >
            +
          </button>
          <div>
            <button
              className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-4 hover:bg-yellow-300 transition-all duration-300 uppercase  text-xs font-semibold rounded-full  h-8 bg-yellow-400   text-slate-800"
              onClick={() => handleDeleteItem(id)}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            hidden={soldOut}
            onClick={handleAddToCart}
            className="hover:bg-yellow-300 transition-all duration-300 uppercase  text-xs font-semibold mt-4 rounded-full w-30 h-8 bg-yellow-400 px-4  text-slate-800 max-sm:text-nowrap "
          >
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
