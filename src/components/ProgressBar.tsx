interface ProgressBarProps {
  value: number;
  max?: number;
}

export const ProgressBar = ({ value, max = 100 }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          Progresso
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500 ease-out shadow-glow"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};