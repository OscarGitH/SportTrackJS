class CalculDistance {
    constructor() {
        this.calculDistance2PointsGPS = function (lat1, long1, lat2, long2) {
            const deg2rad = (Math.PI / 180);
            const RADIUS = 6378.137; // Rayon de la Terre en kilomètres

            // Conversion des coordonnées en radians
            lat1 = deg2rad * lat1;
            long1 = deg2rad * long1;
            lat2 = deg2rad * lat2;
            long2 = deg2rad * long2;

            // Calcul de la distance
            const deltaLat = lat2 - lat1;
            const deltaLong = long2 - long1;
            const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = RADIUS * c * 1000; // Convertir en mètres
            return distance;
        }

        this.calculDistanceTrajet = function (parcours) {
            let distance = 0;
            const numPoints = parcours.length;

            for (let i = 1; i < numPoints; i++) {
                const lat1 = parcours[i - 1].latitude;
                const long1 = parcours[i - 1].longitude;
                const lat2 = parcours[i].latitude;
                const long2 = parcours[i].longitude;
                distance += this.calculDistance2PointsGPS(lat1, long1, lat2, long2);
            }
            return distance;
        }
    }
}

// Exportez la classe CalculDistance pour pouvoir l'utiliser dans d'autres fichiers
module.exports = CalculDistance;