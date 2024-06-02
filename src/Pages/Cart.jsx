import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { emptyCart } from "../slices/cartSlice";
import EmptyCart from "./EmptyCart";
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const cart = useSelector((store) => store.cart.cart);
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();
  console.log(cart);
  return (
    <div className="flex justify-center items-center h-full ">
      {cart.length !== 0 ? (
        <div className=" flex flex-col gap-6 items-start py-4  px-2  max-sm:items-start ">
          <div>
            <Link className="text-sm text-blue-500" to="/menu">
              &larr; Back to menu
            </Link>
          </div>

          <div className="w-full">
            <h2 className="text-stone-600 font-mono font-bold text-md ">
              Your cart, {name}
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-sm:gap-5 ">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </div>

          <div className="flex gap-4 w-full ">
            <Link
              className=" h-12 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold  rounded-full w-[120px] bg-yellow-400  text-slate-800 text-center text-nowrap py-3 px-2 "
              to="/order/new"
            >
              Order pizzas
            </Link>
            <button
              className="hover:bg-gray-300 hover:text-stone-600 transition-all duration-300 uppercase  text-sm font-semibold  rounded-full w-[120px] px-4 py-2 text-gray-400 border-2 border-gray-300"
              onClick={() => dispatch(emptyCart())}
            >
              Clear cart
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default Cart;
