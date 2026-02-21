import axios from "axios";
import configs from "../constants";
import Cookies from "universal-cookie";

export async function getDeployment() {
  const cookies = new Cookies();
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_deployment`,
      {
        headers: {
          "x-access-token": cookies.get("at", {
            domain: configs.DOMAIN,
            path: "/",
          }),
        },
      }
    );

    return res;
  } catch (error) {
    return {};
  }
}

export async function postDeployment() {
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/create_staging_deployment`,
      {},{
        headers: {
          "x-access-token": cookies.get("at", {
            domain: configs.DOMAIN,
            path: "/",
          }),
        },
      }
    );
    return res;
  } catch (error) {
    return {};
  }
}

export async function getDeploymentStatus(currentPage,size) {
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_deployment_status`,
      {pageNumber:currentPage, ipp : size},
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
    return {};
  }
}

export async function getDeploymentSpecificStatus(id) {
  const cookies = new Cookies();
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_deployment_specific_status?_id=${id}`,
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
    return {};
  }
}

export async function getDeploymentName(approvalID) {
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_approval_data`,
      {
        approvalID,
      },
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
    return {};
  }
}

// export async function viewDeploymentSpecific(id) {
//   const cookies = new Cookies();
//   try {
//     const res = await axios.get(
//       `${configs.MARKETING_ENDPOINT}/marketingopspanel/view_deployment_data?_id=${id}`,
//       {
//         headers: {
//           "x-access-token": cookies.get("at", {
//             domain: configs.DOMAIN,
//             path: "/",
//           }),
//         },
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// }
