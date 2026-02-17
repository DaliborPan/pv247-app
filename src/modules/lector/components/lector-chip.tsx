import { UserType } from '@/modules/user/schema';
import { getLectorDisplayName } from '../utils/lector-display-name';

export const LectorChip = ({ lector }: { lector: UserType }) => {
  return (
    <div className="border-border-primary bg-bg-secondary flex items-center gap-2 rounded-lg border px-3 py-2">
      {lector.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={lector.image}
          alt=""
          width={20}
          height={20}
          className="size-5 rounded-full object-cover"
        />
      ) : (
        <div className="bg-bg-terciary flex size-6 items-center justify-center rounded-full text-xs text-text-secondary">
          {(lector.name ?? lector.firstName ?? '?')[0]}
        </div>
      )}

      <span className="text-sm">{getLectorDisplayName(lector)}</span>
    </div>
  );
};
