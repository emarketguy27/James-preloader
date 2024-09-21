startLoader();

// Lenis smooth-scroll update gsap for viewport position tracking
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// Site Pre-Loader Scripts
function startLoader() {
  let counterElement = document.querySelector(".count");
  let currentValue = 0;

  // const letters = new SplitType("ml16", { text: "chars" });
  function updateCounter() {
    if (currentValue < 100) {
      let increment = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;

      let delay = Math.floor(Math.random() * 200) + 25;
      setTimeout(updateCounter, delay);
    }
  }
  updateCounter();
}

requestAnimationFrame(raf); // The Counter Animation

gsap.to(".count", {
  opacity: 0,
  delay: 3.5,
  duration: 0.5,
});

let textWrapper = document.querySelector(".ml16");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\s/g,
  "<span class='letter'>$&</span>"
);

// Split Text for animating title
const letters = new SplitType(".ml16", {
  text: "chars",
});

const links = new SplitType(".links", {
  text: "words",
});

// Navigation Links
gsap.to(".links", {
  opacity: 1,
  delay: 5,
});

gsap.fromTo(links.words,
  {
    opacity: 0,
    y: -10,
  },
  {
    y: 0,
    opacity: 1,
    delay: 6,
    stagger: 0.05,
  }
);

// Entry Logo text animate to nav bar
gsap.to(".copy", {
  x: -760,
  y: -430,
  opacity: 0,
  delay: 5,
  duration: 2,
  ease: "power4.out",
});

gsap.to(".logo", {
  opacity: 1,
  duration: 0.4,
  delay: 6,
});

// The Title animation
gsap.to(".ml16", {
  opacity: 1,
});

gsap.from(letters.chars, {
  opacity: 0,
  y: -10,
  ease: "bounce.out",
  duration: 1.5,
  delay: 0.05,
  stagger: 0.05,
  repeat: 1,
});

// Animate Black Background down
gsap.to(".pre-loader", {
  scale: 0.5,
  ease: "power4.inOut",
  duration: 2,
  delay: 3,
});

// Animate Black Box to brand
gsap.to(".loader", {
  height: "0",
  ease: "power4.inOut",
  duration: 1.5,
  delay: 3.75,
});

// Animate brand-color box out to top
gsap.to(".loader-bg", {
  height: "0",
  ease: "power4.inOut",
  duration: 1.5,
  delay: 4.5,
});

// Animate In Main White Background and content
gsap.to(".loader-2", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  ease: "power4.inOut",
  duration: 1.5,
  delay: 3.5,
});

// Fade-out header letters
gsap.to(".pl-header h1", {
  opacity: 1,
  y: 0,
  ease: "power4.inOut",
  duration: 1.5,
  delay: 4.25,
  stagger: 0.05,
});
// Fade-in Header-mirror letters
gsap.fromTo(".pl-header-mirror h1", {
  y: 100, },
  { opacity: 1,
  y: 0,
  ease: "power4.inOut",
  duration: 1.5,
  delay: 4.35,
  stagger: 0.05,
});

// Animate H1 main heading on scroll with Tieline
var H1Tl = gsap.timeline({
  defaults: {
    duration: 3,
    delay: 0.1,
    ease: "sine-out",
  },
  scrollTrigger: {
    trigger: ".main-h1-container",
    start: "top top",
    end: "top -60%",
    scrub: true,
  },
});
H1Tl.to (".pl-header h1", {
  y: -200,
  duration: 3,
});
// Mirror
var H1mTl = gsap.timeline({
  defaults: {
    duration: 3,
    delay: 0.1,
    ease: "sine-out",
  },
  scrollTrigger: {
    trigger: ".main-h1-container",
    start: "top 30",
    end: "top -30%",
    scrub: true,
  },
});
H1mTl.to(".pl-header-mirror h1", {
  y: -100,
  opacity: 0,
  duration: 1,
});


// Footer Bio Animate in
gsap.to(".footer-copy p", {
  opacity: 1,
  y: 0,
  delay: 5.5,
  duration: 3,
  ease: "elastic.out",
  stagger: 0.25,
});

// Animate Footer Images in
gsap.to(".img", {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  ease: "power4.inOut",
  duration: 1.5,
  delay: 4.5,
  stagger: 0.25,
});

  // Scrolling Marquee Texts
const scrollTl = gsap.timeline({
  defaults: {
    ease: "none",
    duration: 8,
  },
  scrollTrigger: {
    trigger: ".scroller-outer",
    scrub: 1,
    start: "top 60%",
    end: "+=300 top",
    pin: true,
  },
});

scrollTl.to("#headline1", {
  xPercent: -100,
});
scrollTl.to("#headline2",
  {
    xPercent: 100,
  },
  "<"
);

// Service sections Animations
var page2Tl = gsap.timeline({
  defaults: {
    duration: 5,
    delay: 8,
    ease: "none",
  },
  scrollTrigger: {
    trigger: ".services",
    start: "top bottom",
    end: "top 20%",
    delay: 8,
    scrub: true,
  }
});

page2Tl.from(".services", {
  scale: 0.9,
  y: -200,
});
const services = gsap.utils.toArray(".service"); // set 'service' sections into an array
// set up intersection observer parameters
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const service = entry.target;
      const imgContainer = service.querySelector(".image");

      ScrollTrigger.create({
        // animate width of image
        trigger: service,
        start: "bottom bottom",
        end: "bottom 1000",
        scrub: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let newWidth = 30 + 70 * progress;
          gsap.to(imgContainer, {
            width: newWidth + "%",
            delay: 0.4,
            duration: 0.4,
            ease: "circ.out",
          });
        },
      });

      ScrollTrigger.create({
        // animate height of image
        trigger: service,
        start: "top bottom",
        end: "bottom 800",
        scrub: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let newHeight = 30 + 70 * progress;
          gsap.to(imgContainer, {
            height: newHeight + "%",
            duration: 0.1,
            ease: "none",
          });
        },
      });

      observer.unobserve(service);
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

services.forEach((service) => {
  observer.observe(service);
});
