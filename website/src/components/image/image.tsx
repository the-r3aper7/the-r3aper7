import { component$ } from '@builder.io/qwik';

export type ImageProps = {
  name: string;
  src: string;
  loading?: 'eager' | 'lazy';
  class?: string;
};

export default component$((props: ImageProps) => {
  const { name, src, loading = 'lazy', class: tailwindClasses, ...rest } = props;

  return <img src={src} alt={name} class={tailwindClasses} loading={loading} {...rest} />;
});
