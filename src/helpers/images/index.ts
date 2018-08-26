import Images from 'assets/images';

export const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return Images.badges.first;
    case 2:
      return Images.badges.second;
    case 3:
      return Images.badges.third;
    default:
      return Images.logo.SuryoBird;
  }
};
