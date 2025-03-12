export const IS_KEY_ONLY_ROADMAP_GENERATION = false;

type Lesson = string;

type Module = {
  title: string;
  lessons: Lesson[];
};

export type AiCourse = {
  title: string;
  modules: Module[];
  difficulty: string;
};

export function generateAiCourseStructure(
  data: string,
): Omit<AiCourse, 'difficulty'> {
  const lines = data.split('\n');
  let title = '';
  const modules: Module[] = [];
  let currentModule: Module | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (i === 0 && line.startsWith('#')) {
      // First line is the title
      title = line.replace('#', '').trim();
    } else if (line.startsWith('## ')) {
      // New module
      if (currentModule) {
        modules.push(currentModule);
      }
      currentModule = {
        title: line.replace('## ', ''),
        lessons: [],
      };
      // Removed auto-expand code to keep modules collapsed by default
    } else if (line.startsWith('- ') && currentModule) {
      // Lesson within current module
      currentModule.lessons.push(line.replace('- ', ''));
    }
  }

  // Add the last module if it exists
  if (currentModule) {
    modules.push(currentModule);
  }

  return {
    title,
    modules,
  };
}
