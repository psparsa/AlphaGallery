interface Props {
  children: React.ReactNode;
}

export const Badge = ({ children }: Props) => {
  return <p className="rounded-xl bg-chineseBlack px-3">{children}</p>;
};
