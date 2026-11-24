import { gsap } from '../../node_modules/gsap/index.js';
import ScrollTrigger from "../../node_modules/gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);


// header cover: text animation
const quote = document.getElementById('quote');
quote.innerHTML = `<span class="char">${quote.innerHTML.split("").join('</span><span class="char">')}</span>`;
gsap.to(".char", {duration: 0.5, opacity: 1, yPercent: 50, stagger: 0.1,});

// header cover: website enter animation
const headerCover = gsap.timeline();
headerCover.to(".loadingValue", 2, { width: "100%" })
    .to(".loadingBar", 0.1, { opacity: 0 })
    .to(".quote", 0.1, { opacity: 0 })
    .to(".headerCover", 0.5, { height: 0 })

// banner: banner animation
const bannerAn = gsap.timeline();
bannerAn.from(
    ".titleText",
    { yPercent: 100, duration: 1, delay: 2 }
  ).to(
    ".titleText",
    { color: '#dbc5a4', duration: 1}
  ).fromTo(
    ".bannerPic",
    { backgroundPosition: '50% 20%'},
    { backgroundPosition: '50% 60%', duration: 10 },
    'step2'
  ).staggerFrom(
    ".infoList",
    0.5,
    { opacity: 0, yPercent: 50 },
    0.5,
    'step2'
  )
  .fromTo(
    ".bannerPic",
    { filter: 'grayscale(100%)'},
    {filter: 'grayscale(0%)', duration: 5},
    'step2'
  )
  .fromTo(
    ".decorationText",
    { xPercent: 80, color: '#fff' },
    { xPercent: -50,color: '#dbc5a4', duration: 30 }, 'step2'
   )

// Keep the Experience section fixed while the experience copy follows scroll.
const article = gsap.timeline();
article
  .to(
    "#hash1",
    { backgroundColor: '#dbc5a4', color: '#ffffff', duration: 0.2 },
    0
   )
  .from(
    ".textArea",
    { y: 32, autoAlpha: 0.75, duration: 0.4, ease: "power2.out" },
    0
  )
  .fromTo(
    "#briefcase",
    { rotation: -140, y: 20, transformOrigin: "50% 50%" },
    { rotation: 0, y: 0, duration: 0.55, ease: "back.out(1.6)" },
    0.05
  )
  .fromTo(
    "#chalkboard",
    { rotationY: 180, y: 20, transformOrigin: "50% 50%" },
    { rotationY: 0, y: 0, duration: 0.55, ease: "back.out(1.6)" },
    0.9
  )
  .fromTo(
    "#copyLink",
    { rotation: 140, y: 20, transformOrigin: "50% 50%" },
    { rotation: 0, y: 0, duration: 0.55, ease: "back.out(1.6)" },
    1.9
  )
  .to(
    "#hash1",
    { backgroundColor: '#ffffff', color: '#878176', duration: 0.2 },
    0.8
  )
  .to(
    "#hash2",
    { backgroundColor: '#dbc5a4', color: '#ffffff', duration: 0.2 },
    0.8
  )
  .to(
    ".textContentArticle",
    { xPercent: -100, duration: 0.6 },
    1
  )
  .to(
    "#hash2",
    { backgroundColor: '#ffffff', color: '#878176', duration: 0.2 },
    1.8
  )
  .to(
    "#hash3",
    { backgroundColor: '#dbc5a4', color: '#ffffff', duration: 0.2 },
    1.8
   )
  .to(
    ".textContentArticle",
    { xPercent: -200, duration: 0.6 },
    2
  )

ScrollTrigger.create({
    animation: article,
    trigger: ".first-article",
    start: "top top",
    end: "+=2400",
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
});

const slider = document.querySelector(".horizSlider");
const sliderTrack = slider?.querySelector(".sliderTrack");

if (slider && sliderTrack) {
  gsap.to(sliderTrack, {
    x: () => -Math.max(0, sliderTrack.scrollWidth - slider.clientWidth),
    ease: "none",
    scrollTrigger: {
      trigger: slider,
      start: "top top",
      end: () => `+=${Math.max(1, sliderTrack.scrollWidth - slider.clientWidth)}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });
}

//pic frames start
const canvas = document.getElementById("pic-canvas");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 14;
const currentFrame = index => (
`./images/ani/${(index + 1).toString().padStart(2, '0')}.png`
);
const images = []
const pic = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

let picStart = gsap.timeline({
    scrollTrigger: {
        trigger: ".pic-container",
        pin: true,
        start: "top top",
        end: () => `+=${window.innerHeight * 2}`,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20},
    },
});

picStart.to(pic, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
//   scrollTrigger: {
//     scrub: 0.5
//   },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});
  
images[0].onload = render;

function render() {
  const frame = images[pic.frame];
  if (!context || !frame?.complete || !frame.naturalWidth) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

// progressBar
const progress = gsap.timeline();
progress.to(".progressValue", { width: '100%' })

ScrollTrigger.create({
    animation: progress,
    trigger: ".banner",
    endTrigger:".footer",
    start: "top top",
    end:"top bottom",
    scrub: 1,
});
