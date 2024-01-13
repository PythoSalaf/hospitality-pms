import { Skeleton } from "../ui/skeleton";

const SkeletonLoader: React.FC<{
  children?: React.ReactNode;
  paragraph?: { rows: number };
  loading?: boolean;
}> = ({ children, paragraph, loading }) => {
  return (
    <>
      {loading && paragraph?.rows && (
        <div className="space-y-2 px-2 w-full">
          {Array(paragraph.rows)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
        </div>
      )}
      {!loading && <>{children}</>}
    </>
  );
};

export default SkeletonLoader;
