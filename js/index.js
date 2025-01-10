gsap.registerPlugin(gsap.ScrollTrigger);


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

// article section: Each icon has its own animation
const contactBox = gsap.timeline({
  scrollTrigger: {
      trigger: "#article",
      start: "top 50%",
      end: "bottom 50%",
      toggleActions: "restart none none none"
}});

// grow-story section: talking a story
const article = gsap.timeline();
article
  .to(
    "#hash1",
    { backgroundColor: '#dbc5a4', color: '#ffffff'},
    'hash0'
   )
  .from(
    ".textArea",
    { yPercent: 10, opacity: 0 },
    'hash0'
  )
  .to(
    "#hash1",
    { backgroundColor: '#ffffff', color: '#878176' },
    'hash1'
  )
  .to(
    "#hash2",
    { backgroundColor: '#dbc5a4', color: '#ffffff' },
    'hash1'
  )
  .to(
    ".textContentArticle",
    { xPercent: -100 }
  )
  .to(
    "#hash2",
    { backgroundColor: '#ffffff', color: '#878176' },
    'hash2'
  )
  .to(
    "#hash3",
    { backgroundColor: '#dbc5a4', color: '#ffffff' },
    'hash2'
   )
  .to(
    ".textContentArticle",
    { xPercent: -200 },
    'hash3'
  )
  .to(
    "#hash3",
    { backgroundColor: '#ffffff',color: '#878176' },
    'hash3'
  )

ScrollTrigger.create({
    animation: article,
    trigger: ".first-article",
    start: "top top",
    end: "+=5000",
    toggleActions: "restart none none none",
    scrub: 1,
    pin: true,
    anticipatePin: 1
});


contactBox
  .from(
    "#briefcase",
    { opacity:1, rotate: '360deg', duration: 0.5 }
  )
  .fromTo(
    "#chalkboard",
    { backgroundColor: '#dbc5a4' },
    { backgroundColor: 'transparent', duration: 0.5 }
  )
  .from(
    "#copyLink",
    { opacity:1, rotateY: '360deg', duration: 0.5 }
  )

gsap.utils.toArray(".slideText").forEach(text => {
  gsap.timeline({
    defaults: {ease: "none"},
    scrollTrigger: {
      scroller: text.closest(".horizSlider"),
      horizontal: true,
      trigger: text.closest(".slide"),
      start: "left right",
      end: "left left",
      scrub: true
    }
  })
  .fromTo(text, {x: 250}, {x: -250}, 0)
  .from(text.nextElementSibling, {scale: 0.8}, 0)
});

//pic frames start
const canvas = document.getElementById("pic-canvas");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 14;
const currentFrame = index => (
`images/ani/${(index + 1).toString().padStart(2, '0')}.png`
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
        trigger: ".transition__point",
        pin: true,
        start: "0% 0%",
        end: "+=" + frameCount,
        scrub: 2,
        anticipatePin: 1,
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
context.clearRect(0, 0, canvas.width, canvas.height);
context.drawImage(images[pic.frame], 0, 0); 
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
