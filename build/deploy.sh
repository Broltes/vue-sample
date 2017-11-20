set -e
DIST=$(node -p -e "require('./package.json').config.dist")

# commit
echo "Enter deploy message: "
read MESSAGE
git add $DIST/.
git commit -m "[deploy] $MESSAGE"
git subtree push --prefix $DIST origin gh-pages
