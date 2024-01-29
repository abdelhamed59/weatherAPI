// let allData=[]

// function catageory(type){
//     let api=new XMLHttpRequest()
// api.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${type}`)
// api.send()
// api.addEventListener("readystatechange",function(){
//     if(api.readyState==4&&api.status==200){
//         console.log(JSON.parse(api.response).recipes);

//         allData=JSON.parse(api.response).recipes
//         display();
//     }
// })
// }
// document.querySelector(`select`).addEventListener(`change`,function(e){
//     catageory(e.target.value)

// })

// function display(){
//     let cartona=``
//     for (let i = 0; i < allData.length; i++) {
//         cartona+=`<div class="col-md-4">
//         <img src="${allData[i].image_url}" class="w-100" alt="">
//         <h2>${allData[i].title}</h2>
//     </div>`

//     }
//     document.querySelector(`#data`).innerHTML=cartona
// }


let search = document.querySelector(`#search`);
// current day
let toDayName = document.querySelector(`#toDayName`);
let toDayNum = document.querySelector(`#toDayNum`);
let toDayMonth = document.querySelector(`#toDayMonth`);
let toDayLocation = document.querySelector(`#toDayLoctaion`);
let toDayCountry = document.querySelector(`#toDayCountry`)
let toDayTemp = document.querySelector(`#temp`);
let toDayConImg = document.querySelector(`#toDayConImg`);
let toDayConTxt = document.querySelector(`#toDayConTxt`);
let humidity = document.querySelector(`#humidity`);
let wind = document.querySelector(`#wind`);
let compass = document.querySelector(`#compass`);
// next day
let nextDayName = document.querySelector(`#nextDay`);
let nextConImg = document.querySelector(`#nextConImg`);
let nextMaxTemp = document.querySelector(`#nextMaxTemp`);
let nextMinTemp = document.querySelector(`#nextMinTemp`);
let nextConText = document.querySelector(`#nextConText`);
let nextDayNum = document.querySelector(`#nextDayNum`);
let nextDayMonth = document.querySelector(`#nextDayMonth`);
// after next day
let ANDayName = document.querySelector(`#ANDayName`);
let ANConImg = document.querySelector(`#ANConImg`);
let ANMaxTemp = document.querySelector(`#ANMaxTemp`);
let ANMinTemp = document.querySelector(`#ANMinTemp`);
let ANConText = document.querySelector(`#ANConText`);
let ANDayNum = document.querySelector(`#ANDayNum`);
let ANDayMonth = document.querySelector(`#ANDayMonth`);






async function getWeatherAPI(city) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce11ef38847040538e1153301242501&q=${city}&days=3`);
    let weatherSource = await weather.json()
    console.log(weatherSource);
    return weatherSource

}

function displayToDayData(data) {
    let toDayDate = new Date();
    toDayName.innerHTML = toDayDate.toLocaleDateString(`en-us`, { weekday: `long` });
    toDayNum.innerHTML=toDayDate.getDate();
    toDayMonth.innerHTML=toDayDate.toLocaleDateString(`en-us`, { month: `long` });
    toDayLocation.innerHTML = data.location.name;
    toDayCountry.innerHTML = data.location.country;
    toDayTemp.innerHTML = data.current.temp_c;
    wind.innerHTML = data.current.wind_kph + ` km/h`;
    humidity.innerHTML = data.current.humidity + `%`;
    toDayConImg.setAttribute("src", data.current.condition.icon);
    toDayConTxt.innerHTML = data.current.condition.text;
    compass.innerHTML = data.current.wind_dir;

}
function displayNextDay(data) {
    let nextDayDate=new Date(data.forecast.forecastday[1].date)
    nextDayName.innerHTML = nextDayDate.toLocaleDateString(`en-us`, { weekday: `long` });
    nextDayNum.innerHTML=nextDayDate.getDate();
    nextDayMonth.innerHTML=nextDayDate.toLocaleDateString(`en-us`, { month: `long` });
    nextMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    nextMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    nextConText.innerHTML = data.forecast.forecastday[1].day.condition.text;
    nextConImg.setAttribute(`src`, data.forecast.forecastday[1].day.condition.icon);
}

function displayAfterNextDay(data) {
    let afterNextDay=new Date(data.forecast.forecastday[2].date)
    ANDayName.innerHTML = afterNextDay.toLocaleDateString(`en-us`, { weekday: `long` });
    ANDayNum.innerHTML=afterNextDay.getDate();
    ANDayMonth.innerHTML=afterNextDay.toLocaleDateString(`en-us`, { month: `long` });
    ANMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    ANMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    ANConText.innerHTML = data.forecast.forecastday[2].day.condition.text;
    ANConImg.setAttribute(`src`, data.forecast.forecastday[2].day.condition.icon);
}




async function runProj(city=`alex`) {
    let getWeather = await getWeatherAPI(city);
    if(!getWeather.error){
        displayToDayData(getWeather)
    displayNextDay(getWeather)
    displayAfterNextDay(getWeather)
    }

}
runProj()
search.addEventListener(`input`,function(){
    runProj(search.value);
})