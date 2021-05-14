var notesArray = []
var editedId = null;

// When the page is uploding 
document.addEventListener("DOMContentLoaded", function () {
    notesArray = JSON.parse(localStorage.getItem("myNotes")) || [] // bring all the saved notes in the Array
    for (let i = 0; i < notesArray.length; i++) {
        var note = document.createElement("div")
        note.innerHTML = `
        <button type="button" onclick="removeNote(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </button>
        <button type="button" onclick="edit(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
        </button>
        <label class='text'>${notesArray[i].text}</label>
        <label class='date'>${notesArray[i].date}</label>
        <label class='time'>${notesArray[i].time}</label>
        `
        note.dir = "rtl" 
        note.classList.add("note")
        document.getElementById("notes_container").appendChild(note)

    }
})

function Add() { //  when adding a new note
    var text = document.getElementById("text").value
    var date = document.getElementById("date").value
    var time = document.getElementById("time").value
    document.getElementById("text").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""

    if (text == "") {
        alert("The Note Is Empty")
    }
    else if (date == "") {
        alert("The Date Is Empty")
    }

    else { // if the inputs are not empty then make a new obj
        var id = generateId();

        var newNote = {
            text: text,
            date: date,
            time: time,
            id: id
        }
        notesArray.push(newNote) // push the obj to the Arry
        localStorage.setItem("myNotes", JSON.stringify(notesArray)) // save it under "my notes" 

        var note = document.createElement("div")
        note.innerHTML = `
        <button type="button" onclick="removeNote(this)" id='${id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
        </button>
        <button type="button" onclick="edit(this)" id='${id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
        </button>
        <label class='text'>${text}</label>
        <label class='date'>${date}</label>
        <label class='time'>${time}</label>
        `
        note.dir = "rtl" 
      
        note.classList.add("note")
        document.getElementById("notes_container").appendChild(note)
    }
}

function removeNote(button) { // active when pressing on "x" btn
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id == button.id) {
            notesArray.splice(i, 1)
        }
    }


    localStorage.setItem("myNotes", JSON.stringify(notesArray)) 
    document.getElementById("notes_container").innerHTML = ""

    for (let i = 0; i < notesArray.length; i++) {
        var note = document.createElement("div")
        note.innerHTML = `
            <button type="button" onclick="removeNote(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </button>
        <button type="button" onclick="edit(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        </button>
        <label class='text'>${notesArray[i].text}</label>
        <label class='date'>${notesArray[i].date}</label>
        <label class='time'>${notesArray[i].time}</label>
        `
        note.dir = "rtl" 
      
        note.classList.add("note")
        document.getElementById("notes_container").appendChild(note)

    }

}

function generateId() {
    var newId = Math.floor(Math.random() * 1000000)  //Give a random id number between 0-1000000 to a new note
    for (let i = 0; i < notesArray.length; i++) {
        if (newId == notesArray[i].id) {  //If 2 notes got the same id it will mulltiply it again with 1000000 
            newId = Math.floor(Math.random() * 1000000)
        }
    }
    return newId  //and return the note with new id number between 0-1,000,000,000,000!
}



function Clear() {// Clear button

    document.getElementById("text").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
}


function edit(button) { // edid btn
    var elemToEdit
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id == button.id) {
            elemToEdit = notesArray[i]
        }
    }
    editedId = elemToEdit.id // editId-global variable is now equal to the note i want to edit
    document.getElementById("text").value = elemToEdit.text
    document.getElementById("date").value = elemToEdit.date
    document.getElementById("time").value = elemToEdit.time

    document.getElementById("btn3").style = "display: visible;"
    document.getElementById("btn1").style = "display: none;" // replacing the btns when click on edit
}

function saveChanges() {  // after we switched the btns- this function will activate
    var editedIndex
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id == editedId) {
            editedIndex = i
        }
    }
    var text = document.getElementById("text").value
    var date = document.getElementById("date").value
    var time = document.getElementById("time").value
    var newNote = {
        text: text,
        date: date,
        time: time,
        id: editedId
    } // now in the obj i have the edited note
    notesArray[editedIndex] = newNote
    localStorage.setItem("myNotes", JSON.stringify(notesArray)) 
    document.getElementById("notes_container").innerHTML = ""

    for (let i = 0; i < notesArray.length; i++) {
        var note = document.createElement("div")
        note.innerHTML = `
        <button type="button" onclick="removeNote(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </button>
        <button type="button" onclick="edit(this)" id='${notesArray[i].id}' class="icon" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
        </button>
        <label class='text'>${notesArray[i].text}</label>
        <label class='date'>${notesArray[i].date}</label>
        <label class='time'>${notesArray[i].time}</label>
        `
        note.dir = "rtl" 
        note.classList.add("note")
        document.getElementById("notes_container").appendChild(note)

    }

    document.getElementById("text").value = ""
    document.getElementById("date").value = ""
    document.getElementById("time").value = ""
// switched the btns again after we saved the changes

    document.getElementById("btn3").style = "display: none;"
    document.getElementById("btn1").style = "display: visible;"
}