<template>
  <app>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
      <!-- Main 3 column grid -->
      <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        <!-- Left column -->
        <div class="grid grid-cols-1 gap-4 lg:col-span-2">
          <div class="bg-indigo-700 rounded-lg">
            <div class="max-w-2xl mx-auto text-center py-10 px-2 sm:py-16 sm:px-4 lg:px-6">
              <img width="100px" class="mx-auto mb-5" src="https://media.discordapp.net/attachments/490602677324087296/819623003745681408/noooooooooodle.png">
              <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
                <span class="block">Introducing</span>
                <span class="block">NoodleCards</span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-indigo-200">NoodleToken ($NDL) is the new token based on Binance Smart Chain allowing holders to buy packs on NoodleCards, the new collectible cards game.</p>
              <a href="https://guide.noodle.cards/guide/getting-started.html#free-starter-pack" target="_blank" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
                Get started
              </a>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div class="lg:self-center">
                <h2 class="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                  <span class="block">We are on</span>
                  <span class="block">PancakeSwap</span>
                </h2>
                <p class="mt-4 text-lg leading-6 text-gray-600">Buy and sell NDL on PancakeSwap, the leading DEX on Binance Smart Chain (BSC).</p>
                <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xA9E35a238D9D7977c9c929A4e1B0127C39449d1c" target="_blank" class="mt-8 bg-gray-800 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-900">Trade on PancakeSwap</a>
              </div>
            </div>
            <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" src="https://i.imgur.com/3pLypnw.png" alt="PancakeSwap">
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <section>
            <div class="rounded-lg bg-white overflow-hidden shadow">
              <div class="p-6">
                <h2 class="text-base font-medium text-gray-900">Social networks</h2>
                <div class="flow-root mt-6">
                  <ul class="-my-5 divide-y divide-gray-200">
                    <li v-for="socialNetwork in socialNetworks" :key="socialNetwork.link" class="py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img class="h-8 w-8 rounded-full" :src="socialNetwork.logo" :alt="socialNetwork.name">
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{socialNetwork.name}}
                          </p>
                          <p class="text-sm text-gray-500 truncate">
                            {{socialNetwork.handle}}
                          </p>
                        </div>
                        <div>
                          <a :href="socialNetwork.link" target="_blank" class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                            Open
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <a class="twitter-timeline" href="https://twitter.com/NoodleCards?ref_src=twsrc%5Etfw">Tweets by NoodleCards</a>
          </section>
        </div>
      </div>
    </div>
  </app>
</template>

<script>
import App from '../layouts/App';

export default {
  components: {
    App
  },
  data() {
    return {
      socialNetworks: [
        {name: 'Telegram', handle: 't.me/NoodleCards', link: 'https://t.me/noodlecards', logo: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/telegram-512.png'},
        {name: 'Twitter', handle: '@NoodleCards', link: 'https://twitter.com/NoodleCards', logo: 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-512.png'},
        {name: 'Medium', handle: 'noodlecards', link: 'https://noodlecards.medium.com/introducing-noodlecards-the-first-nft-game-based-on-mangas-and-anime-b7072eb2f665', logo: 'https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Medium_svg5-512.png'},
      ]
    }
  },
  mounted() {
    let script = document.createElement('script');

    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    document.head.appendChild(script);
  }
}
</script>
