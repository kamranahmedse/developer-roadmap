# Include Steps

There are times when asking the model for something directly might not result in the best output. In that case, you may want to try breaking down the steps in the same manner that you will perform the action yourself.

For example, let's say that you have a large story written in english and you want to get the names and the number of names appeared in the story. But you want the names to be written in french. Now, there are two ways to write this prompt i.e. either asking directly for this e.g.

```
Give me a JSON object with following keys: `nouns_count` number of nouns appeared in story and `nouns_french` which is an array of nouns in french. The story is delimited by """.

"""In a charming village, siblings Jack and Jill set out on a quest to fetch water from a hilltop well. As they climbed, singing joyfully, misfortune struck—Jack tripped on a stone and tumbled down the hill, with Jill following suit. Though slightly battered, the pair returned home to comforting embraces. Despite the mishap, their adventurous spirits remained undimmed, and they continued exploring with delight."""
```

The output from this prompt is:

```
{
  "nouns_count": 10,
  "nouns_french": [
    "village",
    "siblings",
    "Jack",
    "Jill",
    "quest",
    "water",
    "hilltop",
    "well",
    "stone",
    "hill"
  ]
}
```

As you can see the nouns are not in french. However, if we rewrite our prompt as follows:

```
Perform the following steps on the story delimited by """".

Step 1. Translate it to French
Step 2. List each noun in the translation.
Step 3. Output the JSON object with `nouns_count` number of nouns in french story and `nouns_french` i.e. array of nouns appeared in translation.

Output the JSON only, I am not interested in the rest of the steps.

"""In a charming village, siblings Jack and Jill set out on a quest to fetch water from a hilltop well. As they climbed, singing joyfully, misfortune struck—Jack tripped on a stone and tumbled down the hill, with Jill following suit. Though slightly battered, the pair returned home to comforting embraces. Despite the mishap, their adventurous spirits remained undimmed, and they continued exploring with delight."""
```

It will correctly output the following:

```
{
  "nouns_count": 10,
  "nouns_french": [
    "village",
    "frères",
    "Jack",
    "Jill",
    "quête",
    "eau",
    "sommet de la colline",
    "bien",
    "pierre",
    "colline"
  ]
}
```