import { Contributor } from '@/types/contributor.types';

export async function getContributors(): Promise<Contributor[]> {
  const res = await fetch(
    'https://api.github.com/repos/hsib19/tiktok-shop-sdk/contributors',
  );
  if (!res.ok) throw new Error('Failed to fetch contributors');
  return res.json();
}
