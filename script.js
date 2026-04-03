// ===== TIMELINE DATA ===== 
const TIMELINE_DATA = [
    {
        id: 1,
        title: "Malware Analysis Engine",
        date: "Dec 2025 - Present",
        content: "Python-based malware analysis tool supporting 5+ file formats. Integrates static (oletools, Androguard), dynamic (ViperMonkey, Docker), and visual (Tesseract) analysis engines with a custom risk scoring algorithm evaluating 15+ security indicators.",
        category: "Internship",
        type: "IN PROGRESS",
        relatedIds: [2, 3],
        status: "in-progress",
        energy: 85,
        icon: "🛡️",
        tech: ["Python", "Docker", "YARA", "Tesseract", "oletools", "ViperMonkey"]
    },
    {
        id: 2,
        title: "AudioSafe Steganography",
        date: "Oct - Dec 2025",
        content: "Full-stack platform implementing AES-256 in GCM mode and LSB-based data embedding for protected communication. Features PBKDF2 key derivation preventing unauthorized payload access with comprehensive encryption protocols.",
        category: "Personal Project",
        type: "COMPLETE",
        relatedIds: [],
        externalLink: "https://advay01.pythonanywhere.com",
        status: "completed",
        energy: 100,
        icon: "🔐",
        tech: ["AES-256", "Steganography", "Cryptography", "PBKDF2"]
    },
    {
        id: 3,
        title: "Network Geo-Vis",
        date: "June 2025",
        content: "Captured and analyzed 8,000+ packets via Wireshark. Developed a Python script utilizing ip-api and GeoLiteCity DB to geolocate external IPs with 98% accuracy, automating KML generation for network visualization.",
        category: "Personal Project",
        type: "COMPLETE",
        relatedIds: [],
        externalLink: "https://github.com/advayacharya/network-geo-mapper",
        status: "completed",
        energy: 100,
        icon: "🌐",
        tech: ["Wireshark", "Python", "Networking", "KML", "GeoIP"]
    }
];

// ===== TIMELINE STATE =====
let timelineState = {
    expandedItems: {},
    rotationAngle: 0,
    autoRotate: true,
    pulseEffect: {},
    activeNodeId: null,
    centerOffset: { x: 0, y: 0 }
};

// ===== BOOT SEQUENCE ===== 
document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    initCustomCursor();
    initScrambleText();
    initRevealSections();
    setupScrollAnimations();
    initDottedSurface();
});

function initBootSequence() {
    const bootScreen = document.getElementById('bootScreen');
    const bootText = document.getElementById('bootText');
    
    const bootSequence = [
        "INIT SECURE_CONNECTION...",
        "BYPASSING FIREWALL...",
        "EXTRACTING PORTFOLIO_DATA.BIN",
        "DECRYPTING AES-256...",
        "ACCESS GRANTED: ADVAY_ACHARYA"
    ];

    let index = 0;
    const interval = setInterval(() => {
        if (index < bootSequence.length) {
            const div = document.createElement('div');
            div.innerHTML = `<span>❯</span> ${bootSequence[index]}`;
            bootText.appendChild(div);
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                bootScreen.style.display = 'none';
                document.querySelector('.content-wrapper').style.display = 'block';
                initOrbitalSystem();
            }, 600);
        }
    }, 400);
}

// ===== CUSTOM CURSOR ===== 
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 16) + 'px';
        cursor.style.top = (e.clientY - 16) + 'px';
        cursorDot.style.left = (e.clientX - 2) + 'px';
        cursorDot.style.top = (e.clientY - 2) + 'px';
    });
}

// ===== SCRAMBLE TEXT EFFECT ===== 
function initScrambleText() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    scrambleElements.forEach(element => {
        const originalText = element.dataset.text || element.textContent;
        
        element.addEventListener('mouseenter', () => {
            let iteration = 0;
            const interval = setInterval(() => {
                const scrambled = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join('');
                
                element.textContent = scrambled;
                
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
                iteration += 1/3;
            }, 30);
        });
    });
}

