/*console.log("✅ store.js loaded successfully!");

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 10;

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const createWall = (w, h, d, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMaterial);
    wall.position.set(x, y, z);
    wall.rotation.set(rx, ry, rz);
    scene.add(wall);
};

// Create Walls and Ceiling
createWall(0.1, 3, 10, -5, 1.5, 0);  // Left Wall
createWall(0.1, 3, 10, 5, 1.5, 0);   // Right Wall
createWall(10, 3, 0.1, 0, 1.5, -5);  // Back Wall
createWall(10, 0.1, 10, 0, 3, 0);    // Ceiling

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load 3D Products
const loader = new THREE.GLTFLoader();
const loadProduct = (path, x, y, z) => {
    loader.load(path, function (gltf) {
        const product = gltf.scene;
        product.position.set(x, y, z);
        scene.add(product);
        console.log(`✅ Loaded: ${path}`);
    }, undefined, function (error) {
        console.error(`❌ Error loading ${path}:`, error);
    });
};

// Load products
loadProduct("/static/models/product1.glb", -2, 0, -2);
loadProduct("/static/models/product2.glb", 2, 0, -2);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});*/

/*console.log("✅ store.js loaded successfully!");

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Floor with texture
const floorTexture = new THREE.TextureLoader().load('/static/textures/floor.jpg');
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ map: floorTexture })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls with texture
const wallTexture = new THREE.TextureLoader().load('/static/textures/wall.jpg');
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const createWall = (w, h, d, x, y, z) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMaterial);
    wall.position.set(x, y, z);
    scene.add(wall);
};

// Add walls and ceiling
createWall(0.1, 3, 10, -5, 1.5, 0);  // Left Wall
createWall(0.1, 3, 10, 5, 1.5, 0);   // Right Wall
createWall(10, 3, 0.1, 0, 1.5, -5);  // Back Wall
createWall(10, 0.1, 10, 0, 3, 0);    // Ceiling

// Load 3D Products
const loader = new THREE.GLTFLoader();
const products = [];
const loadProduct = (path, x, y, z, name, price) => {
    loader.load(path, function (gltf) {
        const product = gltf.scene;
        product.position.set(x, y, z);
        product.userData = { name, price };
        scene.add(product);
        products.push(product);
        console.log(`✅ Loaded: ${name}`);
    }, undefined, function (error) {
        console.error(`❌ Error loading ${path}:`, error);
    });
};

// Load products and attach them to the wall
loadProduct("/static/models/product1.glb", -2, 1, -4, "T-Shirt", "$25");
loadProduct("/static/models/product1.glb", 2, 1, -4, "Jeans", "$40");

// Product Click Event
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const productInfo = document.getElementById("product-info");

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(products, true);
    if (intersects.length > 0) {
        const product = intersects[0].object.parent;
        productInfo.innerHTML = `<strong>${product.userData.name}</strong><br>Price: ${product.userData.price}`;
        productInfo.style.display = "block";
    } else {
        productInfo.style.display = "none";
    }
}

window.addEventListener('click', onMouseClick);

// Camera Movement (Arrow keys or WASD)
const keys = {};
window.addEventListener('keydown', (event) => keys[event.key] = true);
window.addEventListener('keyup', (event) => keys[event.key] = false);

function handleMovement() {
    const speed = 0.05;
    if (keys["ArrowUp"] || keys["w"]) camera.position.z -= speed;
    if (keys["ArrowDown"] || keys["s"]) camera.position.z += speed;
    if (keys["ArrowLeft"] || keys["a"]) camera.position.x -= speed;
    if (keys["ArrowRight"] || keys["d"]) camera.position.x += speed;
}

// Reset View Button
document.getElementById("reset-button").addEventListener("click", () => {
    camera.position.set(0, 1.5, 5);
    controls.target.set(0, 1.5, 0);
    controls.update();
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    handleMovement();
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});*/

//try 2

