import * as THREE from 'three';

class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = null;
        this.createParticles();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({
            color: 0xa3ff12, // Neon Green
            size: 4,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const vertices = [];
        const count = 2000;

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 4000;
            const y = (Math.random() - 0.5) * 4000;
            const z = (Math.random() - 0.5) * 4000;
            vertices.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        if (!this.particles) return;
        
        // Constant rotation
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.001;
    }
}

class HeroScene {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) {
            console.error('Canvas not found');
            return;
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particleSystem = null; 
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.init();
        this.animate();
        this.addEvents();
    }

    init() {
        // 1. Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0f1014, 0.0005); 

        // 2. Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.z = 1000;

        // 3. Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0f1014, 1); 

        // 4. Particles
        this.particleSystem = new ParticleSystem(this.scene);
    }

    addEvents() {
        document.addEventListener('mousemove', (e) => this.onDocumentMouseMove(e));
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onDocumentMouseMove(event) {
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }

    render() {
        // Camera smooth move
        this.targetX = this.mouseX * 0.5;
        this.targetY = this.mouseY * 0.5;

        this.camera.position.x += (this.targetX - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.targetY - this.camera.position.y) * 0.05;

        this.camera.lookAt(this.scene.position);

        // Particle System Update
        if (this.particleSystem) {
            this.particleSystem.animate();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Auto-start
new HeroScene();
