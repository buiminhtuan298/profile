/* eslint-disable react/no-unknown-property */
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import imageBookmark from './assets/Icon/bookmark.png';
import imageComment from './assets/Icon/comment.png';
import imageHeart from './assets/Icon/heart.png';
import imageHeartRed from './assets/Icon/heart (1).png';
import imageSend from './assets/Icon/send.png';
import imageBG from './assets/Image//bg-profile.jpeg';
import image from './assets/Image/MinhTuan.jpeg';
import video from './assets/Video/videoHeader.mp4';

function App() {


  const Model = () => {
    const { scene } = useGLTF("/godzilla.glb");
    scene.position.y = -2;
    scene.rotation.y = -0.5;

    return <primitive object={scene} scale={2000} />;
  };
  const Bee = () => {
    const { scene } = useGLTF("/iron-man.glb");
    scene.rotation.x = 0.5;
    scene.position.y = -0.3;
    return <primitive object={scene} scale={3} />;
  };

  const [showImage2, setShowImage2] = useState(false);
  const handleClick = () => {
    setShowImage2(!showImage2);
  };

  return (
    <>
      <div className='relative'>
        <video loop autoPlay muted src={video} type="video/mp4" className='w-full h-[500px] object-cover relative z-0' />
        <div className='absolute z-10 inset-0'>
          <Canvas >
            <Suspense fallback={null}>
              <ambientLight intensity={10} />
              <directionalLight intensity={10} />
              <hemisphereLight intensity={10} />
              <Bee />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>

      <div className='relative'>
        <div className='relative z-10 grid grid-cols-2 place-content-center p-60 gap-6'>
          <div className="rounded-[20px] bg-radient backdrop-blur">

            <img className='rounded-[40px] p-6 mx-auto' src={image} alt="MinhTuan" />
            <div className='flex h-20 mx-6 justify-between p-6'>
              <div className='flex gap-6'>
                <div className='relative cursor-pointer'>
                  <img onClick={handleClick} className={`cursor-pointer h-full ${showImage2 && "opacity-0"}`} src={imageHeart} alt="heart" />
                  <img onClick={handleClick} className={`transition-all absolute inset-0 opacity-0 ${showImage2 && "opacity-100"}`} src={imageHeartRed} alt="Image 2" />
                </div>
                <img className='cursor-pointer' src={imageComment} alt="comment" />
                <img className='cursor-pointer' src={imageSend} alt="send" />
              </div>
              <img className='right-auto' src={imageBookmark} alt="bookmark" />
            </div>
          </div>
          <Canvas >
            <Suspense fallback={null}>
              <ambientLight />
              <Model />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
        <img className='w-full h-full absolute inset-0' src={imageBG} alt="" />
      </div>
    </>
  );
}

export default App;
