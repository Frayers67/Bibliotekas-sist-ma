let books = JSON.parse(localStorage.getItem("books")) || [];
        div.innerHTML = `
            <div>
                <strong>${book.title}</strong><br>
                ${book.author}<br>
                Status: ${book.issued ? "Izsniegta" : "Pieejama"}
            </div>

            <div>
                <button onclick="toggleIssued(${index})">
                    ${book.issued ? "Atgriezt" : "Izsniegt"}
                </button>

                <button onclick="deleteBook(${index})">Dzēst</button>
            </div>
        `;

        bookList.appendChild(div);
    });
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (title === "" || author === "") {
        alert("Aizpildi visus laukus!");
        return;
    }

    books.push({
        title,
        author,
        issued: false
    });

    saveBooks();
    renderBooks();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
}

function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
}

function toggleIssued(index) {
    books[index].issued = !books[index].issued;
    saveBooks();
    renderBooks();
}

function searchBooks() {
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );

    renderBooks(filtered);
}

renderBooks();
