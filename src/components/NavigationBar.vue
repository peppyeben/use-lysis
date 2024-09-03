<template>
    <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-transparent py-2 shadow-dark-mild lg:py-4"
    >
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <div>
                <a class="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                    <img
                        src="favicon.svg"
                        alt="TE Logo"
                        loading="lazy"
                        class="w-[2.5rem] rounded-full"
                    />
                </a>
            </div>
            <div class="flex justify-center items-center text-center space-x-4">
                <router-link :to="{ name: 'home' }" class="hover:opacity-60">
                    NFT Analytics
                </router-link>
                &nbsp;|
                <router-link
                    :to="{ name: 'basename' }"
                    class="hover:opacity-60"
                >
                    Base Names
                </router-link>
            </div>

            <div>
                <!-- <router-link :to="{ name: 'basename' }">Base Names</router-link> -->
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar",
};
</script>
