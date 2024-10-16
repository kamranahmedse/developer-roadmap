---
title: 'Number Guessing Game'
description: 'Build a simple number guessing game to test your luck.'
isNew: false
sort: 4
difficulty: 'beginner'
nature: 'CLI'
skills:
  - 'Programming Language'
  - 'CLI'
  - 'Logic Building'
seo:
  title: 'Number Guessing Game Project Idea'
  description: 'Build a simple number guessing game to test your luck.'
  keywords:
    - 'number guessing game'
    - 'backend project idea'
roadmapIds:
  - 'backend'
  - 'nodejs'
  - 'python'
  - 'java'
  - 'golang'
  - 'spring-boot'
  - 'cpp'
---

You are required to build a simple number guessing game where the computer randomly selects a number and the user has to guess it. The user will be given a limited number of chances to guess the number. If the user guesses the number correctly, the game will end, and the user will win. Otherwise, the game will continue until the user runs out of chances.

## Requirements

It is a CLI-based game, so you need to use the command line to interact with the game. The game should work as follows:

- When the game starts, it should display a welcome message along with the rules of the game.
- The computer should randomly select a number between 1 and 100.
- User should select the difficulty level (easy, medium, hard) which will determine the number of chances they get to guess the number.
- The user should be able to enter their guess.
- If the user's guess is correct, the game should display a congratulatory message along with the number of attempts it took to guess the number.
- If the user's guess is incorrect, the game should display a message indicating whether the number is greater or less than the user's guess.
- The game should end when the user guesses the correct number or runs out of chances.

Here is a sample output of the game:

```plaintext
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)

Enter your choice: 2

Great! You have selected the Medium difficulty level.
Let's start the game!

Enter your guess: 50
Incorrect! The number is less than 50.

Enter your guess: 25
Incorrect! The number is greater than 25.

Enter your guess: 35
Incorrect! The number is less than 35.

Enter your guess: 30
Congratulations! You guessed the correct number in 4 attempts.
```

To make the game more interesting, you can add the following features:

- Allow the user to play multiple rounds of the game (i.e., keep playing until the user decides to quit). You can do this by asking the user if they want to play again after each round.
- Add a timer to see how long it takes the user to guess the number.
- Implement a hint system that provides clues to the user if they are stuck.
- Keep track of the user's high score (i.e., the fewest number of attempts it took to guess the number under a specific difficulty level).
