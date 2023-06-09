import { gsap } from "gsap";
export const useListAnimations = () => {
  const beforeEnter = (el: any) => {
    gsap.set(el, {
      opacity: 0,
      y: "-100%",
    });
  };

  const enter = (el: Element, done: GSAPCallback) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      onComplete: done,
    });
  };

  const leave = (el: Element, done: GSAPCallback) => {
    gsap.to(el, {
      translateY: "100%",
      duration: 0.5,
      opacity: 0,

      onComplete: done,
    });
  };

  return {
    beforeEnter,
    enter,
    leave,
  };
};
