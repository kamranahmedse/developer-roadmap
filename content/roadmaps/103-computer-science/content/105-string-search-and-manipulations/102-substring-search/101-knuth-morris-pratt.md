# Knuth Morris Pratt

Knuth morris pratt is a string searching algorithm that uses a precomputed array to find the substring in a string. This array is known as the prefix function. The prefix function is the longest prefix that is also a suffix of a substring. The prefix function is used to skip the characters that are already matched. The algorithm is as follows:

* Compute the prefix function of the substring. 
* Traverse through the string and substring simultaneously. 
* If the characters match, increment the index of both the string and substring. 
* If the characters don't match, increment the index of the string by the value of the prefix function at the index of the substring.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/'>KMP Algorithm for Pattern Searching</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.javatpoint.com/daa-knuth-morris-pratt-algorithm'>The Knuth-Morris-Pratt (KMP)Algorithm</BadgeLink>
<BadgeLink colorScheme='red' badgeText='Watch' href='https://www.youtube.com/watch?v=V5-7GzOfADQ'>9.1 Knuth-Morris-Pratt KMP String Matching Algorithm</BadgeLink>
<BadgeLink colorScheme='red' badgeText='Watch' href='https://www.coursera.org/learn/algorithms-part2/lecture/TAtDr/knuth-morris-pratt'>Knuth-Morris Pratt</BadgeLink>
