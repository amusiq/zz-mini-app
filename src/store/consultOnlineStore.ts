import { observable } from "mobx";
import request from "@/utils/request";
import { api } from "@/constants";

const consultOnlineStore = observable({
  tabList: [],
  selectedSubList: [], // 后台原始item集合，加了自定义status
  selectType: "consulting", // consulting：咨询   followup：随访  recommend：医生推荐
  currentSelectedIndex: 0, // tab当前选中的下标
  departmentsList: [], // 科室列表

  // 获取医生推荐、进行中咨询、线上随访
  async loadLoginData() {
    const swiperData = await request.loginHttpGet({
      url: api.API_DOCTOR_CONSULTING_FOLLOWUP
    });
    console.log(swiperData, "swiperData");
    const dataBody = swiperData.data || {
      consultations: [],
      followUps: [],
      doctors: []
    };
    this.tabList = [];
    if (
      dataBody.consultations.length === 0 &&
      dataBody.followUps.length === 0
    ) {
      // 只展示推荐医生
      const tempRecommendDoctors =
        dataBody.doctors.length > 5
          ? dataBody.doctors.slice(0, 5)
          : dataBody.doctors;
      this.tabList.push({
        title: "医生推荐",
        data: tempRecommendDoctors,
        type: "recommend"
      });
    } else {
      // 进行中的咨询
      if (dataBody.consultations.length > 0) {
        const tempConsultData =
          dataBody.consultations.length > 5
            ? dataBody.consultations.slice(0, 5)
            : dataBody.consultations;
        const newConsultData = this.handleConsultStatusData(
          tempConsultData || []
        );
        this.tabList.push({
          title: "进行中的咨询",
          data: newConsultData,
          type: "consulting"
        });
      }

      // 在线随访
      if (dataBody.followUps.length > 0) {
        const tempFollowupData =
          dataBody.followUps.length > 5
            ? dataBody.followUps.slice(0, 5)
            : dataBody.followUps;
        const newFollowupData = this.handleConsultStatusData(
          tempFollowupData || []
        );
        this.tabList.push({
          title: "我的随访",
          data: newFollowupData,
          type: "followup"
        });
      }
    }
    // 容错处理，万一原来的数组长度变化，有咨询全部完结的状态，会导致数组越界取值
    const maxLength = Math.max(this.tabList.length - 1, 0);
    this.currentSelectedIndex = Math.min(this.currentSelectedIndex, maxLength);
    this.selectedSubList =
      this.tabList.length > 0
        ? this.tabList[this.currentSelectedIndex].data
        : [];
    this.selectType =
      this.tabList.length > 0
        ? this.tabList[this.currentSelectedIndex].type
        : "";
  },

  // 咨询和随访状态重构
  handleConsultStatusData(data) {
    const newConsultingList = data.map(item => {
      let newStatus = "";
      if (item.consultType === "text" || item.consultType === "follow_up") {
        if (
          item.status === "new_consultation" ||
          item.status === "additional_question"
        ) {
          newStatus = "待医生回复"; // 进行中
        } else if (item.status === "replied") {
          if (
            item.additionalRemainingCount &&
            item.additionalRemainingCount > 0
          ) {
            newStatus =
              item.additionalQuestSurplusTime &&
              item.additionalQuestSurplusTime > 0
                ? "待追问"
                : "超过追问时限"; // 进行中
          } else {
            newStatus = "追问次数已到"; // 进行中
          }
        } else if (
          item.consultType === "follow_up" &&
          item.status === "pending_follow_up"
        ) {
          // 随访专有 待发起状态
          newStatus = "待发起";
        }
      } else if (item.consultType === "phone") {
        if (item.doctorFinishFlag == 0) {
          // 医生未点击结束
          if (
            item.status === "new_consultation" ||
            item.status === "additional_question"
          ) {
            newStatus = "待医生回复";
          } else if (item.status === "replied") {
            newStatus = "待追问";
          }
        } else {
          // 医生手动结单
          if (
            item.additionalRemainingCount &&
            item.additionalRemainingCount > 0
          ) {
            newStatus =
              item.additionalQuestSurplusTime &&
              item.additionalQuestSurplusTime > 0
                ? "待追问"
                : "超过追问时限";
          } else {
            newStatus = "追问次数已到";
          }
        }
      }
      const newItem = {
        ...item,
        statusName: newStatus
      };
      return newItem;
    });
    return newConsultingList;
  },

  // 可咨询的科室
  async getAvailableServices() {
    const departmentResult = await request.httpGet({
      url: api.API_AVAILABLE_SERVICES
    });
    for (const i in departmentResult.data) {
      const temp = {
        data: departmentResult.data[i],
        title: i === "normal" ? "科室" : "特色专科"
      };
      if ((i === "normal" || i === "special") && temp.data.length > 0) {
        // 暂时只有专科与普通科室划分，避免以后新增科室后台先发布影响线上功能
        this.departmentsList.push(temp);
      }
    }
  }
});
export default consultOnlineStore;
