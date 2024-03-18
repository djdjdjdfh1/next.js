type Props = { pageParam? : number };

export async function getPostRecommends({pageParam}: Props) {
    const res = await fetch(`http://localhost:9090/api/posts/Recommends?cursor=${pageParam}`, {
      next: {
        tags: ['posts', 'recommends'],
      },
      credentials: 'include',
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
  
    return res.json();
  }
  