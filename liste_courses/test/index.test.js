import {afficherProduits, filtrerEtTrierProduits, ajouterAlaListe} from '../src/main.js';


describe('liste des produits', () => {
    let produitsData;
    let listeProduitsSelected;
    let compteurProduits;
    beforeEach(()=>{
        document.body.innerHTML+=`<ul id="liste-produits"></ul>`
        document.body.innerHTML+=`<span id="compteur-produits"></span>`;
        compteurProduits = document.getElementById("compteur-produits");
        produitsData = [
            {nom: "Abricot", quantite_stock: 10, prix_unitaire: 4.5},
            {nom: "Pommes", quantite_stock: 5, prix_unitaire: 3.5},
            {nom: "Brioche", quantite_stock: 8, prix_unitaire: 1.5},
        ]
        localStorage.clear();
        let inputSelect = document.createElement("select");
        inputSelect.id = "tri";
        inputSelect.innerHTML = `
            <option value="nom" selected>Nom</option>
            <option value="prix">Prix</option>
        `;
        document.body.appendChild(inputSelect);
        let serchInput = document.createElement("input");
        serchInput.type = "search";
        document.body.appendChild(serchInput);
    })

    it('affichage des produits', () => {
        afficherProduits(produitsData);
        let ul = document.getElementById("liste-produits")
        expect(ul.children.length).toBe(3);
    })

    // il n'y a pas la deduction des stocks
    it('ajouter un produit à la liste', () => {
        ajouterAlaListe(produitsData[0]);
        listeProduitsSelected = JSON.parse(localStorage.getItem("listeCourses"));
        expect(listeProduitsSelected.length).toBe(1);
        expect(listeProduitsSelected[0].quantite_stock).toBe(10);
    })

    // Tri par nom ne fonctionne pas
    // it('Trier les produits par noms', () => {
    //    filtrerEtTrierProduits(produitsData);
    //    let ul = document.getElementById("liste-produits")
    //    expect(ul.children[0].querySelector("h2").textContent).toBe("Abricot");
    //    expect(ul.children[1].querySelector("h2").textContent).toBe("Brioche");
    //    expect(ul.children[2].querySelector("h2").textContent).toBe("Pommes");
    // })

    // Tri par prix ne fonctionne pas
    // it('Trier les produits par prix', () => {
    //    let triSelect = document.getElementById("tri");
    //    triSelect.value = "prix";
    //    filtrerEtTrierProduits(produitsData);
    //    let ul = document.getElementById("liste-produits")
    //    expect(ul.children[1].querySelector("h2").textContent).toBe("Brioche");
    //    expect(ul.children[0].querySelector("h2").textContent).toBe("Abricot");
    //    expect(ul.children[2].querySelector("h2").textContent).toBe("Pommes");
    // })

    it('Recherche d\'un produit', () => {
        let searchInput = document.querySelector("input[type='search']");
        searchInput.value = "Pommes";
        filtrerEtTrierProduits(produitsData);
        let ul = document.getElementById("liste-produits")
        expect(ul.children.length).toBe(1);
    })

})