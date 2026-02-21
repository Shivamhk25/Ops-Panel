import axios from 'axios'
import configs from '../constants'
import Cookies from 'universal-cookie'

export async function getServerSideProps(id) {
  const cookies = new Cookies();
  // Fetch data from external API
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_all_fields?name=${id}`
      ,{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data
  } catch (error) {
    return {}
  }
}

export async function getProgramtag(){
  const cookies = new Cookies();

  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/getprogramtag`
      ,{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data.data
  } catch (error) {
    return {}
  }
}