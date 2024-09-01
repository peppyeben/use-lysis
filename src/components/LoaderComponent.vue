<template>
    <div class="overlay" v-if="isLoading">
        <div class="loader"></div>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "LoaderComponent",
    setup() {
        const store = useStore();

        const isLoading = computed(() => {
            return store.getters.GET_LOADING;
        });

        return {
            isLoading,
        };
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(47, 47, 47, 0.5);
    /* Semi-transparent background */
    backdrop-filter: blur(0.3rem);
    /* Blur effect */
    z-index: 9999;
    /* Make sure it's on top of other elements */
}

.loader {
    width: 4rem;
    aspect-ratio: 1;
    --c: no-repeat linear-gradient(#d7d7d7 0 0);
    background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
    animation: l14-1 0.5s infinite alternate, l14-2 2s infinite;
    position: relative;
}

@keyframes l14-1 {
    0%,
    10% {
        background-size: 20% 100%;
    }

    100% {
        background-size: 20% 20%;
    }
}

@keyframes l14-2 {
    0%,
    49.9% {
        background-position: 0 0, 0 100%, 50% 50%, 50% 50%, 100% 0, 100% 100%;
    }

    50%,
    100% {
        background-position: 0 50%, 0 50%, 50% 0, 50% 100%, 100% 50%, 100% 50%;
    }
}
</style>
