import axios from "axios";
import configs from "../constants";
import Cookies from "universal-cookie";

export default async function WebinarJsonForm() {
  const cookies = new Cookies();
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/webinar_form_json`,
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
    console.log(error, "error from edit api");
    return Promise.reject(error);
  }
}
export async function WebinarEditJsonForm(data) {
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/webinar_edit_form_schema`,
      { data:data },
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
    console.log(error, "error from edit api");
    return Promise.reject(error);
  }
}
