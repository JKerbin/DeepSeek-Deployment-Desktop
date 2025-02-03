<template>
    <div class="overflow-auto">
        <div class="item"></div>
        <div class="item"></div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.overflow-auto {
    position: absolute;
    top: 10%;
    width: 75%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.overflow-auto .item {
    min-height: 4rem;
    max-height: 4rem;
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid var(--desk-color);
}

.overflow-auto .item:hover {
    background-color: var(--select-color);
}
</style>