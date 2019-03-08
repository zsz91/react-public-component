export default {
  configs: [
    {
      type: 'showInfo',
      fieldList: [
        { key: 'studentNo', name: '学号' },
        { key: 'name', name: '姓名' },
        { key: 'genderName', name: '性别' },
        { key: 'birthday', name: '出生年月' },
        { key: 'politicalName', name: '政治面貌' },
        { key: 'nationName', name: '民族' },
        { key: 'idCard', name: '身份证号' },
        { key: 'phone', name: '联系电话' },
        { key: 'zipCode', name: '邮政编码' },
        { key: 'clazzName', name: '班级' },
        { key: 'campusId', name: '校区' },
        { key: 'bankCard', name: '农行卡号' },
      ],
      fieldLayout: {

      },
      fieldListRow: [
        { key: 'gradeName', name: '院系及专业' },
        { key: 'familyAddress', name: '家庭住址' },
      ]
    }
  ]
}
