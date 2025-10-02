document.addEventListener('DOMContentLoaded', function() {

    // --- GESTION DE L'ANIMATION D'OUVERTURE ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 800);
        }, 1500); // Durée totale de l'animation
    });
    
    // --- BASE DE DONNÉES DES HORAIRES ---
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
    const header = document.getElementById('header');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    // Ajout d'une classe au header lors du scroll
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

    // Logique du menu burger pour mobile
    burger.addEventListener('click', () => {
        // Crée une copie du menu pour l'affichage mobile si elle n'existe pas
        if (!document.querySelector('.nav-links-mobile')) {
            const mobileMenu = navLinks.cloneNode(true);
            mobileMenu.classList.remove('nav-links');
            mobileMenu.classList.add('nav-links-mobile');
            document.body.appendChild(mobileMenu);

            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.remove('nav-active'));
            });
        }
        
        const mobileMenu = document.querySelector('.nav-links-mobile');
        mobileMenu.classList.toggle('nav-active');
    });


    // --- GESTION DU TABLEAU DES HORAIRES ---
    const tableBody = document.querySelector('#horairesTable tbody');
    function displayHoraires(data) {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = `<tr>
                <td><strong>${item.trajet}</strong></td>
                <td>${item.departs.join(', ')}</td>
                <td>${item.tarif.toLocaleString('fr-FR')}</td>
                <td><button class="reserve-btn" data-trajet="${item.trajet}" data-departs="${item.departs.join(',')}">Réserver</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
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
                const option = new Option(heure, heure);
                heureDepartSelect.add(option);
            });
            dateInput.value = today;
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
