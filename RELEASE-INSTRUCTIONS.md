# Instruction for releasing a new version of Tangy Form

0. Merge all changes into master branch.
0. Ensure `CHANGELOG.md` is complete.
0. Increment the version number in `package.json`.
0. Git commit with a git commit message of the same release number.
0. Git tag with the same name as the release number.
0. Git push the master branch, git push the tag.
0. Draft a new release on Github of the same tag name using that tag. Use the CHANGELOG notes.
0. Ensure the github action successfully built and published the npm package.
