import { useLoaderData } from "react-router-dom";
import { getMenu } from "../Services/apiRestaurant";
import MenuItem from "./MenuItem";

export default function Menu() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      {data.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </div>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
