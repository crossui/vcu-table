<template>
  <div class="dateTime-wrap">
    <div class="dateTime-item">
      <a-date-picker
        ref="startDate"
        v-model="datetimeValue.startDate"
        v-if="dateTimeOption.startDate.isShow"
        :size="size"
        @openChange="onOpenChangeDate"
        @change="onChangeStartDate"
        :class="{ 'mr-5': dateTimeOption.startTime.isShow }"
        :disabled="dateTimeOption.startDate.disabled"
        :allowClear="false"
        :getCalendarContainer="getContainer()"
        :style="dateTimeStyle"
        :dropdownClassName="dropdownClassName"
        :disabled-date="dateTimeOption.startDate.disabledDate"
      />
      <a-time-picker
        ref="startTime"
        v-model="datetimeValue.startTime"
        v-if="dateTimeOption.startTime.isShow"
        :size="size"
        @change="onChangeStartTime"
        :disabled="dateTimeOption.startTime.disabled"
        :allowClear="false"
        :getPopupContainer="getContainer()"
        :style="dateTimeStyle"
        :popupClassName="dropdownClassName"
      />
    </div>
    <div
      class="dateTime-span"
      v-if="dateTimeOption.endDate.isShow || dateTimeOption.endTime.isShow"
    >
      至
    </div>
    <div class="dateTime-item">
      <a-date-picker
        ref="endDate"
        v-model="datetimeValue.endDate"
        v-if="dateTimeOption.endDate.isShow"
        :size="size"
        @openChange="onOpenChangeDate"
        @change="onChangeEndDate"
        :class="{ 'mr-5': dateTimeOption.endTime.isShow }"
        :disabled="dateTimeOption.endDate.disabled"
        :allowClear="false"
        :getCalendarContainer="getContainer()"
        :style="dateTimeStyle"
        :dropdownClassName="dropdownClassName"
        :disabled-date="dateTimeOption.endDate.disabledDate"
      />
      <a-time-picker
        ref="endTime"
        v-model="datetimeValue.endTime"
        v-if="dateTimeOption.endTime.isShow"
        :size="size"
        @change="onChangeEndTime"
        :disabled="dateTimeOption.endTime.disabled"
        :allowClear="false"
        :getPopupContainer="getContainer()"
        :style="dateTimeStyle"
        :popupClassName="dropdownClassName"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";

