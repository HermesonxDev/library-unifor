document.addEventListener("DOMContentLoaded", () => {
    const URL = "https://parseapi.back4app.com/classes/student"
    const appID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
    const restApiKEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
    
    const form = document.getElementById("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const firstName = document.getElementById("first_name").value
        const lastName = document.getElementById("last_name").value
        const age = document.getElementById("age").value
        const email = document.getElementById("email").value
        const studentID = document.getElementById("studentID").value

        create_student(firstName, lastName, age, email, studentID)
    })

    async function create_student(fName, lName, age, email, studentID) {

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": appID,
                    "X-Parse-REST-API-Key": restApiKEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: fName,
                    last_name: lName,
                    age: age,
                    email: email,
                    studantID: studentID
                })
            })

            const data = await response.json()

            if (response.ok) {
                window.location.href = "/pages/home/home.html"
                alert("Estudante Criado com Sucesso!")
            }
        } catch (error) {
            console.error(error)
        }
    }
})