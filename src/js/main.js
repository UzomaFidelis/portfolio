// Import styles
import "../scss/style.scss";

import Typewriter from "typewriter-effect/dist/core";
import Isotope from "isotope-layout";
import { formSchema } from "./validation";

const typewriter = new Typewriter("#typewriter", {
  strings: ["Web Developer", "Frontend Developer", "Backend Developer"],
  autoStart: true,
  loop: true,
}).stop();

const typewriterElem = document.getElementById("typewriter");
typewriterElem.onmouseover = () => {
  typewriter.stop();
};
typewriterElem.onmouseleave = () => {
  typewriter.start();
};

window.onload = function () {
  typewriter.start();

  // Init Isotope
  const iso = new Isotope(".portfolio-container", {
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  function markActiveBtn(buttonGroup, event) {
    if (!event.target.matches("button")) {
      return;
    }
    buttonGroup.querySelector(".active").classList.remove("active");
    console.log("Active Button", buttonGroup.querySelector(".active"));
    event.target.classList.add("active");
  }

  const filterFns = {};
  const filterBtns = document.querySelector(".filters-button-group");

  filterBtns.addEventListener("click", function (event) {
    // Filter the elements in the layout
    if (!event.target.matches("button")) {
      console.log("Element clicked not button");
      return;
    }
    var filterValue = event.target.getAttribute("data-filter");
    console.log(event.target);
    filterValue = filterFns[filterValue] || filterValue;
    iso.arrange({ filter: filterValue });

    //Add 'active' class to currently applied filter btn
    markActiveBtn(this, event);
  });

  //Get all form Input Elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  // Get all form error display element
  const nameError = document.getElementById("form-name-error");
  const emailError = document.getElementById("form-email-error");
  const subjectError = document.getElementById("form-subject-error");
  const messageError = document.getElementById("form-message-error");

  // Add Event Listeners to input Elements
  nameInput.oninput = () => {
    if (nameError.textContent !== "") {
      nameError.textContent = "";
    }
  };
  emailInput.oninput = () => {
    if (emailError.textContent !== "") {
      emailError.textContent = "";
    }
  };
  subjectInput.oninput = () => {
    if (subjectError.textContent !== "") {
      subjectError.textContent = "";
    }
  };
  messageInput.oninput = () => {
    if (messageError.textContent !== "") {
      messageError.textContent = "";
    }
  };

  // Function to display any form validation error on the page
  const handleErrorDisplay = (errors) => {
    if (errors.name) {
      nameError.textContent = errors.name._errors[0];
    }
    if (errors.email) {
      emailError.textContent = errors.email._errors[0];
    }
    if (errors.subject) {
      subjectError.textContent = errors.subject._errors[0];
    }
    if (errors.message) {
      messageError.textContent = errors.message._errors[0];
    }
  };

  const contactForm = document.getElementById("contact-form");

  // Handle Form submit
  contactForm.onsubmit = function (e) {
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    const result = formSchema.safeParse(data);

    if (!result.success) {
      handleErrorDisplay(result.error.format());
      e.preventDefault();
    } else console.log("Form successfully submitted");
  };

  // Animations
  const progressBars = document.querySelectorAll(".progress-bar");

  const technologiesIcons = document.querySelectorAll(
    ".technologies-icon-wrap",
  );
  const portfolioCards = document.querySelectorAll(".portfolio-wrap");

  const animateProgressBar = (bars, observer) => {
    for (const bar of bars) {
      if (bar.isIntersecting) {
        const barTarget = bar.target;
        barTarget.classList.add("show");
        barTarget.style.width = `${barTarget.getAttribute("data-value")}%`;
        observer.unobserve(barTarget);
      }
    }
  };

  const animateScaleRotateIn = (elems, observer) => {
    for (const elem of elems) {
      if (elem.isIntersecting) {
        const elemTarget = elem.target;
        elemTarget.style.transform = "scale(1) rotate(0)";
        elemTarget.style.opacity = "1";
        observer.unobserve(elemTarget);
      }
    }
  };

  const animateFadeIn = (elems, observer) => {
    for (const elem of elems) {
      if (elem.isIntersecting) {
        const elemTarget = elem.target;
        elemTarget.style.transform = "scale(1) translateX(0)";
        elemTarget.style.opacity = "1";
        observer.unobserve(elemTarget);
      }
    }
  };

  const progressBarObserver = new IntersectionObserver(animateProgressBar);
  const scaleRotateInObserver = new IntersectionObserver(animateScaleRotateIn);
  const fadeInObserver = new IntersectionObserver(animateFadeIn);

  progressBars.forEach((bar) => {
    progressBarObserver.observe(bar);
  });

  technologiesIcons.forEach((elem) => {
    scaleRotateInObserver.observe(elem);
  });

  portfolioCards.forEach((card) => {
    fadeInObserver.observe(card);
  });
};
