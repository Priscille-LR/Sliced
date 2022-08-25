document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("project2 JS imported successfully!");
  },
  false
);

const button = document.querySelector(".heart-button");

button.addEventListener("click", () => {
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
  } else {
    button.classList.add("liked");
  }
});