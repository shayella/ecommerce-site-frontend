import { client } from "..";
import { GET_PRODUCT_BY_ID_Q } from "./allQueries";

export const fetchProductById = async (id) => {
  let data = {};
  await client
    .query({
      query: GET_PRODUCT_BY_ID_Q,
      variables: {
        id: id,
      },
    })
    .then((result) => {
      console.log("DATA ", result.data.product);
      data = result.data.product;
    });
  return data;
};
