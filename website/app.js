/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const KeyAPI = "&appid=4d545785eef306389781e3907f5a5adf";
const params = "&units=metric";
const generateButton = document.getElementById('generate');
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const dateHolder = document.getElementById('date');
const tempHolder = document.getElementById('temp');
const contentHolder = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//Asynchronously fetching data from the API
async function fetchData(baseUrl, query, params, KeyAPI){

    const res = await fetch(baseUrl + query + params + KeyAPI);
    try {
  
      const data = await res.json();
      console.log(data);

      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }
//Asynchronously post data to our server
async function postData(path, dataObj){
  const response = await fetch(path, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),         
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

//Asynchronously update the UI of our website
async function updateUI(){
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    dateHolder.innerHTML = allData[allData.length - 1].date;
    tempHolder.innerHTML = allData[allData.length - 1].temperature;
    contentHolder.innerHTML = allData[allData.length - 1].response;
  }catch(error){
    console.log("error", error);
  }
}

//Adding event listener for the generate button
generateButton.addEventListener('click', generateButtonClicked);

//Performing the data fetching actions based on the click of generate button
function generateButtonClicked(){
    let zipCode = zipInput.value;
    fetchData(baseUrl, zipCode, params, KeyAPI)
    .then(function(data){
      postData('/addEntry', {
      temperature: data.main.temp,
      date: newDate,
      response: feelingsInput.value})
      updateUI();
    });

}



