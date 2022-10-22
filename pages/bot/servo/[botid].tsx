import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Canvas } from "@react-three/fiber";

import Links from "../../../components/Links";
import Status from "../../../components/Status";
import WSIcon from "../../../components/WSIcon";
import { useEffect, useState } from "react";
import Slider from "../../../components/Slider";

const Servo: NextPage = () => {
  let [angle, setAngle] = useState(90);
  const router = useRouter();

  const { botid } = router.query;

  // cube angle modifiers
  const angleInc = () => setAngle((prev) => prev + 5);
  const angleDec = () => setAngle((prev) => prev - 5);

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") angleDec();
        if (e.key === "ArrowRight") angleInc();
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Servo UI</title>
      </Head>
      <div className="h-full flex justify-between items-center flex-col bg-shikamaru-green-100 text-shikamaru-green-900">
        <WSIcon />
        <Status />
        <div className="h-[300px] w-full flex flex-col items-center justify-center">
          <Canvas
            camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 3] }}
          >
            <ambientLight intensity={0.1} />
            <directionalLight color="#31601e" position={[0, 0, 10]} />
            <mesh rotation={[0, angle, 0]} scale={1.5}>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
          <Slider value={angle} setValue={setAngle} />
        </div>
        <Links />
      </div>
    </>
  );
};

export default Servo;
