// function for storing data/note into local storage

const updateLocalStorageData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes =[];
    // console.log(textAreaData)
    textAreaData.forEach((currEl)=>{
        // console.log(notes.push(currEl.value))
        return notes.push(currEl.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));



    // through this data is saved to local storage . but on refresh ,it isnt available on screen . for that, we have to get data from local starage too. but befor adding that part  of code , lets see how we can check and see data on our local storage.
    // ----->> go to inspect >> go to elements or plus sign +.  >> go to application>> go to local Storage>> see Key, notes etc written click on it . data of every note box  in array element with index form will appear on bottom of page
}



//function and getting reference of add button . so that can make neww note on clicking that button 
const addButton = document.getElementById('add')

const addNewNote = (Text = "") => {

    let Note = document.createElement('div');
    Note.classList.add('note');

    // adding html part of box of note to html by using js 
    const HtmlData = `
    <div class="operation" >
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
</div> 

     
<div class="main ${Text? "": "hidden"}"></div>
    <textarea class="${Text ? "hidden": "" }" ></textarea> `;
// making classes for toggling purpose.Above 2 lines.




Note.insertAdjacentHTML('afterbegin', HtmlData)


//Getting the references

const editButton = Note.querySelector('.edit')
const delButton = Note.querySelector('.delete')
const mainDiv = Note.querySelector('.main')
const writer = Note.querySelector('textarea')


// adding the event listerner Providing deleting the note functionality
  // .remove() is inbuilt functionality of js
delButton.addEventListener('click', ()=>{
    Note.remove();  
    
    updateLocalStorageData();
    // it working is that --after removing any note/data. add the rest data again on local storage and then show us.
     
})

//Toggle using the editButton . here, due to this, note/data will be saved but not visible to us. for that see the very next event adding on line 51.
writer.value= Text;
mainDiv.innerHTML= Text;

editButton.addEventListener('click', ()=>{
    mainDiv.classList.toggle('hidden');
    writer.classList.toggle('hidden');
})


// for making viewing available on screen, do this->. we have to add the data/notes entered in input by user , into the inner html of maindiv. Yes, maindiv;which is providing us flexibility of viewing option only.
// In next event, if writers textarea "changes" from text to viewing option if i.e mainDiv, then take input and put that in innner html of maindiv 

// 'event' word is the parent event object of all events. "change" is like click function . it is  for telling - when textarea changes to vieing option 
writer.addEventListener('change', (event)=>{

    const Value = event.target.value;
    mainDiv.innerHTML=Value;

    //now add data to local storage too. so that available to us for years.
     
    //fucntion to store the data in local storage is called
     updateLocalStorageData();

})

//Append the create HTml data into the body 
document.body.appendChild(Note);


}


//Getting Data from local storage
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((currEl)=>addNewNote(currEl))
}

// for adding event by event listener , first define function and then call it or use addEventListener.list. syntax.
 addButton.addEventListener('click', () => addNewNote());

