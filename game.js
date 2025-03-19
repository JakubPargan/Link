// Szene, Kamera und Renderer erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lichtquelle (bewegt sich mit der Kamera)
const light = new THREE.PointLight(0xffffff, 1, 100);
scene.add(light);

// Funktion zum Erstellen eines einfachen Baums
function createTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 2.5, z);

    const foliageGeometry = new THREE.SphereGeometry(2, 8, 8);
    const foliageMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, 6, z);

    scene.add(trunk);
    scene.add(foliage);
}

// Funktion zum Erstellen eines Bergs
function createMountain(x, z) {
    const geometry = new THREE.ConeGeometry(5, 10, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 });
    const mountain = new THREE.Mesh(geometry, material);
    mountain.position.set(x, 5, z);
    scene.add(mountain);
}

// Funktion zum Erstellen des Bodens
function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x7CFC00, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / -2; // Drehe den Boden um 90 Grad
    ground.position.y = 0;
    scene.add(ground);
}

// Erstelle Bäume, Berge und den Boden
createGround();
createTree(5, 10);
createTree(-10, -15);
createTree(15, -5);
createMountain(10, 20);
createMountain(-25, -10);

// Spielerfigur (eine einfache Box als Platzhalter)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 1, 0);
scene.add(player);

// Kamera und Lichtposition
camera.position.set(0, 10, 20);
camera.lookAt(0, 1, 0);

// Bewegungsvariablen
const moveSpeed = 0.1;
const rotationSpeed = 0.03;
let velocityX = 0;
let velocityZ = 0;

// Tastenereignisse zur Bewegung
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowUp") velocityZ = -moveSpeed;
    if (event.key === "ArrowDown") velocityZ = moveSpeed;
    if (event.key === "ArrowLeft") velocityX = -moveSpeed;
    if (event.key === "ArrowRight") velocityX = moveSpeed;
});

document.addEventListener('keyup', function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") velocityZ = 0;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") velocityX = 0;
});

// Kamera und Spielerbewegung
function movePlayer() {
    player.position.x += velocityX;
    player.position.z += velocityZ;

    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 10; // Kamera immer hinter dem Spieler
    camera.position.y = 10; // Kamera etwas höher positionieren
    camera.lookAt(player.position);
}

// Render-Schleife
function animate() {
    requestAnimationFrame(animate);

    movePlayer();

    // Szene rendern
    renderer.render(scene, camera);
}

animate();
