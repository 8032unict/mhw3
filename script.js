const button = document.querySelector('.result button');
const UNCHECKED = 'images/unchecked.png'
const CHECKED = 'images/checked.png'
const boxes = document.querySelectorAll('.box');
const CheckedBoxes = {};

function crossAnswer(event){
    /*tolgo selezione da altri box dello stesso questionId*/
    for(let box of boxes){
        if(event.currentTarget.dataset.questionId === box.dataset.questionId &&
            event.currentTarget.dataset.choiceId !== box.dataset.choiceId){
                box.classList.add('unselected');
                const img = box.querySelector('.checkbox');
                img.src = UNCHECKED;
                if(box.classList.contains('selected')){
                    box.classList.remove('selected');
                    box.classList.add('unselected');
                    const img = box.querySelector('.checkbox');
                    img.src = UNCHECKED;
                }
            }
        else{
            /*seleziona la box cliccata, è una ridondanza metterlo nell'else*/
            event.currentTarget.classList.remove('unselected');
            event.currentTarget.classList.add('selected');
            const img = event.currentTarget.querySelector('.checkbox');
            img.src = CHECKED;
            CheckedBoxes[event.currentTarget.dataset.questionId] = event.currentTarget.dataset.choiceId;
        }
    }


    /*check se le risposte sono state date tutte e tre*/
    if(Object.values(CheckedBoxes).length === 3){
        for(let box of boxes){
            box.removeEventListener('click',crossAnswer);
        }
        getResult();
    }


    

}

function getResult(){
    console.log(CheckedBoxes.one);
    if(CheckedBoxes.one==CheckedBoxes.two || CheckedBoxes.one==CheckedBoxes.three){
        showResult(CheckedBoxes.one);
    }
    else if(CheckedBoxes.two == CheckedBoxes.three){
        showResult(CheckedBoxes.two);
    }
    else{
        showResult(CheckedBoxes.one);
    }
}

function showResult(answer){
    let i = answer;
    let results = document.querySelector('.result');
    let title = results.querySelector('#title');
    let content = results.querySelector('#contents');
    title.textContent = RESULTS_MAP[i].title;
    content.textContent = RESULTS_MAP[i].contents;
    results.classList.remove('hidden');
}

function restartQuiz(event){
    let results = document.querySelector('.result');
    let title = results.querySelector('#title');
    let content = results.querySelector('#contents');
    results.classList.add('hidden');
    title.textContent = '';
    content.textContent='';
    delete CheckedBoxes.one;
    delete CheckedBoxes.two;
    delete CheckedBoxes.three;
    for (let box of boxes){
        box.addEventListener('click',crossAnswer);
        let img = box.querySelector('.checkbox');
        img.src = UNCHECKED;
        if(box.classList.contains('selected') || box.classList.contains('unselected')){
            box.classList.remove('selected');
            box.classList.remove('unselected');
        }
        
        console.log('added');
    }
}
button.addEventListener('click',restartQuiz);

for (const box of boxes){
    box.addEventListener('click',crossAnswer);
    console.log('added');
}

const url_image = 'undefined';

function onJson1(json){
    console.log('json ricevuto');
    url_image = json.image;
    console.log(url_image);
}

function onResponse1(response){
    console.log('risposta ricevuta');
    return response.json();
}

function onError(error){
    console.log('Error: '+ error);
}

function shibaSearch(event){
    console.log('funziona shiba');
    for(const box of boxes){
        if(box.classList.questionId === 'one'){
            fetch('https://randomfox.ca/floof/').then(onResponse1).then(onJson1);
            const img = box.querySelector('.answers');
            img.src = json.image;
        }
    }
    
}

function onJson_2(json){
    console.log('json ricevuto');
    const library = document.querySelector('#album-grid');
    const results = json.album.items;
    let num_results = results.lenght;
    if(num_results>9){
        num_results = 9;
    }
        for(const box of boxes){
            if(box.classList.questionId === 'two'){
                if(box.classList.choiceId === 'blep'){
                    const img = box.querySelector('.answers')
                    img.src = results[1].images[0].url;
                }
                if(box.classList.choiceId === 'burger'){
                    const img = box.querySelector('.answers')
                    img.src = results[2].images[0].url;
                }
                if(box.classList.choiceId === 'cart'){
                    const img = box.querySelector('.answers')
                    img.src = results[3].images[0].url;
                }
                if(box.classList.choiceId === 'dopey'){
                    const img = box.querySelector('.answers')
                    img.src = results[4].images[0].url;
                }
                if(box.classList.choiceId === 'happy'){
                    const img = box.querySelector('.answers')
                    img.src = results[5].images[0].url;
                }
                if(box.classList.choiceId === 'nerd'){
                    const img = box.querySelector('.answers')
                    img.src = results[6].images[0].url;
                }
                if(box.classList.choiceId === 'shy'){
                    const img = box.querySelector('.answers')
                    img.src = results[7].images[0].url;
                }
                if(box.classList.choiceId === 'sleeping'){
                    const img = box.querySelector('.answers')
                    img.src = results[8].images[0].url;
                }
                if(box.classList.choiceId === 'sleepy'){
                    const img = box.querySelector('.answers')
                    img.src = results[9].images[0].url;
                }
            }
        }

}

function authorSongSearch(event){
    console.log('funziona autore');
    event.preventDefault();
    const input = document.querySelector('#author');
    const value = encodeURIComponent(input.value);
    console.log('Autore selezionato: ' + value);
    console.log('Eseguo ricerca: ' + value);
  fetch("https://api.spotify.com/v1/search?type=album&q=" + value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson_2);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

const client_id = 'e1111e62418c4d89b1bcec8fa886a177';
const client_secret = 'eac62c88d0de4d0aac329ffd61d03893';
let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const buttonDogs = document.querySelector('.buttonDogs');
buttonDogs.addEventListener('click',shibaSearch);

const author = document.querySelector('form');
author.addEventListener('submit',authorSongSearch);