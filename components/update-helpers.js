/**
 * Portfolio Content Update Utilities
 *
 * Helper functions to make it easier to add new content to the portfolio
 */

/**
 * Generate template for new experience entry
 */
function createExperienceTemplate(year, company, url, role, description, logo) {
  return {
    year: year,
    company: company,
    url: url,
    role: role,
    description: description,
    logo: logo,
  };
}

/**
 * Generate template for new education entry
 */
function createEducationTemplate(
  year,
  institution,
  degree,
  location,
  description = "",
  logo
) {
  return {
    year: year,
    institution: institution,
    degree: degree,
    location: location,
    ...(description && { description: description }),
    logo: logo,
  };
}

/**
 * Generate template for new teaching entry
 */
function createTeachingTemplate(
  year,
  course,
  role,
  institution,
  instructor = "",
  description = "",
  logo
) {
  return {
    year: year,
    course: course,
    role: role,
    institution: institution,
    ...(instructor && { instructor: instructor }),
    ...(description && { description: description }),
    logo: logo,
  };
}

/**
 * Generate template for new article post
 */
function createArticleTemplate(
  title,
  date,
  url,
  description,
  tags = [],
  image,
  publisher
) {
  return {
    title: title,
    date: date,
    url: url,
    description: description,
    tags: tags,
    image: image,
    publisher: publisher,
  };
}
