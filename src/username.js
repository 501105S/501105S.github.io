// Hello ~~~


const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const user_LS = "currentUser",
    showing_CN = "showing";


// 3. input 에 값 입력시 현재 값은 input.value 로 고정, 
//    paintText 함수로 화면에 출력을 하고
// 5. saveName 에서 전달 받은 text 라는 변수는 곧 input.value이다.

function handleSubmit(event){ // 제출하면
    // event가 발생하면 root에서 발생 form에서 일어남
    // 이 event는 마치 일종의 거품과 같음
    // 이 event가 올라가면서 다른 모든 것들이 event에 반응함
    // form을 제출하는 event가 발생하면 event가 document까지 위로 올라감
    // 이러한 event의 기본 동작(기본값)을 막는(event 금지) 메소드 적용
    event.preventDefault();

    //이 parameter의 현재value가 필요함
    const currentValue = input.value;

    // value를 갖고 paintGreeting 함수를 다시 불러오자
    // paintingGreeting 함수는 form을 지우고 나에게 greeting을 보여주고 내가 보낸 text를 넣음
    paintGreeting(currentValue);

    // 이름(currentValue) 저장
    saveName(currentValue);
}

// 4. saveName 함수로 localstorage 에 input 값을 저장
function saveName(text){ // 이름을 저장하는 함수
    localStorage.setItem(user_LS, text);
} // function saveName(text)

// 2. input 박스 활성화, 폼이 submit 작업을 할 때 handleSubmit 함수 작동
function askFormName(){
    form.classList.add(showing_CN);
    form.addEventListener("submit", handleSubmit);
} // function askFormName()

function paintGreeting(text){
    form.classList.remove(showing_CN);
    greeting.classList.add(showing_CN);
    greeting.innerText = `Hello ${text}`;
} // function paintGreeting(text)

function loadName(){ // name을 불러오는 함수
    const currentUser = localStorage.getItem(user_LS);

    if(currentUser === null){
        //she is not
        // localstorage에서 값 가져오기
        askFormName();
    } else{
        // she is
        // 01. localstorage에 값이 없을 때 input박스 활성화
        paintGreeting(currentUser);
    }

} //function loadName()

function init(){
    loadName();
}

init();