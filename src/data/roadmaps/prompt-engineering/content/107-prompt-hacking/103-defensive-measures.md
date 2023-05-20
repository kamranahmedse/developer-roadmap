# Defensive Measures

As the author of this guide, I want to ensure that you're able to implement defensive measures when prompt hacking. These measures are crucial as they protect against undesired result manipulations and help maintain the authenticity of generated responses. In this section, we'll briefly summarize the key defensive strategies for prompt engineering.

## 1. Mitigate risks through system design
To minimize the chances of prompt hacking, it's essential to design your system robustly. Some best practices include proper access control, limiting user input types, and using monitoring and logging tools to detect anomalies in query patterns.

## 2. Sanitize user input
Before processing user inputs, ensure that you sanitize and validate them. This step helps in preventing harmful input patterns capable of triggering unintended system behaviors. Stringently filter out any input elements that could manipulate the system’s behavior, such as special characters or explicit control tokens.

## 3. Use rate-limiting
Set limits on the number of requests users can make within a specific timeframe. Rate-limiting techniques prevent prompt hacking attempts in progress by restricting excessive queries.

## 4. Encourage safe practices
Educate users on the necessity of responsible AI usage, as well as the potential consequences of prompting maliciously. Establish guidelines on system usage and consequences for non-compliance.

## 5. Continuously update system security
Keep your system up to date by continuously improving its security measures. Stay informed about the latest advances in AI safety research and incident reports, to learn from and implement better defenses against evolving threats.

By implementing these defensive measures, you'll be better equipped to safeguard your AI system against prompt hacking, ensuring the safety and reliability of your AI-generated responses.