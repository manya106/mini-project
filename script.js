const title = document.querySelector(".inp");
        const desc = document.querySelector(".add_desc");
        const btn = document.querySelector(".btn");
        const mynotesarea = document.querySelector(".mynotes");
        const search_notes = document.querySelector(".search-btn");
        const title_search = document.querySelector(".search-note");

        let notes = JSON.parse(localStorage.getItem("notes") || "[]");

        // Function to display notes
        function display_notes() {
            mynotesarea.innerHTML = ""; // Clear the notes area

            notes.forEach((t, ind) => {
                // Create note container
                const note = document.createElement("div");
                note.className = "note";

                // Create title element
                const tlt = document.createElement("div");
                tlt.className = "notes_title";
                tlt.innerHTML = t.title;

                // Create textarea for description
                const txtarea = document.createElement("textarea");
                txtarea.className = "notes_desc";
                txtarea.innerHTML = t.description;
                txtarea.readOnly = true; // Initially read-only

                // Create Edit button
                const edit_btn = document.createElement("button");
                edit_btn.className = "note-edit";
                edit_btn.innerHTML = "Edit";

                // Create Delete button
                const del_btn = document.createElement("button");
                del_btn.className = "note-delete";
                del_btn.innerHTML = "Delete";

                // Append elements to note container
                note.appendChild(tlt);
                note.appendChild(txtarea);
                note.appendChild(edit_btn);
                note.appendChild(del_btn);
                mynotesarea.appendChild(note);

                // Edit button functionality
                edit_btn.addEventListener("click", () => {
                    if (edit_btn.innerHTML === "Edit") {
                        txtarea.readOnly = false; // Enable editing
                        txtarea.focus(); // Focus on the textarea
                        edit_btn.innerHTML = "Save"; // Change button text
                    } else {
                        // Save changes
                        txtarea.readOnly = true; // Disable editing
                        edit_btn.innerHTML = "Edit"; // Change button text back to Edit
                        notes[ind].description = txtarea.value; // Update note description
                        localStorage.setItem("notes", JSON.stringify(notes)); // Save updated notes
                    }
                });

                // Delete button functionality
                del_btn.addEventListener("click", () => {
                    notes.splice(ind, 1); // Remove note from the array
                    localStorage.setItem("notes", JSON.stringify(notes)); // Update localStorage
                    display_notes(); // Refresh the display
                });
            });
        }

        // Add new note
        btn.addEventListener("click", () => {
            if (title.value.trim() === "" || desc.value.trim() === "") {
                alert(" WARNING:  PLEASE ENTER THE TITLE AND DESCRIPTION BOTH");
                return;
            }

            // Create a new note object
            const noteinfo = {
                title: title.value.trim(),
                description: desc.value.trim()
            };

            notes.push(noteinfo); // Add note to the array
            localStorage.setItem("notes", JSON.stringify(notes)); // Save notes to localStorage

            // Clear input fields
            title.value = "";
            desc.value = "";

            display_notes(); // Refresh notes display
        });

        // Search notes by title
        search_notes.addEventListener("click", () => {
            const searchTerm = title_search.value.trim().toLowerCase();
            const filteredNotes = notes.filter(note =>
                note.title.toLowerCase().includes(searchTerm)
            );

            if (filteredNotes.length === 0) {
                mynotesarea.innerHTML = "<p>No notes found</p>";
            } else {
                mynotesarea.innerHTML = ""; // Clear existing notes
                filteredNotes.forEach((t, ind) => {
                    const note = document.createElement("div");
                    note.className = "note";

                    const tlt = document.createElement("div");
                    tlt.className = "notes_title";
                    tlt.innerHTML = t.title;

                    const txtarea = document.createElement("textarea");
                    txtarea.className = "notes_desc";
                    txtarea.innerHTML = t.description;
                    txtarea.readOnly = true;

                    note.appendChild(tlt);
                    note.appendChild(txtarea);
                    mynotesarea.appendChild(note);
                });
            }

            title_search.value = ""; // Clear the search field
        });

        // Initial display of notes
        display_notes();