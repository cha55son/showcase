Number.prototype.toRadians = function() {
	return this * Math.PI / 180;
};
Number.prototype.toDegrees = function() {
	return this * 180 / Math.PI;
};

window.Base = Class.extend({
    settings: { },
    init: function(options) {
        this.settings = $.extend(true, { }, this.settings, options);
    }
});

window.Game = Base.extend({
	canvas: false,
	renderer: new THREE.WebGLRenderer(),
    running: false,
	camera: false,
	scene: false,
	stats: false,
	settings: {
		width: 400,
		height: 400,
		viewAngle: 45,
		near: 0.1,
		aspect: 1,
		far: 10000,
		fullscreen: false,
		cameraPosition: {
			x: 0, y: 0, z: 300
		}
	},
	init: function(options) {
        this.parent(options);
        this._setScreen();
		this.scene = new THREE.Scene();
		this.scene.add(this.camera);
		this.camera.position.x = this.settings.cameraPosition.x;
		this.camera.position.y = this.settings.cameraPosition.y;
		this.camera.position.z = this.settings.cameraPosition.z;
		this.canvas = document.getElementById('canvas');
		this.canvas.appendChild(this.renderer.domElement);

		this.stats = new Stats();
		this.stats.setMode(0);
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';
		document.body.appendChild(this.stats.domElement);
	},
	// Public
    start: function() {
        if (!this.running) {
            this.running = true;
            setInterval(this._run.bind(this), 1000/60);
        }
    },
	update: function() { var noop; },
	draw: function() {
		this.renderer.render(this.scene, this.camera);
	},
	// Protected
	_run: function() {
		this.stats.begin();
		this.update();
		this.draw();
		this.stats.end();
	},
	_setScreen: function() {
		if (this.settings.fullscreen) {
			this.settings.width = window.innerWidth;
			this.settings.height = window.innerHeight;
			this.settings.aspect = this.settings.width / this.settings.height;
			var me = this;
			window.onresize = function() {
				console.log('window resizing');
				me._setScreen();
			};
		}

		this.renderer.setSize(this.settings.width, this.settings.height);
		if (!this.camera)
			this.camera = new THREE.PerspectiveCamera(this.settings.viewAngle, this.settings.aspect, this.settings.near, this.settings.far);
		else {
			this.camera.aspect = this.settings.aspect;
			this.camera.updateProjectionMatrix();
		}
	}
});
