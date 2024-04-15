"use client"

import { useCallback, useEffect, useState } from "react"

export default function Home() {
  const [filter, setFilter] = useState("blur-dark")

  const onScroll = useCallback(
    (event) => {
      const { scrollY, innerHeight } = window

      if (scrollY >= innerHeight && filter !== "blur-bw") {
        setFilter("blur-bw")
      } else if (scrollY < innerHeight && filter !== "blur-dark") {
        setFilter("blur-dark")
      }
    },
    [filter]
  )

  useEffect(() => {
    class Blob {
      constructor(el) {
        this.el = el
        const boundingRect = this.el.getBoundingClientRect()
        this.size = boundingRect.width
        this.initialX = randomNumber(0, window.innerWidth - this.size)
        this.initialY = randomNumber(0, window.innerHeight - this.size)
        this.el.style.top = `${this.initialY}px`
        this.el.style.left = `${this.initialX}px`
        this.vx =
          randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
        this.vy =
          randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
        this.x = this.initialX
        this.y = this.initialY
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x >= window.innerWidth - this.size) {
          this.x = window.innerWidth - this.size
          this.vx *= -1
        }
        if (this.y >= window.innerHeight - this.size) {
          this.y = window.innerHeight - this.size
          this.vy *= -1
        }
        if (this.x <= 0) {
          this.x = 0
          this.vx *= -1
        }
        if (this.y <= 0) {
          this.y = 0
          this.vy *= -1
        }
      }

      move() {
        this.el.style.transform = `translate(${this.x - this.initialX}px, ${
          this.y - this.initialY
        }px)`
      }
    }
    function initBlobs() {
      const blobEls = document.querySelectorAll(".bouncing-blob")
      const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

      function update() {
        requestAnimationFrame(update)
        blobs.forEach((blob) => {
          blob.update()
          blob.move()
        })
      }

      requestAnimationFrame(update)
    }
    var menu = document.getElementsByClassName("open")[0]
    function toggleMenu() {
      menu.classList.toggle("oppenned")
    }

    menu.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", onScroll)
    initBlobs()
    class TextScramble {
      constructor(el) {
        this.el = el
        this.chars = "!<>-_\\/[]{}—=+*^?#________"
        this.update = this.update.bind(this)
      }
      setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => (this.resolve = resolve))
        this.queue = []
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ""
          const to = newText[i] || ""
          const start = Math.floor(Math.random() * 40)
          const end = start + Math.floor(Math.random() * 40)
          this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
      }
      update() {
        let output = ""
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i]
          if (this.frame >= end) {
            complete++
            output += to
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar()
              this.queue[i].char = char
            }
            output += `<span class="dud">${char}</span>`
          } else {
            output += from
          }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
          this.resolve()
        } else {
          this.frameRequest = requestAnimationFrame(this.update)
          this.frame++
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
      }
    }

    // ——————————————————————————————————————————————————
    // Example
    // ——————————————————————————————————————————————————

    const phrases = [
      "Hi,",
      "my name is Varo,",
      "designer and front-end developer",
      "let's do something great together!",
    ]

    const el = document.querySelector(".text")
    const fx = new TextScramble(el)

    let counter = 0
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000)
      })
      counter = (counter + 1) % phrases.length
    }

    next()
    return () => {
      window.removeEventListener("scroll", onScroll)
      menu.removeEventListener("click", toggleMenu)
    }
  }, [onScroll])

  const MIN_SPEED = 1
  const MAX_SPEED = 1.5

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min
  }

  return (
    <>
      {/* <nav
        className={`text-white uppercase flex w-[80%] items-start justify-between fixed top-0 left-[10%] py-4 z-[9]
            `}
      > */}

      {/* </nav> */}
      <div className="open font-extralight uppercase text-sm">
        <span className="cls" />
        <span>
          <ul className="sub-menu">
            <li>
              <a
                href="#about"
                title="about"
              >
                education
              </a>
            </li>
            <li>
              <a
                href="#skills"
                title="skills"
              >
                skills
              </a>
            </li>
            <li>
              <a
                href="#jobs"
                title="jobs"
              >
                works
              </a>
            </li>
            <li>
              <a
                href="#experience"
                title="experience"
              >
                experience
              </a>
            </li>
            <li>
              <a
                href="#contact"
                title="contact"
              >
                contact
              </a>
            </li>
          </ul>
        </span>
        <span className="cls" />
      </div>

      {/* <div
        className={`${
          !isPortada
            ? "fixed inset-x-0 bg-white top-0 h-16 z-[8] border-b"
            : "hidden"
        }`}
      ></div> */}
      <section className="w-full h-[100vh] text-sm relative">
        {/* <main className="absolute top-0 left-0 bg-gradient-to-r from-[#333] via-black to-black h-screen w-full">

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
      </main> */}
        <div className="bouncing-blobs-container bg-[#002c3e]">
          <div className={`bouncing-blobs-glass ${filter}`} />
          <div className="bouncing-blobs">
            <div className="bouncing-blob bouncing-blob--red" />
            <div className="bouncing-blob bouncing-blob--green" />
            <div className="bouncing-blob bouncing-blob--blue" />
          </div>
        </div>
        <div className="text-white  font-extralight absolute landscape:w-[calc(47*80vh/21)] w-[calc(21*80vh/39)] h-[80vh] top-[10%] landscape:left-[5vw] left-2 grid landscape:grid-cols-[8fr_1fr_1fr_3fr_21fr_8fr_5fr] landscape:grid-rows-[5fr_1fr_2fr_5fr_3fr_5fr] grid-cols-[5fr_1fr_2fr_5fr_1fr_2fr_5fr] grid-rows-[8fr_2fr_3fr_21fr_2fr_3fr] overflow-hidden">
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 landscape:col-start-1 landscape:col-end-2 landscape:row-start-1 landscape:row-end-4 rounded-full bg-white bg-opacity-15 flex items-center justify-end border border-neutral-700 shadow-md">
            <h1 className="landscape:mr-10 mr-4 tracking-wider landscape:mt-[2rem] mt-[0.5rem] uppercase lg:text-lg text-sm">
              <span className="font-medium">álvaro</span> riaño
            </h1>
          </div>
          <div className="col-start-4 col-end-8 row-start-1 row-end-4 landscape:col-start-1 landscape:col-end-5 landscape:row-start-4 landscape:row-end-8 rounded-full bg-white bg-opacity-[2%] flex items-start justify-center">
            <div className="landscape:pt-[6rem] portrait:pt-[8rem] uppercase lg:text-lg text-sm portrait:flex portrait:flex-col portrait:items-end portrait:justify-center">
              <h1>
                <span className="font-medium ">web</span> developer
              </h1>
              <span className="lg:text-5xl text-3xl uppercase block  color">
                portfolio
              </span>
            </div>
          </div>
          <div className="col-start-3 col-end-4 row-start-2 row-end-3 landscape:col-start-2 landscape:col-end-3 landscape:row-start-2 landscape:row-end-3 rounded-full border border-white border-opacity-20"></div>
          <div className="col-start-2 col-end-4 row-start-3 row-end-4 rounded-full bg-white bg-opacity-50"></div>
          <div className="portrait:hidden col-start-4 col-end-5 row-start-2 row-end-4 rounded-full border border-white border-opacity-20"></div>
          <div className="col-start-1 col-end-8 row-start-4 row-end-5 landscape:col-start-5 landscape:col-end-6 landscape:row-start-1 landscape:row-end-8 rounded-full border border-white border-opacity-20 relative">
            <div className="text lg:text-2xl text-lg font-extralight absolute top-[59%] left-[10%]" />
          </div>
          <div className="col-start-6 col-end-7 row-start-5 row-end-6 landscape:col-start-6 landscape:col-end-7 landscape:row-start-5 landscape:row-end-7 rounded-full border border-white border-opacity-20"></div>
          <div className="line col-start-7 col-end-8 row-start-5 row-end-7 landscape:col-start-7 landscape:col-end-8 landscape:row-start-6 landscape:row-end-7 rounded-full bg-white bg-opacity-[2%] rotate-90 flex items-center justify-center">
            scroll
          </div>
        </div>
      </section>
      <section className="w-full h-[100vh] text-sm">
        <div className="text-white  font-extralight absolute landscape:w-[calc(47*80vh/21)] w-[calc(21*80vh/39)] h-[80vh] top-[110vh] landscape:left-[5vw] left-2 grid landscape:grid-cols-[8fr_1fr_1fr_3fr_21fr_8fr_2fr_3fr] landscape:grid-rows-[5fr_1fr_2fr_5fr_2fr_1fr_5fr] grid-cols-[5fr_1fr_2fr_5fr_1fr_2fr_5fr] grid-rows-[8fr_2fr_3fr_21fr_2fr_3fr]">
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 landscape:col-start-1 landscape:col-end-2 landscape:row-start-1 landscape:row-end-4 rounded-full bg-white bg-opacity-15 flex items-center justify-end border border-neutral-700 shadow-md">
            <h1 className="landscape:mr-10 mr-4 tracking-wider landscape:mt-[2rem] mt-[0.5rem] uppercase lg:text-lg text-sm">
              <span className="font-medium">álvaro</span> riaño
            </h1>
          </div>
          <div className="landscape:ps-[6rem] landscape:pt-[6rem] ps-[4rem] pt-[2rem] col-start-4 col-end-8 row-start-1 row-end-4 landscape:col-start-1 landscape:col-end-5 landscape:row-start-4 landscape:row-end-8 rounded-full bg-white bg-opacity-[2%] flex flex-col items-start justify-start">
            <h1 className="lg:text-5xl text-3xl uppercase block text-neutral-400">
              works
            </h1>
            <h2 className="lg:text-2xl uppercase block my-2">
              HECTOROMERO ART
            </h2>
            <p className="landscape:mr-20">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </p>
          </div>
          <div className="col-start-3 col-end-4 row-start-2 row-end-3 landscape:col-start-2 landscape:col-end-3 landscape:row-start-2 landscape:row-end-3 rounded-full border border-white border-opacity-20"></div>
          <div className="col-start-2 col-end-4 row-start-3 row-end-4 rounded-full bg-white bg-opacity-50"></div>
          <div className="portrait:hidden col-start-4 col-end-5 row-start-2 row-end-4 rounded-full border border-white border-opacity-20"></div>
          <div className="container relative col-start-1 col-end-8 row-start-4 row-end-5 landscape:col-start-5 landscape:col-end-6 landscape:row-start-1 landscape:row-end-8 rounded-full flex items-center justify-center">
            {/* <div className="slide landscape:bg-[url('/desktop-computer-laptop-tablet-and-smartphone-psd.png')] portrait:bg-[url('/desktop-computer-laptop-tablet-and-smartphone-12-04-movil.png')] landscape:bg-[2rem] portrait:bg-[1rem] bg-contain bg-no-repeat absolute top-0 left-0 w-full h-full"></div> */}
            {/* <div className="slide landscape:bg-[url('/desktop-computer-laptop-tablet-and-smartphone-psd.png')] portrait:bg-[url('/desktop-computer-laptop-tablet-and-smartphone-12-04-movil.png')] landscape:bg-[2rem] portrait:bg-[1rem] bg-contain bg-no-repeat absolute top-0 left-0 w-full h-full"></div> */}
            {/* <img
              className=" ms-[6rem] object-cover w-full"
              src={`/desktop-computer-laptop-tablet-and-smartphone-psd.png`}
              alt="hectoromero"
            /> */}

            <video
              id="video"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="absolute z-10 w-[70%] top-[50%] left-0 h-auto border-neutral-700 border-[6px] rounded-lg transition ease-in duration-700 origin-bottom-left"
              src="/ScreenRecorderProject7 (online-video-cutter.com) (1).mp4"
            />
            <div
              className="transition ease-out duration-700 absolute z-[1] w-full h-full rounded-full landscape:bg-white landscape:bg-opacity-[5%] border border-white border-opacity-20 backdrop-blur"
              id="video-bg"
            >
              {" "}
            </div>
            <video
              id="video2"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="absolute z-[1] w-[90%] top-[10%] right-0 h-auto border-neutral-700 border-[6px] rounded-lg hover:scale-110 hover:z-20 transition ease-in duration-700"
              src="/ScreenRecorderProject5_1.mp4"
            />

            <video
              id="video3"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="absolute z-10 w-[20%] top-[55%] right-[15%] h-auto border-neutral-700 border-[6px] rounded-lg hover:scale-150 hover:z-20 transition ease-in duration-700 origin-bottom-right"
              src="/ScreenRecorderProject9.mp4"
            />
          </div>
          <div className="portrait:hidden col-start-6 col-end-7 row-start-5 row-end-8 rounded-full border border-white border-opacity-20 flex items-center justify-center gap-2 text-lg">
            <span className="border-b">
              Visit site{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </div>
          <div className="col-start-6 col-end-7 row-start-5 row-end-6 landscape:col-start-7 landscape:col-end-8 landscape:row-start-5 landscape:row-end-6 rounded-full border border-white border-opacity-20 flex items-center justify-center uppercase bg-white bg-opacity-20 transition-all hover:scale-110 duration-500 origin-top-right">
            <span className="portrait:hidden">prev</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 landscape:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div className="col-start-5 col-end-7 row-start-6 row-end-7 landscape:col-start-8 landscape:col-end-9 landscape:row-start-5 landscape:row-end-7 rounded-full border border-white border-opacity-20 flex items-center justify-center uppercase bg-white bg-opacity-10 transition-all hover:scale-[103%] duration-500 origin-top-right landscape:ps-6">
            <span className="portrait:hidden">next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 landscape:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
          <div className="line col-start-7 col-end-8 row-start-5 row-end-7 landscape:col-start-7 landscape:col-end-9 landscape:row-start-7 landscape:row-end-8 rounded-full bg-white bg-opacity-[2%] rotate-90 flex items-center justify-center">
            scroll
          </div>
        </div>
      </section>
    </>
  )
}
