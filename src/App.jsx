/* eslint-disable react/no-unknown-property */
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import avatar from "./assets/Image/MinhTuan.jpeg";
import karik from './assets/Image/karik.jpeg';
import music from "./assets/Video/music.mp3";

const Model = () => {
  const { scene } = useGLTF("/skybox_fairy_forest_day/scene.gltf");
  scene.rotation.x = 0.5;
  scene.position.y = -0.3;
  return <primitive object={scene} scale={1} />;
};


function App() {

  const [action, setAction] = useState({ like: false, save: false, play: false });
  const [isCloseDynamic, setIsCloseDynamic] = useState(true);
  const [isCloseProfileApp, setIsCloseProfileApp] = useState(true);
  const [isClose3DApp, setIsClose3DApp] = useState(true);
  const [positionApp, setPositionApp] = useState({ x: 0, y: 0 });
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

  const handleCloseApp = () => {
    setIsCloseProfileApp(true);
    setIsCloseDynamic(true);
    setIsClose3DApp(true);
  };

  const handleOpenProfileApp = (e) => {
    const target = e.target;
    const offset = target.offsetHeight / 2;
    setPositionApp({ x: target.offsetLeft + offset, y: target.offsetTop + offset });
    setIsCloseDynamic(false);
    setIsCloseProfileApp(false);
  };

  const handleOpen3D = (e) => {
    const target = e.target;
    const offset = target.offsetHeight / 2;
    setPositionApp({ x: target.offsetLeft + offset, y: target.offsetTop + offset });
    setIsCloseDynamic(false);
    setIsClose3DApp(false);
  };


  return (
    <div id="main" className='relative'>
      <section className='phone flex gap-1 my-20 mx-1'>

        <div className="image-singer self-stretch flex-1 relative overflow-hidden rounded-[50px]" style={{ zIndex: isCloseDynamic ? 0 : 50 }}>
          <img src={karik} alt="singer" className='h-full object-cover absolute inset-0 w-full translate-x-full transition-all duration-700' style={{ transform: !isCloseDynamic && "translateX(0)" }} />
        </div>

        <div className="iphone" onClick={() => setIsCloseDynamic(true)}>
          <div className="iphone-14 relative z-30">
            <div className='relative z-30 grid grid-cols-4 place-items-center mx-6 mt-4 top-4 text-lg'>
              <div className="operator-name">Mobifone</div>
              <div className="dynamic-island col-span-2 group" onClick={(e) => { e.stopPropagation(); setIsCloseDynamic(false); }}>
                <div className={`music-control relative ${!isCloseDynamic ? "active" : "hide"}`}>
                  <div className='flex justify-between items-center'>
                    <div className='avatar flex items-center gap-4'>
                      <img src={avatar} alt="avatar" className='w-16 h-16 rounded-[20%]' />
                      <div className='info'>
                        <h3 className='font-bold text-base'>KARIK x ONLY C</h3>
                        <p className='text-xs'>Có chơi có chịu</p>
                      </div>
                    </div>

                    <div id="bars">
                      {new Array(30).fill(1).map((item, idx) => <div key={`${item} ${idx}`} className="bar bg-white transition-all duration-200" style={{ height: Math.floor(Math.random() * 25 + 3), width: 1 }}></div>)}
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

            <div id='apps' className="mx-6 my-20 transition-all duration-300 grid grid-cols-4" style={{ opacity: isCloseProfileApp ? 1 : 0 }}>
              <div className="profile w-20 h-20 flex flex-col items-center gap-1 cursor-pointer text-white rounded-xl border-[1px] border-white" onClick={handleOpenProfileApp}>
                <img src={avatar} alt="profile" className='w-full h-full object-cover rounded-xl' />
                <p>Profile</p>
              </div>

              <div className="model w-20 h-20 flex flex-col items-center gap-1 cursor-pointer text-white rounded-xl border-[1px] border-white" onClick={handleOpen3D}>
                <img src={avatar} alt="model" className='w-full h-full object-cover rounded-xl' />
                <p>3D</p>
              </div>
            </div>

            {/* PROFILE */}
            <div
              className="main-content absolute inset-0 my-20 grid gap-4 transition-all duration-500"
              style={{ transformOrigin: `${positionApp.x}px ${positionApp.y}px`, transform: `scale(${isCloseProfileApp ? 0 : 1})` }}>
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

            <div className="boder-iphone" hidden={isClose3DApp}></div>

            {/* 3D MODEL */}
            <div
              className='fixed inset-0 transition-all duration-1000'
              style={{ width: isClose3DApp ? "0%" : "100%" }}>
              <Canvas >
                <Suspense fallback={null}>
                  <ambientLight intensity={1} />
                  <Model />
                </Suspense>
                <OrbitControls />
              </Canvas>
            </div>

            <div className="line cursor-pointer" draggable onDrag={handleCloseApp}></div>
          </div>
        </div>

        <div className="image-singer self-stretch flex-1 relative overflow-hidden rounded-[50px]" style={{ zIndex: isCloseDynamic ? 0 : 50 }}>
          <img src="https://2sao.vietnamnetjsc.vn/images/2022/03/04/10/54/o2.jpeg" alt="singer" className='h-full object-cover absolute inset-0 w-full -translate-x-full transition-all duration-700' style={{ transform: !isCloseDynamic && "translateX(0)" }} />
        </div>
      </section>
    </div>
  );
}

export default App;
