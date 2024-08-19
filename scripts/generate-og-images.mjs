import path from 'node:path';
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { html } from 'satori-html';
import satori from 'satori';
import sharp from 'sharp';
import imageSize from 'image-size';
import { Resvg } from '@resvg/resvg-js';
import { getRepositoryRank } from '../src/lib/github';

const ALL_ROADMAP_DIR = path.join(process.cwd(), '/src/data/roadmaps');
const ALL_BEST_PRACTICE_DIR = path.join(
  process.cwd(),
  '/src/data/best-practices',
);
const ALL_GUIDE_DIR = path.join(process.cwd(), '/src/data/guides');
const ALl_AUTHOR_DIR = path.join(process.cwd(), '/src/data/authors');
const ALL_ROADMAP_IMAGE_DIR = path.join(process.cwd(), '/public/roadmaps');
const ALL_BEST_PRACTICE_IMAGE_DIR = path.join(
  process.cwd(),
  '/public/best-practices',
);
const ALL_AUTHOR_IMAGE_DIR = path.join(process.cwd(), '/public');

const alreadyGeneratedImages = await fs.readdir(
  path.join(process.cwd(), '/public/og-images'),
  {
    recursive: true,
  },
);

async function updateRank() {
  const repoRank = await getRepositoryRank('kamranahmedse/developer-roadmap');
  document.getElementById('repo-rank').innerText = `${repoRank} most starred GitHub project`;
}

async function getAllRoadmaps() {
  const allRoadmapDirNames = await fs.readdir(ALL_ROADMAP_DIR);

  const allRoadmapFrontmatter = await Promise.all(
    allRoadmapDirNames.map(async (roadmapDirName) => {
      const roadmapDirPath = path.join(
        ALL_ROADMAP_DIR,
        roadmapDirName,
        `${roadmapDirName}.md`,
      );

      const markdown = await fs.readFile(roadmapDirPath, 'utf8');
      const { data } = matter(markdown);

      return {
        id: roadmapDirName,
        title: data?.briefTitle,
        description: data?.briefDescription,
      };
    }),
  );

  return allRoadmapFrontmatter;
}

async function getAllBestPractices() {
  const allBestPracticeDirNames = await fs.readdir(ALL_BEST_PRACTICE_DIR);

  const allBestPracticeFrontmatter = await Promise.all(
    allBestPracticeDirNames.map(async (bestPracticeDirName) => {
      const bestPracticeDirPath = path.join(
        ALL_BEST_PRACTICE_DIR,
        bestPracticeDirName,
        `${bestPracticeDirName}.md`,
      );

      const markdown = await fs.readFile(bestPracticeDirPath, 'utf8');
      const { data } = matter(markdown);

      return {
        id: bestPracticeDirName,
        title: data?.briefTitle,
        description: data?.briefDescription,
      };
    }),
  );

  return allBestPracticeFrontmatter;
}

async function getAllGuides() {
  const allGuideDirNames = await fs.readdir(ALL_GUIDE_DIR);

  const allGuideFrontmatter = await Promise.all(
    allGuideDirNames.map(async (guideDirName) => {
      const guideDirPath = path.join(ALL_GUIDE_DIR, guideDirName);

      const markdown = await fs.readFile(guideDirPath, 'utf8');
      const { data } = matter(markdown);

      return {
        id: guideDirName?.replace('.md', ''),
        title: data?.title,
        description: data?.description,
        authorId: data?.authorId,
      };
    }),
  );

  return allGuideFrontmatter;
}

async function getAllAuthors() {
  const allAuthorDirNames = await fs.readdir(ALl_AUTHOR_DIR);

  const allAuthorFrontmatter = await Promise.all(
    allAuthorDirNames.map(async (authorDirName) => {
      const authorDirPath = path.join(ALl_AUTHOR_DIR, authorDirName);

      const markdown = await fs.readFile(authorDirPath, 'utf8');
      const { data } = matter(markdown);

      return {
        id: authorDirName?.replace('.md', ''),
        name: data?.name,
        imageUrl: data?.imageUrl,
      };
    }),
  );

  return allAuthorFrontmatter;
}

