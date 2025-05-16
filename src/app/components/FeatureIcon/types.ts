export const enum FeatureIconVariant {
  List = 'list',
  Details = 'details',
}

export interface FeatureIconProps {
  featureName: string;
  variant: FeatureIconVariant;
}
