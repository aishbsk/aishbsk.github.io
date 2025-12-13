/**
 * Portfolio data and rendering system
 */

class Portfolio {
  constructor() {
    this.data = null;
  }

  /**
   * Load portfolio data from JSON file
   */
  async loadData() {
    try {
      const response = await fetch("./data/portfolio.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      // Show error message to user
      const tagline = document.querySelector(".tagline");
      if (tagline) {
        tagline.textContent =
          "Error loading portfolio data. Please check the console.";
        tagline.style.color = "#dc2626";
      }
    }
  }

  /**
   * Generate SVG icons for social platforms
   */
  getSocialIcon(platform) {
    const icons = {
      linkedin: `<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.49 0-4.5 2.01-4.5 4.5V21h4v-6c0-1.105.895-2 2-2s2 .895 2 2v6h4v-7.5C22 11.01 19.99 9 17.5 9c-1.21 0-2.36.54-3.12 1.41A4.482 4.482 0 0 0 14.5 9z"/></svg>`,
      github: `<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.62-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.21.7.83.58A12 12 0 0 0 12 .5z"/></svg>`,
    };
    return icons[platform] || "";
  }

  /**
   * Render hero section
   */
  renderHero() {
    if (!this.data) return;

    const { personal } = this.data;

    // Update avatar
    const avatar = document.querySelector(".avatar");
    if (avatar) {
      avatar.src = personal.avatar;
      avatar.alt = `Portrait of ${personal.name}`;
    }

    // Update name
    const name = document.querySelector(".name");
    if (name) {
      name.textContent = personal.name;
    }

    // Update tagline
    const tagline = document.querySelector(".tagline");
    if (tagline) {
      tagline.textContent = personal.tagline;
    }

    // Update social icons
    const iconsContainer = document.querySelector(".icons");
    if (iconsContainer) {
      iconsContainer.innerHTML = personal.social
        .map(
          (social) => `
        <a class="icon" href="${social.url}" aria-label="${
            social.platform
          }" rel="me">
          ${this.getSocialIcon(social.icon)}
        </a>
      `
        )
        .join("");
    }

    // Update navigation
    const topnav = document.querySelector(".topnav");
    if (topnav) {
      topnav.innerHTML = personal.navigation
        .map(
          (nav) => `
        <a class="chip" href="${nav.href}">${nav.label}</a>
      `
        )
        .join("");
    }

    // Update page title
    document.title = this.data.meta.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = this.data.meta.description;
    }
  }

  /**
   * Render timeline section
   */
  renderTimeline(sectionId, items) {
    const timeline = document.querySelector(`#${sectionId} .timeline`);
    if (!timeline || !items) return;

    timeline.innerHTML = items
      .map((item) => {
        const isEducation = sectionId === "education";
        const isTeaching = sectionId === "teaching";

        let title,
          role,
          description = "";

        if (isEducation) {
          title = item.institution;
          role = `${item.degree} · ${item.location}`;
          description = item.description || "";
        } else if (isTeaching) {
          title = item.course;
          role = `${item.role} · ${item.institution}${
            item.instructor ? ` · <i>${item.instructor}</i>` : ""
          }`;
          description = item.description || "";
        } else {
          // Experience
          title = `<a href="${item.url}">${item.company}</a>`;
          role = item.role;
          description = item.description;
        }

        return `
        <li>
          <time class="time" datetime="${item.year}">${item.year}</time>
          <img class="logo" src="${item.logo}" alt="${
          item.company || item.institution
        } logo" loading="lazy" />
          <div class="item">
            <h3>${title}</h3>
            <p class="role">${role}</p>
            ${description ? `<p>${description}</p>` : ""}
          </div>
        </li>
      `;
      })
      .join("");
  }

  /**
   * Render articles section
   */
  renderArticles() {
    if (!this.data?.articles) return;

    const articleGrid = document.querySelector("#articles .article-grid");
    if (!articleGrid) return;

    articleGrid.innerHTML = this.data.articles
      .map(
        (post) => `
      <a href="${
        post.url
      }" class="article-card-link" target="_blank" rel="noopener noreferrer">
        <article class="article-card">
          <img class="article-card-img" src="${post.image}" alt="${
          post.title
        }" loading="lazy" />
          <div class="article-card-body">
            <div class="article-card-header">
              <small class="article-date">${post.date}</small>
              <div class="article-tags">
                ${post.tags
                  .map((tag) => `<span class="article-tag">${tag}</span>`)
                  .join("")}
              </div>
            </div>
            <h3 class="article-card-title">${post.title}</h3>
            <p class="article-card-text">${post.description}</p>
            <div class="article-card-footer">
              <small class="text-muted">${post.publisher}</small>
            </div>
          </div>
        </article>
      </a>
    `
      )
      .join("");
  }

  /**
   * Render footer
   */
  renderFooter() {
    if (!this.data?.meta?.footer) return;

    const footer = document.querySelector("footer");
    if (footer) {
      footer.textContent = this.data.meta.footer;
    }
  }

  /**
   * Render all content
   */
  render() {
    if (!this.data) {
      console.log("No data loaded, using existing HTML content");
      return;
    }

    this.renderHero();
    this.renderTimeline("experience", this.data.experience);
    this.renderTimeline("education", this.data.education);
    this.renderTimeline("teaching", this.data.teaching);
    this.renderArticles();
    this.renderFooter();
  }

  /**
   * Initialize the portfolio
   */
  async init() {
    await this.loadData();
    this.render();
  }
}

/**
 * Initialize portfolio when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", async () => {
  const portfolio = new Portfolio();
  await portfolio.init();
});
