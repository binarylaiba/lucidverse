import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberVoidScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animId: number;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient and point lights
    const ambientLight = new THREE.AmbientLight(0x303550, 1.8);
    scene.add(ambientLight);

    const pointLightViolet = new THREE.PointLight(0x7c3aed, 4.5, 60);
    pointLightViolet.position.set(6, 4, 6);
    scene.add(pointLightViolet);

    const pointLightCyan = new THREE.PointLight(0x44e2cd, 3.5, 60);
    pointLightCyan.position.set(-6, -4, 5);
    scene.add(pointLightCyan);

    // Crystals group
    const crystalsGroup = new THREE.Group();
    scene.add(crystalsGroup);

    const octaGeo = new THREE.OctahedronGeometry(1, 0);
    const icosaGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const tetraGeo = new THREE.TetrahedronGeometry(1.2, 0);

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x1a1235,
      roughness: 0.1,
      metalness: 0.15,
      transmission: 0.65,
      ior: 1.5,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
    });

    const numCrystals = 16;
    for (let i = 0; i < numCrystals; i++) {
      const geo = i % 3 === 0 ? octaGeo : (i % 3 === 1 ? icosaGeo : tetraGeo);
      const mesh = new THREE.Mesh(geo, crystalMat.clone());

      mesh.position.x = (Math.random() - 0.5) * 16;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 6 - 1;

      const scale = 0.25 + Math.random() * 0.5;
      mesh.scale.set(scale, scale * (1.2 + Math.random() * 0.6), scale);

      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      mesh.userData = {
        baseY: mesh.position.y,
        speed: 0.003 + Math.random() * 0.006,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatOffset: Math.random() * Math.PI * 2,
      };

      if (i % 2 === 0) {
        const wireGeo = new THREE.WireframeGeometry(geo);
        const wireMat = new THREE.LineBasicMaterial({ color: 0x44e2cd, transparent: true, opacity: 0.35 });
        const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
        mesh.add(wireMesh);
      }

      crystalsGroup.add(mesh);
    }

    // Floating central monolith spire
    const spireGeo = new THREE.CylinderGeometry(0.1, 0.4, 3.2, 5);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x221133,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    const centralSpire = new THREE.Mesh(spireGeo, spireMat);
    centralSpire.position.set(4.5, 0.5, -2);
    centralSpire.rotation.z = -0.15;
    scene.add(centralSpire);

    // Particle Stardust
    const particlesCount = 380;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 22;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 14;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

      if (i % 3 === 0) {
        colorArray[i * 3] = 0.27; colorArray[i * 3 + 1] = 0.88; colorArray[i * 3 + 2] = 0.8;
      } else if (i % 3 === 1) {
        colorArray[i * 3] = 0.82; colorArray[i * 3 + 1] = 0.73; colorArray[i * 3 + 2] = 1.0;
      } else {
        colorArray[i * 3] = 0.95; colorArray[i * 3 + 1] = 0.95; colorArray[i * 3 + 2] = 1.0;
      }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    function animate() {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Parallax smooth interpolation
      camera.position.x += (mouseX * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      crystalsGroup.children.forEach((c) => {
        const mesh = c as THREE.Mesh;
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;
        mesh.position.y = mesh.userData.baseY + Math.sin(time * 1.1 + mesh.userData.floatOffset) * 0.22;
      });

      centralSpire.rotation.y = time * 0.2;
      centralSpire.position.y = 0.5 + Math.sin(time * 0.8) * 0.15;

      particlesMesh.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div ref={containerRef} className="w-full h-full block opacity-85" />
    </div>
  );
}
