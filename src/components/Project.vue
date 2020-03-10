<template>
    <div class="project">
        <div class="thumbnail">
            <div class="title">
                {{ project.title }}
            </div>
        </div>
        <div class="description">
            {{ project.tagline}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Project',
    props: ['project']
}
</script>

<style lang="scss">
.project {
    &-title {
        color: red;
    }

}
</style>