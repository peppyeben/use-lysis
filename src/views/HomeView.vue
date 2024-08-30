<template>
    <div class="mt-16 flex justify-center">
        <p class="text-lg">
            Hover the link to see the
            <a
                href="#"
                class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                data-twe-toggle="tooltip"
                title="Hi! tooltip"
                >tooltip</a
            >
        </p>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Tooltip, initTWE } from "tw-elements";

export default {
    name: "HomeView",
    components: {},
    setup() {
        const store = useStore();
        onMounted(() => {
            initTWE({ Tooltip });

            store.dispatch("getSales");
        });
    },
};
</script>
