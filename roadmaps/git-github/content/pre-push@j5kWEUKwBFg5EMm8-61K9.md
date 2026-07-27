# pre-push
 
The `pre-push` hook runs before commits are pushed to a remote repository, allowing checks to run on the commits about to be shared. It's often used to run a test suite or verify that the branch is up to date before allowing the push to proceed. If the script exits with a non-zero status, the push is cancelled.

Visit the following resources to learn more:

- [@article@pre-push hooks](https://dev.to/jameson/pre-push-hooks-42g5)
- [@video@Detect secrets with a pre-commit git hook](https://www.youtube.com/watch?v=8bDKn3y7Br4)