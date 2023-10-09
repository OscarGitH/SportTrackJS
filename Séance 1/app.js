console.log('Test objet.js');
const CalculDistance = require('./objet.js');
const activite = {
    points: [
        { latitude: 40.7128, longitude: -74.0060 },
        { latitude: 34.0522, longitude: -118.2437 },
    ],
};

const calculateurDistance = new CalculDistance();
const distanceTotale = calculateurDistance.calculDistanceTrajet(activite.points);
console.log("Distance totale parcourue : " + distanceTotale.toFixed(2) + " mètres");

console.log('\nTest objetbis.js');
// Votre objet "activitebis"
const activitebis = {
    points: [
        { latitude: 40.7128, longitude: -74.0060 },
        { latitude: 34.0522, longitude: -118.2437 },
        // ... d'autres coordonnées de points GPS ...
    ],
};

// Importez la classe CalculDistance de votre fichier objetbis.js
const CalculDistancebis = require('./objetbis.js');
const calculateurDistancebis = new CalculDistancebis();
const distanceTotalebis = calculateurDistancebis.calculDistanceTrajet(activitebis.points);
console.log("Distance totale parcourue : " + distanceTotalebis.toFixed(2) + " mètres");