
      
      // Simple JavaScript for current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-items a');

  // Toggle menu function
  const toggleMenu = () => {
    navbar.classList.toggle('active');
    const isExpanded = navbar.classList.contains('active');
    toggle.setAttribute('aria-expanded', isExpanded);
  };

  // Event listeners
  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', toggleMenu));
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  formMessage.textContent = '';
  formMessage.className = 'message';
  
  // Replace with your Google Apps Script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzoNiEz4wiUMdoivgilZrjSRQQ4oSqbNRlzxajmFyHVMnHfJxkz-cVi5_mSgyoxD4o8/exec';
  
  const formData = new FormData(this);
  
  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    formMessage.textContent = 'Message sent successfully!';
    formMessage.className = 'message success';
    this.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  })
  .catch(error => {
    formMessage.textContent = 'Error sending message. Please try again.';
    formMessage.className = 'message error';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
});

(async function(){
  const galleryEl = document.getElementById('gallery');

  const models = [
    { name: "Kaleesha", file: "models/Kaleesha.stl" },
    { name: "Kaleesha", file: "models/Kaleesha.stl" },
    { name: "Kaleesha", file: "models/Kaleesha.stl" },


 
  ];

  // Load Three.js + loaders
  const threeUrl = 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.min.js';
  const loaders = [
    'https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/controls/OrbitControls.js',
    'https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/loaders/STLLoader.js'
  ];

  async function loadScript(url){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=url;
      s.onload=()=>resolve();
      s.onerror=()=>reject("Failed: "+url);
      document.head.appendChild(s);
    });
  }

  await loadScript(threeUrl);
  for(const l of loaders) await loadScript(l);

  function createPostcard(modelInfo){
    const card = document.createElement('div');
    card.className = 'postcard';

    const header = document.createElement('div');
    header.className = 'postcard-header';
    header.textContent = modelInfo.name;
    card.appendChild(header);

    const viewerDiv = document.createElement('div');
    viewerDiv.className = 'viewer';
    card.appendChild(viewerDiv);

    const footer = document.createElement('div');
    footer.className = 'postcard-footer';
    footer.textContent = '© 2025';
    card.appendChild(footer);

    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = 'Loading…';
    card.appendChild(msg);

    galleryEl.appendChild(card);

    // Three.js setup for this postcard
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0d);

    const w = viewerDiv.clientWidth;
    const h = viewerDiv.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, w/h, 0.01, 1000);
    camera.position.set(0,1,3);

    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(w,h);
    viewerDiv.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff,0.6));
    const dir = new THREE.DirectionalLight(0xffffff,0.9);
    dir.position.set(5,5,5);
    scene.add(dir);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene,camera);
    }
    animate();

    function centerAndScale(obj){
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxSide = Math.max(size.x,size.y,size.z);
      if(maxSide>0) obj.scale.setScalar(1.5/maxSide);
      box.setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);
      obj.position.sub(center);
    }

    // Load model
    const ext = modelInfo.file.split('.').pop().toLowerCase();
    if(ext==='stl'){
      new THREE.STLLoader().load(modelInfo.file, geometry=>{
        const mat = new THREE.MeshStandardMaterial({ color:0xcccccc });
        const mesh = new THREE.Mesh(geometry, mat);
        centerAndScale(mesh);
        scene.add(mesh);
        msg.textContent = 'Loaded';
      });
    } else if(ext==='glb'||ext==='gltf'){
      new THREE.GLTFLoader().load(modelInfo.file, gltf=>{
        const obj = gltf.scene;
        centerAndScale(obj);
        scene.add(obj);
        msg.textContent = 'Loaded';
      });
    }
  }

  models.forEach(m=>createPostcard(m));

})();
