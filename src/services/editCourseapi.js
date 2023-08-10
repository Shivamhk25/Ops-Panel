import axios from "axios";
import configs from "../constants";
import Cookies from "universal-cookie";

export async function editCourseApi(id, data) {
  try {
    const cookies = new Cookies();
    let aid = cookies.get("aid", { domain: configs.DOMAIN, path: "/" });
    // Fetch data from external API
    return await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/editschema${id}`,
      {
        ...data,
        aid: aid,
      },
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
    console.log(error, "error from edit api");
    return Promise.reject(error)
  }
}

export async function BrochureApi(id,formdata) {
  try {
    const cookies = new Cookies();
   return  await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/brochureUpload${id}`,formdata,
      {
        headers: {
          "Content-Type": 'multipart/form-data',
          "x-access-token": cookies.get("at", {
            domain: configs.DOMAIN,
            path: "/",
          }),
        },
      }
    )
  } catch(error){
    // console.log(error.response, "error from edit api");

    return error.response;
  }
}