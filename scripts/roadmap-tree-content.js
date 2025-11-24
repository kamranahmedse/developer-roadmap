import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {Object} Node
 * @property {string} id - The unique identifier for the node
 * @property {string} text - The text content of the node
 */

const roadmapId = 'ai-agents';

/** @type {Node[]} */
const nodes = [
  {
    id: 'ZF5_5Y5zqa75Ov22JACX6',
    text: 'AI Agents > Transformer Models and LLMs',
  },
  {
    id: 'GAjuWyJl9CI1nqXBp6XCf',
    text: 'AI Agents > LLM Fundamentals > Model Mechanis > Tokenization',
  },
  {
    id: 'dyn1LSioema-Bf9lLTgUZ',
    text: 'AI Agents > LLM Fundamentals > Model Mechanis > Context Windows',
  },
  {
    id: '1fiWPBV99E2YncqdCgUw2',
    text: 'AI Agents > LLM Fundamentals > Model Mechanis > Token Based Pricing',
  },
  {
    id: 'L1zL1GzqjSAjF06pIIXhy',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Temperature',
  },
  {
    id: 'icbp1NjurQfdM0dHnz6v2',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Top-p',
  },
  {
    id: 'z_N-Y0zGkv8_qHPuVtimL',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Frequency Penalty',
  },
  {
    id: 'Vd8ycw8pW-ZKvg5WYFtoh',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Presence Penalty',
  },
  {
    id: 'K0G-Lw069jXUJwZqHtybd',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Stopping Criteria',
  },
  {
    id: 'Bn_BkthrVX_vOuwQzvPZa',
    text: 'AI Agents > LLM Fundamentals > Generation Controls > Max Length',
  },
  {
    id: 'DSJAhQhc1dQmBHQ8ZkTau',
    text: 'AI Agents > Model Families and Licences > Open Weight Models',
  },
  {
    id: 'tJYmEDDwK0LtEux-kwp9B',
    text: 'AI Agents > Model Families and Licences > Closed Weight Models',
  },
  {
    id: 'i2NE6haX9-7mdoV5LQ3Ah',
    text: 'AI Agents > Understand the Basics > Streamed vs Unstreamed Responses',
  },
  {
    id: 'N3yZfUxphxjiupqGpyaS9',
    text: 'AI Agents > Understand the Basics > Reasoning vs Standard Models',
  },
  {
    id: '5OW_6o286mj470ElFyJ_5',
    text: 'AI Agents > Understand the Basics > Fine-tuning vs Prompt Engineering',
  },
  {
    id: 'UIm54UmICKgep6s8Itcyv',
    text: 'AI Agents > Understand the Basics > Embeddings and Vector Search',
  },
  {
    id: 'qwVQOwBTLA2yUgRISzC8k',
    text: 'AI Agents > Understand the Basics > Understand the Basics of RAG',
  },
  {
    id: 'B8dzg61TGaknuruBgkEJd',
    text: 'AI Agents > Understand the Basics > Pricing of Common Models',
  },
  {
    id: 'aFZAm44nP5NefX_9TpT0A',
    text: 'AI Agents > AI Agents 101 > What are AI Agents?',
  },
  {
    id: '2zsOUWJQ8e7wnoHmq1icG',
    text: 'AI Agents > AI Agents 101 > What are Tools?',
  },
  {
    id: 'Eih4eybuYB3C2So8K0AT3',
    text: 'AI Agents > AI Agents 101 > Agent Loop',
  },
  {
    id: 'LU76AhCYDjxdBhpMQ4eMU',
    text: 'AI Agents > AI Agents 101 > Agent Loop > Perception / User Input',
  },
  {
    id: 'ycPRgRYR4lEBQr_xxHKnM',
    text: 'AI Agents > AI Agents 101 > Agent Loop > Reason and Plan',
  },
  {
    id: 'sHYd4KsKlmw5Im3nQ19W8',
    text: 'AI Agents > AI Agents 101 > Agent Loop > Acting / Tool Invocation',
  },
  {
    id: 'ZJTrun3jK3zBGOTm1jdMI',
    text: 'AI Agents > AI Agents 101 > Agent Loop > Observation & Reflection',
  },
  {
    id: 'PPdAutqJF5G60Eg9lYBND',
    text: 'AI Agents > AI Agents 101 > Example Usecases > Personal assistant',
  },
  {
    id: 'PK8w31GlvtmAuU92sHaqr',
    text: 'AI Agents > AI Agents 101 > Example Usecases > Code generation',
  },
  {
    id: 'wKYEaPWNsR30TIpHaxSsq',
    text: 'AI Agents > AI Agents 101 > Example Usecases > Data analysis',
  },
  {
    id: '5oLc-235bvKhApxzYFkEc',
    text: 'AI Agents > AI Agents 101 > Example Usecases > Web Scraping / Crawling',
  },
  {
    id: 'ok8vN7VtCgyef5x6aoQaL',
    text: 'AI Agents > AI Agents 101 > Example Usecases > NPC / Game AI',
  },
  {
    id: 'Y8EqzFx3qxtrSh7bWbbV8',
    text: 'AI Agents > Prompt Engineering > What is Prompt Engineering',
  },
  {
    id: 'qFKFM2qNPEN7EoD0V-1SM',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Be specific in what you want',
  },
  {
    id: '6I42CoeWX-kkFXTKAY7rw',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Provide additional context',
  },
  {
    id: 'sUwdtOX550tSdceaeFPmF',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Use relevant technical terms',
  },
  {
    id: 'yulzE4ZNLhXOgHhG7BtZQ',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Use Examples in your Prompt',
  },
  {
    id: 'noTuUFnHSBzn7GKG9UZEi',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Iterate and Test your Prompts',
  },
  {
    id: 'wwHHlEoPAx0TLxbtY6nMA',
    text: 'AI Agents > Prompt Engineering > Writing Good Prompts > Specify Length, format etc',
  },
  {
    id: 'qakbxB8xe7Y8gejC5cZnK',
    text: 'AI Agents > AI Agents 101 > Tools / Actions > Tool Definition',
  },
  {
    id: 'kBtqT8AduLoYDWopj-V9_',
    text: 'AI Agents > Tools / Actions > Examples of Tools > Web Search',
  },
  {
    id: 'mS0EVCkWuPN_GkVPng4A2',
    text: 'AI Agents > Tools / Actions > Examples of Tools > Code Execution / REPL',
  },
  {
    id: 'sV1BnA2-qBnXoKpUn-8Ub',
    text: 'AI Agents > Tools / Actions > Examples of Tools > Database Queries',
  },
  {
    id: '52qxjZILV-X1isup6dazC',
    text: 'AI Agents > Tools / Actions > Examples of Tools > API Requests > Tools / Actions > Examples of Tools > API Requests',
  },
  {
    id: 'qaNr5I-NQPnfrRH7ynGTl',
    text: 'AI Agents > Tools / Actions > Examples of Tools > Email / Slack / SMS',
  },
  {
    id: 'BoJqZvdGam4cd6G6yK2IV',
    text: 'AI Agents > Tools / Actions > Examples of Tools > File System Access',
  },
  {
    id: '1B0IqRNYdtbHDi1jHSXuI',
    text: 'AI Agents > Model Context Protocol (MCP)',
  },
  {
    id: '9FryAIrWRHh8YlzKX3et5',
    text: 'AI Agents > Model Context Protocol (MCP) > Core Components > MCP Hosts',
  },
  {
    id: 'CGVstUxVXLJcYZrwk3iNQ',
    text: 'AI Agents > Model Context Protocol (MCP) > Core Components > MCP Client',
  },
  {
    id: 'yv_-87FVM7WKn5iv6LW9q',
    text: 'AI Agents > Model Context Protocol (MCP) > Core Components > MCP Servers',
  },
  {
    id: '1NXIN-Hbjl5rPy_mqxQYW',
    text: 'AI Agents > Model Context Protocol (MCP) > Creating MCP Servers',
  },
  {
    id: 'iBtJp24F_kJE3YlBsW60s',
    text: 'AI Agents > Model Context Protocol (MCP) > Creating MCP Servers > Deployment Modes > Local Desktop',
  },
  {
    id: 'dHNMX3_t1KSDdAWqgdJXv',
    text: 'AI Agents > Model Context Protocol (MCP) > Creating MCP Servers > Deployment Modes > Remote / Cloud',
  },
  {
    id: 'TBH_DZTAfR8Daoh-njNFC',
    text: 'AI Agents > Agent Memory > What is Agent Memory?',
  },
  {
    id: 'M3U6RfIqaiut2nuOibY8W',
    text: 'AI Agents > Agent Memory > Short Term  Memory',
  },
  {
    id: 'Ue633fz6Xu2wa2-KOAtdP',
    text: 'AI Agents > Agent Memory > What is Agent Memory? > Long Term Memory',
  },
  {
    id: 'EfCCNqLMJpWKKtamUa5gK',
    text: 'AI Agents > Agent Memory > What is Agent Memory? > Episodic vs Semantic Memory',
  },
  {
    id: 'wkS4yOJ3JdZQE_yBID8K7',
    text: 'AI Agents > Agent Memory > What is Agent Memory? > Maintaining Memory > RAG and Vector Databases',
  },
  {
    id: 'QJqXHV8VHPTnfYfmKPzW7',
    text: 'AI Agents > Agent Memory > What is Agent Memory? > Maintaining Memory > User Profile Storage',
  },
  {
    id: 'jTDC19BTWCqxqMizrIJHr',
    text: 'AI Agents > Agent Memory > Maintaining Memory > Summarization / Compression',
  },
  {
    id: 'm-97m7SI0XpBnhEE8-_1S',
    text: 'AI Agents > Agent Memory > Maintaining Memory > Forgetting / Aging Strategies',
  },
  {
    id: 'cW8O4vLLKEG-Q0dE8E5Zp',
    text: 'AI Agents > Agent Architectures > Common Architectures > RAG Agent',
  },
  {
    id: '53xDks6JQ33fHMa3XcuCd',
    text: 'AI Agents > Agent Architectures > Common Architectures > ReAct (Reason + Act)',
  },
  {
    id: 'qwdh5pkBbrF8LKPxbZp4F',
    text: 'AI Agents > Agent Architectures > Common Architectures > Chain of Thought (CoT)',
  },
  {
    id: '6YLCMWzystao6byCYCTPO',
    text: 'AI Agents > Agent Architectures > Common Architectures > Planner Executor',
  },
  {
    id: 'Ep8RoZSy_Iq_zWXlGQLZo',
    text: 'AI Agents > Agent Architectures > Common Architectures > DAG Agents',
  },
  {
    id: 'Nmy1PoB32DcWZnPM8l8jT',
    text: 'AI Agents > Agent Architectures > Common Architectures > Tree-of-Thought',
  },
  {
    id: 'hj1adjkG9nalXKZ-Youn0',
    text: 'AI Agents > Agent Architectures > Common Architectures > Tree-of-Thought',
  },
  {
    id: 'US6T5dXM8IY9V2qZnTOFW',
    text: 'AI Agents > Building Agents > Manual (from scratch)',
  },
  {
    id: 'aafZxtjxiwzJH1lwHBODi',
    text: 'AI Agents > Building Agents > LLM Native "Function Calling"',
  },
  {
    id: 'AQtxTTxmBpfl8BMgJbGzc',
    text: 'AI Agents > Building Agents > LLM Native "Function Calling" > OpenAI Functions Calling',
  },
  {
    id: '37GBFVZ2J2d5r8bd1ViHq',
    text: 'AI Agents > Building Agents > LLM Native "Function Calling" > OpenAI Assistant API',
  },
  {
    id: '_iIsBJTVS6OBf_dsdmbVO',
    text: 'AI Agents > Building Agents > LLM Native "Function Calling" > Gemini Function Calling',
  },
  {
    id: '1EZFbDHA5J5_5BPMLMxXb',
    text: 'AI Agents > Building Agents > LLM Native "Function Calling" > Anthropic Tool Use',
  },
  {
    id: 'Ka6VpCEnqABvwiF9vba7t',
    text: 'AI Agents > Building Agents > Building Using Frameworks > Langchain',
  },
  {
    id: 'iEHF-Jm3ck-Iu85EbCoDi',
    text: 'AI Agents > Building Agents > Building Using Frameworks > LlamaIndex',
  },
  {
    id: 'XS-FsvtrXGZ8DPrwOsnlI',
    text: 'AI Agents > Building Agents > Building Using Frameworks > Haystack',
  },
  {
    id: '7YtnQ9-KIvGPSpDzEDexl',
    text: 'AI Agents > Building Agents > Building Using Frameworks > AutoGen',
  },
  {
    id: 'uFPJqgU4qGvZyxTv-osZA',
    text: 'AI Agents > Building Agents > Building Using Frameworks > CrewAI',
  },
  {
    id: 'eWxQiBrxIUG2JNcrdfIHS',
    text: 'AI Agents > Building Agents > Building Using Frameworks > Smol Depot',
  },
  {
    id: 'v8qLnyFRnEumodBYxQSXQ',
    text: 'AI Agents > Building Agents > Evaluation and Testing > Metrics to Track',
  },
  {
    id: 'qo_O4YAe4-MTP_ZJoXJHR',
    text: 'AI Agents > Evaluation and Testing > Unit Testing for Individual Tools',
  },
  {
    id: 'P9-SiIda3TSjHsfkI5OUV',
    text: 'AI Agents > Evaluation and Testing > Integration Testing for Flows',
  },
  {
    id: 'rHxdxN97ZcU7MPl8L1jzN',
    text: 'AI Agents > Evaluation and Testing > Human in the Loop Evaluation',
  },
  {
    id: 'xp7TCTRE9HP60_rGzTUF6',
    text: 'AI Agents > Evaluation and Testing > Frameworks > LangSmith',
  },
  {
    id: '0924QUH1wV7Mp-Xu0FAhF',
    text: 'AI Agents > Evaluation and Testing > Frameworks > DeepEval',
  },
  {
    id: 'YzEDtGEaMaMWVt0W03HRt',
    text: 'AI Agents > Evaluation and Testing > Frameworks > Ragas',
  },
  {
    id: 'zs6LM8WEnb0ERWpiaQCgc',
    text: 'AI Agents > Debugging and Monitoring > Structured logging & tracing',
  },
  {
    id: 'zs6LM8WEnb0ERWpiaQCgc',
    text: 'AI Agents > Debugging and Monitoring > Structured logging & tracing',
  },
  {
    id: 'SS8mGqf9wfrNqenIWvN8Z',
    text: 'AI Agents > Observability Tools > LangSmith',
  },
  {
    id: 'MLxP5N0Vrmwh-kyvNeGXn',
    text: 'AI Agents > Observability Tools > Helicone',
  },
  {
    id: 'UoIheaJlShiceafrWALEH',
    text: 'AI Agents > Observability Tools > LangFuse',
  },
  {
    id: '7UqPXUzqKYXklnB3x-tsv',
    text: 'AI Agents > Observability Tools > openllmetry',
  },
  {
    id: 'SU2RuicMUo8tiAsQtDI1k',
    text: 'AI Agents > Security & Ethics > Prompt Injection / Jailbreaks',
  },
  {
    id: 'UVzLGXG6K7HQVHmw8ZAv2',
    text: 'AI Agents > Security & Ethics > Tool sandboxing / Permissioning',
  },
  {
    id: 'rdlYBJNNyZUshzsJawME4',
    text: 'AI Agents > Security & Ethics > Data Privacy + PII Redaction',
  },
  {
    id: 'EyLo2j8IQsIK91SKaXkmK',
    text: 'AI Agents > Security & Ethics > Bias & Toxicity Guardrails',
  },
  {
    id: '63nsfJFO1BwjLX_ZVaPFC',
    text: 'AI Agents > Security & Ethics > Safety + Red Team Testing',
  },
];

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const prompt = `
  You are a helpful assistant that can help me generate content for a roadmap tree.
  You will be given a roadmap topic in the form of "Parent > Child > Leaf". You need
  to generate a single paragraph explaining the topic.
  Also, I hate it when you say "In the realm of..." 
  or "In the context of..." or "..in the context of..." or "when we talk about..." or something
  similar.
  IMPORTANT: Use simple and clear English. Avoid complex words and jargon when possible.
  Write in a way that is easy to understand. Use short sentences and common words.
`;

