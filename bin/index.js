#!/usr/bin/env node

import { Command } from 'commander';
import { fetchProjects } from '../src/commands/fetch.js';
import { listProjects } from '../src/commands/list.js';

const program = new Command();

program
  .command('fetch')
  .description('Fetch open-source projects based on user preferences')
  .action(async () => await fetchProjects());

program
  .command('list')
  .description('List saved GitHub projects')
  .action(async () => await listProjects());

program.parse(process.argv);
