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

const roadmapId = 'engineering-manager';

/** @type {Node[]} */
const nodes = [
  {
    id: 'oKbeLp4YB8rI1Q3vi0EnG',
    text: 'Engineering Manager > What is Engineering Management? > EM vs Tech Lead vs IC',
  },
  {
    id: 'aSZ2uVCmpAdEPjJt6VKG4',
    text: 'Engineering Manager > What is Engineering Management? > People',
  },
  {
    id: 'p9ecMvHCqjmvxf67di7pY',
    text: 'Engineering Manager > What is Engineering Management? > Product',
  },
  {
    id: 'iZFn0FaRdrGv_-_8zii_-',
    text: 'Engineering Manager > What is Engineering Management? > Process',
  },
  {
    id: 'fBENrXdMhoGYgL_d96tgo',
    text: 'Engineering Manager > Software Engineering Background',
  },
  {
    id: 'iX4HPgoiEbc_gze1A01n4',
    text: 'Engineering Manager >  > System Design and Architecture',
  },
  {
    id: 'EY6Hk5wPd9Y_VA1UROk44',
    text: 'Engineering Manager > Technical Debt and Management',
  },
  {
    id: '40yK6XzI8lSxdiAXxtF75',
    text: 'Engineering Manager > Code Review Best Practices',
  },
  {
    id: '_2xnTKt5yi__jj_WgcLa7',
    text: 'Engineering Manager > Technical Documentation',
  },
  {
    id: 'ikCJ8Ybu2AD1w5VuPNVAO',
    text: 'Engineering Manager > Technical Strategy > Technical Roadmapping',
  },
  {
    id: 'FtWNnOE3zObmjS-Og26M3',
    text: 'Engineering Manager > Technical Strategy > Architectural Decision-Making',
  },
  {
    id: 'H0aav5qKDNiNegJOGP2rx',
    text: 'Engineering Manager > Technical Strategy > Build vs Buy Evaluation',
  },
  {
    id: 'd7zMBhMFgY9MwmKC9CVVh',
    text: 'Engineering Manager > Technical Strategy > Technical Risk Assessment',
  },
  {
    id: 'EyoVFmqOJbH1sAPHLISFt',
    text: 'Engineering Manager > Technical Strategy > Scaling Infrastructure',
  },
  {
    id: 'QUxpEK8smXRBs2gMdDInB',
    text: 'Engineering Manager > Technical Strategy > Legacy System Retirement',
  },
  {
    id: 'pduPcv2QPpVmVvDdK4CPi',
    text: 'Engineering Manager > Quality and Process > System Monitoring & Performance',
  },
  {
    id: 'gAEmpSMvNyjmTa5q9oZSg',
    text: 'Engineering Manager > Quality and Process > CI/CD Implementation',
  },
  {
    id: 'bpJPDbifPwS4ScOoATlEI',
    text: 'Engineering Manager > Quality and Process > Development / Release Workflow',
  },
  {
    id: 'q5SJyM1d8cQzzAcR-kotB',
    text: 'Engineering Manager > Quality and Process > Testing Strategies',
  },
  {
    id: 'C2YsaZ32An_UXV8lB7opm',
    text: 'Engineering Manager > Quality and Process > Technical Standards Setting',
  },
  {
    id: 'sQCLhk__jvbityuuLlxiW',
    text: 'Engineering Manager > Quality and Process > Security  Best Practices',
  },
  {
    id: 'o1xPrfg8iNWQpD12xsbQJ',
    text: 'Engineering Manager > Quality and Process > Incident Management',
  },
  {
    id: '3na5mBIPl5f6mjEzkgD_C',
    text: 'Engineering Manager > People Management > Hiring and Recruitment',
  },
  {
    id: 'tPDmXXjvFI_8-MTo_dEUw',
    text: 'Engineering Manager > People Management > Team Structure and Design',
  },
  {
    id: 'eJzYnoB6sArLjXRm51cM4',
    text: 'Engineering Manager > People Management > Performance Evaluations',
  },
  {
    id: 'fhFSR_N4ZDTHINEinubHG',
    text: 'Engineering Manager > People Management > Career Development Planning',
  },
  {
    id: '0ULnfq0ZFJXgoLbKM1gxC',
    text: 'Engineering Manager > People Management > Mentoring and Coaching',
  },
  {
    id: 'bx2SMhR58ud45se5dK7qS',
    text: 'Engineering Manager > People Management > Delegation',
  },
  {
    id: 'QA5CR5f0geC_RQc_SOK-N',
    text: 'Engineering Manager > Leadership Skills > Conflict Resolution',
  },
  {
    id: 'Az9GgkLFoat2t_sYRUBv5',
    text: 'Engineering Manager > Leadership Skills > Feedback Delivery',
  },
  {
    id: 'U_oOnDXkCE387r9olvMZB',
    text: 'Engineering Manager > Leadership Skills > Team Motivation',
  },
  {
    id: '7PBmYoSmIgZT21a2Ip3_S',
    text: 'Engineering Manager > Leadership Skills > Trust / Influence Building',
  },
  {
    id: 'h7gEQNbGiabDA1q1Bk_IB',
    text: 'Engineering Manager > Leadership Skills > Emotional Intelligence',
  },
  {
    id: 'b3qoH_LuW-Gz4N8WdGnZs',
    text: 'Engineering Manager > Communication > One-on-One Meetings',
  },
  {
    id: 'C2EQ8JMyK6b4PvgK5TpXb',
    text: 'Engineering Manager > Communication',
  },
  {
    id: 'e0ZuiCoS8sJ0XB1lNiz7_',
    text: 'Engineering Manager > Team Meetings',
  },
  {
    id: 'gqKEgKjEu5sOf5Gl-HS-j',
    text: 'Engineering Manager > Communication > Status Reporting',
  },
  {
    id: 'TVqVlJqegLZRSkwNoHbBf',
    text: 'Engineering Manager > Communication > Stakeholder Management',
  },
  {
    id: 'ZuZuzwy-Frsn_PFJZVuAQ',
    text: 'Engineering Manager > Communication > Cross-functional Collaboration',
  },
  {
    id: 'jt-LF5QbGVs0cwTuHFQF6',
    text: 'Engineering Manager > Project Management',
  },
  {
    id: '4v5yLKYVcMh0s7SQuf__C',
    text: 'Engineering Manager > Project Management > Resource Allocation',
  },
  {
    id: '7BcToTqL78QmG4qb43X5Q',
    text: 'Engineering Manager > Project Management > Sprint Planning',
  },
  {
    id: '-Qc6E3gkUUonfzifYqeJJ',
    text: 'Engineering Manager > Project Management > Release Management',
  },
  {
    id: 'mgw6M8I9qy1EoJpJV-gy1',
    text: 'Engineering Manager > Project Management > Risk Management',
  },
  {
    id: 'hH-UDVFlgKoMJcI1ssDFv',
    text: 'Engineering Manager > Project Management > Dependency management',
  },
  {
    id: 'n9gvPHn4c1U-l6v-W9v6r',
    text: 'Engineering Manager > Project Management > Agile methodologies',
  },
  {
    id: 'SuT6q5lMMSyVkadlQp7iU',
    text: 'Engineering Manager > Project Management > Project Tracking',
  },
  {
    id: 'PXobPGPgCX3_55w4UtxT9',
    text: 'Engineering Manager > Project Management > Milestone Management',
  },
  {
    id: 'C-lJJSjT8Cxw_UT3ocFsO',
    text: 'Engineering Manager > Project Management > Scope Management',
  },
  {
    id: 'QWO5QFS7kXwfu3aa8IiRt',
    text: 'Engineering Manager > Project Management > Timeline Estimation',
  },
  {
    id: 'Wd8FCEaGZBTvsD-k4t0r4',
    text: 'Engineering Manager > Project Management > KPI Definition',
  },
  {
    id: 'idd92ZTBVUzptBl5jRdc3',
    text: 'Engineering Manager > Project Management > Measurement > Velocity Tracking',
  },
  {
    id: 'ZWWsuFm_G4kvvl_cv8l_t',
    text: 'Engineering Manager > Project Management > Measurement > Quality Metrics',
  },
  {
    id: 'ZWWsuFm_G4kvvl_cv8l_t',
    text: 'Engineering Manager > Project Management > Measurement > Quality Metrics',
  },
  {
    id: 'KPDHk7tl_BnIj_obnq3Kl',
    text: 'Engineering Manager > Project Management > Measurement > Team Health Metrics',
  },
  {
    id: 'g9WWa50V8ZbhIJgBRx0Nd',
    text: 'Engineering Manager > Project Management > Measurement > Project Postmortems',
  },
  {
    id: 'nC5dfGlxbLoXUAp2u-6Gl',
    text: 'Engineering Manager > Strategic Thinking > Product strategy alignment',
  },
  {
    id: 'vhOHvfF_lfQrrOK6sGLTY',
    text: 'Engineering Manager > Strategic Thinking > Business Case Development',
  },
  {
    id: 'XinUWPahOdufmLYcEwMj_',
    text: 'Engineering Manager > Strategic Thinking > ROI analysis',
  },
  {
    id: 'P2gIOt-i0sQEOMBo-XjZO',
    text: 'Engineering Manager >  > Market awareness',
  },
  {
    id: '76GjwwEYaEX_kh02OSpdr',
    text: 'Engineering Manager > Strategic Thinking > Competitive Analysis',
  },
  {
    id: 'TQY4hjo56rDdlbzjs_-nl',
    text: 'Engineering Manager > Strategic Thinking > Competitive Analysis',
  },
  {
    id: 'KA0y6KdVTjJFeX3frHUNo',
    text: 'Engineering Manager > Organizational Awareness > Company Culture',
  },
  {
    id: 'tt02qGHSn4fPbpboZ1Ni_',
    text: 'Engineering Manager > Organizational Awareness > Change management',
  },
  {
    id: 'mjMRNhPkeb4lEZXBb8Iot',
    text: 'Engineering Manager > Organizational Awareness > Organization structure',
  },
  {
    id: 'Zoz01JcNU69gr95IcWhYM',
    text: 'Engineering Manager > Organizational Awareness > Politics navigation',
  },
  {
    id: 'Hb_rZe4k37Rr0enSh7woV',
    text: 'Engineering Manager > Organizational Awareness > Cross-department collaboration',
  },
  {
    id: 'oqjr26B27SHSYVQ4IFnA1',
    text: 'Engineering Manager > Financial Management > Budget Planning',
  },
  {
    id: 'iwwxnSVvCmZ57stXwzk8G',
    text: 'Engineering Manager > Financial Management > Resource forecasting',
  },
  {
    id: 'rbhZJZtRV1ZZ5QaYW77ry',
    text: 'Engineering Manager > Financial Management > Cost Optimization',
  },
  {
    id: 'Imgt669vbUT_Iec2o4Gvt',
    text: 'Engineering Manager > Financial Management > Vendor Management',
  },
  {
    id: 'ZuZuzwy-Frsn_PFJZVuAQ',
    text: 'Engineering Manager > Team Culture > Defining and Enforcing Values',
  },
  {
    id: '6iM0n4faMNhk4mezS9AcG',
    text: 'Engineering Manager > Team Culture > Inclusive environment creation',
  },
  {
    id: '8Nro6PTkEkNugYBjQfJ6O',
    text: 'Engineering Manager > Team Culture > Team Traditions and Rituals',
  },
  {
    id: 'Vb3A4a-UpGTAEs-dVI66s',
    text: 'Engineering Manager > Team Culture > Recognition programs',
  },
  {
    id: 'LE3ykySYFL23KvuwxeBaR',
    text: 'Engineering Manager > Team Culture > Social connections',
  },
  {
    id: 'g9FvFKC715tZL2ZGlPl3N',
    text: 'Engineering Manager > Team Culture > Bias Recognition / Mitigation',
  },
  {
    id: 'njqjYPMQK3nGYtqHzUylo',
    text: 'Engineering Manager > Engineering Culture > Innovation fostering',
  },
  {
    id: 'aeD-kBZEr1NHFtAD8yHI_',
    text: 'Engineering Manager > Engineering Culture > Learning culture development',
  },
  {
    id: '74-7hDXaBVXYo6LJdgac_',
    text: 'Engineering Manager > Engineering Culture > Knowledge sharing practices',
  },
  {
    id: 'Cq0OFaWqSRathZO-bxBrP',
    text: 'Engineering Manager > Engineering Culture > Technical excellence mindset',
  },
  {
    id: 'fYkKo8D35AHd8agr3YrIP',
    text: 'Engineering Manager >  > Blameless Post-mortems',
  },
  {
    id: 'Xaeb67Nqdi0kwvehQUYeJ',
    text: 'Engineering Manager > Incident Response > Emergency protocols',
  },
  {
    id: 'LQ3YfAgJ4UaDgtnN-cMht',
    text: 'Engineering Manager > Incident Response > War Room Management',
  },
  {
    id: 'irEwTIubCjORnlH27QpEo',
    text: 'Engineering Manager > Incident Response > Stakeholder Communication',
  },
  {
    id: '2fHcb1dAnf34APCAAlwnR',
    text: 'Engineering Manager > Incident Response > Service Recovery',
  },
  {
    id: '8zyK34SwHry2lrWchw0KZ',
    text: 'Engineering Manager > Incident Response > Post-incident analysis',
  },
  {
    id: '2RwpGPegD2GyiiV6SVbbM',
    text: 'Engineering Manager > Risk Mitigation > Contingency planning',
  },
  {
    id: 'KOTzJ8e7mc0wmF46vrj3I',
    text: 'Engineering Manager > Risk Mitigation > Disaster recovery',
  },
  {
    id: 'v6N7BH0B55gX0oNXb55D7',
    text: 'Engineering Manager > Risk Mitigation > Business continuity',
  },
  {
    id: 'FNp4-RgPvfC76pJKjX56a',
    text: 'Engineering Manager > Risk Mitigation > Security incident handling',
  },
  {
    id: 'kQG_wk66-51dA4Ly9ivjM',
    text: 'Engineering Manager > Risk Mitigation > Production issues management',
  },
  {
    id: 'mIUx8zAHWyPWPGvxuTK4y',
    text: 'Engineering Manager > Team Support > Contingency planning',
  },
  {
    id: 'nnoVA8W70hrNDxN3XQCVL',
    text: 'Engineering Manager > Team Support > Disaster recovery',
  },
  {
    id: 'FwK-B7jRbBXVnuY9JxI1w',
    text: 'Engineering Manager > Team Support > Business continuity',
  },
  {
    id: 'QFhhOgwz_bgZgOfKFg5XA',
    text: 'Engineering Manager > Team Support > Security incident handling',
  },
  {
    id: 'tmY4Ktu6luFg5wKylJW76',
    text: 'Engineering Manager > Team Support > Production issues management',
  },
  {
    id: 'WYoqfmk5ejB2UOiYXh4Zi',
    text: 'Engineering Manager > Partner Management > Vendor relationships',
  },
  {
    id: 'xMN575nnnQJeHe2oJYw17',
    text: 'Engineering Manager > Partner Management > Technology partnerships',
  },
  {
    id: 'f3P0fF4UzgVQZuMVTVmP1',
    text: 'Engineering Manager > Partner Management > Integration management',
  },
  {
    id: 'ukmMMWacekcejEiEKCLzh',
    text: 'Engineering Manager > Partner Management > API strategy',
  },
  {
    id: 'Jctp5tPCK_vY35_bh7QFk',
    text: 'Engineering Manager > Partner Management > External collaboration',
  },
  {
    id: 'QEViLNgG4Uv9Q9PWig0u3',
    text: 'Engineering Manager > Customer Relations > Customer feedback integration',
  },
  {
    id: 'V5s2i-L2tsZFNxMLN_e_U',
    text: 'Engineering Manager > Customer Relations > Technical customer support',
  },
  {
    id: 'A-Aa7VdDAYfaMUZD_cWwP',
    text: 'Engineering Manager > Customer Relations > Customer success alignment',
  },
  {
    id: '2QwMcO27H3ygtLlWVplxr',
    text: 'Engineering Manager > Customer Relations > Feature prioritization',
  },
  {
    id: 'tCT2syTMyEHCspDLXxk6R',
    text: 'Engineering Manager > Customer Relations > Technical partnerships',
  },
  {
    id: '5MM1ccB1pmQcd3Uyjmbr7',
    text: 'Engineering Manager > Executive Communication > Board presentations',
  },
  {
    id: 'CHothgVl8ulFthwS7uKqK',
    text: 'Engineering Manager > Executive Communication > Executive summaries',
  },
  {
    id: 'uBrsV_EocAkRWEqJYjoZn',
    text: 'Engineering Manager > Executive Communication > Strategic proposals',
  },
  {
    id: 'pLUOU2AmAJ9aJAmIlVD7D',
    text: 'Engineering Manager > Executive Communication > Budget requests',
  },
  {
    id: 'QssXmeifoI3dtu-eXp8PK',
    text: 'Engineering Manager > Executive Communication > Vision alignment',
  },
  {
    id: 'gHhNi32MSBmqk-oKOy-uj',
    text: 'Engineering Manager > Knowledge Management > Documentation > Architecture documentation',
  },
  {
    id: 'Kwy9O1z2hpeE0Sb3qtxEg',
    text: 'Engineering Manager > Knowledge Management > Documentation > Process documentation',
  },
  {
    id: 'dTjp_rEl1ITZjvELqVtfv',
    text: 'Engineering Manager > Knowledge Management > Documentation > Decision records',
  },
  {
    id: '4-MCXFOkMGcN369OPG-vw',
    text: 'Engineering Manager > Knowledge Management > Documentation > Best Practices',
  },
  {
    id: '4-MCXFOkMGcN369OPG-vw',
    text: 'Engineering Manager > Knowledge Management > Documentation > Best Practices',
  },
  {
    id: 'HUQ_-vU2pdBPyF0mBocHz',
    text: 'Engineering Manager > Knowledge Management > Documentation > Lessons Learned',
  },
  {
    id: 'g6K9fxWdRQT5h_u4Y_bkq',
    text: 'Engineering Manager > Knowledge Management > Knowledge Transfer > Mentoring Programs',
  },
  {
    id: '7t9jmv3_lRCEG5y5DA8bF',
    text: 'Engineering Manager > Knowledge Management > Knowledge Transfer > Knowledge bases',
  },
  {
    id: '2LO0iWf-y3l4rA1n_oG1g',
    text: 'Engineering Manager > Knowledge Management > Knowledge Transfer > Tech Talks',
  },
  {
    id: 'S8-nwYKlG7YHL2dWwR303',
    text: 'Engineering Manager > Knowledge Management > Knowledge Transfer > Brown Bags',
  },
  {
    id: 'QMAIEkVFHrrP6lUWvd0S8',
    text: 'Engineering Manager > Change Management > Technical Change > Migration planning',
  },
  {
    id: '9mNLfntu1TPjcX3RoUeMq',
    text: 'Engineering Manager > Change Management > Technical Change > Legacy system retirement',
  },
  {
    id: 'jerPoyfCcwZbNuE_cl1hq',
    text: 'Engineering Manager > Change Management > Technical Change > Technology adoption',
  },
  {
    id: 'f-52wRfPRrA9iniOMYQB7',
    text: 'Engineering Manager > Change Management > Technical Change > Tool transitions',
  },
  {
    id: 'ev9ZKygqETctLMSt1GAFU',
    text: 'Engineering Manager > Change Management > Technical Change > Process changes',
  },
  {
    id: '1__zRE1iu1FDX9ynpWSBS',
    text: 'Engineering Manager > Change Management > Organizational Change > Change strategy',
  },
  {
    id: 'oGmtkOGVgA4huGJqkBEfj',
    text: 'Engineering Manager > Change Management > Organizational Change > Impact assessment',
  },
  {
    id: '34uOnta7dKOyZL0et_RC8',
    text: 'Engineering Manager > Change Management > Organizational Change > Stakeholder management',
  },
  {
    id: 'Mxi4g_PzT0oYc3NgR0UVg',
    text: 'Engineering Manager > Change Management > Organizational Change > Communication planning',
  },
  {
    id: 'Mxi4g_PzT0oYc3NgR0UVg',
    text: 'Engineering Manager > Change Management > Organizational Change > Communication planning',
  },
  {
    id: 'vfp6VmWnhpre_eDORg7ht',
    text: 'Engineering Manager > Change Management > Organizational Change > Resistance management',
  },
  {
    id: '5_CE3p5jMA1uEqFNfp7Kh',
    text: 'Engineering Manager > Change Management >  > Reorganizations',
  },
  {
    id: 'ph0U4l2alVJ8lUJ96q7co',
    text: 'Engineering Manager > Change Management > Team Change > Team mergers',
  },
  {
    id: 'FayHWdUHHYFFBwnXx37Gk',
    text: 'Engineering Manager > Change Management > Team Change > Role transitions',
  },
  {
    id: 'eIlW4mZKNQfBsTDmZf7ex',
    text: 'Engineering Manager > Change Management > Team Change > Responsibility shifts',
  },
  {
    id: 'y7YHIz7OI4sNfC_nhfLcu',
    text: 'Engineering Manager > Change Management > Team Change > Culture evolution',
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
  User will give you roadmap topics in the form of "Parent > Child > Leaf". You need
  to generate content for the last node in the hierarchy in relation to the parents.
  Remember that you are describing how an Engineering Manager interacts with or handles
  the given topic, not just explaining the topic itself. You may explain why the given
  topic is important in an engineering team. Also, I hate it when you say "In the realm of..." 
  or "In the context of..." or "..in the context of..." or "when we talk about..." or something
  similar.
  Content should be helpful and engaging for a technical audience.
  It can include things like (you can include more or less, depending on the topic):
    - How does an Engineering Manager work with or handle this area?
    - What are their key responsibilities related to this topic?
    - What challenges do they face and how do they address them?
    - What skills and approaches are needed to succeed in this aspect?
  The content should be a short textual paragraph that is NO MORE THAN 100 words.
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
