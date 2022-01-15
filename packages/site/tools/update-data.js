/* eslint-disable no-console */
require('dotenv').config({ path: '../../.env' })
const fs = require('fs')

const Prismic = require('@prismicio/client')
// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
const prismicRepoName = process.env.PRISMIC_REPO_NAME || '' // if the `fallback true` and `notfound true` process.env.REPOSITORY_NAME is undefined then it needs to be given a default value, I think this is a bug
const accessToken = process.env.PRISMIC_API_TOKEN || ''

if (!prismicRepoName) {
  console.log('PRISMIC_REPO_NAME is not set in ENV, check your .env file')
  process.exit(1)
}

if (!accessToken) {
  console.log('PRISMIC_API_TOKEN is not set in ENV, check your .env file')
  process.exit(1)
}

const prismicApiEndpoint = `https://${prismicRepoName}.cdn.prismic.io/api/v2`

const fetchTags = async () => {
  try {
    const prismicApi = await Prismic.client(prismicApiEndpoint, { accessToken })

    const response = await prismicApi.query([
      Prismic.Predicates.at('document.type', 'tag'),
    ], { pageSize: 100, page: 1 })

    // convert to json
    const tagsJSON = `${JSON.stringify(response.results, null, 2)}\n`

    fs.writeFile('./src/data/tags.json', tagsJSON, (err) => {
      if (err) console.error('fetchTags', err)
      console.log('tags updated.')
    })
  } catch (err) {
    console.error('fetchTags', err)
  }
}

const fetchProjects = async () => {
  try {
    const prismicApi = await Prismic.client(prismicApiEndpoint, { accessToken })

    const response1 = await prismicApi.query([
      Prismic.Predicates.at('document.type', 'project'),
    ], { pageSize: 100, page: 1 })

    const response2 = await prismicApi.query([
      Prismic.Predicates.at('document.type', 'project'),
    ], { pageSize: 100, page: 2 })

    const response3 = await prismicApi.query([
      Prismic.Predicates.at('document.type', 'project'),
    ], { pageSize: 100, page: 3 })

    const results = [...response1.results, ...response2.results, ...response3.results]

    // convert to json
    const projectsJSON = `${JSON.stringify(results, null, 2)}\n`

    fs.writeFile('./src/data/projects.json', projectsJSON, (err) => {
      if (err) console.error('fetchProjects', err)
      console.log('projects updated.')
    })
  } catch (err) {
    console.error('fetchProjects', err)
  }
}

fetchTags()
fetchProjects()
