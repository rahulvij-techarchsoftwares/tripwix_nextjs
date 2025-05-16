const PREFIX = 'padding_';

export enum PaddingVariants {
  NONE = `${PREFIX}none`,
  SM = `${PREFIX}sm`,
  MD = `${PREFIX}md`,
  LG = `${PREFIX}lg`,
}

export const PaddingBottom = {
  [PaddingVariants.NONE]: '',
  [PaddingVariants.SM]: 'pb-10',
  [PaddingVariants.MD]: 'pb-16',
  [PaddingVariants.LG]: 'pb-20',
};

export const PaddingTop = {
  [PaddingVariants.NONE]: '',
  [PaddingVariants.SM]: 'pt-10',
  [PaddingVariants.MD]: 'pt-16',
  [PaddingVariants.LG]: 'pt-20',
};
