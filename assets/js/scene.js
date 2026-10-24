import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointer = { x: 0, y: 0 };
addEventListener('pointermove', (event) => {
    pointer.x = event.clientX / innerWidth * 2 - 1;
    pointer.y = event.clientY / innerHeight * 2 - 1;
}, { passive: true });

function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    return renderer;
}

// Sizes the renderer to its canvas and only animates while the canvas is on screen.
function mount(canvas, renderer, camera, onResize, frame) {
    const resize = () => {
        const { clientWidth: width, clientHeight: height } = canvas;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        onResize(width, height);
        if (reduceMotion) frame(0);
    };
    new ResizeObserver(resize).observe(canvas);
    resize();
    if (reduceMotion) return;
    let visible = false;
    let raf = 0;
    const loop = (time) => {
        frame(time / 1000);
        raf = visible ? requestAnimationFrame(loop) : 0;
    };
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
    }).observe(canvas);
}

function heroScene(canvas) {
    const renderer = createRenderer(canvas);
    renderer.toneMappingExposure = 1.1;
    const scene = new THREE.Scene();
    scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 17);

    const key = new THREE.DirectionalLight(0xfff1e6, 1.8);
    key.position.set(5, 7, 9);
    scene.add(key, new THREE.HemisphereLight(0xeaf6ee, 0x1c4a3c, 0.7));

    const rig = new THREE.Group();
    const helix = new THREE.Group();
    helix.rotation.z = -0.42;
    rig.add(helix);
    scene.add(rig);

    // Double helix: instanced spheres on two strands, joined by rungs and wrapped by tubes.
    const pairs = 28, radius = 1.3, rise = 0.3, twist = 0.42;
    const balls = new THREE.InstancedMesh(
        new THREE.SphereGeometry(1, 32, 24),
        new THREE.MeshPhysicalMaterial({ roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 }),
        pairs * 2,
    );
    const rungs = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(1, 1, 1, 14),
        new THREE.MeshPhysicalMaterial({ color: 0xbfe2cf, roughness: 0.3, clearcoat: 0.6 }),
        pairs,
    );
    const palette = [0x1c4a3c, 0x2b6550, 0x5f9c7c, 0x9fd0b6].map((hex) => new THREE.Color(hex));
    const coral = new THREE.Color(0xea7d58);
    const matrix = new THREE.Matrix4(), rotation = new THREE.Quaternion(), scale = new THREE.Vector3(), position = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const strands = [[], []];
    for (let i = 0; i < pairs; i++) {
        const angle = i * twist;
        const y = (i - (pairs - 1) / 2) * rise;
        for (let side = 0; side < 2; side++) {
            const a = angle + side * Math.PI;
            position.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
            strands[side].push(position.clone());
            matrix.compose(position, rotation.identity(), scale.setScalar(0.19 + 0.05 * Math.sin(i * 0.9 + side * 2)));
            balls.setMatrixAt(i * 2 + side, matrix);
            balls.setColorAt(i * 2 + side, (i % 6 === 2 && side === 0) || (i % 9 === 6 && side === 1) ? coral : palette[(i + side * 2) % palette.length]);
        }
        rotation.setFromUnitVectors(up, new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)));
        matrix.compose(position.set(0, y, 0), rotation, scale.set(0.04, radius * 2, 0.04));
        rungs.setMatrixAt(i, matrix);
    }
    helix.add(balls, rungs);
    const tubeMaterial = new THREE.MeshPhysicalMaterial({ color: 0x78ad8e, roughness: 0.25, clearcoat: 1, transparent: true, opacity: 0.55 });
    strands.forEach((points) => helix.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 240, 0.05, 10), tubeMaterial)));

    // Orbit rings with travelling satellites.
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x2e5b48, transparent: true, opacity: 0.28 });
    const orbits = [
        { radius: 2.7, tilt: [1.2, 0.3, 0.2], speed: 0.5, color: 0xea7d58, size: 0.13 },
        { radius: 3.2, tilt: [1.75, -0.6, 0.4], speed: -0.32, color: 0x1c4a3c, size: 0.1 },
        { radius: 3.8, tilt: [1.4, 0.9, -0.3], speed: 0.22, color: 0x78ad8e, size: 0.08 },
    ].map((orbit) => {
        const group = new THREE.Group();
        group.rotation.set(...orbit.tilt);
        group.add(new THREE.Mesh(new THREE.TorusGeometry(orbit.radius, 0.008, 8, 220), ringMaterial));
        const satellite = new THREE.Mesh(
            new THREE.SphereGeometry(orbit.size, 24, 16),
            new THREE.MeshPhysicalMaterial({ color: orbit.color, roughness: 0.15, clearcoat: 1 }),
        );
        group.add(satellite);
        rig.add(group);
        return { ...orbit, satellite };
    });

    // Floating accents: a medical cross, a glass gem and a soft torus.
    const cross = new THREE.Group();
    const crossMaterial = new THREE.MeshPhysicalMaterial({ color: 0xea7d58, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05 });
    cross.add(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.9, 0.28), crossMaterial), new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.28, 0.28), crossMaterial));
    cross.position.set(2.6, 2.5, 0.8);
    const gem = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.55, 0),
        new THREE.MeshPhysicalMaterial({ color: 0xdff2e7, roughness: 0.04, transmission: 1, thickness: 1.2, ior: 1.45, clearcoat: 1 }),
    );
    gem.position.set(-2.5, -2.1, 1.2);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.14, 24, 64), new THREE.MeshPhysicalMaterial({ color: 0xcae9d9, roughness: 0.3, clearcoat: 1 }));
    ring.position.set(-2.2, 2.9, -0.8);
    rig.add(cross, gem, ring);

    // Drifting dust across the whole hero.
    const dustCount = 260;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
        dustPositions.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8 - 2], i * 3);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x5f9c7c, size: 0.045, transparent: true, opacity: 0.55, depthWrite: false }));
    scene.add(dust);

    const smooth = { x: 0, y: 0 };
    const onResize = (width, height) => {
        const viewHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const viewWidth = viewHeight * width / height;
        if (width / height > 1.1) {
            rig.position.set(viewWidth * 0.31, -0.2, 0);
            rig.scale.setScalar(1);
        } else {
            // Stacked layout: the helix sits in the lower art area, below the headline.
            rig.position.set(viewWidth * 0.26, -viewHeight * 0.27, 0);
            rig.scale.setScalar(Math.min(0.75, viewWidth / 6.5));
        }
        rig.userData.baseY = rig.position.y;
    };
    const frame = (time) => {
        smooth.x += (pointer.x - smooth.x) * 0.05;
        smooth.y += (pointer.y - smooth.y) * 0.05;
        helix.rotation.y = time * 0.28 + scrollY * 0.003;
        rig.rotation.set(smooth.y * 0.2, smooth.x * 0.4, 0);
        rig.position.y = rig.userData.baseY + Math.sin(time * 0.8) * 0.12;
        orbits.forEach((orbit) => {
            const a = time * orbit.speed + orbit.radius;
            orbit.satellite.position.set(Math.cos(a) * orbit.radius, Math.sin(a) * orbit.radius, 0);
        });
        cross.rotation.set(time * 0.4, time * 0.6, Math.sin(time) * 0.3);
        cross.position.y = 2.5 + Math.sin(time * 1.1) * 0.15;
        gem.rotation.set(time * 0.3, time * 0.5, 0);
        gem.position.y = -2.1 + Math.cos(time * 0.9) * 0.18;
        ring.rotation.set(time * 0.5, time * 0.2, 0);
        dust.rotation.y = time * 0.02 + smooth.x * 0.05;
        camera.position.x = smooth.x * 0.4;
        camera.position.y = -smooth.y * 0.3;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    };
    mount(canvas, renderer, camera, onResize, frame);
}

