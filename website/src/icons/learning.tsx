import { component$ } from '@builder.io/qwik';
import type { IconProps } from './icon-types';

export const LearningIcon = component$(
  ({ height = 64, width = 64, stroke = 'currentColor', strokeWidth = 2 }: IconProps) => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        class='icon'
        width={width}
        height={height}
        viewBox='0 0 24 24'
        stroke-width={strokeWidth}
        stroke={stroke}
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
        <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4'></path>
        <path d='M13.5 6.5l4 4'></path>
      </svg>
    );
  }
);
