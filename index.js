#!/usr/bin/env node

const { Command } = require('commander');
const axios = require('axios');
const fs = require('fs').promises;
const inquirer = require('inquirer');

const program = new Command();
const dataFile = 'projects.json';


async function collectUserPreferences() {
  const questions = [
    {
      type: 'list',
      name: 'field',
      message: 'Which field are you interested in ?',
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
      message: 'What is your job title ?',
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
        'Cybersecurity specialist',
        'Machine Learning Engineer',
        'Penetration Tester'
      ],
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What are the most used programming languages ? (Select all that apply)',
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
      message: 'What type of projects are you interested in ?',
      choices: [
        'Open Source',
        'Personal Projects',
        'Freelance Work',
        'Corporate Projects',
        'All of the Above',
      ],
    },
  ];

  const answers = await inquirer.prompt(questions);
  return answers;
}

function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

async function fetchGitHubProjects(preferences) {
  const { field, languages } = preferences;
  const query = `${field} ${languages}`;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`;

  const response = await axios.get(url);

  const englishRegex = /^[A-Za-z0-9 .,;?!'-]*$/;

  return response.data.items
    .filter(item => englishRegex.test(item.description || ''))
    .map(item => ({
      name: item.name,
      html_url: item.html_url,
      description: item.description || 'No description available',
      languages: item.language || 'Not specified'
    }));
}

async function saveProjectsToFile(projects) {
  await fs.writeFile(dataFile, JSON.stringify(projects, null, 2), 'utf8');
}

async function listSavedProjects() {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    const projects = JSON.parse(data);

    if (projects.length === 0) {
      console.log('No saved projects found.');
      return;
    }

    console.log(`${projects.length} saved projects:`);

    const formattedProjects = projects.map(project => ({
      'Project Name': truncateString(project.name, 16),
      'Repository URL': truncateString(project.html_url, 25),
      'Description': truncateString(project.description, 30),
      'Most Used Language': truncateString(project.languages, 15),
    }));

    console.table(formattedProjects);
  } catch (error) {
    console.log('Error reading saved projects:', error.message);
  }
}

program
  .command('fetch')
  .description('Fetch open-source projects based on user preferences')
  .action(async () => {
    const preferences = await collectUserPreferences();
    const projects = await fetchGitHubProjects(preferences);
    await saveProjectsToFile(projects);
    console.log(`${projects.length} projects fetched and saved to ${dataFile}.`);
  });

program
  .command('list')
  .description('List saved GitHub projects')
  .action(async () => {
    await listSavedProjects();
  });

program.parse(process.argv);
