import './AIChat.css';
import {
  ArrowDownIcon,
  FileUpIcon,
  PersonStandingIcon,
  SendIcon,
  TrashIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AutogrowTextarea from 'react-textarea-autosize';
import { QuickHelpPrompts } from './QuickHelpPrompts';
import { QuickActionButton } from './QuickActionButton';
import { getAiCourseLimitOptions } from '../../queries/ai-course';
import { isLoggedIn, removeAuthToken } from '../../lib/jwt';
import type { AIChatHistoryType } from '../GenerateCourse/AICourseLessonChat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../stores/query-client';
import { billingDetailsOptions } from '../../queries/billing';
import { useToast } from '../../hooks/use-toast';
import { readStream } from '../../lib/ai';
import { markdownToHtmlWithHighlighting } from '../../lib/markdown';
import { ChatHistory } from './ChatHistory';
import { PersonalizedResponseForm } from './PersonalizedResponseForm';
import { userPersonaOptions } from '../../queries/user-persona';
import { UploadResumeModal } from './UploadResumeModal';
import { userResumeOptions } from '../../queries/user-resume';
import { httpPost } from '../../lib/query-http';

const defaultAiChatHistory: AIChatHistoryType[] = [
  {
    role: 'user',
    content: 'What roadmap should I pick?',
  },
  {
    role: 'assistant',
    content:
      "Okay, based on your experience and interests, here are a few roadmap recommendations, along with explanations:\n\n*   **DevOps:** Since you are currently working as a Software Engineer at roadmap.sh and have experience with system architecture, the DevOps roadmap ([https://roadmap.sh/devops](https://roadmap.sh/devops)) would be a great fit. It covers essential topics like Linux, networking, cloud providers (AWS, Azure, GCP), CI/CD, infrastructure as code, and more. This roadmap can help you deepen your understanding of the infrastructure and deployment aspects of software development, complementing your full-stack skills.\n\n*   **Full Stack:** Given your full-stack background, the Full Stack roadmap ([https://roadmap.sh/full-stack](https://roadmap.sh/full-stack)) could be beneficial. It provides a comprehensive overview of both frontend and backend technologies, along with databases and other essential tools. This roadmap can help you identify any gaps in your knowledge and ensure you have a well-rounded skillset.\n\n*   **Frontend/Backend:** Since you have experience as a Frontend Developer, you could choose the Backend roadmap ([https://roadmap.sh/backend](https://roadmap.sh/backend)) to learn more about that. Alternatively, you could choose the Frontend roadmap ([https://roadmap.sh/frontend](https://roadmap.sh/frontend)) to dive deeper into that.\n\n*   **Software Architect:** Given your experience in building scalable applications, you might find the Software Architect roadmap ([https://roadmap.sh/software-architect](https://roadmap.sh/software-architect)) interesting. This roadmap focuses on the principles and practices of designing robust, scalable, and maintainable software systems.\n\n*   **AI Engineer:** Considering your interest in innovative solutions, the AI Engineer roadmap ([https://roadmap.sh/ai-engineer](https://roadmap.sh/ai-engineer)) could be a good choice. It covers the fundamentals of AI, machine learning, deep learning, and related tools and technologies.\n\nUltimately, the best roadmap for you depends on your specific goals and interests. Do any of these options sound particularly appealing, or is there a specific area you're hoping to focus on?\n",
    html: '<p>Okay, based on your experience and interests, here are a few roadmap recommendations, along with explanations:</p>\n<ul>\n<li>\n<p><strong>DevOps:</strong> Since you are currently working as a Software Engineer at <a href="http://roadmap.sh" target="_blank">roadmap.sh</a> and have experience with system architecture, the DevOps roadmap (<a href="https://roadmap.sh/devops" target="_blank">https://roadmap.sh/devops</a>) would be a great fit. It covers essential topics like Linux, networking, cloud providers (AWS, Azure, GCP), CI/CD, infrastructure as code, and more. This roadmap can help you deepen your understanding of the infrastructure and deployment aspects of software development, complementing your full-stack skills.</p>\n</li>\n<li>\n<p><strong>Full Stack:</strong> Given your full-stack background, the Full Stack roadmap (<a href="https://roadmap.sh/full-stack" target="_blank">https://roadmap.sh/full-stack</a>) could be beneficial. It provides a comprehensive overview of both frontend and backend technologies, along with databases and other essential tools. This roadmap can help you identify any gaps in your knowledge and ensure you have a well-rounded skillset.</p>\n</li>\n<li>\n<p><strong>Frontend/Backend:</strong> Since you have experience as a Frontend Developer, you could choose the Backend roadmap (<a href="https://roadmap.sh/backend" target="_blank">https://roadmap.sh/backend</a>) to learn more about that. Alternatively, you could choose the Frontend roadmap (<a href="https://roadmap.sh/frontend" target="_blank">https://roadmap.sh/frontend</a>) to dive deeper into that.</p>\n</li>\n<li>\n<p><strong>Software Architect:</strong> Given your experience in building scalable applications, you might find the Software Architect roadmap (<a href="https://roadmap.sh/software-architect" target="_blank">https://roadmap.sh/software-architect</a>) interesting. This roadmap focuses on the principles and practices of designing robust, scalable, and maintainable software systems.</p>\n</li>\n<li>\n<p><strong>AI Engineer:</strong> Considering your interest in innovative solutions, the AI Engineer roadmap (<a href="https://roadmap.sh/ai-engineer" target="_blank">https://roadmap.sh/ai-engineer</a>) could be a good choice. It covers the fundamentals of AI, machine learning, deep learning, and related tools and technologies.</p>\n</li>\n</ul>\n<p>Ultimately, the best roadmap for you depends on your specific goals and interests. Do any of these options sound particularly appealing, or is there a specific area you\'re hoping to focus on?</p>\n',
  },
  {
    role: 'user',
    content: 'Can you gimme some example?',
  },
  {
    role: 'assistant',
    content:
      'Okay, let\'s break down how you might use a roadmap with some concrete examples, focusing on the DevOps roadmap since that seems like a strong fit for your current role and experience.\n\n**Scenario:** You want to improve the deployment process for roadmap.sh, making it more automated and reliable.\n\n1.  **Choose the Roadmap:** Select the DevOps roadmap ([https://roadmap.sh/devops](https://roadmap.sh/devops)).\n\n2.  **Identify Relevant Sections:** Scan the roadmap and identify sections related to your goal. In this case, the following sections would be highly relevant:\n\n    *   **CI/CD (Continuous Integration/Continuous Deployment):** This section covers tools and concepts for automating the build, test, and deployment process.\n    *   **Containerization:** Focus on Docker.\n    *   **Orchestration:** Focus on Kubernetes.\n    *   **Infrastructure as Code:** This section covers tools like Terraform or Ansible for managing infrastructure in a declarative and automated way.\n    *   **Cloud Providers:** Since you\'re deploying roadmap.sh, focus on the relevant cloud provider (e.g., AWS, Azure, or GCP).\n\n3.  **Deep Dive and Learn:**\n\n    *   **CI/CD:**\n        *   **Goal:** Implement a CI/CD pipeline using GitHub Actions to automatically build, test, and deploy code changes to a staging environment.\n        *   **Steps:**\n            1.  Learn the basics of CI/CD concepts.\n            2.  Explore GitHub Actions syntax and features.\n            3.  Configure a `workflow` in your `.github/workflows` directory to trigger on `push` events to the `main` branch.\n            4.  Add steps to build your application, run tests, and deploy to a staging environment.\n        *   **Example:** Your GitHub Actions workflow might look something like this:\n\n            ```yaml\n            name: CI/CD Pipeline\n            on:\n              push:\n                branches: [ main ]\n            jobs:\n              build:\n                runs-on: ubuntu-latest\n                steps:\n                  - uses: actions/checkout@v3\n                  - name: Set up Node.js\n                    uses: actions/setup-node@v3\n                    with:\n                      node-version: 16\n                  - name: Install dependencies\n                    run: npm install\n                  - name: Run tests\n                    run: npm test\n              deploy:\n                needs: build\n                runs-on: ubuntu-latest\n                steps:\n                  - name: Deploy to staging\n                    run: # Your deployment script here (e.g., using SSH, rsync, or a cloud provider CLI)\n            ```\n\n    *   **Infrastructure as Code (Terraform):**\n        *   **Goal:** Provision and manage your staging environment infrastructure using Terraform.\n        *   **Steps:**\n            1.  Learn the basics of Terraform syntax and concepts.\n            2.  Install the Terraform CLI.\n            3.  Create Terraform configuration files (`.tf`) to define your infrastructure resources (e.g., servers, databases, networking).\n            4.  Use `terraform init`, `terraform plan`, and `terraform apply` to provision your infrastructure.\n        *   **Example:** A simple Terraform configuration to create an AWS EC2 instance:\n\n            ```terraform\n            resource "aws_instance" "example" {\n              ami           = "ami-0c55b246476699c3f" # Replace with a valid AMI ID\n              instance_type = "t2.micro"\n              tags = {\n                Name = "staging-server"\n              }\n            }\n            ```\n\n4.  **Iterate and Expand:** Once you\'ve successfully automated the deployment to a staging environment, you can expand your CI/CD pipeline to include production deployments, automated rollbacks, and more sophisticated testing. You can also use Terraform to manage more complex infrastructure components.\n\n**Key Takeaways:**\n\n*   **Focus on Practical Goals:** Choose a roadmap and then identify specific, achievable goals that align with your work or interests.\n*   **Break Down the Roadmap:** Don\'t try to learn everything at once. Focus on the sections that are most relevant to your current goal.\n*   **Hands-on Practice:** The most effective way to learn is by doing. Experiment with the tools and technologies you\'re learning about.\n*   **Iterate and Refine:** Continuously improve your skills and processes based on your experiences.\n\nDoes this example help illustrate how you can use a roadmap to guide your learning? Let me know if you\'d like another example, perhaps focused on a different roadmap or a different scenario.\n',
    html: '<p>Okay, let\'s break down how you might use a roadmap with some concrete examples, focusing on the DevOps roadmap since that seems like a strong fit for your current role and experience.</p>\n<p><strong>Scenario:</strong> You want to improve the deployment process for <a href="http://roadmap.sh" target="_blank">roadmap.sh</a>, making it more automated and reliable.</p>\n<ol>\n<li>\n<p><strong>Choose the Roadmap:</strong> Select the DevOps roadmap (<a href="https://roadmap.sh/devops" target="_blank">https://roadmap.sh/devops</a>).</p>\n</li>\n<li>\n<p><strong>Identify Relevant Sections:</strong> Scan the roadmap and identify sections related to your goal. In this case, the following sections would be highly relevant:</p>\n<ul>\n<li><strong>CI/CD (Continuous Integration/Continuous Deployment):</strong> This section covers tools and concepts for automating the build, test, and deployment process.</li>\n<li><strong>Containerization:</strong> Focus on Docker.</li>\n<li><strong>Orchestration:</strong> Focus on Kubernetes.</li>\n<li><strong>Infrastructure as Code:</strong> This section covers tools like Terraform or Ansible for managing infrastructure in a declarative and automated way.</li>\n<li><strong>Cloud Providers:</strong> Since you\'re deploying <a href="http://roadmap.sh" target="_blank">roadmap.sh</a>, focus on the relevant cloud provider (e.g., AWS, Azure, or GCP).</li>\n</ul>\n</li>\n<li>\n<p><strong>Deep Dive and Learn:</strong></p>\n<ul>\n<li>\n<p><strong>CI/CD:</strong></p>\n<ul>\n<li>\n<p><strong>Goal:</strong> Implement a CI/CD pipeline using GitHub Actions to automatically build, test, and deploy code changes to a staging environment.</p>\n</li>\n<li>\n<p><strong>Steps:</strong></p>\n<ol>\n<li>Learn the basics of CI/CD concepts.</li>\n<li>Explore GitHub Actions syntax and features.</li>\n<li>Configure a <code>workflow</code> in your <code>.github/workflows</code> directory to trigger on <code>push</code> events to the <code>main</code> branch.</li>\n<li>Add steps to build your application, run tests, and deploy to a staging environment.</li>\n</ol>\n</li>\n<li>\n<p><strong>Example:</strong> Your GitHub Actions workflow might look something like this:</p>\n<pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code><span class="line"><span style="color:#8BE9FD">name</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> CI/CD Pipeline</span></span>\n<span class="line"><span style="color:#BD93F9">on</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">  push</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">    branches</span><span style="color:#FF79C6">:</span><span style="color:#F8F8F2"> [ </span><span style="color:#F1FA8C">main</span><span style="color:#F8F8F2"> ]</span></span>\n<span class="line"><span style="color:#8BE9FD">jobs</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">  build</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">    runs-on</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> ubuntu-latest</span></span>\n<span class="line"><span style="color:#8BE9FD">    steps</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#FF79C6">      -</span><span style="color:#8BE9FD"> uses</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> actions/checkout@v3</span></span>\n<span class="line"><span style="color:#FF79C6">      -</span><span style="color:#8BE9FD"> name</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> Set up Node.js</span></span>\n<span class="line"><span style="color:#8BE9FD">        uses</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> actions/setup-node@v3</span></span>\n<span class="line"><span style="color:#8BE9FD">        with</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">          node-version</span><span style="color:#FF79C6">:</span><span style="color:#BD93F9"> 16</span></span>\n<span class="line"><span style="color:#FF79C6">      -</span><span style="color:#8BE9FD"> name</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> Install dependencies</span></span>\n<span class="line"><span style="color:#8BE9FD">        run</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> npm install</span></span>\n<span class="line"><span style="color:#FF79C6">      -</span><span style="color:#8BE9FD"> name</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> Run tests</span></span>\n<span class="line"><span style="color:#8BE9FD">        run</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> npm test</span></span>\n<span class="line"><span style="color:#8BE9FD">  deploy</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#8BE9FD">    needs</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> build</span></span>\n<span class="line"><span style="color:#8BE9FD">    runs-on</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> ubuntu-latest</span></span>\n<span class="line"><span style="color:#8BE9FD">    steps</span><span style="color:#FF79C6">:</span></span>\n<span class="line"><span style="color:#FF79C6">      -</span><span style="color:#8BE9FD"> name</span><span style="color:#FF79C6">:</span><span style="color:#F1FA8C"> Deploy to staging</span></span>\n<span class="line"><span style="color:#8BE9FD">        run</span><span style="color:#FF79C6">:</span><span style="color:#6272A4"> # Your deployment script here (e.g., using SSH, rsync, or a cloud provider CLI)</span></span>\n<span class="line"></span></code></pre>\n</li>\n</ul>\n</li>\n<li>\n<p><strong>Infrastructure as Code (Terraform):</strong></p>\n<ul>\n<li>\n<p><strong>Goal:</strong> Provision and manage your staging environment infrastructure using Terraform.</p>\n</li>\n<li>\n<p><strong>Steps:</strong></p>\n<ol>\n<li>Learn the basics of Terraform syntax and concepts.</li>\n<li>Install the Terraform CLI.</li>\n<li>Create Terraform configuration files (<code>.tf</code>) to define your infrastructure resources (e.g., servers, databases, networking).</li>\n<li>Use <code>terraform init</code>, <code>terraform plan</code>, and <code>terraform apply</code> to provision your infrastructure.</li>\n</ol>\n</li>\n<li>\n<p><strong>Example:</strong> A simple Terraform configuration to create an AWS EC2 instance:</p>\n<pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code><span class="line"><span style="color:#8BE9FD;font-style:italic">resource</span><span style="color:#F8F8F2"> "aws_instance" "example" {</span></span>\n<span class="line"><span style="color:#F8F8F2">  ami           </span><span style="color:#FF79C6">=</span><span style="color:#E9F284"> "</span><span style="color:#F1FA8C">ami-0c55b246476699c3f</span><span style="color:#E9F284">"</span><span style="color:#6272A4"> # Replace with a valid AMI ID</span></span>\n<span class="line"><span style="color:#F8F8F2">  instance_type </span><span style="color:#FF79C6">=</span><span style="color:#E9F284"> "</span><span style="color:#F1FA8C">t2.micro</span><span style="color:#E9F284">"</span></span>\n<span class="line"><span style="color:#F8F8F2">  tags </span><span style="color:#FF79C6">=</span><span style="color:#F8F8F2"> {</span></span>\n<span class="line"><span style="color:#F8F8F2">    Name </span><span style="color:#FF79C6">=</span><span style="color:#E9F284"> "</span><span style="color:#F1FA8C">staging-server</span><span style="color:#E9F284">"</span></span>\n<span class="line"><span style="color:#F8F8F2">  }</span></span>\n<span class="line"><span style="color:#F8F8F2">}</span></span>\n<span class="line"></span></code></pre>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>\n<p><strong>Iterate and Expand:</strong> Once you\'ve successfully automated the deployment to a staging environment, you can expand your CI/CD pipeline to include production deployments, automated rollbacks, and more sophisticated testing. You can also use Terraform to manage more complex infrastructure components.</p>\n</li>\n</ol>\n<p><strong>Key Takeaways:</strong></p>\n<ul>\n<li><strong>Focus on Practical Goals:</strong> Choose a roadmap and then identify specific, achievable goals that align with your work or interests.</li>\n<li><strong>Break Down the Roadmap:</strong> Don\'t try to learn everything at once. Focus on the sections that are most relevant to your current goal.</li>\n<li><strong>Hands-on Practice:</strong> The most effective way to learn is by doing. Experiment with the tools and technologies you\'re learning about.</li>\n<li><strong>Iterate and Refine:</strong> Continuously improve your skills and processes based on your experiences.</li>\n</ul>\n<p>Does this example help illustrate how you can use a roadmap to guide your learning? Let me know if you\'d like another example, perhaps focused on a different roadmap or a different scenario.</p>\n',
  },
];

export function AIChat() {
  const toast = useToast();

  const [message, setMessage] = useState('');
  const [isStreamingMessage, setIsStreamingMessage] = useState(false);
  const [streamedMessageHtml, setStreamedMessageHtml] = useState('');
  const [aiChatHistory, setAiChatHistory] =
    useState<AIChatHistoryType[]>(defaultAiChatHistory);

  const [isPersonalizedResponseFormOpen, setIsPersonalizedResponseFormOpen] =
    useState(false);
  const [isUploadResumeModalOpen, setIsUploadResumeModalOpen] = useState(false);

  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(false);

  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaMessageRef = useRef<HTMLTextAreaElement>(null);

  const { data: tokenUsage, isLoading } = useQuery(
    getAiCourseLimitOptions(),
    queryClient,
  );

  const { data: userBillingDetails, isLoading: isBillingDetailsLoading } =
    useQuery(billingDetailsOptions(), queryClient);
  const { data: userPersona, isLoading: isUserPersonaLoading } = useQuery(
    userPersonaOptions(),
    queryClient,
  );
  const { data: userResume, isLoading: isUserResumeLoading } = useQuery(
    userResumeOptions(),
    queryClient,
  );

  const isLimitExceeded = (tokenUsage?.used || 0) >= (tokenUsage?.limit || 0);
  const isPaidUser = userBillingDetails?.status === 'active';

  const handleChatSubmit = () => {
    const trimmedMessage = message.trim();
    if (
      !trimmedMessage ||
      isStreamingMessage ||
      !isLoggedIn() ||
      isLimitExceeded
    ) {
      return;
    }

    const newMessages: AIChatHistoryType[] = [
      ...aiChatHistory,
      {
        role: 'user',
        content: trimmedMessage,
      },
    ];

    flushSync(() => {
      setAiChatHistory(newMessages);
      setMessage('');
    });

    setTimeout(() => {
      scrollToBottom();
    }, 0);
    completeAIChat(newMessages);
  };

  const scrollToBottom = useCallback(() => {
    const scrollableContainer = scrollableContainerRef?.current;
    if (!scrollableContainer) {
      return;
    }

    scrollableContainer.scrollTo({
      top: scrollableContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [scrollableContainerRef]);

  const completeAIChat = async (
    messages: AIChatHistoryType[],
    force: boolean = false,
  ) => {
    setIsStreamingMessage(true);

    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/v1-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        messages: messages.slice(-10),
        force,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      toast.error(data?.message || 'Something went wrong');
      setAiChatHistory([...messages].slice(0, messages.length - 1));
      setIsStreamingMessage(false);

      if (data.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
    }

    const reader = response.body?.getReader();

    if (!reader) {
      setIsStreamingMessage(false);
      toast.error('Something went wrong');
      return;
    }

    await readStream(reader, {
      onStream: async (content) => {
        const html = await markdownToHtmlWithHighlighting(content);

        flushSync(() => {
          setStreamedMessageHtml(html);
        });

        scrollToBottom();
      },
      onStreamEnd: async (content) => {
        const html = await markdownToHtmlWithHighlighting(content);

        const newMessages: AIChatHistoryType[] = [
          ...messages,
          {
            role: 'assistant',
            content,
            html,
          },
        ];

        flushSync(() => {
          setStreamedMessageHtml('');
          setIsStreamingMessage(false);
          setAiChatHistory(newMessages);
        });

        queryClient.invalidateQueries(getAiCourseLimitOptions());
        scrollToBottom();
      },
    });

    setIsStreamingMessage(false);
  };

  const { mutate: uploadResume, isPending: isUploading } = useMutation(
    {
      mutationFn: (formData: FormData) => {
        return httpPost('/v1-upload-resume', formData);
      },
      onSuccess: () => {
        toast.success('Resume uploaded successfully');
        setIsUploadResumeModalOpen(false);
        queryClient.invalidateQueries(userResumeOptions());
      },
      onError: (error) => {
        toast.error(error?.message || 'Failed to upload resume');
      },
      onMutate: () => {
        setIsUploadResumeModalOpen(false);
      },
    },
    queryClient,
  );

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    const chatContainer = chatContainerRef.current;

    if (!scrollableContainer || !chatContainer) {
      return;
    }

    const abortController = new AbortController();
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const paddingBottom = parseInt(
          getComputedStyle(scrollableContainer).paddingBottom,
        );

        const distanceFromBottom =
          scrollableContainer.scrollHeight -
          // scroll from the top + the container height
          (scrollableContainer.scrollTop + scrollableContainer.clientHeight) -
          paddingBottom;

        setShowScrollToBottomButton(distanceFromBottom > 130);
      }, 100);
    };

    debouncedHandleScroll();
    scrollableContainer.addEventListener('scroll', debouncedHandleScroll, {
      signal: abortController.signal,
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      abortController.abort();
    };
  }, [aiChatHistory]);

  const handleRegenerate = useCallback(
    (index: number) => {
      const filteredChatHistory = aiChatHistory.filter((_, i) => i !== index);

      flushSync(() => {
        setAiChatHistory(filteredChatHistory);
      });
      scrollToBottom();
      completeAIChat(filteredChatHistory, true);
    },
    [aiChatHistory],
  );

  const handleDelete = useCallback(
    (index: number) => {
      const filteredChatHistory = aiChatHistory.filter((_, i) => i !== index);
      setAiChatHistory(filteredChatHistory);
    },
    [aiChatHistory],
  );

  const shouldShowQuickHelpPrompts =
    message.length === 0 && aiChatHistory.length === 0;

  return (
    <div
      className="ai-chat relative flex min-h-screen w-full flex-col gap-2 overflow-y-auto bg-gray-100 pb-55"
      ref={scrollableContainerRef}
    >
      <div className="relative mx-auto w-full max-w-2xl grow px-4">
        {shouldShowQuickHelpPrompts && (
          <QuickHelpPrompts
            onQuickActionClick={(action) => {
              textareaMessageRef.current?.focus();
              setMessage(action);
            }}
            onPredefinedQuestionClick={(question) => {
              textareaMessageRef.current?.focus();
              setMessage(question);
            }}
          />
        )}
        {!shouldShowQuickHelpPrompts && (
          <ChatHistory
            chatHistory={aiChatHistory}
            isStreamingMessage={isStreamingMessage}
            streamedMessageHtml={streamedMessageHtml}
            onDelete={handleDelete}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>

      {isPersonalizedResponseFormOpen && (
        <PersonalizedResponseForm
          defaultValues={userPersona?.chatPreferences ?? undefined}
          onClose={() => setIsPersonalizedResponseFormOpen(false)}
        />
      )}

      {isUploadResumeModalOpen && (
        <UploadResumeModal
          onClose={() => setIsUploadResumeModalOpen(false)}
          userResume={userResume}
          isUploading={isUploading}
          uploadResume={uploadResume}
        />
      )}

      <div
        className="pointer-events-none fixed right-0 bottom-0 left-0 mx-auto w-full max-w-3xl px-4 lg:left-[var(--ai-sidebar-width)]"
        ref={chatContainerRef}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <QuickActionButton
              icon={PersonStandingIcon}
              label="Personalized Response"
              onClick={() => setIsPersonalizedResponseFormOpen(true)}
            />
            <QuickActionButton
              icon={FileUpIcon}
              label={
                isUploading
                  ? 'Processing...'
                  : userResume?.fileName
                    ? 'Upload New Resume'
                    : 'Upload Resume'
              }
              onClick={() => setIsUploadResumeModalOpen(true)}
              isLoading={isUploading}
            />
          </div>

          <div className="flex items-center gap-2">
            {aiChatHistory.length > 0 && (
              <QuickActionButton
                icon={TrashIcon}
                label="Clear Chat"
                onClick={() => {
                  setAiChatHistory([]);
                }}
              />
            )}
            {showScrollToBottomButton && (
              <QuickActionButton
                icon={ArrowDownIcon}
                label="Scroll to Bottom"
                onClick={scrollToBottom}
              />
            )}
          </div>
        </div>

        <form
          className="pointer-events-auto flex flex-col gap-2 rounded-lg rounded-b-none border border-b-0 border-gray-200 bg-white p-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            handleChatSubmit();
          }}
        >
          <AutogrowTextarea
            ref={textareaMessageRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-10 w-full resize-none bg-transparent text-sm focus:outline-none"
            placeholder="Ask me anything..."
            disabled={isStreamingMessage}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatSubmit();
              }
            }}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex size-8 shrink-0 items-center justify-center rounded-md border border-gray-200"
            >
              <SendIcon className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
