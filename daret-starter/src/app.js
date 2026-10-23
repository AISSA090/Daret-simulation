const formDaret = document.getElementById('daret-form');
const nomCercleInput = document.getElementById('nom-cercle');
const cotisationInput = document.getElementById('cotisation');
const periodiciteSelect = document.getElementById('periodicite');
const dateDebutInput = document.getElementById('date-debut');
const nomCercleErreur = document.getElementById('nom-cercle-erreur');
const cotisationErreur = document.getElementById('cotisation-erreur');
const periodiciteErreur = document.getElementById('periodicite-erreur');
const dateDebutErreur = document.getElementById('date-debut-erreur');
const participantsErreur = document.getElementById('participants-erreur');
const participantsListe = document.getElementById('participants-liste');
const btnAjouterParticipant = document.getElementById('ajouter-participant');
const participantsCompteur = document.getElementById('participants-compteur');

nomCercleInput.addEventListener('input', function() {
    const nameregex = /^[a-zA-ZÀ-ÿ0-9 \-]{3,40}$/; 
    let nom = nomCercleInput.value.trim();
    if (nom === "") {
        nomCercleErreur.textContent = "";
        nomCercleErreur.classList.add('hidden');
        nomCercleInput.removeAttribute('aria-invalid');
    } else if (!nameregex.test(nom)) {
        nomCercleErreur.textContent = "Le nom doit contenir entre 3 et 40 caractères.";
        nomCercleErreur.classList.remove('hidden');
        nomCercleInput.setAttribute('aria-invalid', 'true');
    } else {
        nomCercleErreur.textContent = "";
        nomCercleErreur.classList.add('hidden');
        nomCercleInput.removeAttribute('aria-invalid');
    }
});

cotisationInput.addEventListener('input', function() {
    const valeur = cotisationInput.value.trim();
    if (valeur === "") {
        cotisationErreur.textContent = "";
        cotisationErreur.classList.add('hidden');
        cotisationInput.removeAttribute('aria-invalid');
        return; 
    }
    const price = Number(valeur);
    if (price < 100) {
        cotisationErreur.textContent = "La cotisation doit être plus que 100 DH";
        cotisationErreur.classList.remove('hidden');
        cotisationInput.setAttribute('aria-invalid', 'true');
    } else if (price > 50000) {
        cotisationErreur.textContent = "La cotisation doit être moins que 50 000 DH";
        cotisationErreur.classList.remove('hidden');
        cotisationInput.setAttribute('aria-invalid', 'true');
    } else {
        cotisationErreur.textContent = "";
        cotisationErreur.classList.add('hidden');
        cotisationInput.removeAttribute('aria-invalid');
    }
});

dateDebutInput.addEventListener('input', function() {
    const valeur = dateDebutInput.value;
    if (valeur === "") {
        dateDebutErreur.textContent = "";
        dateDebutErreur.classList.add('hidden');
        dateDebutInput.removeAttribute('aria-invalid');
        return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const inputdate = new Date(valeur);
    if (inputdate < today) {
        dateDebutErreur.textContent = "La date ne peut pas être dans le passé.";
        dateDebutErreur.classList.remove('hidden');
        dateDebutInput.setAttribute('aria-invalid', 'true');
    } else {
        dateDebutErreur.textContent = "";
        dateDebutErreur.classList.add('hidden');
        dateDebutInput.removeAttribute('aria-invalid');
    }
});

periodiciteSelect.addEventListener('change', function() {
    const valeursValides = ["hebdomadaire", "quinzaine", "mensuelle"];
    if (!valeursValides.includes(periodiciteSelect.value)) {
        periodiciteErreur.textContent = "Veuillez sélectionner une périodicité valide.";
        periodiciteErreur.classList.remove('hidden');
        periodiciteSelect.setAttribute('aria-invalid', 'true');
    } else {
        periodiciteErreur.textContent = "";
        periodiciteErreur.classList.add('hidden');
        periodiciteSelect.removeAttribute('aria-invalid');
    }
});

function mettreAJourCompteur() {
    const nbActuel = participantsListe.querySelectorAll('input').length;
    if (nbActuel <= 1) {
        participantsCompteur.textContent = nbActuel + " participant";
    } else {
        participantsCompteur.textContent = nbActuel + " participants";
    }
}

btnAjouterParticipant.addEventListener('click', function() {
    const nbActuel = participantsListe.querySelectorAll('input').length;
    if (nbActuel >= 20) return; 

    const li = document.createElement('li');
    li.classList.add('flex', 'gap-2', 'items-center'); 

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Prénom du participant';
    input.classList.add('w-full', 'rounded', 'border', 'border-daret-bordure', 'px-3', 'py-2', 'focus:outline-2', 'focus:outline-offset-2', 'focus:outline-daret-vert');

    const btnRetirer = document.createElement('button');
    btnRetirer.type = 'button';
    btnRetirer.textContent = 'X';
    btnRetirer.classList.add('btn-retirer', 'shrink-0', 'border-daret-bordure', 'px-3', 'py-2', 'text-black', 'font-medium', 'hover:bg-daret-fond');
    
    li.appendChild(input);
    li.appendChild(btnRetirer);
    participantsListe.appendChild(li);
    mettreAJourCompteur();
});

participantsListe.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-retirer')) {
        const nbActuel = participantsListe.querySelectorAll('input').length;
        if (nbActuel <= 2) {
            participantsErreur.textContent = "Il faut au moins 2 participants pour un Daret !";
            participantsErreur.classList.remove('hidden');
            return; 
        }
        participantsErreur.classList.add('hidden');
        event.target.parentElement.remove();
        mettreAJourCompteur();
    }
});

