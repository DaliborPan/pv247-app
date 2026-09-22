export const LabeledItem = ({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <span className="text-sm font-light uppercase text-text-terciary">
      {label}
    </span>
    <span className="text-lg text-text-primary-color">{children}</span>
  </div>
);