//Correct but need fixes
/*
let scene, camera, renderer, controls;
let products = [];

function init() {
    scene = new THREE.Scene();

    // Set up camera at human eye level
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5); 

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    // Floor
    const floorTexture = new THREE.TextureLoader().load('/static/textures/floor.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Walls
    const wallTexture = new THREE.TextureLoader().load('/static/textures/wall.jpg');
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    const walls = [
        { pos: [0, 2, -5], rot: [0, 0, 0] },  // Back wall
        { pos: [-5, 2, 0], rot: [0, Math.PI / 2, 0] }, // Left wall
        { pos: [5, 2, 0], rot: [0, -Math.PI / 2, 0] }, // Right wall
        { pos: [0, 2, 5], rot: [0, Math.PI, 0] } // Front wall
    ];

    walls.forEach(w => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Pointer Lock Controls for movement
    controls = new THREE.PointerLockControls(camera, document.body);

    document.getElementById("enterStore").addEventListener("click", function() {
        controls.lock();
    });

    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "KeyW": controls.moveForward(0.1); break;
            case "KeyS": controls.moveForward(-0.1); break;
            case "KeyA": controls.moveRight(-0.1); break;
            case "KeyD": controls.moveRight(0.1); break;
        }
    });

    // Load Products
    loadProduct("/static/models/product1.glb", -2, 1.5, -4, "T-Shirt", "$25"); // Left Wall
    loadProduct("/static/models/product1.glb", 2, 1.5, -4, "Jeans", "$40");  // Right Wall
    loadProduct("/static/models/product1.glb", 0, 1.5, -4, "Jacket", "$60"); // Back Wall
    loadProduct("/static/models/product1.glb", 0, 1.5, 4, "Shoes", "$80");   // Front Wall

    animate();
}

function loadProduct(modelPath, x, y, z, name, price) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        let product = gltf.scene;
        product.position.set(x, y, z);
        product.scale.set(1, 1, 1);
        product.name = name;
        product.userData = { name, price };
        scene.add(product);
        products.push(product);
    });
}

// Handle clicking products
document.addEventListener("click", function(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(products);

    if (intersects.length > 0) {
        const product = intersects[0].object.userData;
        document.getElementById("productTitle").innerText = product.name;
        document.getElementById("productPrice").innerText = product.price;
        document.getElementById("popup").style.display = "block";
    }
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();

*/


//try 3 in this the camera and movements are correct
/*let scene, camera, renderer, controls;
let products = [];
let isPointerLocked = false; // Track if pointer is locked

function init() {
    scene = new THREE.Scene();

    // Set up camera at human eye level
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5); 

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    // Floor
    const floorTexture = new THREE.TextureLoader().load('/static/textures/floor.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Walls
    const wallTexture = new THREE.TextureLoader().load('/static/textures/wall.jpg');
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    const walls = [
        { pos: [0, 2, -5], rot: [0, 0, 0] },  // Back wall
        { pos: [-5, 2, 0], rot: [0, Math.PI / 2, 0] }, // Left wall
        { pos: [5, 2, 0], rot: [0, -Math.PI / 2, 0] }, // Right wall
        { pos: [0, 2, 5], rot: [0, Math.PI, 0] } // Front wall
    ];

    walls.forEach(w => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Pointer Lock Controls for movement
    controls = new THREE.PointerLockControls(camera, document.body);

    document.getElementById("enterStore").addEventListener("click", function() {
        controls.lock();
    });

    controls.addEventListener('lock', () => isPointerLocked = true);
    controls.addEventListener('unlock', () => isPointerLocked = false);

    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "KeyW": controls.moveForward(0.1); break;
            case "KeyS": controls.moveForward(-0.1); break;
            case "KeyA": controls.moveRight(-0.1); break;
            case "KeyD": controls.moveRight(0.1); break;
        }
    });

    // Load Product at Correct Position (Back Wall)
    loadProduct("/static/models/product1.glb", 0, 1.5, -4, "T-Shirt", "$25");

    animate();
}

// Load Product at Given Position
function loadProduct(modelPath, x, y, z, name, price) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        let product = gltf.scene;
        product.position.set(x, y, z);
        product.scale.set(1, 1, 1);
        product.name = name;
        product.userData = { name, price };
        scene.add(product);
        products.push(product);
    });
}

// Handle clicking products (Even when Pointer Locked)
document.addEventListener("mousedown", function(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse position for raycasting (center of the screen)
    mouse.x = 0;
    mouse.y = 0;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(products);

    if (intersects.length > 0) {
        const product = intersects[0].object.userData;
        document.getElementById("productTitle").innerText = product.name;
        document.getElementById("productPrice").innerText = product.price;
        document.getElementById("popup").style.display = "block";
    }
});

// Close pop-up
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();*/

