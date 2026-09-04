import type { ResumeConfig } from '@/types/resume';

/** 完整中文骨架。用编辑器替换成你的真实内容。 */
export const DEFAULT_RESUME: ResumeConfig = {
  avatar: {
    src: '',
    hidden: true,
    shape: 'circle',
  },
  profile: {
    name: '姓名',
    email: 'you@example.com',
    mobile: '13800000000',
    github: 'https://github.com/fallingduck',
    workExpYear: '3 年',
    workPlace: '城市',
    positionTitle: '职位',
  },
  educationList: [
    {
      edu_time: ['2018.09', '2022.06'],
      school: '学校名称',
      major: '专业',
      academic_degree: '本科',
    },
  ],
  awardList: [
    {
      award_info: '奖项或证书',
      award_time: '2022',
    },
  ],
  workExpList: [
    {
      company_name: '公司名称',
      department_name: '部门',
      work_time: ['2022.07', '至今'],
      work_desc: '1. 负责的业务与结果\n2. 技术栈与协作方式',
    },
  ],
  skillList: [
    {
      skill_name: 'TypeScript / JavaScript',
      skill_desc: '熟悉 TypeScript，有完整业务项目经验',
      skill_level: 80,
    },
    {
      skill_name: 'React',
      skill_desc: '组件化开发与工程化实践',
      skill_level: 80,
    },
  ],
  projectList: [
    {
      project_name: '项目名称',
      project_role: '核心开发',
      project_time: '2023.01 - 2024.06',
      project_desc: '项目背景与目标。',
      project_content: '1. 你做了什么\n2. 量化结果',
    },
  ],
  workList: [],
  aboutme: {
    aboutme_desc:
      '一句话介绍自己。补充技术方向、近期关注点，以及想找的机会。',
  },
};
