# Longest Repeating Character Replacement

Given a string and a number k, find the length of the longest substring where you can replace at most k characters to make all characters the same. You track the count of the most frequent character in the window, and if the window size minus that count exceeds k, you shrink from the left. This problem teaches you a clever invariant: you never need to shrink the window below its maximum size seen so far.

Visit the following resources to learn more:

- [@article@Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [@video@LeetCode Longest Repeating Character Replacement Solution](https://www.youtube.com/watch?v=00FmUN1pkGE)
- [@video@Longest Repeating Character Replacement - Leetcode 424](https://www.youtube.com/watch?v=tkNWKvxI3mU)