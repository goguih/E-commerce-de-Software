import environment from "../constants/environment";

function getBaseUrl() {
  const { hostname } = window.location;
  const { url } = environment;

  let apiUrl = null;
  
  if (hostname === 'projeto-integrado-f-web.herokuapp.com') {
    apiUrl = url.prod;
  } else {
    apiUrl = url.prod;
  }

  return apiUrl;
}

export default { getBaseUrl };