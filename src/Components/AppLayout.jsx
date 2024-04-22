import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import CartOverview from "../Pages/CartOverview";
import { useSelector } from "react-redux";

export default function AppLayout() {
  const cart = useSelector((store) => store.cart.cart);
  const cartLength = cart.length;
  const navigation = useNavigation();

  return (
    <div className="flex flex-col h-screen">
      {navigation.state === "loading" && <Loading />}
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>

      {cartLength > 0 && <CartOverview />}
    </div>
  );
}