async function getAllRoadmapImageIds() {
  const allRoadmapImageDirNames = await fs.readdir(ALL_ROADMAP_IMAGE_DIR);

  return allRoadmapImageDirNames?.reduce((acc, image) => {
    acc[image.replace(/(\.[^.]*)$/, '')] = image;
    return acc;
  }, {});
}

async function getAllBestPracticeImageIds() {
  const allBestPracticeImageDirNames = await fs.readdir(
    ALL_BEST_PRACTICE_IMAGE_DIR,
  );

  return allBestPracticeImageDirNames?.reduce((acc, image) => {
    acc[image.replace(/(\.[^.]*)$/, '')] = image;
    return acc;
  }, {});
}

async function generateResourceOpenGraph() {
  await updateRank();

  const allRoadmaps = (await getAllRoadmaps()).filter(
    (roadmap) => !alreadyGeneratedImages.includes(`roadmaps/${roadmap.id}.png`),
  );
  const allBestPractices = (await getAllBestPractices()).filter(
    (bestPractice) =>
      !alreadyGeneratedImages.includes(`best-practices/${bestPractice.id}.png`),
  );
  const allRoadmapImageIds = await getAllRoadmapImageIds();
  const allBestPracticeImageIds = await getAllBestPracticeImageIds();

  const resources = [];
  allRoadmaps.forEach((roadmap) => {
    const hasImage = allRoadmapImageIds?.[roadmap.id];
    resources.push({
      type: 'roadmaps',
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      image: hasImage
        ? path.join(ALL_ROADMAP_IMAGE_DIR, allRoadmapImageIds[roadmap.id])
        : null,
    });
  });

  allBestPractices.forEach((bestPractice) => {
    const hasImage = allBestPracticeImageIds?.[bestPractice.id];
    resources.push({
      type: 'best-practices',
      id: bestPractice.id,
      title: bestPractice.title,
      description: bestPractice.description,
      image: hasImage
        ? path.join(
            ALL_BEST_PRACTICE_IMAGE_DIR,
            allBestPracticeImageIds[bestPractice.id],
          )
        : null,
    });
  });

  for (const resource of resources) {
    if (!resource.image) {
      let template = getRoadmapDefaultTemplate(resource);
      if (
        hasSpecialCharacters(resource.title) ||
        hasSpecialCharacters(resource.description)
      ) {
        // For some reason special characters are not being rendered properly
        // https://github.com/natemoo-re/satori-html/issues/20
        // So we need to unescape the html
        template = JSON.parse(unescapeHtml(JSON.stringify(template)));
      }
      await generateOpenGraph(
        template,
        resource.type,
        resource.id + '.png',
        'resvg',
      );
    } else {
      const image = await fs.readFile(resource.image);
      const dimensions = imageSize(image);

      const widthRatio = 1200 / dimensions.width;
      let width = dimensions.width * widthRatio * 0.85;
      let height = dimensions.height * widthRatio * 0.85;

      let template = getRoadmapImageTemplate({
        ...resource,
        image: `data:image/${dimensions.type};base64,${image.toString('base64')}`,
        width,
        height,
      });

      if (
        hasSpecialCharacters(resource.title) ||
        hasSpecialCharacters(resource.description)
      ) {
        // For some reason special characters are not being rendered properly
        // https://github.com/natemoo-re/satori-html/issues/20
        // So we need to unescape the html
        template = JSON.parse(unescapeHtml(JSON.stringify(template)));
      }

      await generateOpenGraph(template, resource.type, resource.id + '.png');
    }
  }
}

