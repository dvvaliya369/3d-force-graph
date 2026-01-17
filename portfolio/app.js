// Initialize 3D Force Graph in Hero Section
document.addEventListener('DOMContentLoaded', function() {
    initHeroGraph();
    initSmoothScroll();
    initCopyButtons();
    initScrollAnimations();
});

// Generate sample graph data
function generateGraphData() {
    const numNodes = 80;
    const nodes = [];
    const links = [];
    
    // Create nodes with different groups
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            id: i,
            name: `Node ${i}`,
            val: Math.random() * 20 + 5,
            group: Math.floor(Math.random() * 5)
        });
    }
    
    // Create links between nodes
    for (let i = 0; i < numNodes; i++) {
        const numLinks = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numLinks; j++) {
            const target = Math.floor(Math.random() * numNodes);
            if (target !== i) {
                links.push({
                    source: i,
                    target: target
                });
            }
        }
    }
    
    return { nodes, links };
}

// Initialize the hero 3D graph
function initHeroGraph() {
    const graphElement = document.getElementById('3d-graph');
    if (!graphElement) return;
    
    const graphData = generateGraphData();
    
    // Color palette for different node groups
    const colorPalette = [
        '#6366f1', // Primary
        '#ec4899', // Secondary
        '#8b5cf6', // Purple
        '#06b6d4', // Cyan
        '#f59e0b'  // Amber
    ];
    
    const graph = ForceGraph3D()
        (graphElement)
        .graphData(graphData)
        .nodeLabel('name')
        .nodeAutoColorBy('group')
        .nodeColor(node => colorPalette[node.group % colorPalette.length])
        .nodeOpacity(0.9)
        .nodeResolution(16)
        .linkColor(() => 'rgba(255, 255, 255, 0.15)')
        .linkWidth(0.5)
        .linkOpacity(0.3)
        .backgroundColor('#0a0a0f')
        .showNavInfo(false)
        .enableNodeDrag(false)
        .enableNavigationControls(true)
        .d3AlphaDecay(0.01)
        .d3VelocityDecay(0.3)
        .cooldownTime(10000);
    
    // Auto-rotate camera
    let angle = 0;
    setInterval(() => {
        angle += 0.2;
        graph.cameraPosition({
            x: 300 * Math.sin(angle * Math.PI / 180),
            z: 300 * Math.cos(angle * Math.PI / 180)
        });
    }, 50);
    
    // Add some directional particles to random links
    const particleLinks = graphData.links.filter(() => Math.random() < 0.1);
    particleLinks.forEach(link => {
        link.particles = 2;
        link.particleSpeed = 0.005;
        link.particleWidth = 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        graph.width(graphElement.offsetWidth);
        graph.height(graphElement.offsetHeight);
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Copy code functionality
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const textToCopy = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll(
        '.about-card, .feature-item, .example-card, .docs-link-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Enhance example cards with hover effects
document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Performance optimization: Pause graph animation when not visible
let graphPaused = false;
const heroSection = document.querySelector('.hero');

if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !graphPaused) {
                graphPaused = true;
                // Graph will continue but we mark it as out of view
            } else if (entry.isIntersecting && graphPaused) {
                graphPaused = false;
            }
        });
    }, { threshold: 0.1 });
    
    heroObserver.observe(heroSection);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        document.querySelectorAll('.modal, .overlay').forEach(el => {
            el.classList.remove('active');
        });
    }
});

// Console easter egg
console.log('%c3D Force Graph Portfolio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with ThreeJS and WebGL', 'font-size: 14px; color: #ec4899;');
console.log('%cExplore the code: https://github.com/vasturiano/3d-force-graph', 'font-size: 12px; color: #8b5cf6;');
