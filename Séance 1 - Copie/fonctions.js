// Fonction pour convertir des degrés en radians
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Fonction pour calculer la distance entre deux points GPS en utilisant la formule haversine
function calculDistance2PointsGPS(lat1, lon1, lat2, lon2) {
    const R = 6378.137; // Rayon de la Terre en kilomètres

    // Conversion des latitudes et longitudes en radians
    const lat1Rad = degToRad(lat1);
    const lon1Rad = degToRad(lon1);
    const lat2Rad = degToRad(lat2);
    const lon2Rad = degToRad(lon2);

    // Calcul de la distance en utilisant la formule haversine
    const d = R * Math.acos(Math.sin(lat2Rad) * Math.sin(lat1Rad) + Math.cos(lat2Rad) * Math.cos(lat1Rad) * Math.cos(lon2Rad - lon1Rad));

    return d;
}

// Fonction pour calculer la distance totale d'un trajet à partir d'un objet "activité"
function calculDistanceTrajet(activite) {
    const points = activite.points; // Supposons que "points" est un tableau d'objets {latitude, longitude}
    let distanceTotale = 0;

    // Calcul de la distance entre chaque paire de points consécutifs
    for (let i = 1; i < points.length; i++) {
        const point1 = points[i - 1];
        const point2 = points[i];
        const distance = calculDistance2PointsGPS(point1.latitude, point1.longitude, point2.latitude, point2.longitude);
        distanceTotale += distance;
    }

    return distanceTotale;
}

// Exemple d'objet "activité" (à adapter selon vos besoins)
const activite = {
    points: [
        { latitude: 40.7128, longitude: -74.0060 },
        { latitude: 34.0522, longitude: -118.2437 },
    ],
};

// Appel de la fonction calculDistanceTrajet avec l'objet "activité"
const distanceParcourue = calculDistanceTrajet(activite);

// Affichage du résultat
console.log("Test fonctions.js");
console.log("Distance totale parcourue : " + distanceParcourue.toFixed(2) + " km");
