<template>
  <div>
    <div>只可以抢默认购票人</div>
    <div>票信息ID（url上有）<input type="text" v-model="piaoId" /></div>
    <div>抢票日期 <input type="date" v-model="qpDate" /></div>
    <div>钱数<input type="text" v-model="moeny" />（分）</div>
    <div>
      是否是抢捡漏票
      <label> <input type="radio" v-model="isJl" :value="1" />是 </label>
      <label> <input type="radio" v-model="isJl" :value="0" />否 </label>
    </div>
    <div><input type="text" v-model="time" />秒抢一次</div>
    <div>{{ tishi }}</div>
    <button @click="onclick">开始</button>
    <button @click="toStop">停止</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
//页面输入参数
const qpDate = ref("2023-07-29");
const moeny = ref("8000");
const time = ref("0.3");

const piaoId = ref("71661");
const tishi = ref();
const isJl = ref(1);
//需要的接口参数
const grxx = ref();
const ticketList = ref();
const screenId = ref();
const getPiaoType = ref(0);
const token = ref();
const confirmInfo = ref();
//两个定时器
const oneSetRepeatTask = ref();
const setRepeatTask = ref();

const onclick = async () => {
  clearInterval(oneSetRepeatTask.value);
  clearInterval(setRepeatTask.value);
  //获取时间是否可以抢票
  //时间到了，开始抢票
  tishi.value = "正在获取个人信息";
  await getPerInf(); //获取信息
  tishi.value = "正在获取票务信息";
  let i = 0;
  oneSetRepeatTask.value = setInterval(
    async () => {
      await getTicketInf(); //获取id
      //去抢
      if (ticketList.value[getPiaoType.value].clickable || isJl.value) {
        tishi.value = `获取getTonke中....`;
        clearInterval(oneSetRepeatTask.value);
        await grabTicket();
      }
      i++;
      tishi.value = `第${i}次判断是否有票`;
    },
    time.value ? time.value * 1000 : 1000
  );
};
const toStop = () => {};
//获取个人信息
const getPerInf = async () => {
  let res = await axios({
    method: "GET",
    url: `/api/ticket/buyer/list?src=ticket&projectId=${piaoId.value}`,
  });
  grxx.value = res.data.data.list;
  //grxx = res.data.data.list;
  grxx.value[0].isBuyerInfoVerified = true;
  grxx.value[0].isBuyerValid = true;
};
//获取票信息
const getTicketInf = async () => {
  let res = await axios({
    method: "GET",
    url: `/api/ticket/project/getV2?id=${piaoId.value}&project_id=${piaoId.value}`,
  });
  let arr = res.data.data;
  for (let i = 0; i < arr.screen_list.length; i++) {
    if (arr.screen_list[i].show_date === qpDate.value) {
      ticketList.value = arr.screen_list[i].ticket_list;
      screenId.value = arr.screen_list[i].id;
      break;
    }
  }
  for (let i = 0; i < ticketList.value.length; i++) {
    if (ticketList.value[i].price === +moeny.value) {
      getPiaoType.value = i;
      break;
    }
  }
};
//获取Token
const getTonke = async () => {
  let res = await axios({
    //获取token
    method: "POST",
    url: `/api/ticket/order/prepare?project_id=${piaoId.value}`,
    data: {
      project_id: piaoId.value,
      screen_id: screenId.value,
      order_type: 1,
      count: 1,
      sku_id: ticketList.value[getPiaoType.value].id,
      token: "",
      ticket_agent: "",
    },
  });

  if (res.data.data.shield.verifyMethod) {
    window.open(res.data.data.shield.naUrl, "_blank");
    location.reload();
  }
  token.value = res.data.data.token;
};
//获取confirmInfo
const getConfirmInfo = async () => {
  let res = await axios({
    //获取token
    method: "GET",
    url: `/api/ticket/order/confirmInfo?token=${
      token.value
    }&timestamp=${new Date().getTime()}&project_id=${piaoId.value}`,
  });
  console.log(res, "res");
  confirmInfo.value = res.data.data;
};
//抢票
const grabTicket = async () => {
  let i = 0;
  await getTonke();
  let time = new Date().getTime();
  await getConfirmInfo();
  setRepeatTask.value = setInterval(async () => {
    i++;
    let res = await axios({
      //抢
      method: "POST",
      url: `/api/ticket/order/createV2?project_id=${piaoId.value}`,
      data: {
        project_id: piaoId.value, //1.输入
        screen_id: screenId.value, //2.获取票信息接口
        sku_id: ticketList.value[getPiaoType.value].id, //3.获取票信息接口
        count: 1, //数量
        pay_money: +moeny.value, //钱数
        order_type: 1,
        timestamp: new Date().getTime(),
        token: token.value, //获取token接口
        deviceId: "3c2003ba05634736371905d33a47f77d",
        // buyer_info: JSON.stringify({
        //   id: grxx.value[0].id,
        //   name: grxx.value[0].name,
        //   tel: grxx.value[0].tel,
        //   personal_id: grxx.value[0].personal_id,
        //   id_type: grxx.value[0].id_type,
        // }), //获取个人信息接口
        uyer_info: JSON.stringify(grxx.value),
        clickPosition: {
          x: 234,
          y: 792,
          origin: time,
          now: new Date().getTime(),
        },
        coupon_code: "",
        again: 0,
        id_bind: confirmInfo.value.id_bind,
        need_contact: confirmInfo.value.need_contact,
        is_package: confirmInfo.value.ticket_info.is_package,
        package_num: confirmInfo.value.ticket_info.is_package,
        contactInfo: confirmInfo.value.contact_info,
      },
    });
    if (res.data.errno === 0 && res.data.errtag === 0 && res.data.data.token) {
      tishi.value = `第${i}次抢票，判断票是否可以使用`;
      tishi.value = `第${i}次抢票，抢到了，请尽快去支付`;
      let audio = new Audio("./aaa.mp3");
      audio.autoplay = true;
      audio.loop = true;
      audio.play();
      alert("抢到了，请尽快去支付");
    } else {
      tishi.value = `第${i}次抢票，${res.data.msg}`;
    }
    if (res.data.errno === 100051) {
      clearInterval(setRepeatTask.value);
      onclick();
    }
    if (i > 500) {
      clearInterval(setRepeatTask.value);
      onclick();
    }
  }, 1000);
};
</script>

<style></style>
