interface Props {
  children: React.ReactNode;
}

export const Badge = ({ children }: Props) => {
  return <span className="rounded-xl bg-chineseBlack px-3">{children}</span>;
};
