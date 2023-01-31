//Root URL for the web service
const wsUrl = `https://localhost:19006/ExerciseTrackerWebApp.asmx/`;




// Create GET request to a URL
async function getRequest(url, data = {}) {
    
    // Build URL with data attached
    url += '?' + new URLSearchParams(data);

    // Make request, wait for response
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data
    return response.json();
}

// Create POST request to a URL
async function postRequest(url, data = {}) {
    
    // Make request, wait for response
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache', // Ignore caching
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
    // Check for errors, e.g. 400, 500
    .then(handleFetchError);

    // Return response data
    return response.json();
}

// Check for 400-500 errors and check for custom message from server
async function handleFetchError(response) {

  // Check for errors, e.g. 400, 500
  if (!response.ok) {

    // Check for custom error message from web service
    let responseData = await response.clone().json().then(data => responseData = data);
    if (responseData.d) {
      throw Error(JSON.parse(responseData.d).Message);
    } else {
      throw Error('Error response code: ' + response.statusCode);
    }
  }

  return response;
}

//Get types
export function ETGetTypes(){
  // web service method name
  const wsMethod = 'GetTypes';

  //call web service method
  return getRequest(wsUrl+wsMethod)
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}

//Get activities
export function ETGetActivities(){
  // web service method name
  const wsMethod = 'GetActivities';

  //call web service method
  return getRequest(wsUrl+wsMethod)
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}

//Get activity
export function ETGetActivity(activityId){
  // web service method name
  const wsMethod = 'GetActivity';

  //call web service method
  return getRequest(wsUrl+wsMethod, {activityId: activityId})
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}

//Delete activity
export function ETDeleteActivity(activityId){
  // web service method name
  const wsMethod = 'DeleteActivity';

  //call web service method
  return postRequest(wsUrl+wsMethod, {activityId: activityId})
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}

//Add activity
export function ETAddActivity(typeId, date, duration, distance){
  // web service method name
  const wsMethod = 'AddActivity';

  //call web service method
  return postRequest(wsUrl+wsMethod, {typeId, date, duration, distance})
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}

//Update activity
export function ETUpdateActivity(activityId, typeId, date, duration, distance){
  // web service method name
  const wsMethod = 'UpdateActivity';

  //call web service method
  return postRequest(wsUrl+wsMethod, {activityId, typeId, date, duration, distance})
    .then(response => {
      //if the request/response is successful return json data
      return JSON.parse(response.d);
    });
}