const computingTime = (interval, currTime, format) => {
  let datetime = moment().format(format);
  if (interval < 30) {
    datetime = moment(currTime).add(-interval, "days").format(format);
  } else if (interval >= 30) {
    datetime = moment(currTime)
      .add(-(interval / 30), "months")
      .format(format);
  }
  return datetime;
};
export default {
  name: "dateTime",
  components: {},
  mixins: [],
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Object,
    },
    dateTimeOptions: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: "default",
    },
    interval: {
      type: Number,
      default: 0,
    },
    transfer: {
      type: Boolean,
      default: true,
    },
    dropdownClassName: {
      type: String,
      default: "datetime-dropdown",
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      if (val == null) {
        this.init();
      }
    },
  },
  computed: {
    dateTimeOption() {
      return _.merge({}, this.options, this.dateTimeOptions);
    },
    datetimeValue() {
      let dataTime = _.merge({}, this.value);
      dataTime.startDate =
        dataTime.startDate != null
          ? moment(dataTime.startDate, this.dateTimeOption.startDate.dateFormat)
          : null;
      dataTime.startTime =
        dataTime.startTime != null
          ? moment(dataTime.startTime, this.dateTimeOption.startTime.timeFormat)
          : null;
      dataTime.endDate =
        dataTime.endDate != null
          ? moment(dataTime.endDate, this.dateTimeOption.endDate.dateFormat)
          : null;
      dataTime.endTime =
        dataTime.endTime != null
          ? moment(dataTime.endTime, this.dateTimeOption.endTime.timeFormat)
          : null;
      return dataTime;
    },
  },
  data() {
    return {
      moment,
      dateTimeStyle: {
        width: "105px",
      },
      options: {
        startDate: {
          dateFormat: "YYYY-MM-DD",
          isShow: true,
          disabled: false,
          change: null,
          disabledDate: null,
        },
        startTime: {
          timeFormat: "HH:mm:ss",
          isShow: true,
          disabled: false,
          change: null,
        },
        endDate: {
          dateFormat: "YYYY-MM-DD",
          isShow: true,
          disabled: false,
          change: null,
          disabledDate: null,
        },
        endTime: {
          timeFormat: "HH:mm:ss",
          isShow: true,
          disabled: false,
          change: null,
        },
      },
      inputDom: null,
      inputDomVal: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.interval > 0) {
        let value = {
          startDate: computingTime(this.interval, new Date(), "YYYY-MM-DD"),
          startTime: "00:00:00",
          endDate: moment().format("YYYY-MM-DD"),
          endTime: "23:59:59",
        };
        this.emitInput(value);
      }
    },
    //v-model
    emitInput(val) {
      let value = _.merge({}, this.value, val);
      this.$emit("input", value);
      this.$emit("change", value);
    },
    //显示、隐藏日期后监听输入
    onOpenChangeDate(status) {
      if (status) {
        this.inputDomVal = "";
        this.$nextTick(() => {
          try {
            let dom = document.getElementsByClassName(
              this.dropdownClassName
            )[0];
            this.inputDom = dom.getElementsByClassName("ant-calendar-input")[0];
            this.inputDom.addEventListener(
              "keyup",
              (e) => {
                this.inputDomVal = e.target.value;
              },
              false
            );
          } catch (err) {
            setTimeout(() => {
              this.onOpenChangeDate(true);
            }, 200);
          }
        });
      } else {
        this.inputDom.removeEventListener("keyup", () => {}, false);
      }
    },
    //改变开始日期
    onChangeStartDate(date, dateString) {
      if (date) {
        if (
          this.isEditable &&
          this.inputDomVal != "" &&
          moment(this.inputDomVal, "YYYY-MM-DD").isValid()
        ) {
          let val = moment(this.inputDomVal, "YYYY-MM-DD").format("YYYY-MM-DD");
          dateString = dateString == val ? dateString : val;
        }

        if (this.dateTimeOption.startDate.change) {
          this.dateTimeOption.startDate.change(date, dateString);
        }

        let res = { startDate: dateString };
        if (this.datetimeValue.endDate) {
          if (
            this.dateTimeOption.endDate.isShow &&
            !moment(dateString).isBefore(this.datetimeValue.endDate) &&
            dateString != this.datetimeValue.endDate.format("YYYY-MM-DD")
          ) {
            let interval = 1;
            if (this.interval > 0) interval = this.interval;
            res.endDate = computingTime(-interval, date, "YYYY-MM-DD");
          }
        }
        this.emitInput(res);
      }
    },
    //改变开始时间
    onChangeStartTime(time, timeString) {
      if (time) {
        if (this.dateTimeOption.startTime.change) {
          this.dateTimeOption.startTime.change(time, timeString);
        }
        this.emitInput({ startTime: timeString });
      }
    },
    //改变结束日期
    onChangeEndDate(date, dateString) {
      if (date) {
        if (
          this.isEditable &&
          this.inputDomVal != "" &&
          moment(this.inputDomVal, "YYYY-MM-DD").isValid()
        ) {
          let val = moment(this.inputDomVal, "YYYY-MM-DD").format("YYYY-MM-DD");
          dateString = dateString == val ? dateString : val;
        }

        if (this.dateTimeOption.endDate.change) {
          this.dateTimeOption.endDate.change(date, dateString);
        }

        let res = { endDate: dateString };
        if (this.datetimeValue.startDate) {
          if (
            !moment(dateString).isAfter(this.datetimeValue.startDate) &&
            dateString != this.datetimeValue.startDate.format("YYYY-MM-DD")
          ) {
            let interval = 1;
            if (this.interval > 0) interval = this.interval;
            res.startDate = computingTime(interval, date, "YYYY-MM-DD");
          }
        }
        this.emitInput(res);
      }
    },
    //改变结束时间
    onChangeEndTime(time, timeString) {
      if (time) {
        if (this.dateTimeOption.endTime.change) {
          this.dateTimeOption.endTime.change(time, timeString);
        }
        this.emitInput({ endTime: timeString });
      }
    },
    //挂载在当前位置
    getContainer() {
      if (this.transfer) return;
      return (triggerNode) => triggerNode.parentNode;
    },
    focus() {
      if (
        this.dateTimeOption.startDate.isShow &&
        !this.dateTimeOption.startDate.disabled
      ) {
        this.$refs.startDate.focus();
      } else if (
        this.dateTimeOption.startTime.isShow &&
        !this.dateTimeOption.startTime.disabled
      ) {
        this.$refs.startTime.focus();
      } else if (
        this.dateTimeOption.endDate.isShow &&
        !this.dateTimeOption.endDate.disabled
      ) {
        this.$refs.endDate.focus();
      } else if (
        this.dateTimeOption.endTime.isShow &&
        !this.dateTimeOption.endTime.disabled
      ) {
        this.$refs.endTime.focus();
      }
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>