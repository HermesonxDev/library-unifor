function checkAuth() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAuth);