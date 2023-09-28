import { component$ } from "@builder.io/qwik";
import {TbBrandGithub, TbBrandGithubFilled, TbBrandLinkedin} from "@qwikest/icons/tablericons"

export default component$(() => {
  return (
    <section class="min-h-screen flex flex-col md:flex-row gap-2">
      <div class="flex flex-col md:w-1/4 items-center space-y-2 p-2 border-2 rounded-3xl">
        <img
          alt='Sai Srikar Dumpeti'
          src='/images/me.jpg'
          class='rounded-3xl object-contain'
          width={250}
        />
        <h1 class="text-3xl border-2 p-2">Sai Srikar Dumpeti</h1>
      </div>
      <div class="flex flex-col gap-2 md:w-3/4 border-2 rounded-3xl">
        <div class="flex flex-col md:flex-row gap-2 h-1/2">
          {/* Block 1 */}
          <div class="border-2 rounded-3xl p-2 space-y-2 md:w-1/2">
            <h1 class="text-center text-4xl">🎓 Education</h1>
            <div class="flex flex-1 gap-2 h-1/2">
              <div class="flex flex-col items-center justify-center rounded-3xl basis-1/2 bg-gradient-to-br from-[#FFFF00] to-[#E870F2]">
                <h1 class="text-8xl text-center font-bold">96<span class="text-lg">%</span></h1>
                <h1 class="text-lg text-center">Class - X</h1>
              </div>
              <div class="flex flex-col items-center justify-center border-2 rounded-3xl basis-1/2 bg-gradient-to-br from-[#00FFC2] via-[#148CD5] to-[#E870F2]">
                <h1 class="text-8xl text-center font-bold">96<span class="text-lg">%</span></h1>
                <h1 class="text-lg text-center">Class - XII</h1>
              </div>
            </div>
            <div class="flex items-center justify-center gap-2 border-2 rounded-3xl h-1/3">
              <h1 class="text-8xl">7.1<span class="text-sm">CGPA</span></h1>
              <div class="flex flex-col">
                <h1 class="text-2xl">Birla Institute of Technology</h1>
                <h1 class="text-xl text-center">Ranchi</h1>
                <h1 class="text-lg text-center">2022-2026</h1>
              </div>
            </div>
          </div>
          {/* Block 2 */}
          <div class="border-2 rounded-3xl basis-1/2 p-2 space-y-2 md:w-1/2">
            
          </div>
        </div>
        <div class="border-2 rounded-3xl">open</div>
      </div>
      {/* <div class="grid lg:col-span-2 h-full border-2 p-2 rounded-3xl">
      </div> */}
    </section>
  )
})