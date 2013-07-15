$(document).ready(function() {
    var solarCommander = new SolarCommander({
        fullscreen: true,
        suns: [
            { 
                name: 'primary-star',
                radius: 15,
                x: 31,
                orbitSpeed: 1.5
            },
            {
                name: 'white-dwarf',
                type: 'pulsar',
                radius: 5,
                x: -20,
                orbitSpeed: 1.5,
                color: 0xFFFFFF
            }
        ],
        planets: [
            {
                x: 75,
                radius: 2,
                name: 'mercury',
                orbitSpeed: 3
            },
            {
                x: 100,
                radius: 8,
                orbitSpeed: 2,
                name: 'venus'
            },
            {
                x: 150,
                radius: 8,
                orbitSpeed: 1,
                name: 'earth'
            }
        ]
    });
});
