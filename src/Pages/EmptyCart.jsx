import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex flex-col gap-4 relative bottom-[30%] right-[10%]">
      <Link className="text-blue-400 font-mono " to="/menu">
        &larr; Back to menu
      </Link>

      <p className="text-stone-600 font-mono font-semibold text-lg">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
