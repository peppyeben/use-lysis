<template>
    <nav
        class="relative flex w-full flex-wrap items-center justify-between bg-transparent py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-4"
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
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar",
};
</script>
