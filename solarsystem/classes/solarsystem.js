window.Sun = Base.extend({
    root: false, // The parent element for all child elements
    pivot: false, // For binary+ systems
    sphere: false,
    settings: { 
        pivot: false,
        x: 0, y: 0, z: 0,
        radius: 50,
        color: 0xFFFF33,
        brightness: 1.5,
        orbitSpeed: 1,
        rotationalSpeed: 10
    },
    init: function(options) {
        this.parent(options);
        // Create the sun
        var sunMaterial = new THREE.MeshBasicMaterial({
            color: this.settings.color
        });
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(this.settings.radius),
            sunMaterial
        );
        this.sphere.position.x = this.settings.x;
        this.sphere.position.y = this.settings.y;
        this.sphere.position.z = this.settings.z;
        // Add the light
        var sunlight = new THREE.PointLight(this.settings.color, this.settings.brightness, 4500);
        sunlight.position.set(
            this.sphere.position.x,
            this.sphere.position.y,
            this.sphere.position.z
        );
        this.sphere.add(sunlight);
        // Add pivot if not a single star system
        if (!this.settings.pivot) {
            this.pivot = new THREE.Object3D();
            this.pivot.add(this.sphere);
        }
        this.root = this.pivot === false ? this.sphere : this.pivot;
        return this;
    },
    update: function() {
        this.pivot.rotation.z += this.settings.orbitSpeed.toRadians();
        this.sphere.rotation.z += this.settings.rotationalSpeed.toRadians();
    }
});

window.Pulsar = Sun.extend({
    settings: {

    },
    init: function(options) {
        this.parent(options);
    }
});

window.Planet = Base.extend({
    root: false,
    pivot: false,
    sphere: false,
    settings: {
        x: 100, y: 0, z: 0,
        radius: 5,
        orbitSpeed: 1,
        rotationalSpeed: 10
    },
    init: function(options) {
        this.parent(options);
        // Create the planet
        var planetMaterial = new THREE.MeshPhongMaterial({
            color: 0x8A4B08
        });
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(this.settings.radius),
            planetMaterial
        );
        this.sphere.position.x = this.settings.x;
        this.sphere.position.y = this.settings.y;
        this.sphere.position.z = this.settings.z;
        this.pivot = new THREE.Object3D();
        this.pivot.add(this.sphere);
        this.root = this.pivot;
        return this;
    },
    update: function() {
        this.pivot.rotation.z += this.settings.orbitSpeed.toRadians();
        this.sphere.rotation.z += this.settings.rotationalSpeed.toRadians();
    }
});

window.SolarSystem = Base.extend({
    root: false,
    suns: [], // unary binary or ternary system?
    planets: [],
    settings: { 
        suns: [], // Check the sun class settings
        planets: [], // Check the planet class settings
        name: 'solar system'
    },
    init: function(options) {
        this.parent(options);
        this.root = new THREE.Object3D();
        var me = this;
        this.settings.suns.forEach(function(sunOptions) {
            if (sunOptions.type == 'pulsar')
                me.addPulsar(sunOptions);
            else
                me.addSun(sunOptions);
        });
        this.settings.planets.forEach(function(planetsOptions) {
            me.addPlanet(planetsOptions);
        });
    },
    update: function() {
        this.suns.forEach(function(sun) {
            sun.update();
        });
        this.planets.forEach(function(planet) {
            planet.update();
        });
    },
    addPulsar: function(options) {
        var sun = new Pulsar(options);
        this.suns.push(sun);
        this.root.add(sun.root);
    },
    addSun: function(options) {
        var sun = new Sun(options);
        this.suns.push(sun);
        this.root.add(sun.root);
    },
    addPlanet: function(options) {
        var planet = new Planet(options);
        this.planets.push(planet);
        this.root.add(planet.root);
    }
});
