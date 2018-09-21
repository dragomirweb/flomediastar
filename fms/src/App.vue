<template>
<div id="app">
    <Nav></Nav>
    <router-view />
</div>
</template>

<script>
import Nav from "@/components/Nav";

export default {
    name: 'App',
    components: {
        "Nav": Nav
    }
}
</script>

<style lang="scss">
$box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);

#app {}

body {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background-color: #eaeaea;
    overflow-y: scroll;
}

.bg-dark {
    background: linear-gradient(to bottom, rgb(40, 50, 68) 0%, rgba(21, 26, 35, 0.95) 100%);
    box-shadow: $box-shadow;
}

body::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
}

body::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb {
    background-color: rgb(40, 50, 68);

    background-image: -webkit-gradient(linear, 0 0, 0 100%,
        color-stop(.5, rgba(255, 255, 255, .2)),
        color-stop(.5, transparent), to(transparent));
}
</style>