//try 4 works correctly but take E button 

/*let scene, camera, renderer, controls;
let products = [];
let isPointerLocked = false;
let interactionMode = false;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    // Floor
    const floorTexture = new THREE.TextureLoader().load('/static/textures/floor.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Walls (Fully Enclosed)
    const wallTexture = new THREE.TextureLoader().load('/static/textures/wall.jpg');
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    const walls = [
        { pos: [0, 2, -5], rot: [0, 0, 0] },  // Back wall
        { pos: [-5, 2, 0], rot: [0, Math.PI / 2, 0] }, // Left wall
        { pos: [5, 2, 0], rot: [0, -Math.PI / 2, 0] }, // Right wall
        { pos: [0, 2, 5], rot: [0, Math.PI, 0] } // Front wall
    ];

    walls.forEach(w => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    controls = new THREE.PointerLockControls(camera, document.body);

    document.getElementById("enterStore").addEventListener("click", function() {
        controls.lock();
    });

    controls.addEventListener('lock', () => isPointerLocked = true);
    controls.addEventListener('unlock', () => isPointerLocked = false);

    document.addEventListener("keydown", function(event) {
        if (event.code === "KeyE") {
            interactionMode = !interactionMode;
            document.body.style.cursor = interactionMode ? "pointer" : "none";
        }
        if (!interactionMode) {
            switch (event.code) {
                case "KeyW": controls.moveForward(0.1); break;
                case "KeyS": controls.moveForward(-0.1); break;
                case "KeyA": controls.moveRight(-0.1); break;
                case "KeyD": controls.moveRight(0.1); break;
            }
        }
    });

    // Load Product
    loadProduct("/static/models/product1.glb", 0, 1.5, -4, "T-Shirt", "$25");

    animate();
}

function loadProduct(modelPath, x, y, z, name, price) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        let product = gltf.scene;
        product.position.set(x, y, z);
        product.scale.set(1, 1, 1);
        product.userData = { name, price };

        // Add all meshes inside the product to the list
        product.traverse((child) => {
            if (child.isMesh) {
                child.userData = { name, price }; // Store data in each mesh
                products.push(child);
            }
        });

        scene.add(product);
    });
}

// Mouse Click for Selecting Product
document.addEventListener("mousedown", function(event) {
    if (!interactionMode) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(products, true);

    if (intersects.length > 0) {
        const product = intersects[0].object.userData;
        document.getElementById("productTitle").innerText = product.name;
        document.getElementById("productPrice").innerText = product.price;
        document.getElementById("popup").style.display = "block";
    }
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();*/


