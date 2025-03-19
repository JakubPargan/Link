// Szene, Kamera und Renderer erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lichquelle
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Funktion zum Erstellen eines Baums
function createTree(x, y, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y, z);

    const foliageGeometry = new THREE.SphereGeometry(1.5, 8, 8);
    const foliageMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, y + 2, z);

    scene.add(trunk);
    scene.add(foliage);
}

// Funktion zum Erstellen eines Bergs
function createMountain(x, y, z) {
    const geometry = new THREE.ConeGeometry(3, 6, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 });
    const mountain = new THREE.Mesh(geometry, material);
    mountain.position.set(x, y, z);
    scene.add(mountain);
}

// Funktion zum Erstellen von Felsen
function createRock(x, y, z) {
    const geometry = new THREE.SphereGeometry(1, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x696969 });
    const rock = new THREE.Mesh(geometry, material);
    rock.position.set(x, y, z);
    scene.add(rock);
}

// Erstelle Bäume, Berge und Felsen
createTree(3, 0, -5);
createTree(-3, 0, -8);
createMountain(0, 0, 10);
createRock(2, 0, 5);

// Spielerfigur (eine einfache Box als Platzhalter)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 1, 0);
scene.add(player);

// Kamera Position
camera.position.z = 10;

// Bewegung des Spielers
let moveSpeed = 0.1;
let rotationSpeed = 0.05;
let playerRotation = 0;

function movePlayer(event) {
    if (event.key === "ArrowUp") {
        player.position.z -= moveSpeed;
    } else if (event.key === "ArrowDown") {
        player.position.z += moveSpeed;
    } else if (event.key === "ArrowLeft") {
        player.position.x -= moveSpeed;
        playerRotation = Math.PI / 2; // Drehung nach links
    } else if (event.key === "ArrowRight") {
        player.position.x += moveSpeed;
        playerRotation = -Math.PI / 2; // Drehung nach rechts
    }
    player.rotation.y = playerRotation;
    camera.position.set(player.position.x, player.position.y + 3, player.position.z + 5);
    camera.lookAt(player.position);
}

document.addEventListener('keydown', movePlayer);

// Render-Schleife
function animate() {
    requestAnimationFrame(animate);

    // Szene rendern
    renderer.render(scene, camera);
}

animate();
