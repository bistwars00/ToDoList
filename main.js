/* 유저가 값을 입력한다
+ 버튼을 클릭하면, 할일이 추가된다
delete버튼을 누르면 할일이 삭제된다
check버튼을 누르면 할일이 끝나면서 밑줄이 간다
1. check 버튼을 클릭하는 순간 true false
2. true이면 끝난걸로 간주하고 밑줄 보여주기
3. false이면 안끝난걸로 간주하고 밑줄 보여주기 
진해중 끝남 탭을 누르면, 언더바가 이동한다
끝남탭은, 긑난 아이템만, 진행중탭은 진행중인 아이템만
전체탭을 누르면 다시 전체 아이템으로 돌아옴 

클릭된 탭에 자동으로 맞춰서 데이터 출력하는 로직구성
- 일단 모든 선택지의 탭을 묶은 후, 각 탭이 클릭 됐고 안됐고를 인식할 수 있게 설정함
- 모든 선택지중, 어떤 탭이 선택됐는지 인식하게 함(각각 id값을 줌)
- mode=event.target.id 를 통해서, 특정 id값을 타겟팅시 이벤트 수행한 결과값을 mode에 대입하도록 변수 만듬
- 해당 변수로 if문 써서, mode=가 all이면 전체보여주기
- mode가 
*/ 




let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); // 사용될 각 div를 특정해서 그 값을 tabs 대임, HTML의 모든 div 정보를 가져와야, 어떤 탭이 선택되는지 비교 및 구분 할수 있기 때문에, 쿼리 셀렉트 올을 써서 tabs에 저장함 
let taskList=[]; /* 할일들을 만들면 값을 저장해둘 업무 리스트 선언 */
let mode="all"; //event.target.id = 어떤 탭이 선택되었는지 각 id를 도출하는 문장은 길어서 계속 쓰기 번거롭기에, 변수를 만들어서 간단하게 변수로 씀
let filterList = []; // all이 아닌 다른 mode 상태 체크시, 해당값을 넣어줄 변수 

addButton.addEventListener("click",addTask)

for(let i=1;i<tabs.length;i++){ /* 특정된 각 탭에, 각각 한개씩 클릭 이벤트 함수값을 주기 위해 반복, 각 탭에 다른 이벤트값을 주기 위해서, 반복문 돌려서, 각 탭 클릭시 다른 이벤트 필터 동작하게함 */
    tabs[i].addEventListener("click", function(event){filter(event)})
}

console.log(tabs);

function addTask(){ /* 입력 받은 값이, 리스트에 저장되는 과정 */
    let task ={  /* 입력받은 값인 taskInput과 미션 수행 완료가 됐는지 여부를 체크할 is complete 총 2개의 정보를 묶음 형식으로 이용하기 위해서 데이터를 담아줄 객체를 선언함 */
        id: randomIDGenerate(), // 아래에 체크 함수의 기능을 사용하기위해 만듬, 체크할 때, 어떤 미션을 체크할지 인식해야하므로, 각 미션 생성시 유일한 id를 부여해줌 (id 생성 함수에서도 사용됨)
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}


function filter(event){
    mode=event.target.id;
    filterList = []; // all이 아닌 다른 mode 상태 체크시, 해당값을 넣어줄 변수 
    //console.log("filter 클릭댐", event.target.id); //어떤 탭이 선택되었는지 id값 도출함


    document.getElementById("under-line").style.width = 
    event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top = 
    event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left = 
    event.target.offsetLeft + "px";



    if(mode == "all"){ // mode가 all 이면 전체 ui에 출력하면 되니까 render 그대로 실행해줌
        render()
    }else if(mode == "ongoing"){ // 반복문을 통해서, taskList의 각 task 정보 중 완료 여부가 false인 값만 filerList에 넣어서 다른 데이터와 구분시켜줌(할일 목록 출력용)
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    }


function render(){      /* 콘솔에 찍히는 배열을 화면상에 가시화해줌 */ /* 반복문을 통해서, html 화면에 띄워질 div 묶음을, 리스트에 있는만큼 전달해줌 */
    let list =[];   // ui에 가시화 해주는 render로직에서 all일때와 그 외일때를 구분해주기위해서 새로운 저장공간의 변수를 또 만듬
    if (mode == "all"){ 
        list = taskList; // list에 taskList를 대입 // 모드가 all 일때만 tasklist가 대입되도록 해놨기에, 초기 모드값을 all로 맞춰주기(맨위) 
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList; // mode가 ongoing 혹은 done으로 필터된 값은 전부 filterList에 담은걸 다시 list에 담아줌
    }


    let resultHTML = "";    /* html페이지의 taskboard 클래스 산하에 들어갈, html문을 자동 반복 생성한 값을, 넣어줄 공간 생성 */
    for (let i=0; i< list.length; i++){ /* 백틱(`)을 이용하여 +기호 없이 html문이 작동하게 함  */
    if(list[i].isComplete == true){ //if문으로 체크해서, 완료된것은 task-done 클래스를 추가해서 ui생성하고, 그렇지 않으면 기본형식으로 바로 ui 생성함
    resultHTML += `<div class="task">   
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>                
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
    }else{
        resultHTML += `<div class="task">
        <div> ${list[i].taskContent} </div> 
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>                
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
    }
    }
    document.getElementById("task-board").innerHTML = resultHTML; /* 위에서 생성된 result 데이터값을, inner형식(전부를)으로 task-board의 전체값에 대입함 */
    /* innerHTMl은 element의 html,xml을 읽어오거나 설정 가능, 태그 안에있는 html 전체 내용을 들고옴
       textContent는 텍스트 값을 그대로 가져옴 */
}



function toggleComplete(id){
    console.log("id:",id) //해당 함수는 위에 버튼 온클릭에서, 눌려져서 실행될때마다, 추가되는 미션의 아이디값을 받고, 그 아이디를 출력해줌
    for(let i=0;i<taskList.length;i++){ // for문 반복해서 id 값이 일치하면 미션 완료상태로 체크하고 브레이크함(찾았기떄문)
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; // 느낌표는 not의 의미, 해서, 같은 속성에 not을 붙여 대입하게 해놓으면
            break;                                           // true, false 상태가 상호 변환 가능해지기 때문에, 체크 상태가 됐다가, 풀렸다가하는 선택 기능 생성됨 
        }
    }
    render(); //완료상태를 변경해준 후, 랜더 함수를 실행하여, html화면에 보이도록 가시화해줌
    console.log(taskList);
}


function deleteTask(id){ // fot문으로 먼저 선택 미션 찾아내서 삭제하고, 정보가 삭제된 상태에서 렌더로 넘어가서 버튼부터 시작해서 새로 만들어서 출력함
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)    // for문 반복해서 id로 특정 미션 찾아내고, splice문을 통해서, i번째 1개만 삭제하도록 함 
            break;
        }
    }
    render(); //기능을 만들었으니 ui 가시화 하기위해서 렌더 함수 실행함
}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9); //랜덤한 id 생성 코드 
}