participantsListe.addEventListener('input', function(event) {
    if (event.target.tagName === 'INPUT') {
        const regexParticipant = /^[a-zA-ZÀ-ÿ0-9 \-]{2,30}$/;
        const valeur = event.target.value.trim();
        if (valeur !== "" && !regexParticipant.test(valeur)) {
            event.target.classList.remove('border-daret-bordure', 'focus:outline-daret-vert');
            event.target.classList.add('border-red-500', 'focus:outline-red-500');
            event.target.setAttribute('aria-invalid', 'true');
            participantsErreur.textContent = "Le prénom doit contenir entre 2 et 30 caractères valides.";
            participantsErreur.classList.remove('hidden');
        } else {
            event.target.classList.remove('border-red-500', 'focus:outline-red-500');
            event.target.classList.add('border-daret-bordure', 'focus:outline-daret-vert');
            event.target.removeAttribute('aria-invalid');
            participantsErreur.classList.add('hidden');
        }
    }
});


function calculerdaretcotisation(cotisation, nbActuel) {
    return cotisation * nbActuel;
}

function calculerDateTour(dateDebut, periodicite, indexTour) {
    let date = new Date(dateDebut);
    for (let i = 0; i < indexTour; i++) {
        if (periodicite === "hebdomadaire") {
            date.setDate(date.getDate() + 7);
        } else if (periodicite === "quinzaine") {
            date.setDate(date.getDate() + 15);
        } else if (periodicite === "mensuelle") {
            date.setMonth(date.getMonth() + 1);
        }
    }
    return date;
}

let nomsOriginaux = []; 

formDaret.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const check = formDaret.querySelectorAll('[aria-invalid="true"]');
    if (check.length !== 0) {
        check[0].focus();
        return; 
    }
    const cotisation = Number(cotisationInput.value);
    const nbParticipants = participantsListe.querySelectorAll('input').length;
    const dateDebut = dateDebutInput.value;
    const periodicite = periodiciteSelect.value;
    if (nbParticipants < 2 || dateDebut === "") return;

    const montantGlobal = calculerdaretcotisation(cotisation, nbParticipants);
    const dateFin = calculerDateTour(dateDebut, periodicite, nbParticipants - 1);
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const texteDateDebut = new Date(dateDebut).toLocaleDateString('fr-FR', optionsDate);
    const texteDateFin = dateFin.toLocaleDateString('fr-FR', optionsDate);

    document.getElementById('resume-cagnotte').textContent = `${montantGlobal} MAD`;
    document.getElementById('resume-total-cycle').textContent = `${montantGlobal} MAD`;
    document.getElementById('resume-nb-tours').textContent = nbParticipants;
    document.getElementById('resume-dates').textContent = `${texteDateDebut} · ${texteDateFin}`;

    document.getElementById('etat-vide').classList.add('hidden');
    document.getElementById('contenu-resultat').classList.remove('hidden');

    nomsOriginaux = []; 
    const inputsParticipants = participantsListe.querySelectorAll('input');
    inputsParticipants.forEach(function(input, index) {
        let nom = input.value.trim();
        if (nom === "") nom = `Participant ${index + 1}`;
        nomsOriginaux.push(nom);
    });

    genererTableauCalendrier(nomsOriginaux);
});

