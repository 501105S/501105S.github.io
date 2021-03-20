// toDo

const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';



// 이 filter는 마치 forEach에서 function을 실행하는것과 같이
// 각각의 item과 같이 실행된다.
// 이 filter는 array를 만든다 (함수가 true를 return하는 아이템들이 있는)
// filter는 array의 모든 아이템을 통해 함수를 실행함
// true인 아이템들만 가지고 새로운 array를 만듦
// function filterFn(toDo){
//     return toDo.id === 1;
// }


// toDo(할 일 목록)를 저장하자, 할 일 목록은 array가 되어야함. 
//(할 일 항목이 많아질 수 있기 떄문, 해야할 일을 하나만 정장하는게 아니라 여러개가 모인 목록으로 저장)
// 비어있는 array로 toDos를 만들어 주자
// 해야할 일을 생성했을 때 'toDos'라는 배열안에 추가되도록하자
let toDos = [];


function DoneToDo(event){
    const doneBtn = event.target;
    const li = doneBtn.parentNode;

    toDos.forEach(function(ele){
        if(doneBtn.checked){
            toDos[getChildNumber(li)].status = "finished";
            li.classList.add("toDoListDone");
        }else{
            toDos[getChildNumber(li)].status = "ready";
            li.classList.remove("toDoListDone");
        }
    });
    
    saveToDos();

    // toDoList.classList.add('toDoListDone');
}

function getChildNumber(node) {
    return [].indexOf.call(node.parentNode.children, node);
  }


// localStorage에서 toDO 하나를 지워야함 그리고 저장해야함
// HTML에서도 지워야함

// li를 지우자
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    // 어떤 버튼이 클릭되는지를 알아야해
    // 어떤 버튼이 지워지는지를 알아야해(버튼의 부모를 알아보자)

    toDoList.removeChild(li);

    // 새로고침하면 toDo리스트가 사라지게하자
    // cleanToDos와 filter가 하는 것 : filterFn이 체크가 된 아이템들의 array를 준다.
    const cleanToDos = toDos.filter(function(toDO){
        // 모든 toDos가 li의 id와 같지 않을 때
        return toDO.id !== parseInt(li.id);
        
    });
    console.log(cleanToDos);

    // toDos를 교체하자
    toDos = cleanToDos;

    saveToDos();

    // li 에 없는 id 인 toDos를 체크하고싶다
    // 왜냐? 그것이 우리가 지우고자하는 것이기 때문
}


// toDO를 왜 이런식으로 저장하나?
// local storage에도 toDo를 저장해두어야하기 때문
function saveToDos(){   // 위의 toDos를 가져와서 로컬에 저장


    // 자바스크립트에서는 loaclStorage를 저장할 수 없음.
    // 오직 string만 저장 가능
    // 자바스크립트는 localStorage에 있는 모든 데이터를 string으로 저장함
    // 우리는 object를 string이 되도록 만들어야함.
    // 트릭인 JSON.stringify 를 사용하자.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));


    // JSON = JavaScript Object Notation
    // 데이터를 전달할 때, 자바스크립트가 그것을 다룰 수 있도록 object로 바꾸어주는 기능
    // object -> string || string -> object

} // function saveToDos()


function paintToDo(text){
    const li =document.createElement("li"); // 비어있는 li 생성


    // *** toDO : 버튼 클래스 갖기, css 호버 시 color, click 시 text-decoration
    const doneBtn = document.createElement("input"); // 완료 버튼 생성
    doneBtn.setAttribute("type", "checkbox");
    // doneBtn.innerText = "✔";
    doneBtn.addEventListener("click", DoneToDo);

    doneBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span"); // span 생성
    span.innerText = text;

    const delBtn = document.createElement("button")// 삭제 버튼 생성
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", deleteToDo);


    // id라는 key의 array길이가 어느정도인지 알 수 있음.
    // const a=[1,2,3,4,5] -> a.length = 5 (5개의 element가 들어있음)
    const newId = toDos.length + 1;


    // 무언가를 그의 father element안에 넣음.
    li.appendChild(span); // span을 li안에 넣음
    li.appendChild(doneBtn); // doneBtn을 li안에 넣음
    li.appendChild(delBtn); // delBtn버튼을 li안에 넣음
    li.id = newId;
    
    toDoList.appendChild(li); // li를 ul에 넣음

    const toDoObj = {
        // text라는 key에 text가 value로 옴
        text: text,
        id: newId
    }

    // push를 사용하여 array안에 element 하나를 넣어줄 수 있음.
    toDos.push(toDoObj);

    // push한 이후 호출하도록 해야함. (toDos안에 집어넣고 나서 호출해야함.)
    // 이전에 호출하면 saveToDos를 불러도 저장할 게 아무것도 없음
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);

    toDoInput.value = "";
}


// toDos를 가져온 뒤
// 가져온 것을 자바스크립트 object로 변환해줌
// 각각에 대해 painToDo 함수 실행
// 구체적으로는 toDo.text가 실행된다.
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){    // toDos가  null이 아니라면
        
        // toDos를 불러오자
        // string -> object
        const parsedToDos = JSON.parse(loadedToDos);
        
        // forEach는 기본적으로 함수를 실행
        // array에 담겨있는 것들 각각 한번씩 함수를 실행시켜줌
        // 안에 바로 함수를 만들어줌
        // 만들 함수를 parsedToDos에 있는 것들 각각에 대해 실행시켜줌
        // 그 각각이 toDo
        // 각각에 대해 painToDo 해주자
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
      

        // parsedToDos를 화면에 paint(보여주기)하자
        // = localStorage에서 불러온 것을 화면상에 나타내어 주자

        // 모든 toDos 항목들에 대해서(=parsedToDos안에 있는 것들에 대해서)
        // paintToDos function을 실행
    } 
}   // function loadToDos()

function init(){
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();


