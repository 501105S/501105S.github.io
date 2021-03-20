// background image

const body = document.querySelector("body");

// IMG_NUMBER는 원하는 숫자 (원하는 숫자를 사용하면 원하는대로 바뀜)
// 사진 6장
const IMG_NUMBER = 6;


function paintImg(imgNumber){
    // new Image() -> document.createElement('img')
    const image = new Image();  //어떠한 항목인지 간단한 설명을 붙이기 위한 변수이름
    image.src = `img/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage"); //css로 조정 하기 위해서 class추가
    body.appendChild(image);    //body를 image에 들어가게 함.
}

function genRandom(){
    // number(숫자) 리턴하자
    const number = Math.floor(Math.random() * IMG_NUMBER);  //random시에 숫자는 0,1,2 3,4,5개로 카운트
    return number;
}

function init(){    // init 함수 안에 숫자 생성
    const randomNumber = genRandom();
    paintImg(randomNumber);
}

init();