<template>
    <h2 class="art-title pageInfo-title">{{title}}</h2>
</template>

<script>
export default {
    props: {
        title: {
            type: [String],
            default: null
        }
    }
}
</script>
