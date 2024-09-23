import { authorCollection } from './author';
import { changelogCollection } from './changelog';
import { guideCollection } from './guide';
import { projectCollection } from './project';
import { questionGroupCollection } from './question-group';
import { videoCollection } from './video';

export const collections = {
  authors: authorCollection,
  guides: guideCollection,
  'question-groups': questionGroupCollection,
  projects: projectCollection,
  videos: videoCollection,
  changelogs: changelogCollection,
};
