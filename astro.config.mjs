import { defineConfig } from 'astro/config';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isGitHubBuild = process.env.GITHUB_ACTIONS === 'true' && repositoryName && repositoryOwner;
const isUserSite = repositoryName === `${repositoryOwner}.github.io`;

export default defineConfig({
  output: 'static',
  site: isGitHubBuild ? `https://${repositoryOwner}.github.io` : 'http://localhost:4321',
  base: isGitHubBuild && !isUserSite ? `/${repositoryName}/` : '/',
});
