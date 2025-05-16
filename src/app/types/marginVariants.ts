const PREFIX = 'margin_';

export enum MarginVariants {
  NONE = `${PREFIX}none`,
  SM = `${PREFIX}sm`,
  MD = `${PREFIX}md`,
  LG = `${PREFIX}lg`,
}

export const MarginBottom = {
  [MarginVariants.NONE]: '',
  [MarginVariants.SM]: 'md:mb-10 mb-6',
  [MarginVariants.MD]: 'md:mb-16 mb-10',
  [MarginVariants.LG]: 'md:mb-20 mb-14',
};

export const MarginTop = {
  [MarginVariants.NONE]: '',
  [MarginVariants.SM]: 'md:mt-10 mt-6',
  [MarginVariants.MD]: 'md:mt-16 mt-10',
  [MarginVariants.LG]: 'md:mt-20 mt-14',
};
