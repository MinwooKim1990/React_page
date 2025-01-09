interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string[];
  techStack: string[];
  details: string[];
}

export const parseProjectsFromHTML = (html: string): Project[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const projectCards = doc.querySelectorAll('.project-card');
  
  return Array.from(projectCards).map(card => {
    // Get title
    const title = card.querySelector('h3')?.textContent || '';
    
    // Get details (list items)
    const details = Array.from(card.querySelectorAll('ul li')).map(li => li.textContent || '');
    
    // Get description (combining details into a markdown list)
    const description = details.map(detail => `- ${detail}`).join('\n');
    
    // Get image
    const imageElement = card.querySelector('img, iframe');
    let image = '';
    if (imageElement?.tagName.toLowerCase() === 'img') {
      image = imageElement.getAttribute('data-src') || imageElement.getAttribute('src') || '';
    } else if (imageElement?.tagName.toLowerCase() === 'iframe') {
      image = imageElement.getAttribute('src') || '';
    }
    
    // Get link
    const link = card.querySelector('.github-link')?.getAttribute('href') || '#';
    
    // Get categories
    const categoryStr = card.getAttribute('data-category') || '';
    const category = categoryStr.split(' ').filter(Boolean);
    
    // Get tech stack
    const techStack = Array.from(card.querySelectorAll('.tech-badge')).map(badge => badge.textContent || '');

    return {
      title,
      description,
      image,
      link,
      category,
      techStack,
      details
    };
  });
};
