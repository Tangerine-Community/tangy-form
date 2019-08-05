# Instruction for releasing a new version of Tangy Form

1. Increment the version number in `package.json`. 
2. Create an and fill out an entry in `CHANGELOG.md` for the release.
3. Run `npm run build`.
4. Git add the `dist` folder, `package.json`, and `CHANGELOG.md`.
5. Git commit with a git commit message of the same release number.
6. Git tag with the same name as the release number.
7. Git push the master branch, git push the tag.
8. Ensure you have a clean directory with a `git status` then run `npm publish`. 
