import axios from "axios";
import configs from "../constants";
import Cookies from "universal-cookie";

export default async function WebinarAllField(id) {
  const cookies = new Cookies();
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/webinar_all_fields?name=${id}`,
      {
        headers: {
          "x-access-token": cookies.get("at", {
            domain: configs.DOMAIN,
            path: "/",
          }),
        },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function WebinarEditApi(id, data) {
  const cookies = new Cookies();
  let aid = cookies.get("aid", { domain: configs.DOMAIN, path: "/" });
  try {
    return await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/webinar_EditField${id}`,
      { ...data, aid: aid },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": cookies.get("at", {
            domain: configs.DOMAIN,
            path: "/",
          }),
        },
      }
    );
  } catch (error) {
    return error.response;
  }
}

// export async function CreateNewWebinar() {
//   const cookies = new Cookies();
//   try {
//     return await axios.post(
//       `${configs.MARKETING_ENDPOINT}/marketingopspanel/create_new_webinar`,
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "x-access-token": cookies.get("at", {
//             domain: configs.DOMAIN,
//             path: "/",
//           }),
//         },
//       }
//     );
//   } catch (error) {
//     return error.response;
//   }
// }
// export {WebinarAllField,WebinarEditApi}
