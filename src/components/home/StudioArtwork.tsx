"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import type { Material, Vector3, Curve } from "three";

type SignalPoint = {
  t: number;
  x: number;
  y: number;
  z: number;
};

const trajectoryPoints: SignalPoint[] = [
  { t: 0, x: -3.45, y: -2.05, z: 0.15 },
  { t: 0.16, x: -2.62, y: -1.56, z: 0.02 },
  { t: 0.32, x: -1.72, y: -0.82, z: -0.08 },
  { t: 0.49, x: -0.7, y: -0.44, z: 0.08 },
  { t: 0.64, x: 0.1, y: 0.42, z: -0.12 },
  { t: 0.78, x: 1.18, y: 0.76, z: 0.04 },
  { t: 0.9, x: 1.95, y: 1.52, z: -0.06 },
  { t: 1, x: 2.72, y: 2.05, z: 0.12 },
];

function makeDeterministicNoise(index: number, channel: number) {
  return ((Math.sin((index + 1) * (channel + 4) * 12.9898) * 43758.5453) % 1);
}

/** Soft radial glow texture shared across lighting sprites */
function makeGlowTexture(THREE: typeof import("three")) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,210,186,0.5)");
  gradient.addColorStop(0.7, "rgba(217,119,86,0.18)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const pipMessages = [
  { title: "Pip ✦ studio buddy", text: "Namaste! Welcome to NextReach Studio. Click me or drag to look around!" },
  { title: "Pip ✦ craftsmanship", text: "Websites, AI products & apps built to move your business forward." },
  { title: "Pip ✦ studio origin", text: "Proudly engineered in Pune — partnering with founders across the globe." },
  { title: "Pip ✦ what's next", text: "Fixed-scope websites from ₹5,000 to custom AI platforms. You own 100% of the code." },
  { title: "Pip ✦ high five!", text: "Wheee! ✦ Ready to build something exceptional? Let's talk!" },
];

