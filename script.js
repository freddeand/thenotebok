const addBtn = document.getElementById("btnForInput");
const inputTitle = document.getElementById("inputTitle");
const inputNote = document.getElementById("inputNote");
const displayNotes = document.getElementById("divBoxOne");
const btnRemove = document.getElementById("btnForRemove");
const errorText = document.getElementById("hOne");
const notes = JSON.parse(localStorage.getItem("notes")) || [];
// ID function
function generalId() {
  return Math.floor(Math.random() * 10000);
}

//in the beginininin
const clearErrorMessage = () => {
  errorText.innerHTML = "Välkommen till din egen anteckningsbok"; // Reset the error message
};

// Add event listeners to fix the errortText! =)
inputTitle.addEventListener("input", clearErrorMessage);
inputNote.addEventListener("input", clearErrorMessage);

addBtn.addEventListener("click", function (event) {
  if (inputTitle.value === "" && inputNote.value === "") {
    event.preventDefault();
    errorText.innerHTML = "Du måste skriva in något i text-fältet!";
    console.log("fältet är tomt!");
    return;
  }
  if (inputNote.value === "") {
    errorText.innerHTML = "Du måste skriva in något i text-fältet!";
    event.preventDefault();
    return;
  }
  if (inputTitle.value === "") {
    errorText.innerHTML = "Du måste skriva in något i text-fältet!";
    event.preventDefault();
    return;
  }
  if (notes.find((note) => note.title === inputTitle.value)) {
    errorText.innerHTML = "Du har redan lagt till denna titel";
    event.preventDefault();
    return;
  }
  if (notes.find((note) => note.note === inputNote.value)) {
    errorText.innerHTML = "Du har redan lagt till denna anteckning";
    event.preventDefault();
    return;
  }
  const noteData = {
    id: generalId(),
    title: inputTitle.value,
    note: inputNote.value,
    date: Date(),
    done: false,
  };
  notes.push(noteData);

  localStorage.setItem("notes", JSON.stringify(notes));

  // makes new div for notes
  let innerDivBox = document.createElement("div");
  innerDivBox.className = "innerDivBox";
  innerDivBox.innerHTML = `Titel : 
  <h2>${inputTitle.value}</h2> och din anteckning :
  <p>${inputNote.value}</p>
  Skapat :<p>${noteData.date}</p>`;
  displayNotes.appendChild(innerDivBox);
  event.preventDefault();

  // Button to remove note based on title
  let btnToRemoveNote = document.createElement("button");
  btnToRemoveNote.textContent = "Ta bort mig";
  innerDivBox.appendChild(btnToRemoveNote);

  /// Remove event
  btnToRemoveNote.addEventListener("click", function () {
    displayNotes.removeChild(innerDivBox);
    const index = notes.findIndex((note) => note.id === noteData.id);
    if (index > -1) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  });
  // edit Button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Redigera";
  innerDivBox.appendChild(editBtn);

  editBtn.addEventListener("click", function () {
    let editInputTitle = document.createElement("input");
    let editNote = document.createElement("input");
    editInputTitle.placeholder = "titel";
    editNote.placeholder = "anteckning";
    displayNotes.appendChild(editInputTitle);
    displayNotes.appendChild(editNote);

    // current input.
    editInputTitle.value = noteData.title;
    editNote.value = noteData.note;
    // new button for submit edit.
    let submitEditBtn = document.createElement("button");
    submitEditBtn.textContent = "Tryck in ny text";
    displayNotes.appendChild(submitEditBtn);

    submitEditBtn.addEventListener("click", function () {
      // updated text
      noteData.title = editInputTitle.value;
      noteData.note = editNote.value;

      // Update the notes array
      const upDatedNotes = notes.filter((note) => note.id !== noteData.id);
      notes.length = 0;
      upDatedNotes.forEach((note) => notes.push(note));
      notes.push(noteData);
      localStorage.setItem("notes", JSON.stringify(notes));
      console.log();
      // update text in note
      innerDivBox.innerHTML = `Titel : 
     <h2>${noteData.title}</h2> och din anteckning :
     <p>${noteData.note}</p>
     Skapat :<p>${noteData.date}</p>`;
      innerDivBox.appendChild(btnToRemoveNote);
      innerDivBox.appendChild(editBtn);
      innerDivBox.appendChild(btnToReadyCheck);
      // Optionally, remove the edit inputs and button after submission
      displayNotes.removeChild(editInputTitle);
      displayNotes.removeChild(editNote);
      displayNotes.removeChild(submitEditBtn);
    });
  });

  // ready check button!
  let btnToReadyCheck = document.createElement("button");
  btnToReadyCheck.textContent = "Klar markera";
  innerDivBox.appendChild(btnToReadyCheck);

  btnToReadyCheck.addEventListener("click", function () {
    noteData.done = !noteData.done;
    btnToReadyCheck.textContent = noteData.done ? "Klar!" : "Klar markera"; // Update button text based on done status

    console.log(noteData.done);
    const index = notes.findIndex((note) => note.id === noteData.id);
    if (index > -1) {
      notes[index] = noteData; // Update the note in the array
      localStorage.setItem("notes", JSON.stringify(notes)); // Save to localStorage
    }
  });

  console.log(inputTitle.value);
  console.log(inputNote.value);
  inputNote.value = "";
  inputTitle.value = "";
});

