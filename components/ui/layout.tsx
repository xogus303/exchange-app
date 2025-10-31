interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <div className="flex flex-col flex-1 py-10 px-20 space-y-10">
      <div>
        <h1 className="font-bold text-[40px] text-[#28323C]">{title}</h1>
        {description && <p className="mt-2 text-[#374553]">{description}</p>}
      </div>
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
