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
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${student.first_name || "N/A"}</td>
                <td>${student.last_name || "N/A"}</td>
                <td>${student.age || "N/A"}</td>
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