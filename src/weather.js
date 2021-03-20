// weather

// 유저의 location 좌표 정보를 읽음
// 그 정보를 저장 (만약 저장한 값이 없다면 요청하자, 저장한 값이 있으면 아무것도 안해도돼)

const weather = document.querySelector(".js-weather");

// API(application Programming Interface) : 다른 서버로부터 손쉽게 데이터(오직 데이터만)를 가져올 수 있는 수단
// weather API KEY
const API_KEY = "8e1c76ffd95084981408bc559815f486"

const COORDS = 'coords'

function getWeather(lat, lng){
    // 데이터를 얻자 : fetch 사용(여기서 fetch는 request함수와 같은 역할)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric
    `).then(function(response){
        return response.json();
        //JSON 데이터를 response에서 가져오자
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}° 
        ${place}`;
    })
    // then(함수)) : 데이터가 완전히 들어온 다음 다른 함수 호출
    // then()사용의 이유 : fetch가 완료되길 기다림
}

// setItem("key", "value") : 해당 key로 value를 저장한다
// getItem("key") : 저장된 value값을 key로 가져온다.

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표를 가져오는데 성공했을 때 처리하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude

        // 객체에 변수 이름과 key값이 같게 저장할 시에는
        // latitude,
        // longitude
        // 로 작성 가능
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

// 좌표를 가져오는데 실패했을 때 처리하는 함수
function handleGeoError(){
    console.log('Cant access Geo location');
}

function askForCoords(){
    // navigatior API를 사용하자
    // 유저의 현재 위치 정보를 요청하고, 성공하면 첫 번째 함수를, 실패하면 두 번째 함수를 실행.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// Coords -> Coordinates
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);

    // 만약 localStorage에 어떤 정보도 없으면 결국 getWeather 함수 실행됨
    // askForCoords 함수가 실행되고, 이 함수에서 정상적으로 위치 정보를 가져오게 되면 handleGeoSuccess가 실행됨
    // 이 안에서 API가 최종적으로 호출됨

    if(loadedCoords === null){  // 좌표값이 없는 경우

        askForCoords();

    } else{ // 좌표값을 이미 가지고 있는 경우

        // getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        console.log(parsedCoords);
    }
}

function init(){
    loadCoords();
}

init();