async function generateGuideOpenGraph() {
  const allGuides = (await getAllGuides()).filter(
    (guide) => !alreadyGeneratedImages.includes(`guides/${guide.id}.png`),
  );
  const allAuthors = await getAllAuthors();

  for (const guide of allGuides) {
    const author = allAuthors.find((author) => author.id === guide.authorId);
    const image =
      author?.imageUrl || 'https://roadmap.sh/images/default-avatar.png';
    const isExternalImage = image?.startsWith('http');
    let authorImageExtention = '';
    let authorAvatar;
    if (!isExternalImage) {
      authorAvatar = await fs.readFile(path.join(ALL_AUTHOR_IMAGE_DIR, image));
      authorImageExtention = image?.split('.')[1];
    }

    const template = getGuideTemplate({
      ...guide,
      authorName: author.name,
      authorAvatar: isExternalImage
        ? image
        : `data:image/${authorImageExtention};base64,${authorAvatar.toString('base64')}`,
    });
    if (
      hasSpecialCharacters(guide.title) ||
      hasSpecialCharacters(guide.description)
    ) {
      // For some reason special characters are not being rendered properly
      // https://github.com/natemoo-re/satori-html/issues/20
      // So we need to unescape the html
      template = JSON.parse(unescapeHtml(JSON.stringify(template)));
    }
    await generateOpenGraph(template, 'guides', guide.id + '.png');
  }
}

async function generateOpenGraph(
  htmlString,
  type,
  fileName,
  renderer = 'sharp',
) {
  console.log('Started 🚀', `${type}/${fileName}`);
  const svg = await satori(htmlString, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'balsamiq',
        data: await fs.readFile(
          path.join(process.cwd(), '/public/fonts/BalsamiqSans-Regular.ttf'),
        ),
        weight: 400,
        style: 'normal',
      },
    ],
  });

  await fs.mkdir(path.join(process.cwd(), '/public/og-images/' + type), {
    recursive: true,
  });
  // It will be used to generate the default image
  // for some reasone sharp is not working with this
  // FIXME: Investigate why sharp is not working with this
  if (renderer === 'resvg') {
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 2500,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    await fs.writeFile(
      path.join(process.cwd(), '/public/og-images/' + `${type}/${fileName}`),
      pngBuffer,
    );
  } else {
    await sharp(Buffer.from(svg), { density: 150 })
      .png()
      .toFile(
        path.join(process.cwd(), '/public/og-images/' + `${type}/${fileName}`),
      );
  }

  console.log('Completed ✅', `${type}/${fileName}`);
}

await generateResourceOpenGraph();
await generateGuideOpenGraph();

