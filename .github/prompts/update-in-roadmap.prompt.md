---
model: Claude Haiku 4.5 (Preview) (copilot)
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'todos', 'usages', 'think', 'changes', 'githubRepo']
---

# Roadmap Content Update Prompt

## Instructions
You are tasked with reviewing and improving roadmap content to make it more beginner-friendly and increase awareness about the topic. Follow the guidelines below:

## What You Need to Provide
Simply mention the **name of the roadmap** or provide the **file path** where changes need to be made. For example:
- "Make the Frontend roadmap more beginner-friendly"
- "Update the content in `public/roadmap-content/backend.json`"

## Content Improvement Guidelines

### 1. **Beginner-Friendly Adjustments**
   - **Simplify terminology**: Replace complex jargon with clear, simple explanations
   - **Add foundational concepts**: Include prerequisites and basic knowledge needed
   - **Progressive learning**: Arrange topics from easiest to most complex
   - **Practical examples**: Add real-world use cases and practical applications
   - **Reduce overwhelming content**: Break large topics into smaller, digestible sections
   - **Define acronyms**: Always spell out and explain abbreviations on first mention

### 1a. **Better Examples for Faster Understanding** ⭐
   - **Concrete over abstract**: Replace theoretical explanations with tangible, real-world examples
   - **Relatable scenarios**: Use examples from everyday situations or popular applications that beginners recognize
   - **Progressive complexity**: Start with simple examples, then advance to more complex ones
   - **Code snippets (when applicable)**: Include minimal, runnable code examples showing practical usage
   - **Visual examples**: Describe or reference visual representations where helpful (diagrams, flowcharts, screenshots)
   - **Common use cases**: Show how the topic is applied in real projects or industries
   - **Before/after comparisons**: Demonstrate the impact of learning/using the concept
   - **Relatable analogies**: Use metaphors that connect unfamiliar concepts to things beginners already understand
   - **Update existing examples**: Review and improve any existing examples to be clearer, more relevant, and easier to follow

### 2. **Topic Awareness Enhancements**
   - **Why it matters**: Explain the relevance and importance of each topic to the broader field
   - **Industry context**: Provide information about how the topic is used in real-world scenarios
   - **Career implications**: Show how learning this topic benefits career growth
   - **Common misconceptions**: Address and clarify any myths or misunderstandings
   - **Latest trends**: Include current best practices and emerging technologies (when relevant)
   - **Community resources**: Suggest beginner-friendly communities and support groups

### 3. **Structure Improvements**
   - **Clear headings**: Use descriptive headings that explain the purpose of each section
   - **Short paragraphs**: Keep text concise and focused
   - **Visual cues**: Use bullet points and lists for better readability
   - **Learning path**: Suggest a logical order for learning the topic
   - **Time estimates**: Include approximate time needed to master each concept (when applicable)

### 4. **Content Quality Checks**
   - ✓ Is the content accessible to someone with no prior knowledge?
   - ✓ Are all technical terms explained or linked to definitions?
   - ✓ Does the content inspire and motivate beginners?
   - ✓ Is there a clear learning progression?
   - ✓ Are there actionable next steps?
   - ✓ Is the tone encouraging and supportive?
   - ✓ Are examples concrete, relatable, and easy to understand?
   - ✓ Do examples build understanding progressively from simple to complex?
   - ✓ Are any existing examples updated for clarity and relevance?

## Output Format
Return updated content that:
1. Maintains the original structure and file format
2. **Keep the h1 heading as it is** - Do not modify the main title/heading of the content
3. Incorporates beginner-friendly language throughout
4. Adds awareness-building context and explanations
5. Preserves all original information while making it more accessible
6. Includes helpful notes or comments where clarifications have been added
7. **Improves and updates all relevant examples** to be more concrete, relatable, and easier to understand
8. **Adds new examples where needed** to clarify complex concepts and accelerate learning