/**
 * Generates content for a given node using OpenAI's GPT model
 * @param {Node} node - The node to generate content for
 * @returns {Promise<string>} The generated content
 */
const generateContent = async (node) => {
  try {
    const content = await openai.chat.completions.create({
      model: 'o3',
      messages: [
        { role: 'system', content: prompt },
        {
          role: 'user',
          content: `Node: ${node.text}`,
        },
      ],
    });

    return content.choices[0].message.content;
  } catch (error) {
    console.error(
      `Error generating content for node ${node.id}:`,
      error.message,
    );
    throw error;
  }
};

const roadmapContentDir = path.join(
  __dirname,
  `../src/data/roadmaps/${roadmapId}/content`,
);
const contentFiles = fs.readdirSync(roadmapContentDir);

/**
 * Processes a single node by generating content and writing to file
 * @param {Node} node - The node to process
 * @param {string} roadmapContentDir - Directory path for content files
 * @param {string[]} contentFiles - List of existing content files
 * @returns {Promise<void>}
 */
const processNode = async (node, roadmapContentDir, contentFiles) => {
  try {
    const nodeId = node.id;
    const relevantFileName = contentFiles.find((file) =>
      file.endsWith(`${nodeId}.md`),
    );

    if (!relevantFileName) {
      console.warn(`No matching file found for node ${nodeId}`);
      return;
    }

    const fileTitle = node.text
      .replace(/\s+>\s+/g, '>')
      .split('>')
      .pop();

    const content = await generateContent(node);
    const filePath = path.join(roadmapContentDir, relevantFileName);

    await fs.promises.writeFile(filePath, `# ${fileTitle}\n\n${content}`);
    console.log(`Successfully processed node ${nodeId}`);
  } catch (error) {
    console.error(`Failed to process node ${node.id}:`, error.message);
  }
};

/**
 * Main function to run the content generation
 * @returns {Promise<void>}
 */
const main = async () => {
  try {
    // Process nodes in parallel with concurrency limit
    const BATCH_SIZE = 20; // Adjust based on API rate limits

    for (let i = 0; i < nodes.length; i += BATCH_SIZE) {
      const batch = nodes.slice(i, i + BATCH_SIZE);
      const promises = batch.map((node) =>
        processNode(node, roadmapContentDir, contentFiles),
      );

      await Promise.allSettled(promises);

      // Add a small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < nodes.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log('Content generation completed');
  } catch (error) {
    console.error('Fatal error in main process:', error);
    process.exit(1);
  }
};

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

main();