// ===== RADIAL ORBITAL TIMELINE ===== 
function initRadialOrbitalTimeline() {
    const container = document.getElementById('timelineContainer');
    const nodesContainer = document.getElementById('timelineNodesContainer');
    const detailCard = document.getElementById('timelineDetailCard');
    
    if (!container || !nodesContainer || !detailCard) return;
    
    // Setup container click handler
    container.addEventListener('click', (e) => {
        if (e.target === container || e.target === nodesContainer) {
            timelineState.expandedItems = {};
            timelineState.activeNodeId = null;
            timelineState.pulseEffect = {};
            timelineState.autoRotate = true;
            detailCard.classList.remove('visible');
            updateTimelineNodes();
        }
    });
    
    // Create timeline nodes
    nodesContainer.innerHTML = ''; // reset
    const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.35;

    TIMELINE_DATA.forEach((item, index) => {
        const angle = ((index / TIMELINE_DATA.length) * 360 + timelineState.rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + container.offsetWidth / 2;
        const y = radius * Math.sin(radian) + container.offsetHeight / 2;

        const nodeEl = document.createElement('div');
        nodeEl.className = 'timeline-node';
        nodeEl.style.left = x + 'px';
        nodeEl.style.top = y + 'px';
        nodeEl.dataset.id = item.id;

        nodeEl.innerHTML = `
            <div class="node-aura"></div>
            <div class="node-circle">${item.icon}</div>
            <div class="node-title">${item.title}</div>
        `;

        nodeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTimelineItem(item.id);
        });

        nodesContainer.appendChild(nodeEl);
    });

    updateTimelineNodes();
    animateTimelineRotation();
}

