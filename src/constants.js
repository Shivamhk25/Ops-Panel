const APP_ENV = process.env.REACT_APP_BUILD_ENV
var configs = {
  PATH: '/',
  DOMAIN: 'localhost',
  MARKETING_ENDPOINT: 'http://localhost:3000',
  DASHBOARD: 'http://localhost:3000/eckhomepage/amp_homepage',
}
if (APP_ENV == 'testing') {
  configs = {
    PATH: '/',
    DOMAIN: '.imarticus.org',
    MARKETING_ENDPOINT: 'https://apiht.pegasust.imarticus.org',
    DASHBOARD: 'https://pegasust.imarticus.org/',
  }
} else if (APP_ENV == 'staging') {
  configs = {
    PATH: '/',
    DOMAIN: '.imarticus.org',
    MARKETING_ENDPOINT: 'https://apihs.pegasuss.imarticus.org',
    DASHBOARD: 'https://pegasuss.imarticus.org/',
  }
} else if (APP_ENV == 'production') {
  configs = {
    PATH: '/',
    DOMAIN: '.imarticus.org',
    MARKETING_ENDPOINT: 'https://webhook.pegasus.imarticus.org',
    DASHBOARD: 'https://pegasus.imarticus.org/',
  }
}
export default configs
