# Warn users if node_modules are being tracked or if .gitignore file is missing.
# Exits deploy script if so.
if !(git ls-files --error-unmatch node_modules > /dev/null 2>&1) && [ -f .gitignore ];
   then true;
   else printf "\n\nWARNING: .gitignore is wrong or missing.
   Ask an instructor for assistance!\n\n" && exit 1
fi

# Checks that `git status` returns a clean working directory.
# Exits script with error if it does not.
if !(test -z "$(git status --porcelain)"); then
  git status
  printf "\n\nERROR: Please add/commit or delete changes before deploying.\n\n"
  exit 1
fi

# Pushes master branch to origin remote, if unsuccessful exits script.
if !(git push origin master); then
  exit 1
fi

git checkout master

# Deletes gh-pages branch if there is one locally.
# If there is no gh-pages branch suppress the output.
git branch -D gh-pages > /dev/null 2>&1

# Create new gh-pages branch with no commits.
git checkout --orphan gh-pages

# Remove all tracked files from git but don't delete them permanently.
# Preparation for build script.
# Putting quotes are the * enables it to rm directories as well, odd workaround.
git rm --cached '*'

# Run React's build script.
if (npm run build); then
  # If build script works, we only want to add the directory it stored the
  # production files in.
  # The --force flag allows us to add untracked files.
  git add --force build/

  # Commit the production directory.
  git commit -m "deploy task"

  # Delete the gh-pages branch on github because its history won't line up with
  # new gh-pages branch.
  git push origin :gh-pages

  # Only push the build/ directory of the gh-pages branch to github.
  git subtree push --prefix build/ origin gh-pages
fi

# Remove all production files that we don't want in development, do not delete
# node_modules.
git clean -x -d --force --exclude=node_modules
git checkout master
