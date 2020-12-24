module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.{vue,md,scss,less,styl,css,html}': ['prettier --write']
}
