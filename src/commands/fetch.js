import axios from 'axios';
import { promises as fs } from 'fs';
import inquirer from 'inquirer';
import { startLoading, stopLoading } from '../utils/loading.js';

const dataFile = 'projects.json';

export async function fetchProjects() {
  const questions = [
    {
      type: 'list',
      name: 'field',
      message: 'Which field are you interested in?',
      choices: [
        'Frontend Development',
        'Backend Development',
        'Testing',
        'DevOps',
        'Fullstack Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'Cybersecurity',
        'Game Development',
      ],
    },
    {
      type: 'list',
      name: 'title',
      message: 'What is your job title?',
      choices: [
        'Frontend Developer',
        'Backend Developer',
        'Fullstack Developer',
        'Tester',
        'DevOps Engineer',
        'Project Manager',
        'Information Security Analyst',
        'Product Owner',
        'Data Analyst',
        'Data Scientist',
        'Cybersecurity Specialist',
        'Machine Learning Engineer',
        'Penetration Tester'
      ],
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What are the most used programming languages? (Select all that apply)',
      choices: [
        'JavaScript',
        'Python',
        'Java',
        'C#',
        'Ruby',
        'Go',
        'TypeScript',
        'PHP',
        'Swift',
        'Kotlin',
        'Rust',
        'Others (please specify)',
      ],
    },
    {
      type: 'list',
      name: 'position',
      message: 'What is your programming position?',
      choices: ['Beginner', 'Intermediate', 'Expert', 'Lead', 'Manager'],
    },
    {
      type: 'input',
      name: 'otherLanguages',
      message: 'If you selected "Others", please specify:',
      when: (answers) => answers.languages.includes('Others (please specify)'),
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'What type of projects are you interested in?',
      choices: [
        'Open Source',
        'Personal Projects',
        'Freelance Work',
        'Corporate Projects',
        'All of the Above',
      ],
    },
  ];

  const preferences = await inquirer.prompt(questions);
  const loadingId = startLoading('Fetching projects...');

  try {
    const { field, languages } = preferences;
    const query = `${field} ${languages.join(' ')}`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`;

    const response = await axios.get(url);

    const englishRegex = /^[A-Za-z0-9 .,;?!'-]*$/;

    const projects = response.data.items
      .filter(item => englishRegex.test(item.description || ''))
      .map(item => ({
        name: item.name,
        html_url: item.html_url,
        description: item.description || 'No description available',
        language: item.language || 'Not specified'

      }));
    await fs.writeFile(dataFile, JSON.stringify(projects, null, 2), 'utf8');
    console.log(`${projects.length} projects fetched and saved to ${dataFile}`);
  } catch (error) {
    console.error('Error fetching projects : ', error.message);
  } finally {
    stopLoading(loadingId);
  }
}
