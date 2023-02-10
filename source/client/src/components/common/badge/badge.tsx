interface Properties {
  children: React.ReactNode;
}

export const Badge = ({ children }: Properties) => {
  return <span className="rounded-xl bg-chineseBlack px-3">{children}</span>;
};
