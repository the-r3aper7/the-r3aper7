import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='max-w-sm rounded-xl overflow-hidden shadow-lg absolute left-24'>
      <div class='bg-red-500 rounded-full h-[100px] w-[100px] absolute'></div>
      <div class='px-6 py-4'>
        <div class='font-bold text-xl mb-2 text-black'>The Coldest Sunset</div>
        <p class='text-gray-700 text-base'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
          Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div class='px-6 pt-4 pb-2'>
        <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          gamer
        </span>
        <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          travel
        </span>
        <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          winter
        </span>
      </div>
    </div>
  );
});
