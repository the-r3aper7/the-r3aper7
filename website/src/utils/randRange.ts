import { Tags } from './constants';

export const randRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const randomTag = () => {
  const index = randRange(0, Tags.length);
  return Tags.at(index);
};
