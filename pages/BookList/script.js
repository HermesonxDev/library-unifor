function checkAuth() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://parseapi.back4app.com/classes/book"
  const APP_ID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
  const REST_API_KEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
  
  loadingBooks();

  async function loadingBooks() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-REST-API-Key": REST_API_KEY,
        },
      });

      const data = await response.json();
      showBooks(data.results);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  }

  function showBooks(books) {
      const content = document.querySelector(".content");
      content.innerHTML = "";

      const container = document.createElement("div");
      container.classList.add("table-container");

      const title = document.createElement("h2");
      title.textContent = "Lista de Livros";
      container.appendChild(title);

      if (!books || books.length === 0) {
          const noAlunos = document.createElement("p");
          noAlunos.textContent = "Nenhum Livro encontrado.";
          container.appendChild(noAlunos);
      } else {
          const table = document.createElement("table");
          table.innerHTML = `
            <tr>
              <th>Nome</th>
              <th>Autor</th>
              <th>Data de Lançamento</th>
              <th>ID Interno</th>
            </tr>
          `;

          books.forEach(book => {
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${book.name || "N/A"}</td>
                <td>${book.author || "N/A"}</td>
                <td>${book.release_date || "N/A"}</td>
                <td>${book.internal_id || "N/A"}</td>
              `;
              table.appendChild(row);
          });

          container.appendChild(table);
      }

      content.appendChild(container);
  }

});