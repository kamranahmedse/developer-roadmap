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

const roadmapId = 'php';

/** @type {Node[]} */
const nodes = [
  {
    "id": "_hYN0gEi9BL24nptEtXWU",
    "text": "PHP > Introduction to PHP"
  },
  {
    "id": "_LhLDVZjLt1DoAP1NuUES",
    "text": "PHP > Introduction to PHP > What is PHP?"
  },
  {
    "id": "b2CuLrhsUNnb4OxI6RRAS",
    "text": "PHP > Introduction to PHP > Evolution and History"
  },
  {
    "id": "6sHRQTcoKL3TlgNJlwyx8",
    "text": "PHP > Introduction to PHP > PHP Versions and Features"
  },
  {
    "id": "3_TuxOSzBuktBlBF05r_z",
    "text": "PHP > Installing PHP"
  },
  {
    "id": "36Y1HkHxhuxh2qVQB8NVE",
    "text": "PHP > WAMP"
  },
  {
    "id": "-wniKEBwbF0Fi1fHpF-Gc",
    "text": "PHP > XAMPP"
  },
  {
    "id": "t7p7TU2khaxsZPYAdwFAA",
    "text": "PHP > MAMP"
  },
  {
    "id": "7LjxtrmgJtTJc0_kP83Tr",
    "text": "PHP > LAMP"
  },
  {
    "id": "hzBUHSuFwLYNooF_vEmrs",
    "text": "PHP > Basic PHP Syntax"
  },
  {
    "id": "D0BtyxyjIBcpfn5wP23WC",
    "text": "PHP > Variables and Scope"
  },
  {
    "id": "srIHPZabaCGdB5VvUXaMa",
    "text": "PHP > Data Types"
  },
  {
    "id": "pzReF4C0mcCWAnpfIJbwl",
    "text": "PHP > Casting Data Types"
  },
  {
    "id": "2ykzBBdYhWuM-neGf0AWP",
    "text": "PHP > echo"
  },
  {
    "id": "NQUmO90sqe7fnzod3Ia8H",
    "text": "PHP > print"
  },
  {
    "id": "wsC7OGXOyfCY4pLLNrR2v",
    "text": "PHP > print_r"
  },
  {
    "id": "JCCeVC0hOrvIeyfg1ScKA",
    "text": "PHP > var_dump"
  },
  {
    "id": "VLRLymQmLfscrBfzXKvHi",
    "text": "PHP > Constants"
  },
  {
    "id": "IhKjvT6CjRz4dsSU7SNQo",
    "text": "PHP > Arrays"
  },
  {
    "id": "j2S8dP3HlAOOoZdpj-7Dx",
    "text": "PHP > Arrays > Indexed Arrays"
  },
  {
    "id": "i_NRsOJNNp7AOqMgu5Jg8",
    "text": "PHP > Arrays > Associative Arrays"
  },
  {
    "id": "uARTOZ-ZwugSmbCJoRS5Y",
    "text": "PHP > Arrays > Multi-dimensional Arrays"
  },
  {
    "id": "38YksjvhXCbgnHqkl57Cz",
    "text": "PHP > Conditionals"
  },
  {
    "id": "-McOv-ZPTGayX7Mx2Thw1",
    "text": "PHP > Conditionals > if/else"
  },
  {
    "id": "bgJ9-m6Fiu3VCc-NZlbpn",
    "text": "PHP > Conditionals > switch"
  },
  {
    "id": "3gNzX-bw2iqur7U7-_W38",
    "text": "PHP > Conditionals > match"
  },
  {
    "id": "w0ntgFBhgGd5RUFd-qlPK",
    "text": "PHP > Conditionals > Null Coalescing Operator"
  },
  {
    "id": "1NXSk8VZDr89jQTTkOL7x",
    "text": "PHP > Conditionals > Null Safe Operator"
  },
  {
    "id": "qwt8xN4vuTrY-D0czYITI",
    "text": "PHP > Loops"
  },
  {
    "id": "WiGv7vi7Mtw-YqPMcnnyw",
    "text": "PHP > Functions"
  },
  {
    "id": "1nODJchgSuWbcvSlxnWeE",
    "text": "PHP > Functions > Function Declaration"
  },
  {
    "id": "mpQKoBzsOa-5iWo08sOhQ",
    "text": "PHP > Functions > Parameters / Return Values"
  },
  {
    "id": "RgVP99rJJ8FVecIA45w20",
    "text": "PHP > Functions > Default / Optional Params"
  },
  {
    "id": "RkNjYva8o_jXp9suz5YdG",
    "text": "PHP > Functions > Named Arguments"
  },
  {
    "id": "Nr5m6wQLp7VyG3AucrSc8",
    "text": "PHP > Functions > Anonymous Functions"
  },
  {
    "id": "x7hA2KAzJIjc-prgCEw6V",
    "text": "PHP > Functions > Callback Functions"
  },
  {
    "id": "mP1BIkqbWVVTU-zZv1ZL6",
    "text": "PHP > Functions > Arrow Functions"
  },
  {
    "id": "D9ybK5INH5zSOcYMb5ZPi",
    "text": "PHP > Functions > Recursion"
  },
  {
    "id": "rtmytETfyyLdcXUC0QyzL",
    "text": "PHP > Functions > Variadic Functions"
  },
  {
    "id": "Kaaqu-mN7xvHN6CbIn616",
    "text": "PHP > File Handling > require"
  },
  {
    "id": "-CyJbsg2ho3RvfzKnJj5C",
    "text": "PHP > File Handling > require_once"
  },
  {
    "id": "hKfv7V6bl2LXssq9Ffi7C",
    "text": "PHP > File Handling > include"
  },
  {
    "id": "SwtLDgyPmDry20qS4FBfH",
    "text": "PHP > File Handling > include_once"
  },
  {
    "id": "S9wTlkbv9-R6dohhZ47hs",
    "text": "PHP > File Operations > Reading Files"
  },
  {
    "id": "two4UycJaCfSp6jQqtTAb",
    "text": "PHP > File Operations > Writing Files"
  },
  {
    "id": "tgIyG6vHWpe9sz6lHmj5a",
    "text": "PHP > File Operations > File Permissions"
  },
  {
    "id": "MRDjEjbkMpk7shcWAoPOF",
    "text": "PHP > File Operations > CSV Processing"
  },
  {
    "id": "DB2cxZE58WCCavW2PNwmf",
    "text": "PHP > File Operations > JSON Processing"
  },
  {
    "id": "ggkWo0DRSSDDkHpbiyUyf",
    "text": "PHP > File Operations > XML Processing"
  },
  {
    "id": "tn_iIfaJZVtPK6vFds7FH",
    "text": "PHP > HTTP / Request Handling > HTTP Methods"
  },
  {
    "id": "GFYGFVfxkOoPI5mI4zSt1",
    "text": "PHP > HTTP / Request Handling > $_GET"
  },
  {
    "id": "qNG-a4iIO-puZsMwAMzYC",
    "text": "PHP > HTTP / Request Handling > $_POST"
  },
  {
    "id": "A6rfW4uJhyfAX2b18_EEC",
    "text": "PHP > HTTP / Request Handling > $_REQUEST"
  },
  {
    "id": "7Ja2at_N9tRTlvSGahrqn",
    "text": "PHP > HTTP / Request Handling > $_SERVER"
  },
  {
    "id": "sYI7f1PYP7G30_Uj2mZRv",
    "text": "PHP > Form Processing"
  },
  {
    "id": "HNo8QO4aPbvgePiA4l6tq",
    "text": "PHP > File Uploads"
  },
  {
    "id": "CGehmZjcgTWC7fQAvxmNW",
    "text": "PHP > State Management"
  },
  {
    "id": "so03-fK7E2WvTm6XsPq4i",
    "text": "PHP > State Management > Cookies"
  },
  {
    "id": "qobzzgzArNHLLn9Oiqc6G",
    "text": "PHP > State Management > Sessions"
  },
  {
    "id": "93oEIZttb85S23C1fLraP",
    "text": "PHP > Basics of Security > Input Validation"
  },
  {
    "id": "801vB_JMas4ucriUmfrLg",
    "text": "PHP > Basics of Security > SQL Injection"
  },
  {
    "id": "DxqQrToZSayWplKdCkTgT",
    "text": "PHP > Basics of Security > XSS Prevention"
  },
  {
    "id": "J9yIXZTtwbFzH2u4dI1ep",
    "text": "PHP > Basics of Security > CSRF Protection"
  },
  {
    "id": "JbWFfJiCRrXDhnuIx_lqx",
    "text": "PHP > Basics of Security > Password Hashing"
  },
  {
    "id": "HJJzKYXdK4BWITLP4APLZ",
    "text": "PHP > Basics of Security > Auth Mechanisms"
  },
  {
    "id": "tfC1tCrbvH5J43WUpG9Yb",
    "text": "PHP > Basics of Security > Sanitization Techniques"
  },
  {
    "id": "cJtPz1RMN1qDE4eRdv4N_",
    "text": "PHP > Database Connectivity > PDO"
  },
  {
    "id": "YLuo0oZJzTCoiZoOSG57z",
    "text": "PHP > Database Connectivity > MySQLi"
  },
  {
    "id": "SeqGIfcLuveZ2z5ZSXcOd",
    "text": "PHP > Advanced Database Techniques > Object-Relational Mapping (ORM)"
  },
  {
    "id": "FY-F6n9j29hQrnFry3VGb",
    "text": "PHP > Advanced Database Techniques > Database Transactions"
  },
  {
    "id": "txUyPR_tdC8iTJV3RtvBz",
    "text": "PHP > Advanced Database Techniques > Connection Pooling"
  },
  {
    "id": "M1nVsh_sCSFJRf6-7Ttsj",
    "text": "PHP > Advanced Database Techniques > Performance Optimization"
  },
  {
    "id": "meplwvmHMtI3Sb_fyodzZ",
    "text": "PHP > Advanced Database Techniques > Database Migrations"
  },
  {
    "id": "yTviiPFR5b_dr3WyxdxxQ",
    "text": "PHP > OOP Fundamentals"
  },
  {
    "id": "PIuplWreo7PFG3Mdn2t6W",
    "text": "PHP > OOP Fundamentals > Classes and Objects"
  },
  {
    "id": "oNUt1oT8pYBVvH0S2P6cb",
    "text": "PHP > OOP Fundamentals > Constructor / Destructor"
  },
  {
    "id": "MRAPXshy9RoYdReY6grf_",
    "text": "PHP > OOP Fundamentals > Properties and Methods"
  },
  {
    "id": "RD2RaBmA2XWkEa13PTCTX",
    "text": "PHP > OOP Fundamentals > Access Specifiers"
  },
  {
    "id": "qlkpwXfOc1p7j37hrzffI",
    "text": "PHP > OOP Fundamentals > Static Methods and Properties"
  },
  {
    "id": "c5q2e_jyMt8Pir5Od3lRi",
    "text": "PHP > OOP Fundamentals > Inheritance"
  },
  {
    "id": "gtq5KrghF28f5G8nuDcYQ",
    "text": "PHP > Polymorphism"
  },
  {
    "id": "ub79EkMiOmPBwXLRuYFL8",
    "text": "PHP > Abstract classes"
  },
  {
    "id": "vu0H-TsD7hkJgOQbSRj92",
    "text": "PHP > Interfaces"
  },
  {
    "id": "GR09ns9B-0cONQaQ_uj-7",
    "text": "PHP > Traits"
  },
  {
    "id": "9raJ06lKRZITbjWeLil-F",
    "text": "PHP > Namespaces"
  },
  {
    "id": "rSXsPWto7Jeyw3Szl9pvf",
    "text": "PHP > Magic methods"
  },
  {
    "id": "sPW-Ti2VyNYzxq6EYkbn7",
    "text": "PHP > Type Declarations"
  },
  {
    "id": "KEE50C6lOS4eX8sAbfhYe",
    "text": "PHP > Dependency injection"
  },
  {
    "id": "zsscRQZIq5o0JZir9hlz-",
    "text": "PHP > Laravel"
  },
  {
    "id": "57VSMVePOr9qUD5x_LNdf",
    "text": "PHP > Symfony"
  },
  {
    "id": "yVFDu2aTiEZ4PWMdKdW2P",
    "text": "PHP > Composer"
  },
  {
    "id": "xZf2jjnCVHwYfDH2hs9kR",
    "text": "PHP > Packagist"
  },
  {
    "id": "qFiTsf6Es-gwqe6J6bdL1",
    "text": "PHP > Autoloading"
  },
  {
    "id": "NfBKKwG2GGBPppOjoLLBg",
    "text": "PHP > PHPUnit"
  },
  {
    "id": "d6MydchA52HIxfAUjmZui",
    "text": "PHP > Pest"
  },
  {
    "id": "6eWgZVLV479oQzl0fu-Od",
    "text": "PHP > Style Tools"
  },
  {
    "id": "fSpvZ_4kGFMbFVCWhA8vn",
    "text": "PHP > Style Tools > PHPCodeSniffer"
  },
  {
    "id": "r07k_hT2z2EiIBH4q3F7-",
    "text": "PHP > Style Tools > PHP CS Fixer"
  },
  {
    "id": "PrG_5dyBblXsWYYRcOJMa",
    "text": "PHP > Static Analysis"
  },
  {
    "id": "12k71gNfwAcT9K5aLWgbZ",
    "text": "PHP > Static Analysis > PHPStan"
  },
  {
    "id": "T1XD93j6Lkpl88JSmys9b",
    "text": "PHP > Static Analysis > Psalm"
  },
  {
    "id": "B45YVzov8X_iOtneiFEqa",
    "text": "PHP > Static Analysis > Phan"
  },
  {
    "id": "KC6D81-T-FwQc7Osw1rlY",
    "text": "PHP > External Integrations > cURL"
  },
  {
    "id": "_Al4NXKVQAnk8OikwvXCL",
    "text": "PHP > External Integrations > Guzzle"
  },
  {
    "id": "SD9k16UlVve9WtNMDA5Za",
    "text": "PHP > PHP-FIG"
  },
  {
    "id": "3tONibbRgK7HCwGTE2Gqw",
    "text": "PHP > PHP-FIG > PSR Standards"
  },
  {
    "id": "_Dh78x_tPLqZweg--qZFQ",
    "text": "PHP > Performance Optimization > Profiling Techniques"
  },
  {
    "id": "Av-BMa57RvrLlAXLffOH0",
    "text": "PHP > Performance Optimization > Caching Strategies"
  },
  {
    "id": "bt7dK2PcOZ72B9HXPyMwL",
    "text": "PHP > Performance Optimization > Memory Management"
  },
  {
    "id": "VpwwF8j5ZtXVSbzNfE7Sx",
    "text": "PHP > Performance Optimization > Configuration Tuning"
  },
  {
    "id": "NieqZd1juaNYoZOrB7e31",
    "text": "PHP > Performance Optimization > Opcode Caching"
  },
  {
    "id": "AoGS-5MSkp8gtJFQVPSBE",
    "text": "PHP > Performance Optimization > PHP-FPM"
  },
  {
    "id": "qp5Xi12c0qcSzTanzJq0Z",
    "text": "PHP > System Interactions"
  },
  {
    "id": "VhyYNGhOdKKrz_-uTkrjD",
    "text": "PHP > System Interactions > Executing System Commands"
  },
  {
    "id": "NTKUMgsKGYISIyhgOJPQn",
    "text": "PHP > System Interactions > Process Control"
  },
  {
    "id": "fitjnLYKLHJ2P5G7JAvzm",
    "text": "PHP > System Interactions > Environment Variables"
  },
  {
    "id": "DTaAZaU1CwzW7esoDhj85",
    "text": "PHP > System Interactions > Configuration Files"
  },
  {
    "id": "lFoHoMRywCWa056ii5cKQ",
    "text": "PHP > Debugging Tools > Xdebug"
  },
  {
    "id": "KpQb5Zh3GUcbYUyXHvyu2",
    "text": "PHP > Debugging Tools > Zend Debugger"
  },
  {
    "id": "KMQqePqAjQ-ReDwHqeofx",
    "text": "PHP > Web Servers > Apache"
  },
  {
    "id": "aspZpACHEKOsi_Er5FYPY",
    "text": "PHP > Web Servers > Nginx"
  }
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
  User will give you roadmap topics in the form of "Parent > Child > Leaf". You need
  to generate content for the last node in the hierarchy in relation to the parents.
  Remember that you are explaining the topics for PHP showing what the given topic is
  with respect to PHP and giving a short code sample ONLY when required. 
  Also, I hate it when you say "In the realm of..." 
  or "In the context of..." or "..in the context of..." or "when we talk about..." or something
  similar.
  Content should be helpful and engaging for a technical audience.
  It can include things like (you can include more or less, depending on the topic):
    - Briefly explain the given topic in relation to PHP.
    - Code sample if applicable.
    - Add a link to PHP documentation
  The content should be a a single textual paragraph.
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
      model: 'gpt-4',
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
