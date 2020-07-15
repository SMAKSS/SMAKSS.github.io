<template>
  <div class="modal">
    <div class="mask" />
    <div class="background">
      <div class="circle-background"></div>
    </div>
    <div class="content">
      <div data-gutter class="information">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['content']
}
</script>

<style lang="scss">
.modal {
  overflow: hidden;
  text-align: center;
  z-index: 9;
}

@media (max-width: 767px) {
  .modal {
    position: fixed;
  }
}

.modal,
.mask {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.mask {
  background: $mask;
}

.background {
  color: $background-color;
}

.background,
.content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.circle-background {
  background: currentColor;
}

.circle-background {
  width: 124vh;
  height: 124vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}

.content {
  height: 100%;
  width: 100%;
  max-width: 80rem;
  padding: 2rem;
}

@media (max-width: 767px) {
  .content {
    overflow-y: auto;
    padding: 0;
  }
}

.information {
  height: 100%;
  width: 100%;
  display: block;
  position: relative;
  padding: 6rem 0;
}

@media (max-width: 767px) {
  .content > div {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (max-width: 767px) {
  .content > div[data-gutter] {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>