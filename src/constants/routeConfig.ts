// tab页
const TAB_PAGE = {
  home: "pages/index/index",
  consultOnline: "pages/consultOnline/consultOnline",
  discovery: "pages/discovery/discovery",
  user: "pages/user/user"
};

const router = {
  // 主包
  ...TAB_PAGE,
  authorize: "pages/authorize",
  // 分包 : imageTextConsult（图文问诊）
  searchDoctorList: "imageTextConsult/searchDoctorList",
  doctorList: "imageTextConsult/doctorList",
  doctorDetail: "imageTextConsult/doctorDetail",
  askingIssueForm: "imageTextConsult/askingIssueForm",
  consultDetail: "imageTextConsult/consultDetail",
  contractualLicense: "imageTextConsult/contractualLicense",
  refundApplication: "imageTextConsult/refundApplication",
  consultingRecord: "imageTextConsult/consultingRecord",
  tencentConsultingRecord: "imageTextConsult/tencentConsultingRecord",
  tencentConsultDetail: "imageTextConsult/tencentConsultDetail",
  evaluationPublish: "imageTextConsult/evaluationPublish",
  editPhoneNumber: "imageTextConsult/editPhoneNumber",
  statusDisplay: "imageTextConsult/statusDisplay",
  consultOrder: "imageTextConsult/consultOrder",
  // 分包 : followUp（随访）
  followUpList: "followUp/followUpList",
  followUpReceivedResult: "followUp/followUpReceivedResult",
  getFollowUpCode: "followUp/getFollowUpCode",
  askFollowUpIssues: "followUp/askFollowUpIssues",
  followUpConsultDetail: "followUp/followUpConsultDetail",
  selectFamilyMember: "followUp/selectFamilyMember",
  temporaryPage: "followUp/temporaryPage",
  followUpEvaluation: "followUp/followUpEvaluation",
  // 分包 : familyCard（家庭卡）
  myFamilyCard: "familyCard/myFamilyCard",
  addFamilyCard: "familyCard/addFamilyCard",
  myFamilyCardDetail: "familyCard/myFamilyCardDetail",
  createCardStep1: "familyCard/createCardStep1",
  createCardStep2: "familyCard/createCardStep2",
  createCardStep3: "familyCard/createCardStep3",
  createCardStep4: "familyCard/createCardStep4",
  // createCardStep5: 'familyCard/createCardStep5',
  cardBeneficiariesAdd: "familyCard/cardBeneficiariesAdd",
  cardBeneficiariesEdit: "familyCard/cardBeneficiariesEdit",
  consumptionQrcode: "familyCard/consumptionQrcode",
  recommendToFriend: "familyCard/recommendToFriend",
  getTicketAfterRecharge: "familyCard/getTicketAfterRecharge",
  rechargeView: "familyCard/rechargeView",
  poster: "familyCard/poster",
  // 分包 : my（我的）
  memberSelector: "my/memberSelector",
  familyEdit: "my/familyEdit",
  edit: "my/edit",
  family: "my/family",
  feedBack: "my/feedBack",
  fastAdd: "my/fastAdd",
  verification: "my/verification",
  // 分包 : tickets（券）
  myTicketTotal: "tickets/myTicketTotal",
  ticketList: "tickets/ticketList",
  myShareInfo: "tickets/myShareInfo",
  // 分包 : popularScience（科普）
  popularScienceSearch: "popularScience/popularScienceSearch",
  // 分包 : activePage（活动页）
  activeGetTicketDetail: "activePage/activeGetTicketDetail",
  recommendToCreateCard: "activePage/recommendToCreateCard",
  // 分包 : other（其他）
  webView: "other/webView",
  register: "other/register",
  questionnaireClinic: "other/questionnaireClinic"
};

export { TAB_PAGE };
export default router;
