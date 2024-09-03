<template>
    <div
        class="flex flex-col space-y-3 justify-center items-center mx-auto mt-auto"
    >
        <p>
            Built by
            <a href="https://github.com/peppyeben" class="text-[#52f625]"
                >peppyeben</a
            >
        </p>
        <span class="inline-flex flex-row justify-center items-center">
            &nbsp;With&nbsp;
            <a href="https://sqd.dev" class="text-[#c3c3c3]">
                Subsquid
                <img src="sqd.png" alt="Subsquid" class="w-4 inline-block" />
            </a>
            &nbsp;on&nbsp;
            <a href="https://base.org" class="text-blue-500"
                >Base <img src="base.png" alt="Base" class="w-4 inline-block"
            /></a>
        </span>
    </div>
</template>

<script>
export default {
    name: "FooterSection",
};
</script>
