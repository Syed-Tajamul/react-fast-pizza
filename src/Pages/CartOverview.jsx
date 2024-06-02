import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const cart = useSelector((store) => store.cart.cart);
  // const pizzaCartLength = cart.length;
  const totalPizzasQuantity = cart.reduce(
    (acc, cur) => (acc = cur.quantity + acc),
    0
  );
  const totalItemsPrice = cart.reduce(
    (acc, cur) => (acc = cur.unitPrice * cur.quantity + acc),
    0
  );

  return (
    <div className=" max-sm:w-full   w-full flex justify-between items-center bg-stone-800 px-8 py-[13px]">
      <p className="text-gray-200 flex gap-6 font-semibold">
        <span>{totalPizzasQuantity} 🍕</span>
        <span>${totalItemsPrice}</span>
      </p>

      <Link className="text-gray-200 font-semibold" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
