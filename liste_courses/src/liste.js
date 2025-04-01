import './liste.css'

document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById("liste-course-body");
    const totalGeneral = document.getElementById("total-general");
    const boutonVider = document.getElementById("vider-liste");

    function chargerListe() {
        tbody.innerHTML = "";
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];

        listeCourses.forEach((produit, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${produit.nom}</td>
                <td>${produit.prix_unitaire.toFixed(2)}</td>
                <td><input type="number" min="1" value="${produit.quantite}" data-index="${index}"></td>
                <td>${(produit.prix_unitaire * produit.quantite).toFixed(2)} €</td>
                <td><button class="supprimer" data-index="${index}">Supprimer</button></td>
            `;

            tr.querySelector("input").addEventListener("input", function (e) {
                modifierQuantite(index, e.target.value);
            });

            tr.querySelector(".supprimer").addEventListener("click", function () {
                supprimerProduit(index);
            });

            tbody.appendChild(tr);
        });

        calculerTotal();
    }

    function modifierQuantite(index, nouvelleQuantite) {
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];
        listeCourses[index].quantite = parseInt(nouvelleQuantite) || 1;
        localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
        chargerListe();
    }

    function supprimerProduit(index) {
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];
        listeCourses.splice(index, 1);
        localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
        chargerListe();
    }

    function viderListe() {
        localStorage.removeItem("listeCourses");
        chargerListe();
    }

    function calculerTotal() {
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];
        let total = listeCourses.reduce((sum, produit) => sum + produit.prix_unitaire * produit.quantite, 0);
        totalGeneral.textContent = `TOTAL : ${total.toFixed(2)} €`;
    }

    boutonVider.addEventListener("click", viderListe);
    chargerListe();
});
