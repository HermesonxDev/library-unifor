document.addEventListener("DOMContentLoaded", () => {
    const URL = "https://parseapi.back4app.com/login"
    const appID = "dsXRH32IrxyIhRfTIxk4T3ungfOB6uVG2NHpMlxH"
    const restApiKEY = "T5ZD4E76TcCBCVBNakQTBx95gOptq4hhS7zBmrYk"
    
    const form = document.getElementById("loginForm")

    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const user = document.getElementById("user").value
        const password = document.getElementById("password").value

        login(user, password)
    });

    async function login(user, password) {
        
        try {
            const response = await fetch(
                `${URL}?username=${user}&password=${password}`, {
                    method: "GET",
                    headers: {
                        "X-Parse-Application-Id": appID,
                        "X-Parse-REST-API-Key": restApiKEY,
                        "Content-Type": "application/json"
                    }
                })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("sessionToken", data.sessionToken)
                window.location.href = "/pages/home/home.html"
            }
        } catch (error) {
            console.error(error)
        }
    }
});
