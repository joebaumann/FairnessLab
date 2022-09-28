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
    git merge $branch_to_release --no-ff --no-commit
    echo "check if there are any merge conflicts and type continue to add all files, push, and commit:"
    read input_push
    if [ "$input_push" == "continue" ]
        then
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

        echo "Have a look at the current latest commit. Do you really want to do the release?"
        read input_release
        if [ "$input_release" == "yes" ]
        then
            gh release create $new_tag_name -t "$new_tag_name: $commit_message" -F changelog.md -R https://github.com/joebaumann/FairnessLab
        else
            echo aborting release...
        fi
    else 
    echo aborted push...
    fi

else
echo Describe the changes for the new release \(as this will be used as the description for the new release\) using: nano changelog.md

fi
