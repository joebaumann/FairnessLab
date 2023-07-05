#!/bin/bash

# run this file by running the following command in the terminal: ./release.sh

# created released branch with command: git checkout -b releases bd384c69bb86aa6965da8dc2fb6a4e72e835774d
# created remote for public repo with: git remote add public-releases https://github.com/joebaumann/FairnessLab.git

echo "Is your answer 'yes' for both of these questions? (yes/no)"
echo "  Have you already updated the changelog file?"
echo "  Are you in the FairnessLab-private directory?"

read input
if [ "$input" == "yes" ]
then

    echo creating release...

    git checkout releases
    git pull
    echo "which branch do you want to release? (probably you want to type main?!)"
    read branch_to_release
    git merge $branch_to_release --no-ff --no-commit
    echo "automatically change gh-pages homepage for public repo (only works on Mac/Linux)? (yes/no)"
    read input_homepage
    if [ "$input_homepage" == "yes" ]
    then
        sed -i 's/"homepage": "https:\/\/joebaumann.github.io\/FairnessLab-private",/"homepage": "https:\/\/joebaumann.github.io\/FairnessLab",/g' frontend/package.json
    else
        echo 'Change the homepage from "https://joebaumann.github.io/FairnessLab-private" to "https://joebaumann.github.io/FairnessLab" in the package.json file and save the file?'
        echo 'Press enter once you are done.'
        read continue_with_script
    fi
    echo "check if there are any merge conflicts and type 'continue' to add all files, push, and commit:"
    read input_push
    if [ "$input_push" == "continue" ]
        then
        git add -A
        echo add a one line commit message, which will also be the release header:
        read commit_message
        git commit -m "$commit_message"
        git push
        git push public-releases releases:main

        echo all new commits were commited locally on the releases and pushed the public-release main branch


        echo "Have a look at the current latest commit. Do you want to create a public release of this new version or not? (yes/no)"
        read input_release
        if [ "$input_release" == "yes" ]
        then
            echo "The latest git tag is: $(git describe --tags)"
            echo "Here's a list of all the tags: $(git tag -l)"
            echo Please enter the new tag name, which does not exist yet:
            read new_tag_name
            echo the new tag name is $new_tag_name
            git tag $new_tag_name
            gh release create $new_tag_name -t "$new_tag_name: $commit_message" -F changelog.md -R https://github.com/joebaumann/FairnessLab
        else
            echo aborting release...
        fi
    else 
    echo aborted push...
    fi

else
echo "Describe the changes for the new release \(as this will be used as the description for the new release\) using: nano changelog.md"

fi
git checkout main
