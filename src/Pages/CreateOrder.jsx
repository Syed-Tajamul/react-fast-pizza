import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../Services/apiRestaurant";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getAddress } from "../Services/apiGeocoding";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  const name = useSelector((store) => store.user.name);
  const cart = useSelector((store) => store.cart.cart);
  console.log(cart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  console.log(formErrors);
  const [withPriority, setWithPriority] = useState(false);
  const [address, setAddress] = useState("");
  // const cart = fakeCart;
  // function handleClick() {
  //   navigator.geolocation.getCurrentPosition(
  //     async function resolve(pos) {
  //       console.log(pos);
  //       const data = await getAddress(
  //         pos.coords.latitude,
  //         pos.coords.longitude
  //       );
  //       console.log(data);
  //     },
  //     function reject(error) {
  //       console.log(error);
  //     }
  //   );
  // }
  function handleClick() {
    navigator.geolocation.getCurrentPosition(
      async function resolve(pos) {
        console.log("Position:", pos);
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Call getAddress function with obtained coordinates
        const data = await getAddress(latitude, longitude);
        console.log("Address Data:", data);
        const city = data.city;
        const state = data.principalSubdivision;
        const country = data.countryName;

        const location = `${city}, ${state} , ${country}`;
        setAddress(location);
      },
      function reject(error) {
        console.log("Geolocation Error:", error);
      }
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="py-6 flex flex-col  justify-center items-start  px-4  max-sm:h-full">
        <h2 className="tracking-[2px] text-stone-600 font-semibold font-mono text-xl mb-8">
          Ready to order? Lets go!
        </h2>

        <Form method="POST">
          <div className="max-sm:justify-center max-sm:gap-20   flex gap-8 mb-8 justify-start items-center">
            <label className="max-sm:w-10  w-40 text-nowrap text-gray-600  font-mono">
              First Name
            </label>
            <input
              className="sm:flex-none sm:w-[26rem] max-sm:w-[17rem] max-sm:flex-none transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full w-[29rem]  border-2 border-gray-200 h-10 flex-1  "
              type="text"
              name="customer"
              defaultValue={name}
              required
            />
          </div>

          <div className="max-sm:justify-center max-sm:gap-20  flex gap-8 mb-8 justify-start items-center">
            <label className="max-sm:w-10 w-40 text-nowrap text-gray-600  font-mono">
              Phone number
            </label>

            <input
              className="sm:flex-none sm:w-[26rem] max-sm:w-[17rem] max-sm:flex-none transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full w-[29rem] flex-1 border-2 border-gray-200 h-10 "
              type="tel"
              name="phone"
              required
            />
          </div>
          <div className=" relative bottom-4 left-24 max-sm:left-16 flex justify-center items-center">
            {formErrors?.message && (
              <p className="max-sm:w-[17rem] px-2 w-[28rem] rounded-md text-white font-mono font-medium bg-pink-500  text-sm">
                Plz enter valid phone number
              </p>
            )}
          </div>

          <div className="max-sm:justify-center max-sm:gap-20 flex gap-8 mb-8 justify-start items-center relative">
            <label className="max-sm:w-10 w-40 text-gray-600  font-mono">
              Address
            </label>

            <input
              className="sm:flex-none sm:w-[26rem] max-sm:w-[17rem] max-sm:flex-none transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full  border-2 border-gray-200 h-10 w-[29rem] flex-1"
              type="text"
              name="address"
              defaultValue={address}
              required
            />
            <button
              onClick={handleClick}
              className="z-10 absolute right-1 bottom-1 hover:bg-yellow-300 transition-all duration-300 uppercase  text-xs font-semibold mt-4 rounded-full w-[7rem] text-nowrap h-8 bg-yellow-400 px-4  text-slate-800"
            >
              Get Position
            </button>
          </div>

          <div className="flex gap-6 mb-8">
            <input
              className="w-6 h-6 accent-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label
              htmlFor="priority"
              className="max-sm:tracking-normal tracking-[2px] text-stone-800  font-semibold font-mono"
            >
              Want to yo give your order priority?
            </label>
          </div>

          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <button
              className="hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold mt-4 rounded-full w-40 h-12 bg-yellow-400 px-4  text-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "...do not refresh the page" : "order now"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export async function action({ request }) {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);

  const error = {};
  if (!isValidPhone(data.phone)) {
    error.message = "not a valid number";
    return error;
  }
  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
  };
  console.log(newOrder);
  const order = await createOrder(newOrder);
  return redirect(`/order/${order.id}`);
}

export default CreateOrder;
