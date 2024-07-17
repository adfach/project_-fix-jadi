class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Notes App</h1>`;
  }
}

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <form id="note-form">
              <input type="text" id="title" placeholder="Title" required>
              <textarea id="body" placeholder="Body" required></textarea>
              <button type="submit">Add Note</button>
          </form>
      `;

    this.querySelector("#note-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.querySelector("#title").value;
      const body = this.querySelector("#body").value;
      if (title && body) {
        addNote({
          id: notes.length + 1,
          title,
          body,
        });
        this.querySelector("#title").value = "";
        this.querySelector("#body").value = "";
      }
    });
  }
}

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '<div class="notes-grid"></div>';
    const notesGrid = this.querySelector(".notes-grid");
    notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      notesGrid.appendChild(noteItem);
    });
  }
}

class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    this.innerHTML = `
          <h2>${title}</h2>
          <p>${body}</p>
      `;
  }
}

function addNote(note) {
  notes.push(note);
  document.querySelector("note-list").render();
}

customElements.define("app-bar", AppBar);
customElements.define("note-form", NoteForm);
customElements.define("note-list", NoteList);
customElements.define("note-item", NoteItem);

document.addEventListener("DOMContentLoaded", async () => {
  await fetch(
    "https://raw.githubusercontent.com/dicodingacademy/a163-bfwd-labs/099-shared-files/notes.js"
  )
    .then((response) => response.text())
    .then((data) => {
      eval(data); // Memuat data dari file notes.js
    })
    .catch((error) => console.error("Error loading notes:", error));

  document.querySelector("note-list").render();
});
