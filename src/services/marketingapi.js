import axios from 'axios'
import configs from '../constants'
import Cookies from 'universal-cookie'

export const marketingApiHelper = async (data) => {
  const cookies = new Cookies();

  try {
    console.log({ configs })
    const response = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/program_schema`,
      data,{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    if(response.data === "Already Exists"){
      alert("Already Exists");
    }else if(response.data === "Succesfully added"){
      alert("Succesfully added");
    }
    return response.data
  } catch (error) {
    console.log(error)
    if (error.response) {
      return Promise.reject(error.response.data.message)
    }
    return Promise.reject('Something went wrong')
  }
}

