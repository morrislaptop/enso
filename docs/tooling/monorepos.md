# The Monorepo

Share resuable units of code across mutiple projects in a single repository.

Monorepos have rised greatly in popularity over the past few years,
thanks to tools like Lerna and the development of Yarn workspaces

Have a look at how some of these popular projects are adopting this metholodgy.

* Gatsby

Note: These are not endorsments just examples of how this approach may be used.

## Getting started

Navigating your first monorepo project can be a minefield.

The following is tutorial is aimed at demonstraing how combinination of Lerna and Yarn
tooling can be used

### How disparate `node_modules` dependencies are handled

Nesting mutiple projects in a single repo sounds like an absolute nightmare.

`npm shrinkwrap` comes to mind along with `git submodules`. :vomit-emoji:

`learna bootstrap` attempted to solve this however the folks over at `yarn`
