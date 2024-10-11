type CourseLayoutProps = {
  children: React.ReactNode;
};

export function CourseLayout(props: CourseLayoutProps) {
  const { children } = props;

  return (
    <section className="grid h-screen grid-cols-[240px_1fr] overflow-hidden bg-zinc-900 text-zinc-50">
      {children}
    </section>
  );
}
