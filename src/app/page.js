"use client"

import { useCallback, useEffect, useState } from "react"

export default function Home() {
  const [isPortada, setIsPortada] = useState(true)

  const onScroll = useCallback((event) => {
    const { scrollY } = window
    console.log("yOffset", window.innerHeight, "scrollY", scrollY)
    setIsPortada(window.innerHeight > scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [onScroll])

  return (
    <div className="w-full bg-white">
      <main className="absolute top-0 left-0 bg-gradient-to-r from-[#333] via-black to-black h-screen w-full">
        {/* <img
          className="absolute top-0 right-0 w-[450px] h-screen"
          src="/Mesa de trabajo 1.png"
        /> */}
        <div className="h-screen w-[300px] absolute top-0 right-0 overflow-hidden">
          <div className="bg-gradient-to-r from-black to-transparent z-[10] h-screen w-[300px] absolute top-0 right-0"></div>
          <video
            muted
            autoPlay
            loop
            preload="auto"
            className="transform -rotate-90 min-h-[100vh] min-w-[100vh] object-right-top absolute z-[9] brightness-200"
          >
            <source
              src="/cortado-comprimido.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </main>
      <div
        className={`${
          !isPortada
            ? "fixed inset-x-0 bg-white top-0 h-16 z-[8] border-b"
            : "hidden"
        }`}
      ></div>
      <div className="text-white uppercase font-light h-full relative pl-[10%]">
        <h1 className="pt-[15%]">
          <span className="font-extrabold">web</span> developer
        </h1>
        <h2 className="table-cell text-6xl">portfolio</h2>
        <div className="table-cell w-[10%]"></div>
        <ul className="table-cell align-middle sticky top-0 mix-blend-exclusion py-4 z-[9]">
          <li className="inline ps-[3rem]">formación</li>
          <li className="inline ps-[3rem]">tecnología</li>
          <li className="inline ps-[3rem]">proyectos</li>
          <li className="inline ps-[3rem]">experiencia</li>
        </ul>
        <h1 className="mt-[20%] sticky top-0 py-4 mix-blend-exclusion z-[9]">
          <span className="font-extrabold">álvaro</span> riaño
        </h1>
        <h2 className="pt-[30%] text-6xl text-neutral-800">proyectos</h2>
        <h1 className="text-neutral-800 mt-[2rem]">HéctoRomero Art</h1>
        <div className="flex justify-start items-start gap-4 mt-[1rem]">
          <div className="flex flex-col justify-start items-start gap-4 w-[50%]">
            <img
              className="object-scale-down border"
              src="/Captura de pantalla 2024-03-17 192804.jpg"
            />

            <img
              className="mt-object-scale-down border"
              src="/Captura de pantalla 2024-03-17 222939.png"
            />
          </div>
          <div className="h-[100%] overflow-hidden w-[50%] border">
            <video
              muted
              autoPlay
              loop
              preload="auto"
            >
              <source
                src="/WhatsApp Video 2024-03-06 at 13.31.05 (online-video-cutter.com).mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