//This is the perfect store need to add more products
/*let scene, camera, renderer, controls;
let products = [];
let isDragging = false; // Track when user is dragging
let prevMouseX, prevMouseY;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Adjust on window resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    // Floor
    const floorTexture = new THREE.TextureLoader().load('/static/textures/floor_texture.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Walls (Full Enclosed Store)
    const wallTexture = new THREE.TextureLoader().load('/static/textures/wall_texture.jpg');
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    const walls = [
        { pos: [0, 2, -5], rot: [0, 0, 0] },  // Back wall
        { pos: [-5, 2, 0], rot: [0, Math.PI / 2, 0] }, // Left wall
        { pos: [5, 2, 0], rot: [0, -Math.PI / 2, 0] }, // Right wall
        { pos: [0, 2, 5], rot: [0, Math.PI, 0] } // Front wall
    ];

    walls.forEach(w => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Click & Drag to Move View
    document.addEventListener("mousedown", (event) => {
        isDragging = true;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            let deltaX = event.clientX - prevMouseX;
            let deltaY = event.clientY - prevMouseY;

            camera.rotation.y -= deltaX * 0.002;
            camera.rotation.x -= deltaY * 0.002;
            camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // Limit vertical rotation

            prevMouseX = event.clientX;
            prevMouseY = event.clientY;
        }
    });

    // Keyboard movement controls
    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "KeyW": camera.position.z -= 0.1; break;
            case "KeyS": camera.position.z += 0.1; break;
            case "KeyA": camera.position.x -= 0.1; break;
            case "KeyD": camera.position.x += 0.1; break;
        }
    });

    // Load Product
    loadProduct("/static/models/product1.glb", 0, 0, -4.8, "T-Shirt", "$25");

    animate();
}

function loadProduct(modelPath, x, y, z, name, price) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        let product = gltf.scene;
        product.position.set(x, y, z);
        product.scale.set(1, 1, 1);
        product.userData = { name, price };

        // Store each mesh inside product for interaction
        product.traverse((child) => {
            if (child.isMesh) {
                child.userData = { name, price };
                products.push(child);
            }
        });

        scene.add(product);
    });
}

// Mouse Click to Show Product Info
document.addEventListener("mousedown", function(event) {
    if (!isDragging) { // Only register click if not dragging
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(products, true);

        if (intersects.length > 0) {
            const product = intersects[0].object.userData;
            document.getElementById("productTitle").innerText = product.name;
            document.getElementById("productPrice").innerText = product.price;
            document.getElementById("popup").style.display = "block";
        }
    }
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();*/



//This code is the perfect version with all correct controls but has to add more objects


let scene, camera, renderer, controls;
let products = [];
let isDragging = false;
let prevMouseX, prevMouseY;

const storeBounds = { // Store limits (walls are at ±5, floor is at 0)
    minX: -4.5, maxX: 4.5,
    minZ: -4.5, maxZ: 4.5
};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3); // Start position inside the store

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const light = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(light);

    // Floor
    const floorTexture = new THREE.TextureLoader().load('/static/textures/floor_texture.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Walls (Full Store Boundaries)
    const wallTexture = new THREE.TextureLoader().load('/static/textures/wall_texture.jpg');
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });

    const walls = [
        { pos: [0, 2, -5], rot: [0, 0, 0] },  // Back wall
        { pos: [-5, 2, 0], rot: [0, Math.PI / 2, 0] }, // Left wall
        { pos: [5, 2, 0], rot: [0, -Math.PI / 2, 0] }, // Right wall
        { pos: [0, 2, 5], rot: [0, Math.PI, 0] } // Front wall
    ];

    walls.forEach(w => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(10, 4), wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Click & Drag to Move View
    document.addEventListener("mousedown", (event) => {
        isDragging = true;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            let deltaX = event.clientX - prevMouseX;
            let deltaY = event.clientY - prevMouseY;

            camera.rotation.y -= deltaX * 0.002;
            camera.rotation.x -= deltaY * 0.002;
            camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

            prevMouseX = event.clientX;
            prevMouseY = event.clientY;
        }
    });

    // Movement with Boundaries
    document.addEventListener("keydown", function(event) {
        let moveSpeed = 0.1;
        let newX = camera.position.x;
        let newZ = camera.position.z;

        switch (event.code) {
            case "KeyW": // Forward
                newX -= Math.sin(camera.rotation.y) * moveSpeed;
                newZ -= Math.cos(camera.rotation.y) * moveSpeed;
                break;
            case "KeyS": // Backward
                newX += Math.sin(camera.rotation.y) * moveSpeed;
                newZ += Math.cos(camera.rotation.y) * moveSpeed;
                break;
            case "KeyA": // Left
                newX -= Math.cos(camera.rotation.y) * moveSpeed;
                newZ += Math.sin(camera.rotation.y) * moveSpeed;
                break;
            case "KeyD": // Right
                newX += Math.cos(camera.rotation.y) * moveSpeed;
                newZ -= Math.sin(camera.rotation.y) * moveSpeed;
                break;
        }

        // Restrict movement within store boundaries
        if (newX >= storeBounds.minX && newX <= storeBounds.maxX) {
            camera.position.x = newX;
        }
        if (newZ >= storeBounds.minZ && newZ <= storeBounds.maxZ) {
            camera.position.z = newZ;
        }
    });

    // Load Product
    // Center mannequins
