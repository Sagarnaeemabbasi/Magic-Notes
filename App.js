console.log("welcome to Magic website");
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addText = document.getElementById("addText");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let myNotes;
  if (notes == null) {
    myNotes = [];
  } else {
    myNotes = JSON.parse(notes); //here mynotes is nothing just a array (notes is simply string while my notes is array)z
  }
  if (!addText.value) {
    alert("Text is required");
  } else if (!addTitle.value) {
    alert("Title  is required");
  } else {
    notesObj = {
      // push  stepp wise (donon ko alag alag karna) is a difficult case that's why we make a obj and push it into the mynotes
      text: addText.value,
      title: addTitle.value,
    };

    myNotes.push(notesObj);
    localStorage.setItem("notes", JSON.stringify(myNotes)); //add your data into local storage
    addText.value = ""; //both are cleared because after adding both we want to clear the previous text
    addTitle.value = "";
  }

  showNotes();
});
function showNotes() {
  let notes = localStorage.getItem("notes"); //get notes from the local storage
  let myNotes;
  if (notes == null) {
    myNotes = [];
  } else {
    myNotes = JSON.parse(notes);
  }
  let html = "";
  myNotes.forEach(function (element, index) {
    //we want to add repeatidly our notes that's why we use loop here // element mean  the element of array (basicallly content) and here array is myNotes
    html += `    
        <div class="mainBox" style="border: 1px solid#7c6d6d91 ;  width: 270px; margin: 20px 7px;">
            <h2 class="title" style="margin: 10px 15px;"> ${element.title}</h2>
            <p class="para" style="margin: 10px 15px;">${element.text}</p>
            <button style="margin: 10px 15px 20px 15px; padding: 10px 17px; color: white; background-color: rgb(3,169, 244,1); border: none; border-radius: 5px;" id="${index}"onclick="deleteNotes(this.id)" class="delBtn">Delete Note</button>
        </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (myNotes.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<div style="margin:15px 5px;"> Nothing to show! Use "Add a Note" section above to add notes </div>.`;
  }
}
function deleteNotes(index) {
  let myNotes;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    myNotes = [];
  } else {
    myNotes = JSON.parse(notes);
  }
  myNotes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(myNotes));
  showNotes();
}
let search = document.getElementById("search");
search.addEventListener("input", function () {
  let searchVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("mainBox");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element
      .getElementsByClassName("para")[0]
      .innerText.toLowerCase(); //we cant use document.getElementsByClassName  we use element.getElementsByClassName because we only concern with our element that is notecards here
    let cardTitle = element
      .getElementsByClassName("title")[0]
      .innerText.toLowerCase();
    if (cardTxt.includes(searchVal) || cardTitle.includes(searchVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
