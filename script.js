document.addEventListener('DOMContentLoaded', function() {

    // --- GESTION DE L'ANIMATION D'OUVERTURE ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // Laisser l'animation du bus se terminer
        setTimeout(() => {
            preloader.classList.add('hide');
            // Supprimer le preloader du DOM après la transition pour la performance
            setTimeout(() => preloader.remove(), 500);
        }, 2500); // Durée de l'animation du bus
    });
    
    // --- BASE DE DONNÉES DES HORAIRES (Identique) ---
    const horairesData = [
        { trajet: "OUAGA - KAYA", departs: ["05h30", "06h00", "07h00", "08h00", "09h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00", "16h00", "17h00", "18h00", "19h00"], tarif: 3000 },
        { trajet: "OUAGA - DORI", departs: ["06h00", "08h00", "10h00", "12h00", "13h00", "15h00"], tarif: 7000 },
        { trajet: "KAYA - BOBO", departs: ["07h00"], tarif: 8000 },
        { trajet: "BOBO - OUAHIGOUYA", departs: ["09h00"], tarif: 6000 },
        { trajet: "BOBO - TOUGAN", departs: ["06h30", "08h00", "11h00", "14h00"], tarif: 5000 },
        { trajet: "OUAGA - KONGoussi", departs: ["06h30", "10h00", "15h00", "17h00"], tarif: 3500 },
        { trajet: "OUAGA - DJIBO", departs: ["07h00", "09h00", "12h00", "14h00"], tarif: 6500 },
        { trajet: "OUAGA - DEDOUGOU", departs: ["07h00", "14h30"], tarif: 4000 },
        { trajet: "OUAGA - BOBO", departs: ["05h30", "06h30", "08h00", "09h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00", "16h30", "18h00", "20h00", "22h00"], tarif: 6000 },
        { trajet: "OUAGA - FADA", departs: ["06h00", "07h00", "08h00", "10h00", "12h00", "14h00", "16h00"], tarif: 5000 },
        { trajet: "OUAGA - LEO", departs: ["07h00", "09h00", "12h30", "14h00", "16h00"], tarif: 3000 },
        { trajet: "BOBO - DEDOUGOU", departs: ["08h00", "16h00"], tarif: 4000 },
        { trajet: "OUAGA - DIAPAGA", departs: ["07h00", "13h00"], tarif: 8000 },
        { trajet: "BOBO - DJIBASSO", departs: ["07h00", "13h00"], tarif: 4500 },
        { trajet: "OUAGA - KOUDOUGOU", departs: ["06h30", "08h30", "09h30", "11h30", "13h30", "15h30", "17h30", "18h30"], tarif: 2000 },
        { trajet: "KOUDOUGOU - BOBO", departs: ["07h00", "13h30"], tarif: 4000 },
        { trajet: "BOBO - KOUDOUGOU", departs: ["07h30", "13h30"], tarif: 4000 },
        { trajet: "OUAGA - OUAHIGOUYA", departs: ["06h00", "07h00", "09h00", "11h00", "12h00", "13h00", "14h00", "16h00", "18h00", "20h00"], tarif: 4000 },
        { trajet: "OUAGA - DAKOLA", departs: ["06h00", "09h00", "11h00", "16h00"], tarif: 3500 },
        { trajet: "BOBO - GAOUA", departs: ["08h00", "15h00"], tarif: 5500 },
        { trajet: "OUAGA - GAOUA", departs: ["06h00", "07h00", "12h00", "14h00", "15h00", "17h00"], tarif: 7500 },
        { trajet: "OUAGA - ZABRE", departs: ["07h00", "11h00", "16h00"], tarif: 4000 },
        { trajet: "GAOUA - BATIE", departs: ["09h30"], tarif: 2000 },
        { trajet: "OUAGA - NAMELE", departs: ["13h00"], tarif: 9000 },
        { trajet: "OUAGA - CINKANSE", departs: ["05h30", "09h00", "15h00"], tarif: 6000 },
        { trajet: "OUAGA - GALGOULI", departs: ["08h30", "11h00"], tarif: 5000 },
    ];

    // --- GESTION DE LA NAVIGATION ---
    const navLinksContainer = document.querySelector('.nav-links');
    const allLinks = document.querySelectorAll('.nav-links a, .cta-button');
    const pages = document.querySelectorAll('.page');
    const header = document.getElementById('header');
    
    // Changement de couleur du header au scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Navigation "Single Page"
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            // On cache la section actuellement active
            document.querySelector('.page.active').classList.remove('active');
            // On affiche la nouvelle section
            document.getElementById(targetId).classList.add('active');
            
            // On ferme le menu mobile si on clique sur un lien
            if (navLinksContainer.classList.contains('nav-active')) {
                navLinksContainer.classList.remove('nav-active');
            }
        });
    });

    // Gestion du menu Burger
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('nav-active');
    });

    // --- GESTION DU TABLEAU DES HORAIRES ---
    const tableBody = document.querySelector('#horairesTable tbody');
    const searchInput = document.getElementById('searchInput');

    function displayHoraires(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = `<tr>
                <td>${item.trajet}</td>
                <td>${item.departs.join(', ')}</td>
                <td>${item.tarif.toLocaleString('fr-FR')}</td>
                <td>
                    <button class="reserve-btn" data-trajet="${item.trajet}" data-departs="${item.departs.join(',')}">Réserver</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
    searchInput.addEventListener('keyup', e => {
        const searchTerm = e.target.value.toLowerCase();
        displayHoraires(horairesData.filter(item => item.trajet.toLowerCase().includes(searchTerm)));
    });
    displayHoraires(horairesData);

    // --- GESTION DE LA MODALE DE RÉSERVATION ---
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-btn');
    const bookingForm = document.getElementById('bookingForm');
    const trajetInput = document.getElementById('trajet');
    const heureDepartSelect = document.getElementById('heure-depart');
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    tableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('reserve-btn')) {
            const trajet = e.target.dataset.trajet;
            const departs = e.target.dataset.departs.split(',');
            trajetInput.value = trajet;
            heureDepartSelect.innerHTML = '';
            departs.forEach(heure => {
                const option = document.createElement('option');
                option.value = heure;
                option.textContent = heure;
                heureDepartSelect.appendChild(option);
            });
            dateInput.value = today; // Réinitialiser la date à aujourd'hui à chaque ouverture
            modal.style.display = 'block';
        }
    });

    function closeModal() { modal.style.display = 'none'; }
    closeBtn.onclick = closeModal;
    window.onclick = function(event) { if (event.target == modal) { closeModal(); } }

    // --- GESTION DE L'ENVOI DU FORMULAIRE ---
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('nom').value,
              telephone = document.getElementById('telephone').value,
              trajet = trajetInput.value,
              heureDepart = heureDepartSelect.value,
              date = dateInput.value,
              passagers = document.getElementById('passagers').value;
        const numeroWhatsApp = "22605585868";
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        const message = `
*Nouvelle Demande de Réservation TSR*

*Trajet:* ${trajet}
*Date:* ${formattedDate}
*Heure de départ:* ${heureDepart}
---
*Nom:* ${nom}
*Téléphone:* ${telephone}
*Nombre de passagers:* ${passagers}
        `;
        const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
    });
});