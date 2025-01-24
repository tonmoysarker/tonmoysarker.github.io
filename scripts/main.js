// Sample projects data
const projects = [
  {
    title: "Project 1",
    description: "A responsive website built with HTML, CSS, and JavaScript",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://via.placeholder.com/300",
    link: "#",
  },
  {
    title: "Vue Todo App",
    description: "A todo application built with Vue.js",
    tech: ["Vue.js", "JavaScript", "CSS"],
    image: "https://via.placeholder.com/300",
    link: "#",
  },
];

// Dynamically load projects
function loadProjects() {
  const container = document.getElementById("projects-container");

  projects.forEach((project) => {
    const projectHTML = `
                    <div class="project-card">
                        <img src="${project.image}" alt="${project.title}">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tech-stack">
                            ${project.tech
                              .map(
                                (tech) => `<span class="skill">${tech}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                `;
    container.innerHTML += projectHTML;
  });
}

// Smooth scroll function
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth",
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", loadProjects);
