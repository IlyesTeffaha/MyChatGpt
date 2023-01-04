import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

// thinking dots functionality

let loadInterval;

function loader(element){
  element.textContent ="";

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === "...."){
      element.textContent = "";
    }

  }, 300);
}


// writing letter by letter functionality

function typeText(element,text){
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHtml += text.charAt(index);
      index++;
    }else{
      clearInterval(interval);
    }
  }, 20);
}
  
// generate unique id for every single message 

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexastring = randomNumber.toString(16);

  return `id-${timestamp}-${hexastring}`;
   
}

//make chat screen double colored aka striped

function chatStripe (isAi , value , uniqueId){

  return(
    `
    
    <div class="wrapper ${isAi && ' ai'}">
      <div class="chat">
        <div className="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}" />

        </div>
        <div class="message" id="${uniqueId}">${value}</div>
      </div>
    </div>
    
    `
  )

}

//

const handleSubmit = async (e) =>{

  e.preventDefault();
  const data = new FormData(form);

  // user chat stripe color

  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot chat stripe color

  const uniqueId = generateUniqueId();

  chatContainer.innerHTML += chatStripe(true," ",uniqueId);

 chatContainer.scrollTop = chatContainer.scrollHeight;

 const messageDiv = document.getElementById(uniqueId);

 loader(messageDiv);

 
}