import { component$ } from '@builder.io/qwik';
import styles from './header.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <header class={styles.header}>
      <ul>
        <li>
          <Link href='/'>Sai Srikar Dumpeti</Link>
        </li>
        <li class='space-x-6'>
          <p class={'inline'}>Home</p>
          <p class={'inline'}>Login</p>
        </li>
      </ul>
    </header>
  );
});