loadProduct("/static/models/model.glb", -1, 0, 0, "Mannequin 1", "₹2000", 0.8);
loadProduct("/static/models/man.glb", 1, 0, 0, "Mannequin 2", "₹600", 0.8);

// Back Wall (-4.8 Z)
loadProduct("/static/models/child.glb", -3.5, 0, -4.8, "Product 1", "₹500", 1.5);
loadProduct("/static/models/fpant.glb", -1.5, 0, -4.8, "Product 2", "₹700", 1.5);
loadProduct("/static/models/jacket.glb", 0, 0, -4.8, "Product 3", "₹900",1.5);
loadProduct("/static/models/outfit1.glb", 3.5, 0, -4.8, "Product 5", "₹1200",1.5);

// Front Wall (4.8 Z)
loadProduct("/static/models/pant.glb", -3, 0, 4.8, "Product 6", "₹800");
loadProduct("/static/models/product1.glb", 0, 0, 4.8, "Product 7", "₹1500");
loadProduct("/static/models/shirt.glb", 3, 0, 4.8, "Product 8", "₹1000");

// Left Wall (-4.8 X)
loadProduct("/static/models/shoe1.glb", -4.8, 0.8, -3, "Product 9", "₹750", 0.1);
loadProduct("/static/models/slippers.glb", -4.8, 0.8, 0, "Product 10", "₹1100", 1.2);
loadProduct("/static/models/sneakers_shoes.glb", -4.8, 0.8, 3, "Product 11", "₹1300", 0.1);

// Right Wall (4.8 X)
loadProduct("/static/models/tshirt2.glb", 4.8, 0, -3, "Product 12", "₹850");
loadProduct("/static/models/tshirt3.glb", 4.8, 0, 0, "Product 13", "₹1250");
loadProduct("/static/models/tshirt4.glb", 4.8, 0, 3, "Product 14", "₹1400");

// Corner Placement
loadProduct("/static/models/wpant.glb", -4, 0, -4, "Product 15", "₹2000");


    animate();
}

function loadProduct(modelPath, x, y, z, name, price,scale=1.5) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        let product = gltf.scene;
        product.position.set(x, y, z);
        product.scale.set(scale,scale,scale);
        product.userData = { name, price };

        product.traverse((child) => {
            if (child.isMesh) {
                child.userData = { name, price };
                products.push(child);
            }
        });

        scene.add(product);
    });
}

// Mouse Click to Show Product Info
document.addEventListener("mousedown", function(event) {
    if (!isDragging) { 
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(products, true);

        if (intersects.length > 0) {
            const product = intersects[0].object.userData;
            document.getElementById("productTitle").innerText = product.name;
            document.getElementById("productPrice").innerText = product.price;
            document.getElementById("popup").style.display = "block";
        }
    }
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();