function waveScene(canvas) {
    const renderer = createRenderer(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 4.5, 11);
    camera.lookAt(0, 0, 0);

    const columns = 140, rows = 60;
    const positions = new Float32Array(columns * rows * 3);
    for (let x = 0; x < columns; x++) {
        for (let z = 0; z < rows; z++) {
            positions.set([(x / (columns - 1) - 0.5) * 34, 0, (z / (rows - 1) - 0.5) * 16], (x * rows + z) * 3);
        }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { time: { value: 0 }, pointer: { value: new THREE.Vector2() }, scale: { value: 1 } },
        vertexShader: `
            uniform float time; uniform vec2 pointer; uniform float scale;
            varying float vGlow; varying float vFade;
            void main() {
                vec3 p = position;
                float wave = sin(p.x * 0.32 + time * 0.9) * 0.55 + cos(p.z * 0.45 + time * 0.6) * 0.4 + sin((p.x + p.z) * 0.18 - time * 0.5) * 0.35;
                float ripple = exp(-distance(p.xz, pointer * vec2(14.0, 6.0)) * 0.35) * sin(time * 3.0 - distance(p.xz, pointer * vec2(14.0, 6.0)) * 1.4) * 0.6;
                p.y = wave + ripple;
                vGlow = smoothstep(-0.8, 1.2, p.y);
                vFade = smoothstep(8.0, 2.0, abs(p.z)) * smoothstep(17.0, 9.0, abs(p.x));
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = (2.0 + vGlow * 2.5) * scale * (10.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            varying float vGlow; varying float vFade;
            void main() {
                float d = length(gl_PointCoord - 0.5);
                if (d > 0.5) discard;
                vec3 color = mix(vec3(0.33, 0.55, 0.45), vec3(0.67, 0.83, 0.73), vGlow);
                color = mix(color, vec3(0.92, 0.49, 0.35), smoothstep(0.92, 1.0, vGlow));
                gl_FragColor = vec4(color, (1.0 - d * 2.0) * vFade * (0.35 + vGlow * 0.6));
            }`,
    });
    scene.add(new THREE.Points(geometry, material));

    const smooth = new THREE.Vector2();
    const onResize = () => { material.uniforms.scale.value = renderer.getPixelRatio(); };
    const frame = (time) => {
        smooth.x += (pointer.x - smooth.x) * 0.04;
        smooth.y += (pointer.y - smooth.y) * 0.04;
        material.uniforms.time.value = time;
        material.uniforms.pointer.value.copy(smooth);
        camera.position.x = smooth.x * 1.2;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    };
    mount(canvas, renderer, camera, onResize, frame);
}

try {
    heroScene(document.getElementById('hero-canvas'));
    waveScene(document.getElementById('wave-canvas'));
    document.documentElement.classList.add('has-webgl');
} catch (error) {
    // Without WebGL the CSS illustration stays in place.
    console.warn('3D scene unavailable', error);
}
