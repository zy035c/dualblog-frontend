const API_URL = `http://127.0.0.1:8080`;

const printObjectProperties = (obj) => {
  Object.keys(obj).forEach((prop) => {
    console.log(prop + ": " + obj[prop]);
  });
};

const simpleGet = async (endpoint, endpointName, headers) => {
  const response = await fetch(API_URL + endpoint, {
    mode: "cors",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  });

  // if (!response.ok) {
  //   console.error(`${endpointName}: Network response was not ok`);
  //   return null;
  // }
  console.log("response: ", response);
  const parsed = await response.json();
  console.log("Fetched Data at " + endpoint + ", " + endpointName);
  printObjectProperties(parsed);

  return parsed;
};

const simplePost = async (
  endpoint,
  endpointName,
  data,
  headers
) => {
  const response = await fetch(API_URL + endpoint, {
    mode: "cors",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
  });

  // if (!response.ok) {
  //   console.error(`${endpointName}: Network response was not ok`);
  //   return response;
  // }
  const parsed = await response.json();
  console.log("Posted Data at " + endpoint + ", " + endpointName);
  printObjectProperties(parsed);

  return parsed;
};

export { simplePost, simpleGet };
