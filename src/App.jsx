/* eslint-disable react/no-unknown-property */
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import avatar from "./assets/Image/MinhTuan.jpeg";
import music from "./assets/Video/music.mp3";
import video from './assets/Video/videoHeader.mp4';

const Bee = () => {
  const { scene } = useGLTF("/iron-man.glb");
  scene.rotation.x = 0.5;
  scene.position.y = -0.3;
  return <primitive object={scene} scale={3} />;
};


function App() {

  const [action, setAction] = useState({ like: false, save: false, play: false });
  const [isOpenDynamic, setIsOpenDynamic] = useState(false);
  const [seek, setSeek] = useState(0);
  const [time, setTime] = useState("00:00");
  const [totalTime, setTotalTime] = useState("00:00");
  const musicRef = useRef(null);

  const handleAction = (type) => {
    const data = { ...action, [type]: !action[type] };
    if (type === "play") {
      if (data.play) {
        musicRef.current.play();
      } else {
        musicRef.current.pause();
      }
    }
    setAction(data);
  };

  const handleCurrentTime = () => {
    const currentTime = musicRef.current.currentTime;
    const totalDuration = musicRef.current.duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    setTime(`${formattedMinutes}:${formattedSeconds}`);
    setSeek(Math.floor((currentTime / totalDuration) * 100));
  };

  const handleTotalTime = () => {
    const totalDuration = musicRef.current.duration;
    const minutes = Math.floor(totalDuration / 60);
    const seconds = Math.floor(totalDuration % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    setTotalTime(`${formattedMinutes}:${formattedSeconds}`);
  };

  const handleSeek = (event) => {
    const progress = +event.target.value;
    const duration = musicRef.current.duration;
    const currentTime = (progress / 100) * duration;
    musicRef.current.currentTime = currentTime;
  };


  return (
    <div id="main">
      <section className='banner relative'>
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
      </section>

      <section className='phone flex justify-center my-20'>
        <div className="iphone" onClick={() => setIsOpenDynamic(false)}>
          <div className="iphone-14 relative">
            <div className='grid grid-cols-4 place-items-center mx-6 mt-4 top-4 text-lg'>
              <div className="operator-name">Mobifone</div>
              <div className="dynamic-island col-span-2 group" onClick={(e) => { e.stopPropagation(); setIsOpenDynamic(true); }}>
                <div className={`music-control relative ${isOpenDynamic ? "active" : "hide"}`}>
                  <div className='avatar flex items-center gap-4'>
                    <img src={avatar} alt="avatar" className='w-16 h-16 rounded-[20%]' />
                    <div className='info'>
                      <h3 className='font-bold text-base'>KARIK x ONLY C</h3>
                      <p className='text-xs'>Có chơi có chịu</p>
                    </div>
                  </div>

                  <div className="seek text-xs flex items-center gap-3 py-10">
                    <p>{time}</p>
                    <div className='flex-1 bg-gray-400 h-2 rounded-lg relative cursor-pointer overflow-hidden'>
                      <input type='range' min={0} max={100} value={seek} onInput={handleSeek} className='absolute transition-all inset-0 bg-gray-400 rounded-lg seek-custom' />
                    </div>
                    <p>{totalTime}</p>

                    <audio ref={musicRef} onTimeUpdate={handleCurrentTime} onLoadedMetadata={handleTotalTime} onEnded={() => handleAction("play")}>
                      <source src={music} type="audio/ogg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  <div className='text-white flex items-center justify-center gap-14 text-3xl'>
                    <i className="fa-solid fa-backward"></i>

                    <div className='relative' onClick={() => handleAction("play")}>
                      <i className={`fa-solid fa-play transition-all ${action.play ? "opacity-0" : "opacity-100"}`}></i>
                      <i className={`fa-solid fa-pause absolute transition-all top-[3px] left-0 ${action.play ? "opacity-100" : "opacity-0"}`}></i>
                    </div>

                    <i className="fa-solid fa-forward"></i>
                  </div>
                </div>
              </div>
              <div className="operator-icons">
                <i className="fa-solid fa-signal"></i>
                5G
                <div className="battery">100</div>
              </div>
            </div>

            <div className="main-content my-10 grid gap-4">
              <div className='flex items-center justify-between text-white px-6'>
                <div className='avatar flex items-center gap-4'>
                  <img src={avatar} alt="avatar" className='w-16 h-16 rounded-full' />
                  <div className='info'>
                    <h3 className='font-semibold'>Bùi Minh Tuấn</h3>
                    <p className='text-xs'>Bảo Lộc City</p>
                  </div>
                </div>

                <i className="fa-solid fa-ellipsis"></i>
              </div>

              <img src={avatar} alt="avatar" />

              <div className="action">
                <div className='text-white text-3xl flex justify-between items-center px-6'>
                  <div className='flex items-center gap-5'>
                    <div className={`relative transition-all ${action.like && "text-red-500"}`} onClick={() => handleAction("like")}>
                      <i className="fa-regular fa-heart"></i>
                      <i className={`fa-solid fa-heart opacity-0 top-[3px] left-0 transition-all absolute ${action.like && "opacity-100"}`}></i>
                    </div>

                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                  </div>

                  <div className='relative' onClick={() => handleAction("save")}>
                    <i className="fa-regular fa-bookmark"></i>
                    <i className={`fa-solid fa-bookmark absolute transition-all top-[3px] left-0 opacity-0 ${action.save && "opacity-100"}`}></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="line"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
