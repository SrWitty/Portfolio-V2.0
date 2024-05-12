window.onload = function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;

    // Fetch top GitHub projects
    fetch(
      "https://api.github.com/users/SrWitty/repos?sort=stargazers&per_page=5"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const projects = data;
        const projectData = document.getElementById("projectData");

        if (projects.length === 0) {
          const row = document.createElement("tr");
          row.innerHTML = '<td colspan="4">No projects found.</td>';
          projectData.appendChild(row);
        } else {
          projects.forEach((project) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.description || "No description"}</td>
            <td>${project.stargazers_count}</td>
            <td>
              <a href="${project.html_url}" target="_blank" class="external-link">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </td>
          `;
            projectData.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching GitHub projects:", error);
        const projectData = document.getElementById("projectData");
        const row = document.createElement("tr");
        row.innerHTML =
          '<td colspan="4">Error fetching GitHub projects.</td>';
        projectData.appendChild(row);
      });
  };

  function openInNewTab(url) {
    window.open(url, "_blank");
  }