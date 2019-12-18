<template>
  <div class="cell-wrapper" @click="$emit('click')">
    <div class="cell-title">
      <i class="iconfont" :class="mineItem.avatar" ></i>
      <span>{{mineItem.content}}</span>
    </div>
    <div>
        <i class="iconfont icon-icon-test2"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "mine-cell",
  props: {
    mineItem: Object,
  }
};
</script>

<style scoped>
.cell-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 50px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 50px;
  border-bottom: 1px solid #d9d9d9;
}
.cell-title {
  flex: 1;
  text-align: left;
  font-size: 0.5rem;
}
.cell-title i {
    vertical-align: middle;
    margin-right: 0.6rem;
    font-size: 1rem;
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}

i.iconfont.icon-icon-test2 {
    font-size: 0.5rem;
    color: #ccc;
}

.badge {
  background-color: #ff0a0a;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
  position: absolute;
  left: 2rem;
}
</style>
