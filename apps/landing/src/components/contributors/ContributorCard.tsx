import Link from 'next/link';
import Image from 'next/image';
import { Contributor } from '@/types/contributor.types';

export function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <Link
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4"
    >
      <Image
        src={contributor.avatar_url}
        alt={contributor.login}
        width={80}
        height={80}
        className="h-12 w-12 rounded-full transition group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-900 dark:text-white">
          {contributor.login}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          @{contributor.login}
        </span>
      </div>
    </Link>
  );
}
