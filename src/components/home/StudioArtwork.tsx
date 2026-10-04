"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

export default function StudioArtwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasWebgl, setHasWebgl] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Keep the small-screen hero light and readable. The CSS artwork fallback
    // remains visible on phones while desktop gets the full WebGL treatment.
    if (window.matchMedia("(max-width: 767px)").matches) {
      setReady(true);
      return;
    }
    let cancelled = false;
    let dispose = () => {};

    // Centered Spatial Instrument 3D Crystal Core (NextReach Brand Colors):
    // Terracotta (#b4543c / #e58d72), Warm Amber (#f59e0b), Smoked Obsidian (#1e1c18), Champagne Platinum (#f4f2eb).
    async function buildSculpture() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (cancelled || !host) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);
      setHasWebgl(true);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 9.4);

      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(room, 0.04, 0.1, 100, { size: 128 });
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();

      const sculpture = new THREE.Group();
      scene.add(sculpture);

      // 1. Central Multi-Faceted Smoked Obsidian / Champagne Glass Crystal Prism (Bigger Scale)
      const crystalGeo = new THREE.IcosahedronGeometry(2.35, 1);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0x1e1c18,
        roughness: 0.12,
        metalness: 0.3,
        transmission: 0.85,
        ior: 1.62,
        reflectivity: 0.88,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        transparent: true,
        opacity: 0.94,
        flatShading: true,
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalMesh.rotation.set(0.32, -0.35, -0.2);
      sculpture.add(crystalMesh);

      // 1b. Brand Terracotta & Amber Facet Wireframe Lattice
      const wireGeo = new THREE.WireframeGeometry(crystalGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0xe58d72,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
      crystalMesh.add(wireMesh);

      // 2. Gyroscopic Quantum Orbital Rings (Champagne Platinum, Terracotta & Amber)
      const ringGroup = new THREE.Group();
      sculpture.add(ringGroup);

      // Ring 1: Champagne Platinum
      const ring1Geo = new THREE.TorusGeometry(3.1, 0.02, 16, 100);
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: 0xf4f2eb,
        metalness: 0.9,
        roughness: 0.12,
        wireframe: true,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3.2;
      ringGroup.add(ring1);

      // Ring 2: Brand Terracotta Accent
      const ring2Geo = new THREE.TorusGeometry(3.55, 0.016, 16, 100);
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0xe58d72,
        metalness: 0.85,
        roughness: 0.18,
        wireframe: true,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 3.6;
      ringGroup.add(ring2);

      // Ring 3: Subtle Warm Amber Horizon Ring
      const ring3Geo = new THREE.TorusGeometry(3.95, 0.012, 16, 100);
      const ring3Mat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.z = Math.PI / 4;
      ringGroup.add(ring3);

      // 3. Radiant Inner Terracotta & Gold Nucleus
      const nucleusGeo = new THREE.OctahedronGeometry(0.9, 0);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: 0xb4543c,
        emissive: 0xc76b50,
        emissiveIntensity: 1.15,
        roughness: 0.18,
        metalness: 0.85,
        wireframe: true,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      sculpture.add(nucleus);

      // 4. Orbital Micro-Particle Field (Warm Terracotta & Champagne Dust)
      const particleCount = 280;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 3.0 + Math.random() * 3.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = radius * Math.cos(phi);
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.048,
        color: 0xfbd0c0,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(pGeo, pMat);
      sculpture.add(particles);

      // 5. Cinematic Brand Lighting
      const ambientLight = new THREE.AmbientLight(0xfff8f2, 0.85);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffddc2, 3.5);
      keyLight.position.set(6, 6, 6);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xe58d72, 3.8);
      rimLight.position.set(-6, -4, 4);
      scene.add(rimLight);

      const specularLight = new THREE.PointLight(0xf59e0b, 2.8, 25);
      specularLight.position.set(0, 3, 5);
      scene.add(specularLight);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      let visible = true;
      let last = 0;
      let lastRender = 0;
      let elapsed = 0;
      const pointer = { x: 0, y: 0 };

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };

      const onPointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || reduce.matches) return;
        pointer.x = (event.clientX / window.innerWidth) - 0.5;
        pointer.y = (event.clientY / window.innerHeight) - 0.5;
      };

      const resetPointer = () => {
        pointer.x = 0;
        pointer.y = 0;
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const visibilityObserver = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      });
      visibilityObserver.observe(host);

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", resetPointer);

      resize();
      renderer.render(scene, camera);
      setReady(true);

      renderer.setAnimationLoop((time) => {
        if (time - lastRender < 1000 / 30 || !visible || document.hidden || reduce.matches || pausedRef.current) {
          last = time;
          return;
        }
        lastRender = time;
        const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
        last = time;

        if (!reduce.matches && !pausedRef.current) {
          elapsed += delta;

          // Central crystal rotation
          crystalMesh.rotation.y = -0.35 + elapsed * 0.16;
          crystalMesh.rotation.z = -0.2 + Math.sin(elapsed * 0.2) * 0.1;

          // Gyroscopic orbital counter-rotations
          ring1.rotation.x += delta * 0.28;
          ring1.rotation.z += delta * 0.18;
          ring2.rotation.y -= delta * 0.22;
          ring2.rotation.x -= delta * 0.14;
          ring3.rotation.z += delta * 0.16;
          ring3.rotation.y += delta * 0.12;

          // Nucleus rotation & organic pulse
          nucleus.rotation.y = elapsed * 0.4;
          nucleus.rotation.x = elapsed * 0.25;
          const pulse = 1 + Math.sin(elapsed * 2.2) * 0.08;
          nucleus.scale.set(pulse, pulse, pulse);

          // Particles slow rotation
          particles.rotation.y = elapsed * 0.05;
          particles.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

          // Organic floating bob & spring pointer physics
          sculpture.position.y = Math.sin(elapsed * 0.55) * 0.1;
          sculpture.rotation.x += (pointer.y * 0.38 - sculpture.rotation.x) * 0.045;
          sculpture.rotation.y += (pointer.x * 0.48 - sculpture.rotation.y) * 0.045;
        }

        renderer.render(scene, camera);
      });

      const onContextLost = (event: Event) => {
        event.preventDefault();
        setReady(false);
      };
      const onContextRestored = () => {
        setReady(true);
        resize();
      };

      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

      dispose = () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("pointerleave", resetPointer);
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);

        crystalGeo.dispose();
        crystalMat.dispose();
        wireGeo.dispose();
        wireMat.dispose();
        ring1Geo.dispose();
        ring1Mat.dispose();
        ring2Geo.dispose();
        ring2Mat.dispose();
        ring3Geo.dispose();
        ring3Mat.dispose();
        nucleusGeo.dispose();
        nucleusMat.dispose();
        pGeo.dispose();
        pMat.dispose();
        environment.dispose();

        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const start = () => {
        if (!cancelled) buildSculpture().catch(() => {});
      };
      if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(start, { timeout: 1200 });
      else timer = setTimeout(start, 200);
    });

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) window.cancelIdleCallback(idleHandle);
      if (timer !== undefined) clearTimeout(timer);
      dispose();
    };
  }, []);

  return (
    <div className={`studio-sculpture ${ready ? "is-ready" : ""} ${hasWebgl ? "has-webgl" : ""}`}>
      <div className="studio-sculpture-orbit" aria-hidden="true" />
      <div className="studio-sculpture-fallback" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div
        className="studio-sculpture-canvas"
        ref={hostRef}
        role="img"
        aria-label="A floating spatial obsidian and terracotta crystal core with gyroscopic quantum rings and glowing nucleus"
      />
      <div className="studio-sculpture-shadow" aria-hidden="true" />
      <button
        className="studio-sculpture-control"
        type="button"
        aria-label={paused ? "Play sculpture animation" : "Pause sculpture animation"}
        aria-pressed={paused}
        onClick={() => {
          pausedRef.current = !paused;
          setPaused(!paused);
        }}
      >
        {paused ? <PlayIcon size={15} /> : <PauseIcon size={15} />}
      </button>
    </div>
  );
}
