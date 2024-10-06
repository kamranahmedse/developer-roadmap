# Adding end-user IDs in prompts

Sending end-user IDs in your requests can be a useful tool to help OpenAI monitor and detect abuse. This allows OpenAI to provide your team with more actionable feedback in the event that we detect any policy violations in your application.

The IDs should be a string that uniquely identifies each user. We recommend hashing their username or email address, in order to avoid sending us any identifying information. If you offer a preview of your product to non-logged in users, you can send a session ID instead.

You can include end-user IDs in your API requests via the user parameter as follows:

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "user", "content": "This is a test"}
  ],
  max_tokens=5,
  user="user_123456"
)
```

Visit the following resources to learn more:

-[@official@Sending end-user IDs - OpenAi](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids)
