function checkAuth() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://parseapi.back4app.com/classes/bookRental";
  const APP_ID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH";
  const REST_API_KEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk";

  loadingRents();

  async function loadingRents() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-REST-API-Key": REST_API_KEY,
        },
      });

      const data = await response.json();
      showRents(data.results);
    } catch (error) {
      console.error("Erro ao buscar os Aluguéis:", error);
    }
  }

  function calculateRemainingDays(rentalDate, returnDate) {
    const today = new Date();
    const rental = new Date(rentalDate);
    const returnD = new Date(returnDate);

    if (isNaN(rental) || isNaN(returnD)) return "N/A";

    const remainingTime = returnD.getTime() - today.getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    return remainingDays >= 0 ? `${remainingDays} dias` : "Atrasado";
  }

  async function confirmDelivery(objectId) {
    try {
      const response = await fetch(`${API_URL}/${objectId}`, {
        method: "PUT",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-REST-API-Key": REST_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returned: true }),
      });

      if (response.ok) {
        alert("Entrega confirmada com sucesso!");
        loadingRents();
      } else {
        throw new Error("Erro ao atualizar o status da entrega.");
      }
    } catch (error) {
      console.error("Erro ao confirmar entrega:", error);
    }
  }

  function showRents(rents) {
    const content = document.querySelector(".content");
    content.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("table-container");

    const title = document.createElement("h2");
    title.textContent = "Lista de Aluguéis";
    container.appendChild(title);

    if (!rents || rents.length === 0) {
      const noAlunos = document.createElement("p");
      noAlunos.textContent = "Nenhum Aluguel encontrado.";
      container.appendChild(noAlunos);
    } else {
      const table = document.createElement("table");
      table.innerHTML = `
        <tr>
          <th>Livro</th>
          <th>Aluno</th>
          <th>Data de Aluguel</th>
          <th>Data de Retorno</th>
          <th>Dias Restantes</th>
          <th>Devolvido</th>
          <th>Ações</th>
        </tr>
      `;

      rents.forEach((rent) => {
        const remainingDays = calculateRemainingDays(rent.rental_date, rent.return_date);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${rent.book || "N/A"}</td>
          <td>${rent.who_rented || "N/A"}</td>
          <td>${rent.rental_date || "N/A"}</td>
          <td>${rent.return_date || "N/A"}</td>
          <td>${remainingDays}</td>
          <td>${rent.returned ? "Sim" : "Não"}</td>
          <td></td>
        `;

        if (!rent.returned) {
          const actionCell = row.querySelector("td:last-child");
          const confirmButton = document.createElement("button");
          confirmButton.textContent = "Confirmar Entrega";
          confirmButton.style.color = "white";
          confirmButton.style.padding = "10px 50px";
          confirmButton.style.borderRadius = "5px";
          confirmButton.style.border = "0";
          confirmButton.style.backgroundColor = "green";
          confirmButton.style.cursor = "pointer";
          confirmButton.style.transition = "opacity 0.3s";

          confirmButton.addEventListener("mouseover", () => {
            confirmButton.style.opacity = "0.7";
          });

          confirmButton.addEventListener("mouseout", () => {
            confirmButton.style.opacity = "1";
          });

          confirmButton.addEventListener("click", () => confirmDelivery(rent.objectId));
          actionCell.appendChild(confirmButton);
        }

        table.appendChild(row);
      });

      container.appendChild(table);
    }

    content.appendChild(container);
  }
});
