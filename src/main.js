let produitsData = [];
const searchInput = document.querySelector("input[type='search']");
const resetButton = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    searchInput.addEventListener("input", filtrerEtTrierProduits);
    const triSelect = document.getElementById("tri");
    triSelect.addEventListener("change", filtrerEtTrierProduits);

    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        triSelect.value = "";
        afficherProduits(produitsData);
    });

});

export function afficherProduits(produits) {
    let ul = document.getElementById("liste-produits");
    ul.innerHTML = "";
    const compteurProduits = document.getElementById("compteur-produits");
    produits.forEach(produit => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h2 class="card-title">${produit.nom}</h2>
          <p>Quantité : ${produit.quantite_stock}</p>
          <p>Prix : ${produit.prix_unitaire.toFixed(2)} €</p>
          <button class="ajouter">AJOUTER A LA LISTE</button>
      `;
        li.querySelector(".ajouter").addEventListener("click", function () {
            ajouterAlaListe(produit);
        });
        ul.appendChild(li);
    });
    compteurProduits.textContent = `${produits.length} produits`;
}

export function fetchData() {
    fetch("../public/liste_produits_quotidien.json")
        .then(response => response.json())
        .then(produits => {
            produitsData = produits;
            afficherProduits(produitsData);
        })
        .catch(error => console.error("Erreur de chargement du fichier JSON :", error));
}

export function filtrerEtTrierProduits(produitsData) {
    let searchInput = document.querySelector("input[type='search']");
    const recherche = searchInput.value.toLowerCase();
    let produitsFiltres = produitsData.filter(produit =>
        produit.nom.toLowerCase().includes(recherche)
    );

    const triSelect = document.getElementById("tri");
    const critere = triSelect.value;
    if (critere === "nom") {
        produitsFiltres.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (critere === "prix") {
        produitsFiltres.sort((a, b) => a.prix_unitaire - b.prix_unitaire);
    }

    afficherProduits(produitsFiltres);
}


export function ajouterAlaListe(produit) {
    let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];

    let produitExistant = listeCourses.find(p => p.nom === produit.nom);
    if (!produitExistant) {
        listeCourses.push({...produit, quantite: 1});
    }

    localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
    return listeCourses;
}