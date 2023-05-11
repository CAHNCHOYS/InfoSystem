export const useAuthMouseParallax = () => {
  type ParallaxItem = {
    picture: string;
    width: string;
    height: string;
    reverse?: boolean;
  };

  const parallaxItems = ref<ParallaxItem[]>([
    {
      picture: "decor1.png",
      width: "33%",
      height: "59%",
    },
    {
      picture: "decor2.png",
      width: "12%",
      height: "8%",
      reverse: true,
    },
    {
      picture: "decor3.png",
      width: "10%",
      height: "10%",
    },
    {
      picture: "decor3.png",
      width: "10%",
      height: "10%",
      reverse: true,
    },
    {
      picture: "decor4.png",
      width: "33%",
      height: "18%",
    },
    {
      picture: "decor5.png",
      width: "15%",
      height: "15%",
      reverse: true,
    },
    {
      picture: "decor3.png",
      width: "10%",
      height: "10%",
    },
  ]);

  function startParallax(item: HTMLElement) {
    return function (e: MouseEvent) {
      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;

      if (item.classList.contains("reverse")) {
        item.style.transform = "translate(" + x * 20 + "px," + y * 20 + "px)";
      } else {
        item.style.transform =
          "translate(-" + x * 20 + "px, -" + y * 20 + "px)";
      }
    };
  }

  onMounted(() => {
    let decors = document.querySelectorAll(
      ".decor-item"
    ) as NodeListOf<HTMLDivElement>;
    for (let index = 0; index < decors.length; index++) {
      window.addEventListener("mousemove", startParallax(decors[index]));
    }
  });

  onUnmounted(() => {
    let decors = document.querySelectorAll(
      ".decor-item"
    ) as NodeListOf<HTMLDivElement>;
    for (let index = 0; index < decors.length; index++) {
      window.removeEventListener("mousemove", startParallax(decors[index]));
    }
  });

  return { parallaxItems };
};