// clear all and single items
btnRemove.addEventListener("click", function () {
  localStorage.clear();
  while (displayNotes.firstChild) {
    displayNotes.removeChild(displayNotes.firstChild);
  }
});

// Function to load notes from localStorage
function loadNotes() {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  storedNotes.forEach((noteData) => {
    let innerDivBox = document.createElement("div");
    innerDivBox.className = "innerDivBox";
    innerDivBox.innerHTML = `Titel : 
        <h2>${noteData.title}</h2> och din anteckning :
        <p>${noteData.note}</p>
        Skapat :<p>${noteData.date}</p>`;
    displayNotes.appendChild(innerDivBox);

    // Create remove button
    let btnToRemoveNote = document.createElement("button");
    btnToRemoveNote.textContent = "ta bort mig";
    innerDivBox.appendChild(btnToRemoveNote);

    btnToRemoveNote.addEventListener("click", function () {
      displayNotes.removeChild(innerDivBox);
      const index = notes.findIndex((note) => note.id === noteData.id);
      if (index > -1) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    });

    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Redigera";
    innerDivBox.appendChild(editBtn);

    editBtn.addEventListener("click", function () {
      let editInputTitle = document.createElement("input");
      let editNote = document.createElement("input");
      displayNotes.appendChild(editInputTitle);
      displayNotes.appendChild(editNote);

      //
      inputTitle.value = noteData.title;
      inputNote.value = noteData.note;

      let submitEditBtn = document.createElement("button");
      submitEditBtn.textContent = "Tryck in ny text";
      displayNotes.appendChild(submitEditBtn);

      submitEditBtn.addEventListener("click", function () {
        // Update the noteData with the new values
        noteData.title = editInputTitle.value;
        noteData.note = editNote.value;

        // Update the notes array
        const upDatedNotes = notes.filter((note) => note.id !== noteData.id);
        notes.length = 0;
        upDatedNotes.forEach((note) => notes.push(note));
        notes.push(noteData);
        localStorage.setItem("notes", JSON.stringify(notes));

        // Update the displayed note text
        innerDivBox.innerHTML = `Titel : 
                <h2>${noteData.title}</h2> och din anteckning :
                <p>${noteData.note}</p>
                Skapat :<p>${noteData.date}</p>`;
        innerDivBox.appendChild(btnToRemoveNote);
        innerDivBox.appendChild(editBtn);
        innerDivBox.appendChild(btnToReadyCheck);

        // Optionally, remove the edit inputs and button after submission
        displayNotes.removeChild(editInputTitle);
        displayNotes.removeChild(editNote);
        displayNotes.removeChild(submitEditBtn);
      });
    });

    // ready check button!
    let btnToReadyCheck = document.createElement("button");
    btnToReadyCheck.textContent = noteData.done ? "Klar!" : "Klar markera"; // Set initial text based on done status
    innerDivBox.appendChild(btnToReadyCheck);

    btnToReadyCheck.addEventListener("click", function () {
      noteData.done = !noteData.done; // Toggle the done status
      btnToReadyCheck.textContent = noteData.done ? "Klar!" : "Klar markera"; // Update button text based on done status
      console.log(noteData.done);

      const index = notes.findIndex((note) => note.id === noteData.id);
      if (index > -1) {
        notes[index] = noteData; // Update the note in the array
        localStorage.setItem("notes", JSON.stringify(notes)); // Save to localStorage
      }
    });
  });
}

// Call loadNotes when the page loads
window.onload = loadNotes;
