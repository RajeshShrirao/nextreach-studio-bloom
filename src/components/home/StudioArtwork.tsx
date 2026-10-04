"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";

export default function StudioArtwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let dispose = () => {};

    // A continuous copper knot expresses the meeting of design and engineering.
    // Three.js is loaded only in the interactive island, after the page is visible.
    async function buildSculpture() {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (cancelled || !host) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 8.6);
      const room = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(room, .04, .1, 100, { size: 128 });
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();

      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const geometry = new THREE.TorusKnotGeometry(1.35, .36, 200, 32, 2, 3);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xc76b50, metalness: .86, roughness: .24,
        clearcoat: .45, clearcoatRoughness: .22,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(.35, -.35, -.3);
      sculpture.add(mesh);

      const key = new THREE.DirectionalLight(0xffddc2, 3);
      key.position.set(-4, 4, 5);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 3);
      rim.position.set(4, 1, -3);
      scene.add(rim);
      const fill = new THREE.DirectionalLight(0xe2b8a6, 1.5);
      fill.position.set(0, -3, 3);
      scene.add(fill);

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
        const rect = host.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width - .5;
        pointer.y = (event.clientY - rect.top) / rect.height - .5;
      };
      const resetPointer = () => { pointer.x = 0; pointer.y = 0; };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; });
      visibilityObserver.observe(host);
      host.addEventListener("pointermove", onPointer);
      host.addEventListener("pointerleave", resetPointer);
      resize();
      renderer.render(scene, camera);
      setReady(true);
      renderer.setAnimationLoop(time => {
        if (time - lastRender < 1000 / 30 || !visible || document.hidden || reduce.matches || pausedRef.current) {
          last = time;
          return;
        }
        lastRender = time;
        const delta = last ? Math.min((time - last) / 1000, .05) : 0;
        last = time;
        if (!reduce.matches && !pausedRef.current) {
          elapsed += delta;
          mesh.rotation.y = -.35 + elapsed * .15;
          mesh.rotation.z = -.3 + Math.sin(elapsed * .2) * .12;
          sculpture.position.y = Math.sin(elapsed * .6) * .09;
          sculpture.rotation.x += (pointer.y * .3 - sculpture.rotation.x) * .035;
          sculpture.rotation.y += (pointer.x * .4 - sculpture.rotation.y) * .035;
        }
        renderer.render(scene, camera);
      });
      const onContextLost = (event: Event) => { event.preventDefault(); setReady(false); };
      const onContextRestored = () => { setReady(true); resize(); };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
      dispose = () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect(); visibilityObserver.disconnect();
        host.removeEventListener("pointermove", onPointer);
        host.removeEventListener("pointerleave", resetPointer);
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
        geometry.dispose(); material.dispose(); environment.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const start = () => { if (!cancelled) buildSculpture().catch(() => { /* The CSS sculpture remains visible if WebGL is unavailable. */ }); };
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

  return <div className={`studio-sculpture ${ready ? "is-ready" : ""}`}>
    <div className="studio-sculpture-orbit" aria-hidden="true" />
    <div className="studio-sculpture-fallback" aria-hidden="true"><span /><span /><span /></div>
    <div className="studio-sculpture-canvas" ref={hostRef} role="img" aria-label="An endless copper knot, slowly turning: creative design and engineering intertwined" />
    <div className="studio-sculpture-shadow" aria-hidden="true" />
    <button className="studio-sculpture-control" type="button" aria-label={paused ? "Play sculpture animation" : "Pause sculpture animation"} aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>{paused ? <PlayIcon size={15} /> : <PauseIcon size={15} />}</button>
  </div>;
}
