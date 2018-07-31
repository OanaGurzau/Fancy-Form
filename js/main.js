//questions array
const questions = [
    {question: 'Enter your first name'},
    {question: 'Enter your last name'},
    {question: 'Enter your email', pattern: /\S+@\S+\.\S+/},
    {question: 'Create a Password', type: 'password'}

];

//transition times
const shakeTime = 100; //shake 100 miliseconds
const switchTime = 200; // 200milliseconds - transition between questions

//init position at first question
let position = 0;

//init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//events

//get questions on dom load
document.addEventListener('DOMContentLoaded', getQuestion);

//nEXT bUTTON clICK
nextBtn.addEventListener('click', validate);

//input Field
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13){ //if key = 13, which is enter
        validate();
    }
});

//functions

//get question from array and add to markup
function getQuestion(){
    //get current // question
    inputLabel.innerHTML = questions[position].question;
    //get current type
    inputField.type = questions[position].type || 'text';
    //get current answer
    inputField.value = questions[position].answer || '';
    //focus on element
    inputField.focus();

    //set progress bar width - variable to the  questions length
    progress.style.width = (position * 100) / questions.length + '%';

    //add user icon or back arrow depending on  question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();

}

//display question to user
function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition='';
    inputProgress.style.width = '100%';
}

//hide question from user
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;

}

//transform to create shake motion
function transform(x, y){
    // console.log(x, y);

    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//validate field
function validate(){
    //make sure pattern matches if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)){
        inputFail();
    } else{
        inputPass();
    }
}

//field input fail
function inputFail() {
    formBox.className = 'error';
    //repeat shake motion - set i to number of shakes
    for (let i = 0; i < 6; i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2  - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

//field input passed
function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //store answer in array

    questions[position].answer = inputField.value;

    //incremenet position
    position++;

    //if new question, hide current and get next
    if(questions[position]){
        hideQuestion();
        getQuestion();
    } else{
        //remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        //form complete
        formComplete();
    }

}


//all fields complete

function formComplete(){
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered!`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => h1.style.opacity = 1, 50);
    }, 1000);
}
