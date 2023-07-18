import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
let gateway;
let cookie = `b_nut=1673612630; i-wanna-go-back=-1; _uuid=5883C59A-10598-7837-6173-E1935D9BF55C30415infoc; buvid4=38239556-5668-F439-3473-6AA0AE164DBC32065-023011320-0HQWf7U9Yhl2UOX5oLjtwA%3D%3D; rpdid=|(kmRY|)J|~m0J'uY~JYuk~u); LIVE_BUVID=AUTO3816736995247771; buvid_fp_plain=undefined; nostalgia_conf=-1; is-2022-channel=1; CURRENT_BLACKGAP=0; hit-dyn-v2=1; CURRENT_PID=f81fbd80-cd79-11ed-b7aa-a36dfa7bedc0; buvid3=EF56117D-D130-4425-9686-B6ABAEBD71AF36735infoc; header_theme_version=CLOSE; CURRENT_QUALITY=0; hit-new-style-dyn=1; CURRENT_FNVAL=4048; bp_article_offset_293942714=815872683359076400; fingerprint=2575e8faaf2fb4fe93504f52afd4cdda; bp_video_offset_1322349254=817867768665735200; home_feed_column=5; PVID=1; SESSDATA=22d53259%2C1705115286%2C7cebb%2A72q7tXhpKvYEQRYbOJTBIHE4RYcugpt3fSTVr1q9GCdftsqdcgz5VUv9n5iTJdROEZ7QplEwAADgA; bili_jct=af4b1df9a46580b4393ac03020dc8498; DedeUserID=293942714; DedeUserID__ckMd5=9e2bb0fa9dc16199; sid=837nhulo; bp_video_offset_293942714=819013880691818500; b_ut=5; FEED_LIVE_VERSION=V_NO_BANNER_3; innersign=0; buvid_fp=f252df8c82bb23bec0676ccac95de443; deviceFingerprint=8d6edf1828fdcf2d60634c4a27369c23; canvasFp=250ab4ba5e13bfa14104206e502fcd72; webglFp=41ccf5423d27c8e0e7791b04898b10cc; screenInfo=390*844*24; feSign=bb7a0d9d209519bd9de309368d3abf0f; payParams=%7B%22customerId%22%3A10001%2C%22defaultChoose%22%3A%22wechat%22%2C%22orderId%22%3A%224005056429730999%22%2C%22orderCreateTime%22%3A%221689648158000%22%2C%22payAmount%22%3A8000%2C%22deviceType%22%3A2%2C%22openId%22%3A%22%22%2C%22notifyUrl%22%3A%22http%3A//show.bilibili.co/api/ticket/order/payNotify%22%2C%22productId%22%3A375149%2C%22traceId%22%3A2949932976%2C%22timestamp%22%3A%221689648158752%22%2C%22version%22%3A%221.0%22%2C%22signType%22%3A%22MD5%22%2C%22sign%22%3A%22c42b8fe4db2dcf55a334c6856d09b35f%22%2C%22createIp%22%3A%222408%3A843c%3A4210%3Aa91a%3Aecd8%3A93b2%3A1ed2%3Ae7a%22%2C%22extData%22%3A%22%7B%5C%22profitSharing%5C%22%3A%5C%22jzbPs%5C%22%2C%5C%22psExt%5C%22%3A%5C%22%7B%5C%5C%5C%22optType%5C%5C%5C%22%3A%5C%5C%5C%22jzbps_self%5C%5C%5C%22%7D%5C%22%7D%22%2C%22feeType%22%3A%22CNY%22%2C%22orderExpire%22%3A600%2C%22originalAmount%22%3A8000%2C%22productUrl%22%3A%22https%3A//show.bilibili.com/m/platform/detail.html%3Fid%3D71661%22%2C%22returnUrl%22%3A%22https%3A//mall.bilibili.com/neul/index.html%3Fpage%3Dticket_payResult%26noTitleBar%3D1%26from%3Dh5-ticket-pay%26msource%3Dh5-ticket-pay%26orderId%3D4005056429730999%22%2C%22serviceType%22%3A0%2C%22showContent%22%3A%22%u7968%u52A1_%u5317%u4EAC%B7%u7B2C%u5341%u4E00%u5C4AIJOY%u6F2B%u5C55xCGF%u6E38%u620F%u8282_2023-07-18%2010%3A42%3A38_80%22%2C%22showTitle%22%3A%22bilibili%u7968%u52A1%22%7D; _xid=04OWq%5CNWS9dFbvxJpvPCe0i7c7QYGOh8FcsRQ1IbTMyaPcx4HCaMkwxDfxOHsYoJGJF9zNiw06urhxIX6ghIOeyjVd03qGl6G3fjNva8cdkF340eGO2KpAMGPgAb1ild; c=SLY6yTRo-1689648160158-80c2347d32c211860473961; _fmdata=liinB7y8hAyCPrVn6uUh0Hz1cK11daBFghvgnZlVv89c0WS0P5r%5CUAzMorPMXTmULqRuibgRzQcx4YCJlslWh9pRgdCo6Is8wURgvPIb0G6J8jfAWnMtKOJMXyeetJRw; from=pc_search_sug; kfcFrom=pc_search_sug; b_lsid=11FF4322_18967817C6A; browser_resolution=1702-885; msource=h5`;
gateway = "https://show.bilibili.com/";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://show.bilibili.com/",
        changeOrigin: true,
        ws: true,
        headers: {
          Cookie: cookie,
          Referer: gateway,
          Origin: gateway,
        },
      },
    },
  },
});
