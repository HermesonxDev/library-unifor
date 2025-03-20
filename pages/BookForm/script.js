document.addEventListener("DOMContentLoaded", () => {
    const URL = "https://parseapi.back4app.com/classes/book"
    const appID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
    const restApiKEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
    
    const form = document.getElementById("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const name = document.getElementById("name").value
        const author = document.getElementById("author").value
        const release_date = document.getElementById("release_date").value
        const internal_id = document.getElementById("internal_id").value

        create_book(name, author, release_date, internal_id)
    })

    async function create_book(name, author, release_date, internal_id) {

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": appID,
                    "X-Parse-REST-API-Key": restApiKEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    author: author,
                    release_date: release_date,
                    internal_id: internal_id
                })
            })

            const data = await response.json()

            if (response.ok) {
                window.location.href = "/pages/home/home.html"
                alert("Livro Criado com Sucesso!")
            }
        } catch (error) {
            console.error(error)
        }
    }
})