const myLibrary = [];

book1 = new Book("steve jobs","steve jobs",1000);
book2 = new Book("the begining of infinity","scientist",1000);
book3 = new Book("Naval book","naval",1000);


function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
}



function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}


function displayBook() {
    let bookList = document.querySelector("tbody");
    bookList.remove();
    bookList = document.createElement("tbody");
    let table = document.querySelector("table");
    table.appendChild(bookList);

    let bookNumber = myLibrary.length;

    for(let i = 0; i < bookNumber; i++){
        let book = myLibrary[i];
        let bookElement = document.createElement("tr");
        
        let titleElement = document.createElement("td");
        titleElement.textContent = book.title;
        bookElement.appendChild(titleElement);

        let authorElement = document.createElement("td");
        authorElement.textContent = book.author;
        bookElement.appendChild(authorElement);

        let pagesElement = document.createElement("td");
        pagesElement.textContent = book.pages;
        bookElement.appendChild(pagesElement);


        let removeElement = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.value = i;
        removeButton.addEventListener('click', e=> {
            myLibrary.splice(i, 1);
            displayBook();
        })
        removeElement.appendChild(removeButton);
        bookElement.appendChild(removeElement);


        let readElement = document.createElement("td");
        let readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readElement.appendChild(readCheckbox);
        bookElement.appendChild(readElement);


        bookList.appendChild(bookElement);
    }
}

let submitBookButton =  document.getElementById("submit");

submitBookButton.addEventListener("click", e=>{
    e.preventDefault();
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let newBook = new Book(title.value, author.value, pages.value);
    console.log(newBook.title);
    addBookToLibrary(newBook);
    displayBook();
})



