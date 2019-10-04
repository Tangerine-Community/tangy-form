# Instruction for releasing a new version of Tangy Form

0. Ensure `CHANGELOG.md` is complete in the `next` branch.
0. Merge next into `master` with `git checkout master && git fetch origin && git merge origin/master && git merge origin/next`
0. Make sure your local master branch is clean. `git status`.
1. Refresh sandbox and run tests with `rm -r node_modules && npm install && npm run test`.
1. Increment the version number in `package.json`. 
3. Run `npm run build`.
4. Git add the `dist` folder and `package.json`.
5. Git commit with a git commit message of the same release number.
6. Git tag with the same name as the release number.
7. Git push the master branch, git push the tag.
8. Ensure you have a clean directory with a `git status` then run `npm publish`. 
9. Draft a new release on Github of the same tag name using that tag. Use the CHANGELOG notes.
