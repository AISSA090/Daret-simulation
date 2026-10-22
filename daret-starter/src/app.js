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
        nomCercleErreur.textContent = "Le nom doit contenir entren 3 et 40 caractères (lettres, chiffres, espaces, tirets).";
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
        cotisationErreur.textContent = "la cotisation input doit etre plus que 100DH";
        cotisationErreur.classList.remove('hidden');
        cotisationInput.setAttribute('aria-invalid', 'true');
    } else if (price > 50000) {
        cotisationErreur.textContent = "la cotisation doit etre moins que 50 000 DH";
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
        dateDebutErreur.textContent = "the debut day cannt be older than todays date  chznge the input please";
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
    const valeurChoisie = periodiciteSelect.value;

    if (!valeursValides.includes(valeurChoisie)) {
        periodiciteErreur.textContent = "Veuillez sélectionner une périodicité valide.";
        periodiciteErreur.classList.remove('hidden');
        periodiciteSelect.setAttribute('aria-invalid', 'true');
    } else {
        periodiciteErreur.textContent = "";
        periodiciteErreur.classList.add('hidden');
        periodiciteSelect.removeAttribute('aria-invalid');
    }
});

btnAjouterParticipant.addEventListener('click', function() {
   
    const nbActuel = participantsListe.querySelectorAll('input').length;

    if (nbActuel >= 20) {
        return; 
    }
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
});
btnAjouterParticipant.click();
btnAjouterParticipant.click();
btnAjouterParticipant.click();
participantsListe.addEventListener('click', function(event) {

    if (event.target.classList.contains('btn-retirer')) {
        const nbActuel = participantsListe.querySelectorAll('input').length;
    
        if (nbActuel <= 2) {
            participantsErreur.textContent=" au moins 2 participants !";
            participantsErreur.classList.remove('hidden')
            return; 
        }
        event.target.parentElement.remove();
    }
});