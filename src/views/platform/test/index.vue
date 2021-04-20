<template>
  <v-card title="基础">
      <vcu-table ref="xTable" :z-index="10000" :loadOptions="options" max-height="200">
      </vcu-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/filterContetTest",
        pageUrl: "dataq/api/page/filterContetTest",
        filters: true,
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

