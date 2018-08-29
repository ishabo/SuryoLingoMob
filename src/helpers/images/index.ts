import Images from 'assets/images';

export const getRankBadge = (rank: number) => {
  if (rank < 1) return Images.badges.wood;
  else if (rank > 1 && rank <= 20) return Images.badges.stone;
  else if (rank > 20 && rank <= 40) return Images.badges.bronze;
  else if (rank > 40 && rank <= 80) return Images.badges.silver;
  else if (rank > 80) return Images.badges.gold;
};