function getRoadmapDefaultTemplate({ title, description }) {
  return html`<div tw="bg-white relative flex flex-col h-full w-full">
    <div
      tw="absolute flex top-[90px] left-0 w-full h-px bg-black opacity-5"
    ></div>
    <div tw="absolute flex top-0 left-0 w-full h-[18px] bg-black"></div>
    <div tw="absolute flex bottom-0 left-0 w-full h-[18px] bg-black"></div>
    <div
      tw="absolute flex bottom-[90px] left-0 w-full h-px bg-black opacity-5"
    ></div>
    <div
      tw="absolute flex top-0 left-[90px] h-full w-px bg-black opacity-5"
    ></div>
    <div
      tw="absolute flex top-0 right-[90px] h-full w-px bg-black opacity-5"
    ></div>

    <div tw="flex flex-col px-[100px] py-[90px] h-full">
      <div tw="flex justify-between flex-col p-[30px] h-full">
        <div tw="flex flex-col">
          <div tw="text-[70px] leading-[70px] tracking-tight">${title}</div>
          <div
            tw="mt-[16px] text-[30px] leading-[36px] tracking-tight opacity-80"
          >
            ${description}
          </div>
        </div>

        <div tw="flex flex-col">
          <div tw="flex items-center mt-2.5">
            <div
              tw="flex items-center justify-center w-[40px] h-[40px] mr-[24px]"
            >
              <svg
                width="46"
                height="27"
                viewBox="0 0 46 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.354 0.9C42.184 0.9 41.2371 1.84684 41.2371 3.01686C41.2371 3.30867 41.3062 3.57708 41.4117 3.82435L33.4085 15.0163C33.38 15.0161 33.3514 15.0167 33.3248 15.0172C33.3051 15.0176 33.2864 15.018 33.2697 15.018C32.8703 15.018 32.484 15.1223 32.161 15.3186L25.2976 11.9024C25.1995 10.8219 24.2903 9.97585 23.1854 9.97585C22.0154 9.97585 21.0686 10.9227 21.0686 12.0927C21.0686 12.1865 21.0799 12.2794 21.0925 12.3656L13.8077 18.1561C13.5852 18.0783 13.3472 18.0433 13.1011 18.0433C12.0622 18.0433 11.2066 18.7882 11.0265 19.7732L4.26122 22.5041C3.91213 22.2447 3.48642 22.077 3.01686 22.077C1.84684 22.077 0.9 23.0238 0.9 24.1938C0.9 25.3639 1.84684 26.3107 3.01686 26.3107C4.06426 26.3107 4.92372 25.5497 5.0923 24.5492L11.8566 21.8497C12.2057 22.1092 12.6315 22.277 13.1011 22.277C14.2711 22.277 15.218 21.3301 15.218 20.1601C15.218 20.0663 15.2067 19.9735 15.194 19.8873L22.4789 14.0968C22.7013 14.1746 22.9393 14.2096 23.1854 14.2096C23.5848 14.2096 23.9711 14.1053 24.2941 13.909L31.1575 17.3252C31.2556 18.4057 32.1649 19.2517 33.2697 19.2517C34.4397 19.2517 35.3866 18.3049 35.3866 17.1348C35.3866 16.843 35.3175 16.5746 35.2119 16.3273L43.2151 5.13536C43.2437 5.13561 43.2723 5.13503 43.2989 5.13449C43.3186 5.13409 43.3373 5.13371 43.354 5.13371C44.524 5.13371 45.4708 4.18687 45.4708 3.01686C45.4708 1.84684 44.524 0.9 43.354 0.9Z"
                  fill="black"
                  stroke="black"
                  stroke-width="0.2"
                />
              </svg>
            </div>
            <div tw="text-[30px] flex leading-[30px]" id="repo-rank">
              Loading...
            </div>
          </div>
          <div tw="flex items-center mt-2.5">
            <div
              tw="flex items-center justify-center w-[40px] h-[40px] mr-[24px]"
            >
              <svg
                width="40"
                height="27"
                viewBox="0 0 40 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.8419 21.5546V23.347H37.3473V22.3072C37.3473 21.803 37.1644 21.3086 36.7814 20.9808C35.797 20.1382 34.0544 19.1021 31.4735 19.1021C28.1305 19.1021 25.8107 20.618 24.8419 21.5546ZM22.7297 19.8874C23.9917 18.5206 27.0669 16.4008 31.4735 16.4008C35.9173 16.4008 38.5374 18.7892 39.5092 19.9307C39.8516 20.3328 40 20.825 40 21.2875V26.0483H31.0946H22.1892V21.2978C22.1892 20.8197 22.349 20.2997 22.7297 19.8874Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.30026 21.0084C2.86588 21.3329 2.65267 21.8607 2.65267 22.4029V23.347H15.1581V21.5229C14.3747 20.6776 12.4668 19.1021 9.28433 19.1021C6.53917 19.1021 4.48401 20.1243 3.30026 21.0084ZM0.540477 19.8874C1.80253 18.5206 4.87765 16.4008 9.28433 16.4008C13.7281 16.4008 16.3482 18.7892 17.32 19.9307C17.6624 20.3328 17.8108 20.825 17.8108 21.2875V26.0483H8.90538H0V21.2978C0 20.8197 0.15977 20.2997 0.540477 19.8874Z"
                  fill="black"
                />
                <rect
                  x="10.6122"
                  y="16.4008"
                  width="17.3655"
                  height="7.718"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.8062 19.6515C11.3801 19.9868 11.1665 20.5126 11.1665 21.0548V22.5365H27.4235V20.9495C27.4235 20.4454 27.2397 19.9534 26.8651 19.616C25.6227 18.4973 23.3035 17.0182 19.7876 17.0182C16.0572 17.0182 13.307 18.4702 11.8062 19.6515ZM8.42064 18.0391C10.0613 16.2623 14.059 13.5065 19.7876 13.5065C25.5645 13.5065 28.9707 16.6115 30.2341 18.0954C30.6791 18.6181 30.872 19.258 30.872 19.8592V26.0482H19.295H7.71802V19.8727C7.71802 19.2511 7.92572 18.5751 8.42064 18.0391Z"
                  fill="black"
                />
                <circle
                  cx="20.2598"
                  cy="5.7885"
                  r="4.0385"
                  stroke="black"
                  stroke-width="3.5"
                />
                <circle
                  cx="31.8367"
                  cy="9.64748"
                  r="3.07375"
                  stroke="black"
                  stroke-width="3.5"
                />
                <circle
                  cx="8.68276"
                  cy="9.64748"
                  r="3.07375"
                  stroke="black"
                  stroke-width="3.5"
                />
              </svg>
            </div>
            <div tw="text-[30px] flex leading-[30px]">
              Created and maintained by community
            </div>
          </div>
          <div tw="flex items-center mt-2.5">
            <div
              tw="flex items-center justify-center w-[40px] h-[40px] mr-[24px]"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 33.155C21.375 33.155 23.3541 34.8334 25.3333 34.8334C30.0833 34.8334 34.8333 22.1667 34.8333 15.485C34.7793 13.4342 33.9169 11.4878 32.434 10.0701C30.951 8.65243 28.9678 7.87839 26.9166 7.9167C23.4016 7.9167 20.5833 10.1967 19 11.0834C17.4166 10.1967 14.5983 7.9167 11.0833 7.9167C9.0309 7.8742 7.04532 8.64686 5.56147 10.0654C4.07761 11.484 3.21646 13.4328 3.16663 15.485C3.16663 22.1667 7.91663 34.8334 12.6666 34.8334C14.6458 34.8334 16.625 33.155 19 33.155Z"
                  stroke="black"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8334 3.16699C17.4167 3.95866 19 6.33366 19 11.0837"
                  stroke="black"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div tw="text-[30px] flex leading-[30px]">Up-to-date roadmap</div>
          </div>
        </div>
      </div>
    </div>
  </div> `;
}

