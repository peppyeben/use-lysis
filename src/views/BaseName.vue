<template>
    <div class="flex flex-col min-h-screen pb-6">
        <ErrorMessage
            v-if="getError.isError || names.length < 1"
        ></ErrorMessage>
        <div
            class="flex-grow mx-auto flex flex-col px-8 pb-10 justify-start items-center space-y-4 w-full relative md:px-[10%]"
            v-else
        >
            <TopSectionBaseNames></TopSectionBaseNames>
            <RegisteredNames :groupedNames="groupedNames"></RegisteredNames>
            <BaseNameData :names="names"></BaseNameData>
        </div>
        <FooterSection></FooterSection>
    </div>
    <LoaderComponent></LoaderComponent>
</template>

<script>
import BaseNameData from "@/components/BaseNameData.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import FooterSection from "@/components/FooterSection.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import RegisteredNames from "@/components/RegisteredNames.vue";
import TopSectionBaseNames from "@/components/TopSectionBaseNames.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "BaseName",
    components: {
        TopSectionBaseNames,
        FooterSection,
        LoaderComponent,
        RegisteredNames,
        BaseNameData,
        ErrorMessage,
    },
    setup() {
        const store = useStore();

        const names = computed(() => store.getters.GET_NAMES);
        const groupedNames = computed(() => store.getters.GET_GROUPED_NAMES);
        const getError = computed(() => store.getters.GET_ERROR);

        onMounted(() => {
            store.dispatch("computeGroupNames");
        });

        return { groupedNames, names, getError };
    },
};
</script>
