function checkAuth() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://parseapi.back4app.com/classes/student"
  const APP_ID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
  const REST_API_KEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
  
  loadingStudents();

  async function loadingStudents() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-REST-API-Key": REST_API_KEY,
        },
      });

      const data = await response.json();
      showStudents(data.results);
    } catch (error) {
      console.error("Erro ao buscar students:", error);
    }
  }

  function calculateAge(bornDate) {
    const today = new Date();
    const born = new Date(bornDate);
    let age = today.getFullYear() - born.getFullYear();

    const current_month = today.getMonth();
    const current_day = today.getDate();
    const bornMonth = born.getMonth();
    const bornDay = born.getDate();

    if (current_month < bornMonth || (current_month === bornMonth && current_day < bornDay)) {
        age--;
    }

    return age;
  }

  function showStudents(students) {
    const content = document.querySelector(".content");
    content.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("table-container");

    const title = document.createElement("h2");
    title.textContent = "Lista de Alunos";
    container.appendChild(title);

    if (!students || students.length === 0) {
        const noAlunos = document.createElement("p");
        noAlunos.textContent = "Nenhum Aluno encontrado.";
        container.appendChild(noAlunos);
    } else {
        const table = document.createElement("table");
        table.innerHTML = `
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>ID do Estudante</th>
          </tr>
        `;

        students.forEach(student => {
            const age = student.age ? calculateAge(student.age) : "N/A";

            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${student.first_name || "N/A"}</td>
              <td>${student.last_name || "N/A"}</td>
              <td>${age}</td>
              <td>${student.email || "N/A"}</td>
              <td>${student.studantID || "N/A"}</td>
            `;
            table.appendChild(row);
        });

        container.appendChild(table);
    }

    content.appendChild(container);
  }


});