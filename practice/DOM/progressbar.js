const updateAndDisplay = (parent, child) => {
  parent.removeChild(child);
  parent.style.backgroundColor = "white";

  const p = document.createElement("p");
  p.innerHTML = "loaded";

  parent.appendChild(p);
};

window.onload = () => {
  const parent = document.querySelector("#parent");
  const child = document.querySelector("#child");
  let width = 0;

  const intervalId = setInterval(() => {
    width += Math.round(Math.random() * 30);
    child.style.width = width + "%";

    if (width >= 100) {
      clearInterval(intervalId);
      updateAndDisplay(parent, child);
    }
  }, 600);
};
