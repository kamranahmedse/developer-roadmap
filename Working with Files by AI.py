 from helper_functions import *

#In the next cell, you load text from a file that contains a journal entry with descriptions of restaurants and their specialties.

journal = read_journal("journal_entries/cape_town.txt") 
print(journal)


prompt = f"""
Given the following journal entry from a food critic, identify the restaurants and their specialties.
For each restaurant, highlight its name and specialties in bold and use different colors for each.
Provide the output as HTML suitable for display in a Jupyter notebook.

Journal entry:
{journal}
"""
html_response = get_llm_response(prompt)
display_html(html_response)

#Output:
'''```html
Embarking on a gastronomic journey through Cape Town revealed a city brimming with culinary treasures. Each stop was a testament to the rich flavors and unique dishes that define this vibrant city's food scene.

My first destination was The Test Kitchen, a restaurant that has earned its place among the world's best. Situated in the trendy Woodstock area, this dining spot is celebrated for its innovative dishes. I was particularly taken by their signature dish, the "Pickled Fish Tacos." The tangy, flavorful fish wrapped in a soft taco, paired with a zesty salsa, was a delightful start to my culinary adventure. The industrial-chic ambiance added a modern edge to the dining experience.

Next, I made my way to La Colombe, perched on the slopes of Constantia. Known for its refined and artistic approach to cuisine, La Colombe's "Tuna La Colombe" is a must-try. This dish features perfectly seared tuna, complemented by a delicate ponzu dressing and bursts of citrus. The presentation was as exquisite as the flavors, making it a memorable highlight of the day.

For a taste of traditional South African fare, I headed to Gold Restaurant. Located in Green Point, this vibrant eatery offers a culinary tour of the continent. The "Bobotie," a classic Cape Malay dish, stood out with its spiced minced meat topped with a savory custard. The rich, aromatic flavors, combined with the lively African drumming and dance performances, created an immersive cultural experience.

At the bustling V&A Waterfront, I visited Harbour House for some of the freshest seafood in town. The "Grilled Kingklip" was a revelation. The succulent, flaky fish, grilled to perfection and served with a side of roasted vegetables, highlighted the ocean's bounty. The stunning views of the harbor added to the meal's appeal.

Finally, my journey concluded at The Pot Luck Club, another gem in Woodstock. This trendy spot is known for its small plates, perfect for sharing. The standout dish was the "Beef Tataki." Thinly sliced, seared beef with a tangy soy dressing and a hint of wasabi provided a burst of umami and heat. The eclectic, artistic vibe of the restaurant made for a fitting end to my culinary tour.

```'''
