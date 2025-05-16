export function destinationSlugs(destinationSlug: string | undefined | null) {
  switch (destinationSlug) {
    case 'ES':
      return 'Spain';
    case 'IT':
      return 'Italy';
    case 'MX':
      return 'Mexico';
    case 'BB':
      return 'Barbados';
    case 'PT':
      return 'Portugal';
    default:
      return undefined;
  }
}
