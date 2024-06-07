interface HeadingProps {
  title: string;
  description?: string;
  showDescription?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  showDescription,
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {showDescription && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
