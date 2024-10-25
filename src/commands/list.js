import { promises as fs } from 'fs';

function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

export async function listProjects() {
  try {
    const data = await fs.readFile('projects.json', 'utf8');
    const projects = JSON.parse(data);

    if (projects.length === 0) {
      console.log('No saved projects found.');
      return;
    }

    const formattedProjects = projects.map(project => ({
      'Project Name': truncateString(project.name, 16),
      'Repository URL': truncateString(project.html_url, 25),
      'Description': truncateString(project.description, 30),
      'Most Used Language': truncateString(project.language || 'Not specified', 15),
    }));

    console.table(formattedProjects);
  } catch (error) {
    console.error('Error reading saved projects:', error.message);
  }
}
