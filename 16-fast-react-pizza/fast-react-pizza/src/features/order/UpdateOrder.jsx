import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  //fetcher.Form is a wrapper we can use to update data without navigation
  // it's a great option because it cause data revalidation and necessary re-render of the component it is included in.

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  //since here there is no form data to read so we will not use the request param and it could be removed... refer to the example action function in  createOrder.jsx

  const data = { priority: true };

  await updateOrder(params.orderId, data); //params.orderId is already accessible from the URL of the page

  return null; //action function has to have a return something
}