function setTimelineNodesPosition() {
    const container = document.getElementById('timelineContainer');
    const nodesContainer = document.getElementById('timelineNodesContainer');
    if (!container || !nodesContainer) return;

    const radius = Math.min(container.offsetWidth, container.offsetHeight) * 0.35;

    nodesContainer.querySelectorAll('.timeline-node').forEach((nodeEl, index) => {
        const angle = ((index / TIMELINE_DATA.length) * 360 + timelineState.rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + container.offsetWidth / 2;
        const y = radius * Math.sin(radian) + container.offsetHeight / 2;

        nodeEl.style.left = x + 'px';
        nodeEl.style.top = y + 'px';
    });
}

function animateTimelineRotation() {
    if (timelineState.autoRotate) {
        timelineState.rotationAngle = (timelineState.rotationAngle + 0.15) % 360;
        setTimelineNodesPosition();
    }
    requestAnimationFrame(animateTimelineRotation);
}

function toggleTimelineItem(id) {
    const item = TIMELINE_DATA.find(i => i.id === id);
    if (!item) return;
    
    // Toggle expanded state
    timelineState.expandedItems[id] = !timelineState.expandedItems[id];
    
    if (timelineState.expandedItems[id]) {
        // Expand this item
        timelineState.activeNodeId = id;
        timelineState.autoRotate = false;
        
        // Show detail card
        displayTimelineDetail(item);
        
        // Update pulse effect for related items
        const pulseEffect = {};
        item.relatedIds.forEach(relId => {
            pulseEffect[relId] = true;
        });
        timelineState.pulseEffect = pulseEffect;
    } else {
        // Collapse
        timelineState.activeNodeId = null;
        timelineState.autoRotate = true;
        timelineState.pulseEffect = {};
        
        const detailCard = document.getElementById('timelineDetailCard');
        detailCard.classList.remove('visible');
    }
    
    updateTimelineNodes();
    setTimelineNodesPosition();
}

function displayTimelineDetail(item) {
    const detailCard = document.getElementById('timelineDetailCard');
    const container = document.getElementById('timelineContainer');
    
    // Calculate position relative to the node
    const angle = ((TIMELINE_DATA.indexOf(item) / TIMELINE_DATA.length) * 360 + timelineState.rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const radius = 200;
    
    const x = radius * Math.cos(radian) + container.offsetWidth / 2;
    const y = radius * Math.sin(radian) + container.offsetHeight / 2;
    
    // Adjust card position to appear above the node
    detailCard.style.left = x + 'px';
    detailCard.style.top = (y - 100) + 'px';
    
    const statusBadgeClass = item.status === 'completed' ? 'completed' : 
                             item.status === 'in-progress' ? 'in-progress' : 'pending';
    
    let relatedNodesHTML = '';
    if (item.externalLink) {
        relatedNodesHTML = `
            <div class="related-nodes-section">
                <div class="related-label">
                    <span style="margin-right: 4px;">🔗</span>
                    PROJECT LINK
                </div>
                <div class="related-buttons">
                    <a href="${item.externalLink}" target="_blank" rel="noopener noreferrer" class="related-btn" style="text-decoration: none; display: inline-block; text-align: center;">
                        View Project
                    </a>
                </div>
            </div>
        `;
    } else if (item.relatedIds && item.relatedIds.length > 0) {
        relatedNodesHTML = `
            <div class="related-nodes-section">
                <div class="related-label">
                    <span style="margin-right: 4px;">🔗</span>
                    CONNECTED PROJECTS
                </div>
                <div class="related-buttons">
                    ${item.relatedIds.map(relId => {
                        const relatedItem = TIMELINE_DATA.find(i => i.id === relId);
                        return `
                            <button class="related-btn" onclick="toggleTimelineItem(${relId})">
                                ${relatedItem.title}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    detailCard.innerHTML = `
        <div class="card-pointer"></div>
        <div class="card-header">
            <div class="card-status">
                <span class="status-badge ${statusBadgeClass}">
                    ${item.type}
                </span>
                <span class="card-date">${item.date}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
        </div>
        <div class="card-content">
            <p class="card-description">${item.content}</p>
            
            <div class="card-tech-section">
                <div class="tech-label">
                    <span style="margin-right: 4px;">⚙️</span>
                    TECH STACK
                </div>
                <div class="tech-tags">
                    ${item.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-energy-section">
                <div class="energy-label">
                    <span>⚡ PROGRESS</span>
                    <span>${item.energy}%</span>
                </div>
                <div class="energy-bar">
                    <div class="energy-fill" style="width: ${item.energy}%"></div>
                </div>
            </div>
            
            ${relatedNodesHTML}
        </div>
    `;
    
    detailCard.classList.add('visible');
}

function updateTimelineNodes() {
    const nodesContainer = document.getElementById('timelineNodesContainer');
    const nodes = nodesContainer.querySelectorAll('.timeline-node');
    
    nodes.forEach((nodeEl, index) => {
        const id = parseInt(nodeEl.dataset.id);
        const isExpanded = timelineState.expandedItems[id];
        const isRelated = timelineState.activeNodeId ? 
            TIMELINE_DATA.find(i => i.id === timelineState.activeNodeId)?.relatedIds.includes(id) : false;
        const isPulsing = timelineState.pulseEffect[id];
        
        // Update classes
        nodeEl.classList.toggle('active', isExpanded);
        nodeEl.classList.toggle('related', isRelated && !isExpanded);
        
        // Update styling
        if (isExpanded || isRelated) {
            nodeEl.querySelector('.node-circle').style.borderColor = 'var(--lime)';
        } else {
            nodeEl.querySelector('.node-circle').style.borderColor = 'rgba(204, 255, 0, 0.4)';
        }
    });
}

// ===== OLD ORBITAL SYSTEM (DEPRECATED) =====
function initOrbitalSystem() {
    // Orbital system replaced with RadialOrbitalTimeline
    initRadialOrbitalTimeline();
    window.addEventListener('resize', () => {
        setTimelineNodesPosition();
    });
}

// ===== REVEAL SECTIONS =====
function initRevealSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal-section').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL ANIMATIONS ===== 
function setupScrollAnimations() {
    // Parallax effect for grid background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const gridBg = document.querySelector('.grid-bg');
        if (gridBg) {
            gridBg.style.backgroundPosition = `${scrolled * 0.5}px ${scrolled * 0.5}px`;
        }
    });
}

// ===== SETUP MAGNETIC BUTTONS ===== 
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.magnetic-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distX = (e.clientX - centerX) * 0.2;
            const distY = (e.clientY - centerY) * 0.2;
            
            button.style.transform = `translate(${distX}px, ${distY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
});

// ===== MARQUEE ANIMATION =====
function setupMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Animation is already in CSS, this is just for reference
        marqueeContent.style.animation = 'scrollLeft 30s linear infinite';
    }
}

setupMarquee();

// ===== DOTTED SURFACE BACKGROUND (THREE.JS) =====
function initDottedSurface() {
    const container = document.getElementById('dotted-surface-container');
    if (!container || typeof THREE === 'undefined') return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);

    container.appendChild(renderer.domElement);

    // Create particles
    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
            const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
            const y = 0; // Will be animated
            const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

            positions.push(x, y, z);
            // Classic light grey
            colors.push(0.78, 0.78, 0.78);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create material
    const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
    });

    // Create points object
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;

    // Animation function
    const animate = () => {
        requestAnimationFrame(animate);

        const positionAttribute = geometry.attributes.position;
        const positionsArray = positionAttribute.array;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const index = i * 3;

                // Animate Y position with sine waves
                positionsArray[index + 1] =
                    Math.sin((ix + count) * 0.3) * 50 +
                    Math.sin((iy + count) * 0.5) * 50;

                i++;
            }
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.1;
    };

    // Handle window resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();
}

console.log('%c⚙️ PORTFOLIO v2.0 INITIALIZED', 'color: #ccff00; font-size: 16px; font-weight: bold;');
console.log('%cRadial Orbital Timeline Active', 'color: #ccff00; font-size: 12px;');
console.log('%cAll systems secure and operational', 'color: #ccff00; font-size: 12px;');