function genererTableauCalendrier(listeNoms) {
    const tbodyCalendrier = document.getElementById('calendrier-corps');
    tbodyCalendrier.textContent = ''; 
    
    const dateDebut = dateDebutInput.value;
    const periodicite = periodiciteSelect.value;
    const montantGlobal = calculerdaretcotisation(Number(cotisationInput.value), listeNoms.length);
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };

    listeNoms.forEach(function(nom, index) {
        const dateTour = calculerDateTour(dateDebut, periodicite, index);
        const texteDateTour = dateTour.toLocaleDateString('fr-FR', optionsDate);

        const tr = document.createElement('tr');
        tr.classList.add('border-b', 'border-daret-bordure'); 
        tr.setAttribute('data-tour', index + 1);

        const tdTour = document.createElement('td');
        tdTour.classList.add('py-3', 'px-4');
        tdTour.textContent = `Tour ${index + 1}`;

        const tdDate = document.createElement('td');
        tdDate.classList.add('py-3', 'px-4');
        tdDate.textContent = texteDateTour;

        // BOUTON NOM (Détails)
        const tdNom = document.createElement('td');
        tdNom.classList.add('py-3', 'px-4', 'font-medium');
        const btnDetail = document.createElement('button');
        btnDetail.type = 'button';
        btnDetail.setAttribute('data-action', 'ouvrir-detail');
        btnDetail.classList.add('text-daret-vert', 'font-bold', 'hover:underline');
        btnDetail.textContent = nom;
        tdNom.appendChild(btnDetail);

        const tdMontant = document.createElement('td');
        tdMontant.classList.add('py-3', 'px-4', 'text-daret-vert', 'font-bold');
        tdMontant.textContent = `${montantGlobal} MAD`;
        
        const tdStatut = document.createElement('td');
        tdStatut.classList.add('py-3', 'px-4');
        const btnStatut = document.createElement('button');
        btnStatut.type = 'button';
        btnStatut.setAttribute('data-action', 'basculer-statut');
        btnStatut.classList.add('px-3', 'py-1', 'border', 'border-daret-bordure', 'rounded', 'text-sm', 'hover:bg-daret-fond');
        btnStatut.textContent = 'En attente';
        tdStatut.appendChild(btnStatut);

        tr.appendChild(tdTour);
        tr.appendChild(tdDate);
        tr.appendChild(tdNom);
        tr.appendChild(tdMontant);
        tr.appendChild(tdStatut);
        
        tbodyCalendrier.appendChild(tr);
    });
}

const tousLesBoutons = document.querySelectorAll('button');
let btnTirage = null;
let btnOrdre = null;

tousLesBoutons.forEach(function(btn) {
    if (btn.textContent.trim() === "Tirer l'ordre au sort") btnTirage = btn;
    if (btn.textContent.trim() === "Ordre de saisie") btnOrdre = btn;
});

if (btnTirage) {
    btnTirage.addEventListener('click', function() {
        if (nomsOriginaux.length === 0) return; 
        let listeMelangee = [...nomsOriginaux];
        for (let i = listeMelangee.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = listeMelangee[i];
            listeMelangee[i] = listeMelangee[j];
            listeMelangee[j] = temp;
        }
        genererTableauCalendrier(listeMelangee);
    });
}

if (btnOrdre) {
    btnOrdre.addEventListener('click', function() {
        if (nomsOriginaux.length === 0) return;
        genererTableauCalendrier(nomsOriginaux);
    });
}

const tableauInteractif = document.getElementById('calendrier-corps');
tableauInteractif.addEventListener('click', function(event) {
    if (event.target.getAttribute('data-action') === 'basculer-statut') {
        const bouton = event.target;
        const ligne = bouton.closest('tr');
        if (bouton.textContent === 'En attente') {
            bouton.textContent = 'Terminé';
            bouton.classList.add('bg-daret-vert', 'text-white');
            bouton.classList.remove('hover:bg-daret-fond');
            ligne.classList.add('opacity-50'); 
        } else {
            bouton.textContent = 'En attente';
            bouton.classList.remove('bg-daret-vert', 'text-white');
            bouton.classList.add('hover:bg-daret-fond');
            ligne.classList.remove('opacity-50');
        }
    }
    if (event.target.getAttribute('data-action') === 'ouvrir-detail') {
        const bouton = event.target;
        const ligne = bouton.closest('tr');
        const numTour = ligne.getAttribute('data-tour');
        const nomPersonne = bouton.textContent;
        const montant = document.getElementById('resume-cagnotte').textContent;
        alert(`Détails du Tour n°${numTour}\nBénéficiaire : ${nomPersonne}\nMontant à recevoir : ${montant}`);
    }
});