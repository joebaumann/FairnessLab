#!/bin/bash

# created released branch with command: git checkout -b releases bd384c69bb86aa6965da8dc2fb6a4e72e835774d

echo "Have you already updated the changelog file and set the package.json homepage to 'https://joebaumann.github.io/FairnessLab-public'? (yes/no)"

read input
if [ "$input" == "yes" ]
then

echo creating release...

git checkout releases
echo "which branch do you want to release?"
read branch_to_release
git merge --squash $branch_to_release
git add -A
git reset release_script.sh
echo add a one line commit message, which will also be the release header:
read commit_message
git commit -m "$commit_message"
git push
git push public-releases releases:main

echo all new commits have been squashed, commited locally, and committed to the public release main branch

echo "The latest git tag is: $(git describe --tags)"
echo Please enter the new tag name:
read new_tag_name
echo the new tag name is $new_tag_name
git tag $new_tag_name
gh release create $new_tag_name -F changelog.md -R https://github.com/joebaumann/FairnessLab-public

else
echo Describe the changes for the new release \(as this will be used as the description for the new release\) using: nano changelog.md

fi