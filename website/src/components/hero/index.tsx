import { component$ } from '@builder.io/qwik';
import styles from './hero.module.css';

export default component$(() => {
    return (
        <div class={`${styles.hero} overflow-hidden`}>
            <div class={`${styles.banner} left-0`}></div>
            <div class={`${styles.banner}`}></div>
            <div class={`${styles.banner} right-0`}>
                <img class={`${styles.programming_image}`} src='/logos/rust.png' alt='constrained' />
                <img class={`${styles.programming_image}`} src='/logos/qwik.png' alt='constrained' />
                <img class={`${styles.programming_image}`} src='/logos/python.png' alt='constrained' />
            </div>
            <h1 class={`z-[1]`}>Hello There</h1>
        </div>
    );
});
