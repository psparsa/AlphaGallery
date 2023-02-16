interface Properties {
  label: string;
}

export const Badge = ({ label }: Properties) => {
  return <span className="rounded-xl bg-chineseBlack px-3">{label}</span>;
};
