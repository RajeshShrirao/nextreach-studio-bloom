import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ReachHero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Group for mouse rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Subtle 3D Wireframe Icosahedron (architectural coordinate system)
    const orbGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x333336,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    group.add(orbMesh);

    // 2. Gyroscopic Orbital Rings in Signature Terracotta (#C76B50)
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.015, 8, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xc76b50, // Signature Terracotta
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(4.8, 0.012, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xfaf8f5, // Warm Cream
      transparent: true,
      opacity: 0.15,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 3. Constellation points (representing Reach nodes in Terracotta)
    const pointsCount = 42;
    const posArray = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.8 + Math.random() * 2.5;
      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xdf896b, // Terracotta Soft
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // Pointer tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.8;
      targetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        group.rotation.y += 0.0018;
        group.rotation.x += 0.0008;

        group.rotation.y += mouseX * 0.04;
        group.rotation.x += -mouseY * 0.04;

        ring1.rotation.z += 0.002;
        ring2.rotation.x -= 0.0015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Strict cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);

      orbGeo.dispose();
      orbMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
