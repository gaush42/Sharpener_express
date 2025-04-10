async function fetchBooks() {
    const takenRes = await fetch('/books');
    const returnedRes = await fetch('/books/returned');
    const takenBooks = await takenRes.json();
    const returnedBooks = await returnedRes.json();
  
    const takenDiv = document.getElementById('takenBooks');
    takenDiv.innerHTML = '';
    takenBooks.forEach(book => {
      const takenOn = new Date(book.taken_on);
      const dueDate = new Date(takenOn);
      dueDate.setDate(dueDate.getDate() + 0);
      const now = new Date();
      const isOverdue = now > dueDate;
      const fine = isOverdue ? Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24)) * 10 : 0;
  
      const card = document.createElement('div');
      card.className = 'book-card';
  
      card.innerHTML = `
        <small>Book Name: ${book.name}</small><br>
        <small>Taken on: ${takenOn.toLocaleString()}</small><br>
        <small>Due by: ${dueDate.toLocaleString()}</small><br>
        <small>Fine: ₹${fine}</small><br>
        <button onclick="handleReturn(${book.id}, ${fine})">Return</button>
      `;
  
      takenDiv.appendChild(card);
    });
  
    const returnedDiv = document.getElementById('returnedBooks');
    returnedDiv.innerHTML = '';
    returnedBooks.forEach(book => {
      returnedDiv.innerHTML += `
        <div class="book-card">
          <small>Book Name: ${book.name}</small><br>
          <small>Taken on: ${new Date(book.taken_on).toLocaleString()}</small><br>
          <small>Returned on: ${new Date(book.returned_on).toLocaleString()}</small><br>
          Fine Paid: ₹${book.fine || 0}
        </div>
      `;
    });
  }
  
  async function addBook() {
    const name = document.getElementById("bookName").value;
    if (!name) return alert("Enter book name");
    await fetch('/books', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    document.getElementById("bookName").value = '';
    fetchBooks();
  }
  
  function handleReturn(id, fine) {
    if (fine > 0) {
      showDialogue(`You need to pay ₹${fine} fine to return this book. <br><br>
        <button onclick="returnBook(${id})">Pay Fine & Return</button>
        <button onclick="closeDialogue()">Cancel</button>`);
    } else {
      returnBook(id);
    }
  }
  
  async function returnBook(id) {
    await fetch(`/books/${id}/return`, { method: "PUT" });
    closeDialogue();
    fetchBooks();
  }
  
  function showDialogue(content) {
    document.getElementById("dialogueBox").innerHTML = content;
    document.getElementById("dialogueContainer").style.display = 'block';
  }
  
  function closeDialogue() {
    document.getElementById("dialogueContainer").style.display = 'none';
  }
  
  fetchBooks();
  