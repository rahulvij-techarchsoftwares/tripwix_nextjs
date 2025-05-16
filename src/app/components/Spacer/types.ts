export const enum SpaceVariant {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Default = 'default',
}

export interface SpacerProps {
  variant?: SpaceVariant;
}