function getRoadmapImageTemplate({ title, description, image, height, width }) {
  return html`<div tw="bg-white relative flex flex-col h-full w-full">
    <div tw="flex flex-col px-[90px] pt-[90px]">
      <div tw="flex flex-col pb-0">
        <div tw="text-[70px] leading-[70px] tracking-tight">
          ${title?.replace('&', `{"&"}`)}
        </div>
        <div
          tw="mt-[16px] text-[30px] leading-[36px] tracking-tight opacity-80"
        >
          ${description}
        </div>
      </div>
    </div>

    <img
      src="${image}"
      width="${width}"
      height="${height}"
      tw="mx-auto mt-[36px]"
    />
  </div> `;
}

function getGuideTemplate({ title, description, authorName, authorAvatar }) {
  return html`<div tw="bg-white relative flex flex-col h-full w-full">
    <div
      tw="absolute flex top-[90px] left-0 w-full h-px bg-black opacity-5"
    ></div>
    <div tw="absolute flex top-0 left-0 w-full h-[18px] bg-black"></div>
    <div tw="absolute flex bottom-0 left-0 w-full h-[18px] bg-black"></div>
    <div
      tw="absolute flex bottom-[90px] left-0 w-full h-px bg-black opacity-5"
    ></div>
    <div
      tw="absolute flex top-0 left-[90px] h-full w-px bg-black opacity-5"
    ></div>
    <div
      tw="absolute flex top-0 right-[90px] h-full w-px bg-black opacity-5"
    ></div>

    <div tw="flex flex-col px-[100px] py-[90px] h-full">
      <div tw="flex justify-center flex-col p-[30px] h-full">
        <div tw="flex flex-col">
          <div tw="flex items-center">
            <img
              src="${authorAvatar}"
              width="30"
              height="30"
              tw="rounded-full"
            />
            <div tw="text-[20px] leading-[20px] tracking-tight ml-3">
              ${authorName}
            </div>
          </div>
          <div tw="mt-6 text-[48px] leading-tight tracking-tight">${title}</div>
          <div tw="mt-3 text-[24px] leading-[30px] tracking-tight opacity-80">
            ${description}
          </div>
        </div>
      </div>
    </div>
  </div> `;
}

function unescapeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function hasSpecialCharacters(str) {
  return /[&<>"]/.test(str);
}
