// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../Services/apiRestaurant.js";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../helpers/helpers.js";
import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "../slices/cartSlice.js";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const isLoadingIngredients = fetcher.state === "loading";
  const dispatch = useDispatch();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  console.log(cart);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
      dispatch(emptyCart());
    }
  });

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-8 max-w-[50rem] mt-6 ml-6 max-sm:max-w-[25rem]">
        <div className="sm:gap-[10rem] max-sm:flex-col max-sm:h-20 max-sm:gap-2 flex gap-[16rem] justify-between items-center w-full h-8">
          <h2 className="sm:text-nowrap max-sm:text-nowrap text-stone-600 font-mono font-semibold text-lg tracking-[1px] ">
            Order #{id} Status
          </h2>

          <div className="flex gap-2">
            {priority && (
              <span className="uppercase text-white font-mono font-semibold bg-red-500 rounded-full px-1 py-1 max-sm:text-sm  sm:text-sm">
                Priority
              </span>
            )}
            <span className="uppercase text-white font-mono font-semibold bg-green-500 rounded-full px-1 py-1 max-sm:text-sm max-sm:text-nowrap">
              {status} order
            </span>
          </div>
        </div>

        <div className="flex  w-full h-14 justify-between items-center bg-gray-200 px-2 ">
          <p className="text-stone-600 font-semibold font-mono tracking-[2px]">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p className="text-stone-500  font-mono  text-sm">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>
        <div className="w-full ">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              ingredients={
                fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients
              }
              isLoadingIngredients={isLoadingIngredients}
            />
          ))}
        </div>

        <div className=" py-4 w-full h-28 justify-start items-center flex-col  bg-gray-200 px-4 ">
          <p className="text-stone-600 font-normal font-mono text-sm mb-2">
            Price pizza: {formatCurrency(orderPrice)}
          </p>
          {priority && (
            <p className="text-stone-600 font-normal  font-mono  text-sm mb-2">
              Price priority: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="text-stone-600 font-semibold font-mono tracking-[1px] mb-2">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Order;
export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}
