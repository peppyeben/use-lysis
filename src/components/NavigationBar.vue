<template>
    <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-transparent py-2 shadow-dark-mild lg:py-4"
    >
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <div>
                <router-link
                    class="mx-2 my-1 flex items-center space-x-2 lg:mb-0 lg:mt-0"
                    to="/"
                >
                    <img
                        src="favicon.png"
                        alt="TE Logo"
                        loading="lazy"
                        class="w-[2.5rem] rounded-full"
                    />
                    <h4 class="font-extrabold text-lg">UseLysis</h4>
                </router-link>
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
