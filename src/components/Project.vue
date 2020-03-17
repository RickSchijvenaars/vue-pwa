<template>
    <div class="project">
        <div class="project-thumbnail" :style="{ backgroundImage: 'url(https://cmgt.hr.nl:8000/' + project.headerImage +')'}">
            <div class="project-title-container" :style="{ backgroundImage: 'url(https://cmgt.hr.nl/images/overlay.svg)' }">
            <h3 class="project-title">
                {{ project.title }}
            </h3>
            </div>
        </div>
        <div class="project-bottom">
            <div class="project-bottom-description">
                {{ project.tagline}}
            </div>
            <div class="project-bottom-tags">
                <span v-for="(tag, index) in project.tags" :key="index" class="tag">
                    {{ tag }}
                </span>
            </div>
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
    height: 100%;
    min-height: 350px;
    font-size: 1rem;
    transition: all .4s ease-out;
    cursor: pointer;
    text-decoration: none;
    flex: 0 1 46%;
    background-color: #fff;

    &-thumbnail {
        height: 270px;
        background: no-repeat 50%;
        background-size: cover;
        transition: all .6s ease-out;
    }

    &-title {
        color: white;

        &-container {
            height: 100%;
            padding: 12px 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            background-repeat: no-repeat;
            background-position: bottom;
            background-size: 100% 40%;
        }
    }

    &-bottom {   
        padding: 12px 20px;
        background-color: white;

        &-description {
            padding-bottom: 12px;
            color: #000;
            background-color: #fff;
        }
    }
}
</style>