export default function StudioArtwork() {
  const hostRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleVisibleRef = useRef(false);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasWebgl, setHasWebgl] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let dispose = () => {};
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const buildScene = async () => {
      const THREE = await import("three");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !host) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        });
      } catch {
        setReady(true);
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const isCompact = window.matchMedia("(max-width: 767px)");
      const section = host.closest<HTMLElement>(".studio-hero");
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b0d0c, 0.038);
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0.1, 0.02, 8.6);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact.matches ? 1.35 : 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.className = "studio-signal-webgl";
      host.appendChild(renderer.domElement);
      setHasWebgl(true);

      const glowTexture = makeGlowTexture(THREE);

      const path = new THREE.CatmullRomCurve3(
        trajectoryPoints.map(({ x, y, z }) => new THREE.Vector3(x, y, z)),
        false,
        "catmullrom",
        0.45,
      );
      const world = new THREE.Group();
      scene.add(world);

      // =========================================================================
      // 1. TRAJECTORY: Luminous Fiber Spline with GLSL Travelling Energy Pulse
      // =========================================================================
      const trajectoryGroup = new THREE.Group();
      world.add(trajectoryGroup);

      const trajectoryGeometry = new THREE.TubeGeometry(path, 180, 0.028, 6, false);
      const trajectoryGlowGeometry = new THREE.TubeGeometry(path, 180, 0.11, 6, false);
      const trajectoryUniforms = {
        uProgress: { value: 0.42 },
        uBend: { value: 0 },
        uDeepColor: { value: new THREE.Color(0x8a3a28) },
        uBaseColor: { value: new THREE.Color(0xd97756) },
        uPulseColor: { value: new THREE.Color(0xffd1a6) },
      };

      const trajectoryVertexShader = `
        uniform float uBend;
        varying float vAlong;

        void main() {
          vAlong = uv.y;
          vec3 transformed = position;
          transformed.x += sin(vAlong * 3.14159265) * uBend;
          transformed.z += cos(vAlong * 3.14159265) * uBend * 0.24;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `;

      const trajectoryFragmentShader = `
        uniform float uProgress;
        uniform vec3 uDeepColor;
        uniform vec3 uBaseColor;
        uniform vec3 uPulseColor;
        varying float vAlong;

        void main() {
          float pulse = exp(-pow((vAlong - uProgress) / 0.045, 2.0));
          float trailPos = fract(uProgress - 0.18);
          float trail = exp(-pow((vAlong - trailPos) / 0.07, 2.0)) * step(vAlong, uProgress);
          vec3 base = mix(uDeepColor, uBaseColor, smoothstep(0.0, 0.55, vAlong));
          base = mix(base, uPulseColor, smoothstep(0.72, 1.0, vAlong));
          vec3 color = base + uPulseColor * (pulse + trail * 0.45);
          float alpha = 0.22 + vAlong * 0.14 + pulse * 0.62 + trail * 0.22;
          gl_FragColor = vec4(color, alpha);
        }
      `;

      const trajectoryMaterial = new THREE.ShaderMaterial({
        uniforms: trajectoryUniforms,
        vertexShader: trajectoryVertexShader,
        fragmentShader: trajectoryFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const trajectoryGlowMaterial = new THREE.ShaderMaterial({
        uniforms: trajectoryUniforms,
        vertexShader: trajectoryVertexShader,
        fragmentShader: `
          uniform float uProgress;
          uniform vec3 uPulseColor;
          varying float vAlong;

          void main() {
            float pulse = exp(-pow((vAlong - uProgress) / 0.1, 2.0));
            gl_FragColor = vec4(uPulseColor, 0.025 + pulse * 0.16);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const trajectoryGlow = new THREE.Mesh(trajectoryGlowGeometry, trajectoryGlowMaterial);
      const trajectoryLine = new THREE.Mesh(trajectoryGeometry, trajectoryMaterial);
      trajectoryGroup.add(trajectoryGlow, trajectoryLine);

      // Moving energetic quantum pulse
      const pulseGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const pulseMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1 },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uIntensity;
          varying vec3 vNormal;

          void main() {
            float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
            float flicker = 0.86 + sin(uTime * 4.0) * 0.14;
            vec3 color = mix(vec3(1.0, 0.42, 0.24), vec3(1.0, 0.92, 0.72), rim);
            gl_FragColor = vec4(color, (0.75 + rim * 0.35) * flicker * uIntensity);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      trajectoryGroup.add(pulse);

      // =========================================================================
      // 2. ORIGIN WORLD: Studio Base (Pune Coordinates)
      // =========================================================================
      const originPoint = path.getPointAt(0.015);
      const planetGroup = new THREE.Group();
      planetGroup.position.copy(originPoint);

      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 28, 28),
        new THREE.MeshStandardMaterial({
          color: 0x7a3222,
          emissive: 0xc44a2e,
          emissiveIntensity: 0.55,
          roughness: 0.6,
          metalness: 0.1,
        }),
      );
      const planetRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.48, 0.016, 8, 64),
        new THREE.MeshBasicMaterial({
          color: 0xc86c52,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      planetRing.rotation.x = Math.PI / 2 - 0.38;
      planetGroup.add(planet, planetRing);

      if (glowTexture) {
        const planetGlow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xd45438,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        planetGlow.scale.set(1.8, 1.8, 1);
        planetGroup.add(planetGlow);
      }
      world.add(planetGroup);

      const moonlet = new THREE.Mesh(
        new THREE.SphereGeometry(0.052, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xe8dfd2, roughness: 0.5, metalness: 0.2 }),
      );
      world.add(moonlet);

      // =========================================================================
      // 3. DESTINATION MONUMENT: Real 3D NextReach Monogram Sculpture
      // =========================================================================
      // Generated from the exact vectors of public/brand/logo-mark.svg:
      // An arrow pointing forward/up with integrated "N" and "R" architecture.
      const destination = new THREE.Group();
      destination.position.copy(path.getPointAt(0.992));

      // Concentric gyroscope portal rings
      const destinationRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.64, 0.014, 8, 64),
        new THREE.MeshBasicMaterial({
          color: 0xf4c4a0,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      destinationRing.rotation.x = Math.PI / 2;

      const destinationRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.012, 8, 56),
        new THREE.MeshBasicMaterial({
          color: 0xe58d72,
          transparent: true,
          opacity: 0.38,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      destinationRing2.rotation.y = Math.PI / 2 - 0.35;

      const destinationRing3 = new THREE.Mesh(
        new THREE.TorusGeometry(0.78, 0.008, 8, 64),
        new THREE.MeshBasicMaterial({
          color: 0xffd5b3,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );

      // Genuine 3D Sculpted Brand Sculpture
      const brandMonument = new THREE.Group();
      const brandMat = new THREE.MeshPhysicalMaterial({
        color: 0xf6ad94,
        emissive: 0x9e3f28,
        emissiveIntensity: 0.55,
        roughness: 0.16,
        metalness: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const tubeRadius = 0.018;
      const addBrandTube = (curve: Curve<Vector3>) => {
        const geo = new THREE.TubeGeometry(curve, 28, tubeRadius, 8, false);
        const mesh = new THREE.Mesh(geo, brandMat);
        brandMonument.add(mesh);
      };

      // Exact normalized brand strokes from logo-mark.svg
      // 1. Arrow Head
      addBrandTube(new THREE.LineCurve3(new THREE.Vector3(-0.23, 0.28, 0), new THREE.Vector3(0, 0.5, 0)));
      addBrandTube(new THREE.LineCurve3(new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0.23, 0.28, 0)));
      // 2. Central Arrow Spine
      addBrandTube(new THREE.LineCurve3(new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, -0.5, 0)));
      // 3. Left 'N' Stem
      addBrandTube(new THREE.LineCurve3(new THREE.Vector3(-0.375, -0.5, 0), new THREE.Vector3(-0.375, 0.26, 0)));
      // 4. 'N' Diagonal to Base
      addBrandTube(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.375, 0.26, 0),
          new THREE.Vector3(-0.32, 0.28, 0.01),
          new THREE.Vector3(0, -0.5, 0),
        ]),
      );
      // 5. 'R' Loop
      addBrandTube(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.16, 0),
          new THREE.Vector3(0.32, 0.12, 0.01),
          new THREE.Vector3(0.375, -0.06, 0),
          new THREE.Vector3(0.32, -0.18, 0.01),
          new THREE.Vector3(0, -0.22, 0),
        ]),
      );
      // 6. 'R' Leg
      addBrandTube(new THREE.LineCurve3(new THREE.Vector3(0, -0.22, 0), new THREE.Vector3(0.375, -0.5, 0)));

      // Glowing core aura behind the brand mark
      if (glowTexture) {
        const monumentGlow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xdf896b,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        monumentGlow.scale.set(1.4, 1.4, 1);
        destination.add(monumentGlow);
      }

      // Vertical beacon of light ("Reach What's Next")
      const beaconGeo = new THREE.CylinderGeometry(0.015, 0.08, 3.2, 16, 1, true);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0xffd1a6,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 1.6;

      destination.add(destinationRing, destinationRing2, destinationRing3, brandMonument, beacon);
      destination.scale.setScalar(0.74);
      world.add(destination);

      // =========================================================================
      // 4. PIP THE STUDIO BUDDY: Premium 3D Mascot with Welcoming Craft
      // =========================================================================
      const pip = new THREE.Group();
      const pipInner = new THREE.Group();
      pip.add(pipInner);

      const vinylCream = new THREE.MeshPhysicalMaterial({
        color: 0xfffaf2,
        roughness: 0.22,
        metalness: 0.02,
        clearcoat: 0.95,
        clearcoatRoughness: 0.18,
      });
      const pipDark = new THREE.MeshStandardMaterial({ color: 0x1e1816, roughness: 0.2 });
      const pipBlush = new THREE.MeshStandardMaterial({
        color: 0xf49a82,
        emissive: 0xc44a2e,
        emissiveIntensity: 0.58,
        roughness: 0.55,
      });
      const vestMat = new THREE.MeshPhysicalMaterial({
        color: 0xd97756,
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.6,
      });
      const badgeMat = new THREE.MeshStandardMaterial({
        color: 0xffd1a6,
        emissive: 0xdf896b,
        emissiveIntensity: 1.8,
        roughness: 0.2,
      });

      // --- Body & Studio Vest ---
      const bodyG = new THREE.Group();
      bodyG.position.y = -0.19;

      const tummy = new THREE.Mesh(new THREE.SphereGeometry(0.2, 30, 30), vinylCream);
      tummy.scale.set(1, 0.96, 0.92);

      const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.185, 0.18, 24), vestMat);
      vest.position.y = 0.01;

      // Miniature 3D NextReach arrow crest embossed on the vest
      const crestArrow = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 4), badgeMat);
      crestArrow.position.set(0, 0.02, 0.2);
      crestArrow.rotation.x = 0.1;

      bodyG.add(tummy, vest, crestArrow);

      // --- Little Boots ---
      const bootGeo = new THREE.SphereGeometry(0.068, 16, 16);
      const bootMat = new THREE.MeshPhysicalMaterial({
        color: 0x2b2220,
        roughness: 0.35,
        clearcoat: 0.5,
      });
      const bootL = new THREE.Mesh(bootGeo, bootMat);
      bootL.position.set(-0.1, -0.18, 0.06);
      bootL.scale.set(1, 0.6, 1.35);
      const bootR = new THREE.Mesh(bootGeo, bootMat);
      bootR.position.set(0.1, -0.18, 0.06);
      bootR.scale.set(1, 0.6, 1.35);
      bodyG.add(bootL, bootR);

      // --- Articulated Arms for Welcoming Wave ---
      const armGeo = new THREE.CapsuleGeometry(0.036, 0.1, 4, 12);
      const armLPivot = new THREE.Group();
      armLPivot.position.set(-0.2, 0.07, 0.02);
      const armL = new THREE.Mesh(armGeo, vinylCream);
      armL.position.y = -0.075;
      armLPivot.add(armL);
      armLPivot.rotation.z = -0.35;

      const armRPivot = new THREE.Group();
      armRPivot.position.set(0.2, 0.07, 0.02);
      const armR = new THREE.Mesh(armGeo, vinylCream);
      armR.position.y = -0.075;
      armRPivot.add(armR);
      armRPivot.rotation.z = 0.35;

      bodyG.add(armLPivot, armRPivot);
      pipInner.add(bodyG);

      // --- Expressive Big Head ---
      const headG = new THREE.Group();
      headG.position.y = 0.17;

      const skull = new THREE.Mesh(new THREE.SphereGeometry(0.26, 34, 34), vinylCream);
      skull.scale.set(1, 0.95, 0.92);
      headG.add(skull);

      // Big Kawaii Anime Eyes with Dual Catchlights
      const eyeWhiteGeo = new THREE.SphereGeometry(0.068, 20, 20);
      const eyeWhiteMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.12,
        clearcoat: 1.0,
      });
      const pupilGeo = new THREE.SphereGeometry(0.034, 16, 16);
      const glintGeo1 = new THREE.SphereGeometry(0.012, 10, 10);
      const glintGeo2 = new THREE.SphereGeometry(0.007, 8, 8);
      const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      const eyeL = new THREE.Group();
      eyeL.position.set(-0.105, 0.04, 0.2);
      const eyeR = new THREE.Group();
      eyeR.position.set(0.105, 0.04, 0.2);

      const pupilL = new THREE.Mesh(pupilGeo, pipDark);
      pupilL.position.z = 0.042;
      const pupilR = new THREE.Mesh(pupilGeo, pipDark);
      pupilR.position.z = 0.042;

      // Primary top-left sparkle
      const glintL1 = new THREE.Mesh(glintGeo1, glintMat);
      glintL1.position.set(-0.011, 0.012, 0.026);
      const glintR1 = new THREE.Mesh(glintGeo1, glintMat);
      glintR1.position.set(-0.011, 0.012, 0.026);
      pupilL.add(glintL1);
      pupilR.add(glintR1);

      // Secondary bottom-right cute star glint
      const glintL2 = new THREE.Mesh(glintGeo2, glintMat);
      glintL2.position.set(0.011, -0.01, 0.026);
      const glintR2 = new THREE.Mesh(glintGeo2, glintMat);
      glintR2.position.set(0.011, -0.01, 0.026);
      pupilL.add(glintL2);
      pupilR.add(glintR2);

      const eyeWhiteL = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
      eyeWhiteL.scale.set(1, 1.15, 0.55);
      const eyeWhiteR = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
      eyeWhiteR.scale.set(1, 1.15, 0.55);

      eyeL.add(eyeWhiteL, pupilL);
      eyeR.add(eyeWhiteR, pupilR);
      headG.add(eyeL, eyeR);

      // Sweet Gentle Smile
      const smile = new THREE.Mesh(
        new THREE.TorusGeometry(0.054, 0.0135, 12, 30, Math.PI),
        pipDark,
      );
      smile.position.set(0, -0.048, 0.21);
      smile.rotation.z = Math.PI;
      smile.rotation.x = -0.16;
      headG.add(smile);

      // Blushing Rosy Cheeks
      const cheekGeo = new THREE.SphereGeometry(0.038, 14, 14);
      const cheekL = new THREE.Mesh(cheekGeo, pipBlush);
      cheekL.position.set(-0.165, -0.028, 0.16);
      cheekL.scale.set(1, 0.7, 0.55);
      const cheekR = new THREE.Mesh(cheekGeo, pipBlush);
      cheekR.position.set(0.165, -0.028, 0.16);
      cheekR.scale.set(1, 0.7, 0.55);
      headG.add(cheekL, cheekR);

      // Studio Headset Ear-Cups
      const earCupMat = new THREE.MeshPhysicalMaterial({ color: 0x3d322f, roughness: 0.35, clearcoat: 0.5 });
      const earCupGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16);
      const earCupL = new THREE.Mesh(earCupGeo, earCupMat);
      earCupL.position.set(-0.26, 0.06, 0);
      earCupL.rotation.z = Math.PI / 2;
      const earCupR = new THREE.Mesh(earCupGeo, earCupMat);
      earCupR.position.set(0.26, 0.06, 0);
      earCupR.rotation.z = Math.PI / 2;
      headG.add(earCupL, earCupR);

      // Springy Antenna with Reactive Orb Light
      const antennaG = new THREE.Group();
      antennaG.position.set(0.08, 0.22, 0);
      const antennaStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.011, 0.015, 0.16, 8),
        vinylCream,
      );
      antennaStem.position.y = 0.08;
      const antennaTipMat = new THREE.MeshStandardMaterial({
        color: 0xffd1a6,
        emissive: 0xdf896b,
        emissiveIntensity: 2.4,
      });
      const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), antennaTipMat);
      antennaTip.position.y = 0.18;
      antennaG.add(antennaStem, antennaTip);
      antennaG.rotation.z = 0.12;
      headG.add(antennaG);

      pipInner.add(headG);

      // Soft back halo
      if (glowTexture) {
        const halo = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xe58d72,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        halo.scale.set(1.6, 1.6, 1);
        halo.position.set(0, 0.02, -0.42);
        pip.add(halo);
      }

      // Seat Pip comfortably along the trajectory
      const pipSeat = path.getPointAt(0.44);
      pip.position.copy(pipSeat).add(new THREE.Vector3(0.12, 0.52, 0.4));
      pip.userData.baseY = pip.position.y;
      const pipBaseScale = isCompact.matches ? 0.82 : 1.05;
      pip.scale.setScalar(0.001);

      // Pip's dedicated warm point light
      const pipLight = new THREE.PointLight(0xffdfcb, 2.8, 5.5);
      pipLight.position.set(0.8, 1.3, 1.6);
      pip.add(pipLight);
      world.add(pip);

      // =========================================================================
      // 5. CLICK SPARKLES: Particle Burst on Mascot Click
      // =========================================================================
      const sparkleCount = 28;
      const sparkleGeo = new THREE.BufferGeometry();
      const sparklePositions = new Float32Array(sparkleCount * 3);
      const sparkleVelocities = new Float32Array(sparkleCount * 3);
      sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));

      const sparkleMat = new THREE.PointsMaterial({
        color: 0xffd1a6,
        size: 0.07,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
      world.add(sparklePoints);
      let sparklesActive = false;
      let sparkleTimer = 0;

      const triggerSparkles = () => {
        sparklesActive = true;
        sparkleTimer = 1.0;
        sparkleMat.opacity = 0.9;
        const pPos = pip.position;
        for (let i = 0; i < sparkleCount; i++) {
          sparklePositions[i * 3] = pPos.x;
          sparklePositions[i * 3 + 1] = pPos.y + 0.2;
          sparklePositions[i * 3 + 2] = pPos.z;

          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 0.9;
          sparkleVelocities[i * 3] = Math.cos(angle) * speed;
          sparkleVelocities[i * 3 + 1] = Math.sin(angle) * speed + 0.3;
          sparkleVelocities[i * 3 + 2] = (Math.random() - 0.5) * speed;
        }
        sparkleGeo.attributes.position.needsUpdate = true;
      };

      // =========================================================================
      // 6. ATMOSPHERE & LIGHTING
      // =========================================================================
      const particleCount = isCompact.matches ? 96 : 160;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        const radius = 2.2 + Math.abs(makeDeterministicNoise(index, 4)) * 3.6;
        const angle = Math.abs(makeDeterministicNoise(index, 5)) * Math.PI * 2;
        const height = (makeDeterministicNoise(index, 6) - 0.5) * 5.8;
        particlePositions[index * 3] = Math.cos(angle) * radius;
        particlePositions[index * 3 + 1] = height;
        particlePositions[index * 3 + 2] = (makeDeterministicNoise(index, 7) - 0.5) * 4.8 - 0.8;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xd39b82,
        size: isCompact.matches ? 0.035 : 0.045,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      world.add(particles);

      scene.add(new THREE.AmbientLight(0x5e3f35, 0.46));
      scene.add(new THREE.HemisphereLight(0xf7f1e9, 0x2a1a12, 0.7));
      const keyLight = new THREE.DirectionalLight(0xffe0c4, 1.8);
      keyLight.position.set(3, 4, 5);
      scene.add(keyLight);

      const destinationLight = new THREE.PointLight(0xf49b70, 2.0, 9);
      destinationLight.position.set(2, 2, 3);
      scene.add(destinationLight);

      const sourceLight = new THREE.PointLight(0xb54b36, 1.0, 7);
      sourceLight.position.set(-3, -2, 2);
      scene.add(sourceLight);

      // =========================================================================
      // 7. INTERACTION CONTROLLERS & GSAP CHOREOGRAPHY
      // =========================================================================
      const pointer = { x: 0, y: 0, yaw: 0 };
      const targetPointer = { x: 0, y: 0, yaw: 0 };
      const raycaster = new THREE.Raycaster();
      const raycastPointer = new THREE.Vector2();
      const pipScreen = new THREE.Vector3();
      const raycastTargets = [destinationRing, brandMonument];

      let dragging = false;
      let dragStartX = 0;
      let dragStartYaw = 0;
      let visible = true;
      let lastTime = 0;
      let elapsed = 0;

      const layoutWorld = (width: number) => {
        world.position.x = width >= 1100 ? 1.15 : width >= 768 ? 0.55 : 0;
      };

      const paintStaticFrame = () => {
        trajectoryUniforms.uProgress.value = 0.62;
        pulseMaterial.uniforms.uTime.value = 1.4;
        pulse.position.copy(path.getPointAt(0.62));
        pulse.scale.setScalar(1.05);
        destination.scale.setScalar(0.86);
        pip.scale.setScalar(pipBaseScale);
        armRPivot.rotation.z = 2.2;
        headG.rotation.z = -0.12;
        camera.position.set(0.1, 0.02, 8.6);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };

      const resize = () => {
        if (!host) return;
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 520 ? 1.25 : 1.75));
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        layoutWorld(width);
        if (reduceMotion.matches) paintStaticFrame();
        else renderer.render(scene, camera);
      };

      const setPointer = (event: PointerEvent) => {
        if (reduceMotion.matches) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const localX = (event.clientX - rect.left) / rect.width - 0.5;
        const localY = (event.clientY - rect.top) / rect.height - 0.5;
        targetPointer.x = THREE.MathUtils.clamp(localX * 2, -1, 1);
        targetPointer.y = THREE.MathUtils.clamp(localY * 2, -1, 1);
        raycastPointer.set(targetPointer.x, -targetPointer.y);
        raycaster.setFromCamera(raycastPointer, camera);

        destination.userData.hovered = raycaster.intersectObjects(raycastTargets, true).length > 0;
        const pipHit = raycaster.intersectObject(pip, true).length > 0;
        pip.userData.hovered = pipHit;
        renderer.domElement.style.cursor = pipHit ? "pointer" : dragging ? "grabbing" : "grab";

        if (dragging) {
          targetPointer.yaw = dragStartYaw + ((event.clientX - dragStartX) / rect.width) * 0.72;
        } else if (event.pointerType === "mouse") {
          targetPointer.yaw = localX * 0.18;
        }
      };

      let downX = 0;
      let downY = 0;
      const onPointerDown = (event: PointerEvent) => {
        if (reduceMotion.matches) return;
        dragging = true;
        dragStartX = event.clientX;
        dragStartYaw = targetPointer.yaw;
        downX = event.clientX;
        downY = event.clientY;
        renderer.domElement.setPointerCapture(event.pointerId);
        setPointer(event);
      };
      const onPointerMove = (event: PointerEvent) => setPointer(event);
      const onPointerUp = (event: PointerEvent) => {
        dragging = false;
        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
          renderer.domElement.releasePointerCapture(event.pointerId);
        }
      };
      const resetPointer = () => {
        if (!dragging) {
          targetPointer.x = 0;
          targetPointer.y = 0;
          targetPointer.yaw = 0;
        }
      };

      // Mascot Life Cycle & Wave Animations
      const waveState = { boost: 0 };
      let nextBlink = 1.8;
      let bubbleTimer: ReturnType<typeof setTimeout> | undefined;
      let welcomeTimer: ReturnType<typeof setTimeout> | undefined;

      const greetPip = (excited = false) => {
        if (reduceMotion.matches || cancelled) return;
        setShowBubble(true);
        bubbleVisibleRef.current = true;
        setMsgIndex((prev) => (excited ? (prev + 1) % pipMessages.length : prev));

        if (bubbleTimer) clearTimeout(bubbleTimer);
        bubbleTimer = setTimeout(() => {
          if (!cancelled) {
            setShowBubble(false);
            bubbleVisibleRef.current = false;
          }
        }, 5000);

        const hopHeight = excited ? 0.48 : 0.28;
        if (excited) triggerSparkles();

        // Squash, jump, spin & land with elastic bounce
        const tl = gsap.timeline({ overwrite: "auto" });
        tl.to(pipInner.scale, { x: 1.2, y: 0.74, z: 1.15, duration: 0.12, ease: "power2.in" })
          .to(pip.position, { y: pip.userData.baseY + hopHeight, duration: 0.36, ease: "power2.out" }, "<")
          .to(pipInner.scale, { x: 0.9, y: 1.18, z: 0.92, duration: 0.36, ease: "power2.out" }, "<")
          .to(pip.rotation, { y: excited ? pip.rotation.y + Math.PI * 2 : pip.rotation.y, duration: 0.6, ease: "power2.out" }, "<")
          .to(pip.position, { y: pip.userData.baseY, duration: 0.44, ease: "bounce.out" }, ">-0.02")
          .to(pipInner.scale, { x: 1, y: 1, z: 1, duration: 0.58, ease: "elastic.out(1,0.45)" }, "<");

        gsap.fromTo(
          waveState,
          { boost: excited ? 1.8 : 1.2 },
          { boost: 0, duration: excited ? 2.0 : 1.4, ease: "power2.out", overwrite: "auto" },
        );
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
          if (visible) renderer.render(scene, camera);
        },
        { threshold: 0.01 },
      );
      visibilityObserver.observe(host);

      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: true });
      renderer.domElement.addEventListener("pointerup", onPointerUp);
      renderer.domElement.addEventListener("pointercancel", onPointerUp);
      renderer.domElement.addEventListener("pointerleave", resetPointer);

      const onTap = (event: PointerEvent) => {
        if (reduceMotion.matches) return;
        if (Math.hypot(event.clientX - downX, event.clientY - downY) > 8) return;
        const rect = renderer.domElement.getBoundingClientRect();
        raycastPointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        );
        raycaster.setFromCamera(raycastPointer, camera);
        if (raycaster.intersectObject(pip, true).length > 0) greetPip(true);
      };
      renderer.domElement.addEventListener("click", onTap);

      const scrollDriver = { value: 0 };
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!section) return undefined;
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        scrollTimeline.to(scrollDriver, { value: 1, duration: 1, ease: "none" });
        return () => scrollTimeline.kill();
      });

      resize();
      setReady(true);

      if (reduceMotion.matches) {
        paintStaticFrame();
      } else {
        // Pop-in welcome animation for Pip
        gsap.to(pip.scale, {
          x: pipBaseScale,
          y: pipBaseScale,
          z: pipBaseScale,
          duration: 0.75,
          ease: "back.out(1.6)",
          delay: 0.5,
          overwrite: "auto",
        });
        welcomeTimer = setTimeout(() => {
          if (!cancelled) greetPip(false);
        }, 1300);

        renderer.setAnimationLoop((time) => {
          if (pausedRef.current || !visible || document.hidden) return;
          const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
          lastTime = time;
          elapsed += delta;

          // Sparkle particles update
          if (sparklesActive) {
            sparkleTimer -= delta;
            sparkleMat.opacity = Math.max(0, sparkleTimer);
            for (let i = 0; i < sparkleCount; i++) {
              sparklePositions[i * 3] += sparkleVelocities[i * 3] * delta;
              sparklePositions[i * 3 + 1] += sparkleVelocities[i * 3 + 1] * delta;
              sparklePositions[i * 3 + 2] += sparkleVelocities[i * 3 + 2] * delta;
            }
            sparkleGeo.attributes.position.needsUpdate = true;
            if (sparkleTimer <= 0) sparklesActive = false;
          }

          pointer.x = THREE.MathUtils.lerp(pointer.x, targetPointer.x, 0.055);
          pointer.y = THREE.MathUtils.lerp(pointer.y, targetPointer.y, 0.055);
          pointer.yaw = THREE.MathUtils.lerp(pointer.yaw, targetPointer.yaw, 0.045);
          world.rotation.x = THREE.MathUtils.lerp(world.rotation.x, -pointer.y * 0.1, 0.045);
          world.rotation.y = THREE.MathUtils.lerp(world.rotation.y, pointer.yaw, 0.045);
          trajectoryUniforms.uBend.value = THREE.MathUtils.lerp(
            trajectoryUniforms.uBend.value,
            pointer.x * 0.22,
            0.055,
          );

          const pulseProgress = (elapsed * 0.055 + scrollDriver.value * 0.62) % 1;
          trajectoryUniforms.uProgress.value = pulseProgress;
          pulseMaterial.uniforms.uTime.value = elapsed;
          pulse.position.copy(path.getPointAt(pulseProgress));
          pulse.scale.setScalar(1 + Math.sin(elapsed * 4.2) * 0.1 + scrollDriver.value * 0.12);

          particles.rotation.y = elapsed * 0.012 + pointer.x * 0.08;
          particles.rotation.x = Math.sin(elapsed * 0.17) * 0.035 + pointer.y * 0.045;

          destination.scale.setScalar(0.74 + scrollDriver.value * 0.14 + (destination.userData.hovered ? 0.08 : 0));
          destinationLight.intensity = destination.userData.hovered ? 2.5 : 2.0;

          // Gyroscope orbital counter-rotations
          destinationRing.rotation.z = elapsed * 0.12;
          destinationRing2.rotation.z = -elapsed * 0.18;
          destinationRing3.rotation.z = elapsed * 0.06;
          brandMonument.rotation.y = Math.sin(elapsed * 0.8) * 0.22;
          beacon.rotation.y = elapsed * 0.2;

          planetRing.rotation.z = elapsed * 0.12;
          const moonAngle = elapsed * 0.55;
          moonlet.position.set(
            originPoint.x + Math.cos(moonAngle) * 0.62,
            originPoint.y + Math.sin(moonAngle) * 0.3,
            originPoint.z + Math.sin(moonAngle) * 0.5,
          );

          // --- Pip is Alive: Expressive Animation & Eye Tracking ---
          const waveAmp = 0.22 + waveState.boost * 0.55;
          armRPivot.rotation.z = 0.35 + waveState.boost * 1.45 + Math.sin(elapsed * 9.5) * waveAmp * 0.5;
          armLPivot.rotation.z = -0.35 - Math.sin(elapsed * 2.1) * 0.06;

          const headTilt = -0.16 * Math.min(waveState.boost / 1.2, 1);
          headG.rotation.y = THREE.MathUtils.lerp(headG.rotation.y, pointer.x * 0.45, 0.07);
          headG.rotation.x = THREE.MathUtils.lerp(headG.rotation.x, -pointer.y * 0.22, 0.07);
          headG.rotation.z = THREE.MathUtils.lerp(headG.rotation.z, headTilt, 0.08);
          headG.position.y = 0.17 + Math.sin(elapsed * 2.1) * 0.012;

          const breathe = 1 + Math.sin(elapsed * 2.1 + 0.6) * 0.015;
          bodyG.scale.set(2 - breathe, breathe, breathe);

          antennaG.rotation.z = 0.12 + Math.sin(elapsed * 2.6) * 0.07 - pointer.x * 0.12;
          antennaG.rotation.x = Math.sin(elapsed * 1.9) * 0.05 - pointer.y * 0.1;
          antennaTipMat.emissiveIntensity = 2.2 + Math.sin(elapsed * 4.2) * 0.8;

          // Eye pupil tracking
          pupilL.position.x = THREE.MathUtils.lerp(pupilL.position.x, pointer.x * 0.02, 0.12);
          pupilR.position.x = THREE.MathUtils.lerp(pupilR.position.x, pointer.x * 0.02, 0.12);
          pupilL.position.y = THREE.MathUtils.lerp(pupilL.position.y, -pointer.y * 0.016, 0.12);
          pupilR.position.y = THREE.MathUtils.lerp(pupilR.position.y, -pointer.y * 0.016, 0.12);

          // Natural blinking rhythm
          if (elapsed > nextBlink) {
            nextBlink = elapsed + 2.5 + Math.random() * 2.8;
            gsap.to([eyeL.scale, eyeR.scale], {
              y: 0.06,
              duration: 0.06,
              ease: "power2.in",
              yoyo: true,
              repeat: 1,
              overwrite: "auto",
            });
          }

          // Hover puff effect on Pip
          if (elapsed > 1.4) {
            const target = pipBaseScale * (pip.userData.hovered ? 1.1 : 1);
            const s = THREE.MathUtils.lerp(pip.scale.x, target, 0.12);
            pip.scale.setScalar(s);
          }

          camera.position.x = THREE.MathUtils.lerp(
            camera.position.x,
            0.1 + pointer.x * 0.18 + Math.sin(elapsed * 0.3) * 0.04,
            0.035,
          );
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * -0.14, 0.035);
          camera.lookAt(0, 0, 0);

          // Speech bubble floating above Pip's head
          if (bubbleVisibleRef.current && bubbleRef.current && !isCompact.matches) {
            const hostW = host.clientWidth;
            const hostH = host.clientHeight;
            if (hostW > 0 && hostH > 0) {
              pip.getWorldPosition(pipScreen);
              pipScreen.y += 0.88 * pip.scale.x;
              pipScreen.project(camera);
              const bx = (pipScreen.x * 0.5 + 0.5) * hostW;
              const by = (-pipScreen.y * 0.5 + 0.5) * hostH;
              bubbleRef.current.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px) translate(-50%, calc(-100% - 14px))`;
            }
          }

          renderer.render(scene, camera);
        });
      }

      const disposeMaterial = (material: Material | Material[]) => {
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material.dispose();
      };

      dispose = () => {
        renderer.setAnimationLoop(null);
        media.revert();
        gsap.killTweensOf([pip.scale, pip.position, pipInner.scale, waveState, eyeL.scale, eyeR.scale]);
        if (bubbleTimer) clearTimeout(bubbleTimer);
        if (welcomeTimer) clearTimeout(welcomeTimer);
        if (glowTexture) glowTexture.dispose();
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerup", onPointerUp);
        renderer.domElement.removeEventListener("pointercancel", onPointerUp);
        renderer.domElement.removeEventListener("pointerleave", resetPointer);
        renderer.domElement.removeEventListener("click", onTap);

        scene.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
            object.geometry.dispose();
            disposeMaterial(object.material);
          }
          if (object instanceof THREE.Sprite) {
            disposeMaterial(object.material);
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    const start = () => {
      if (!cancelled) buildScene().catch(() => setReady(true));
    };

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(start, { timeout: 900 });
    } else {
      timer = setTimeout(start, 80);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      if (timer !== undefined) clearTimeout(timer);
      dispose();
    };
  }, []);

  const activeMsg = pipMessages[msgIndex] ?? pipMessages[0];

  return (
    <div
      className={`studio-signal-art ${ready ? "is-ready" : ""} ${hasWebgl ? "has-webgl" : ""}`}
      role="img"
      aria-label="Interactive 3D signal universe with Pip the studio buddy and the NextReach brand monument"
    >
      <div className="studio-signal-atmosphere" aria-hidden="true" />

      {/* High-fidelity SVG Fallback for SEO & No-JS */}
      <svg
        className="studio-signal-fallback"
        viewBox="0 0 640 560"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="signal-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <radialGradient id="signal-destination" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd2b4" stopOpacity="0.8" />
            <stop offset="1" stopColor="#d6684e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M72 472 C155 445 151 363 246 343 S353 350 411 272 S471 152 563 76"
          stroke="#d6684e"
          strokeWidth="18"
          opacity="0.18"
          fill="none"
          filter="url(#signal-blur)"
        />
        <path
          d="M72 472 C155 445 151 363 246 343 S353 350 411 272 S471 152 563 76"
          stroke="#e48b6c"
          strokeWidth="2"
          opacity="0.88"
          fill="none"
        />
        <path
          d="M72 472 C155 445 151 363 246 343 S353 350 411 272 S471 152 563 76"
          stroke="#ffd2b4"
          strokeWidth="7"
          opacity="0.6"
          strokeDasharray="1 34"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="72" cy="472" r="7" fill="#d6684e" />
        <circle cx="563" cy="76" r="44" fill="url(#signal-destination)" opacity="0.45" />
        <circle cx="563" cy="76" r="27" fill="none" stroke="#f1b08d" strokeOpacity="0.58" />
        <path
          d="M550 88 V64 M550 64 L576 88 M576 88 V64 M586 76 H610 M602 68 L610 76 L602 84"
          stroke="#ffd9bd"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div ref={hostRef} className="studio-signal-canvas" aria-hidden="true" />

      {/* Coordinate & Narrative Markers */}
      <span className="studio-signal-label studio-signal-label--origin" aria-hidden="true">
        origin / 18.52° N · Pune
      </span>
      <span className="studio-signal-label studio-signal-label--signal" aria-hidden="true">
        craft / websites · ai · apps
      </span>
      <span className="studio-signal-label studio-signal-label--next" aria-hidden="true">
        destination / what&apos;s next
      </span>
      <span className="studio-signal-hint" aria-hidden="true">
        drag to tilt · click pip
      </span>

      {/* Interactive Pip Speech Bubble */}
      <div
        ref={bubbleRef}
        className={`studio-pip-bubble ${showBubble ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <span className="studio-pip-bubble-name">{activeMsg.title}</span>
        <span>{activeMsg.text}</span>
      </div>

      {/* Audio-visual Animation Pause/Play Control */}
      <button
        className="studio-signal-control"
        type="button"
        aria-label={paused ? "Play 3D studio experience" : "Pause 3D studio experience"}
        aria-pressed={paused}
        onClick={() => {
          pausedRef.current = !paused;
          setPaused(!paused);
        }}
      >
        {paused ? <PlayIcon size={15} aria-hidden="true" /> : <PauseIcon size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
