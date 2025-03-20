function checkAuth() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);

document.addEventListener("DOMContentLoaded", async () => {
    const API_URL_BOOKS = "https://parseapi.back4app.com/classes/book"
    const API_URL_STUDENTS = "https://parseapi.back4app.com/classes/student"
    const API_URL_RENTS = "https://parseapi.back4app.com/classes/bookRental"
    const APP_ID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
    const REST_API_KEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
    const bookSelect = document.getElementById("book")
    const studentSelect = document.getElementById("who_rented")

    const form = document.getElementById("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const book = document.getElementById("book").value
        const who_rented = document.getElementById("who_rented").value
        const rental_date = document.getElementById("rental_date").value
        const return_date = document.getElementById("return_date").value

        create_rent(book, who_rented, rental_date, return_date)
    })

    async function create_rent(book, who_rented, rental_date, return_date) {
        try {
            const response = await fetch(API_URL_RENTS, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": APP_ID,
                    "X-Parse-REST-API-Key": REST_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    book: book,
                    who_rented: who_rented,
                    rental_date: rental_date,
                    return_date: return_date,
                    returned: false,
                })
            })

            const data = await response.json()

            if (response.ok) {
                window.location.href = "/pages/home/home.html"
                alert("Aluguel Registrado com Sucesso!")
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    async function fetchData(url) {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": APP_ID,
                    "X-Parse-REST-API-Key": REST_API_KEY,
                },
            })
            return await response.json()
        } catch (error) {
            console.error("Erro ao buscar dados:", error)
            return { results: [] }
        }
    }

    async function populateSelect(selectElement, data, valueField, textField) {
        data.forEach(item => {
            const option = document.createElement("option")
            option.value = item[valueField]
            option.textContent = item[textField]
            selectElement.appendChild(option)
        })
    }

    const booksData = await fetchData(API_URL_BOOKS)
    populateSelect(bookSelect, booksData.results, "name", "name")

    const studentsData = await fetchData(API_URL_STUDENTS)
    populateSelect(studentSelect, studentsData.results, "first_name", "first_name")
})
