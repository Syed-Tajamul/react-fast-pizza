// import { useFetcher } from "react-router-dom";
import { formatCurrency } from "../helpers/helpers.js";
// import { useEffect } from "react";

function OrderItem({ item, isLoadingIngredients, ingredients = [] }) {
  console.log(ingredients);
  const { quantity, name, totalPrice } = item;

  return (
    <ul className="flex flex-col ">
      <div className="flex justify-between items-center ">
        <p className="text-stone-600 font-mono text-base my-2">
          <span className="text-stone-600 font-mono font-semibold">
            {quantity}&times;
          </span>{" "}
          {name}
        </p>
        <p className="text-stone-600 font-mono font-semibold">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      {isLoadingIngredients ? (
        "...Loading"
      ) : (
        <p className="italic text-xs font-mono text-stone-500 uppercase tracking-[1px]">
          {ingredients.join(",")}
        </p>
      )}
    </ul>
  );
}

export default OrderItem;
