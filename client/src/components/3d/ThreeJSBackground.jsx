import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '../../store/themeStore';

const ThreeJSBackground = () => {
    const mountRef = useRef(null);
    const { mode } = useThemeStore();
    const [meshMaterial, setMeshMaterial] = useState(null);
    const [pointLightObj, setPointLightObj] = useState(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: mode === 'dark' ? 0x339FFF : 0x0087FF,
            roughness: 0.5,
            metalness: 0.8,
            wireframe: true,
            emissive: mode === 'dark' ? 0x0087FF : 0x000000,
            emissiveIntensity: mode === 'dark' ? 0.3 : 0,
        });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        setMeshMaterial(material);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, mode === 'dark' ? 0.3 : 0.1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(mode === 'dark' ? 0x00D9FF : 0xffffff, mode === 'dark' ? 1.5 : 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
        setPointLightObj(pointLight);

        camera.position.z = 5;
        
        let mouseX = 0;
        let mouseY = 0;
        
        const onMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;
            
            camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [mode]);

    // Update colors when theme mode changes
    useEffect(() => {
        if (meshMaterial && pointLightObj) {
            meshMaterial.color.setHex(mode === 'dark' ? 0x339FFF : 0x0087FF);
            meshMaterial.emissive.setHex(mode === 'dark' ? 0x0087FF : 0x000000);
            meshMaterial.emissiveIntensity = mode === 'dark' ? 0.3 : 0;
            pointLightObj.color.setHex(mode === 'dark' ? 0x00D9FF : 0xffffff);
            pointLightObj.intensity = mode === 'dark' ? 1.5 : 1;
        }
    }, [mode, meshMaterial, pointLightObj]);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default ThreeJSBackground;
