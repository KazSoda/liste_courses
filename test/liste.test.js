import {chargerListe, modifierQuantite, supprimerProduit, viderListe, calculerTotal} from '../src/liste.js';


describe('liste des produits dans mon panier', () => {
    let listeCourses;
    let tbody;
    let totalGeneral;
    beforeEach(()=>{
        document.body.innerHTML+=`<table id="liste-course">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Prix unitaire</th>
                    <th>Quantité</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="liste-course-body"></tbody>
        </table>`
        document.body.innerHTML+=`<span id="total-general"></span>`;
        document.body.innerHTML+=`<button id="vider-liste">Vider la liste</button>`;
        tbody = document.getElementById("liste-course-body");
        totalGeneral = document.getElementById("total-general");
        listeCourses = [
            {nom: "Abricot", quantite: 2, prix_unitaire: 4.5},
            {nom: "Pommes", quantite: 1, prix_unitaire: 3.5},
            {nom: "Brioche", quantite: 3, prix_unitaire: 1.5},
        ]
        localStorage.setItem("listeCourses", JSON.stringify(listeCourses));
    })

    it('affichage des produits dans le panier', () => {
        chargerListe();
        let tr = document.querySelectorAll("tr");
        expect(tr.length).toBe(4);
    })

    it('modifier la quantité d\'un produit', () => {
        modifierQuantite(0, 5);
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses"));
        expect(listeCourses[0].quantite).toBe(5);
    })

    it('supprimer un produit du panier', () => {
        supprimerProduit(0);
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses"));
        expect(listeCourses.length).toBe(2);
    })

    it('vider la liste', () => {
        viderListe();
        let listeCourses = JSON.parse(localStorage.getItem("listeCourses"));
        expect(listeCourses).toBe(null);
    })

    it('calculer le total', () => {
        calculerTotal();
        totalGeneral = document.getElementById("total-general");
        expect(totalGeneral.textContent).toBe("TOTAL : 17.00 €");
    })
});

