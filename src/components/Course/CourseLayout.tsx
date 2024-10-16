import { CourseSidebar, type CourseSidebarProps } from './CourseSidebar';

type CourseLayoutProps = {
  children: React.ReactNode;
} & CourseSidebarProps;

export function CourseLayout(props: CourseLayoutProps) {
  const { children, ...sidebarProps } = props;

  return (
    <section className="grid h-screen grid-cols-[240px_1fr] overflow-hidden bg-zinc-900 text-zinc-50">
      <CourseSidebar {...sidebarProps} />
      
      {children}
    </section>
  );
}
