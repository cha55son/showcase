window.SolarCommander = Game.extend({
    system: false,
    settings: { 
        suns: [], // Refer to the sun class for settings
        planets: [] // Refer to the planet class for settings
    },
    init: function(options) {
        this.parent(options);
        this.system = new SolarSystem({
            suns: this.settings.suns,
            planets: this.settings.planets
        });
        this.scene.add(this.system.root);
        var ambientLight = new THREE.AmbientLight(0x000011);
        this.scene.add(ambientLight);
        this.start();
    },
    update: function() {
        this.system.root.rotation.x += (0.05).toRadians();
        this.system.root.rotation.y += (0.05).toRadians();
        this.system.update();
    }
});