import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //3 get the menu data into the component via custom hook useLoaderData()
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {/* use the menu data inside the component */}
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//1 Create and export the loader function
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
